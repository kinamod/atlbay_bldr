#!/usr/bin/env node
/**
 * render-page.js
 *
 * Connects to a remote browserless.io Chrome instance, fully renders the
 * target URL (including JS), then extracts the outerHTML of key page sections.
 *
 * Usage:  node scripts/render-page.js <url>
 * Output: JSON to stdout — one key per section, value is outerHTML string or null.
 */

import puppeteer from 'puppeteer';

const url = process.argv[2];
if (!url) {
  console.error('Usage: node scripts/render-page.js <url>');
  process.exit(1);
}

const WS_ENDPOINT = process.env.PUPPETEER_BROWSER_WS_ENDPOINT;
if (!WS_ENDPOINT) {
  console.error(
    'Missing PUPPETEER_BROWSER_WS_ENDPOINT env var. Set it to your browserless.io WebSocket endpoint (e.g. wss://chrome.browserless.io?token=YOUR_API_KEY).'
  );
  process.exit(1);
}

const MAX_RETRIES = 3;
const TRANSIENT_ERROR_PATTERNS = ['Target closed', 'Protocol error'];

function isTransientError(err) {
  const message = err?.message || '';
  return TRANSIENT_ERROR_PATTERNS.some(pattern => message.includes(pattern));
}

const SELECTORS = {
  announcementBar: [
    '[class*="announcement"]',
    '[class*="banner-bar"]',
    '[class*="promo-bar"]',
    '[class*="notice-bar"]',
    'header > div:first-child',
  ],
  nav: [
    'header',
    'nav[role="navigation"]',
    '[class*="header"]',
    '[class*="navbar"]',
    '[class*="nav-bar"]',
    '.O-Header',
  ],
  hero: [
    '[class*="hero"]',
    '[class*="stage"]',
    '[class*="banner"]',
    '.M-Stage',
    'main > section:first-child',
    'main > div:first-child',
  ],
  featureCards: [
    '[class*="feature"]',
    '[class*="card-grid"]',
    '[class*="cards"]',
    '[class*="services"]',
    'main > section:nth-child(2)',
    'main > div:nth-child(2)',
  ],
  carousel: [
    '[class*="carousel"]',
    '[class*="slider"]',
    '[class*="swiper"]',
    '[class*="slideshow"]',
  ],
  testimonials: [
    '[class*="testimonial"]',
    '[class*="review"]',
    '[class*="quote"]',
    '[class*="rating"]',
  ],
  footer: [
    'footer',
    '[role="contentinfo"]',
    '[class*="footer"]',
  ],
};

async function firstMatch(page, selectors) {
  for (const sel of selectors) {
    try {
      const el = await page.$(sel);
      if (el) {
        const html = await page.evaluate(e => e.outerHTML, el);
        if (html && html.trim().length > 50) return html;
      }
    } catch (_) {
      // selector failed, try next
    }
  }
  return null;
}

// Waits for the DOM to stop mutating, but never hangs — resolves after the
// timeout regardless of whether stability was reached.
async function waitForDomStability(page, { idleMs = 1000, timeoutMs = 15000 } = {}) {
  try {
    await page.evaluate(
      ({ idleMs, timeoutMs }) =>
        new Promise(resolve => {
          let idleTimer;
          const overallTimer = setTimeout(() => {
            observer.disconnect();
            clearTimeout(idleTimer);
            resolve();
          }, timeoutMs);

          const settle = () => {
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
              observer.disconnect();
              clearTimeout(overallTimer);
              resolve();
            }, idleMs);
          };

          const observer = new MutationObserver(settle);
          observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
          });
          settle();
        }),
      { idleMs, timeoutMs }
    );
  } catch (_) {
    // DOM stability check failed (e.g. navigation mid-check) — continue anyway.
  }
}

async function renderPage(browser) {
  let page;
  try {
    page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    );

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    });

    await waitForDomStability(page);

    const result = {};
    for (const [section, selectors] of Object.entries(SELECTORS)) {
      result[section] = await firstMatch(page, selectors);
    }

    result._ctaButtonColor = await page.evaluate(() => {
      const btn = document.querySelector(
        'button, [class*="btn"], [class*="button"], [class*="cta"]'
      );
      if (!btn) return null;
      const styles = window.getComputedStyle(btn);
      return {
        background: styles.backgroundColor,
        color: styles.color,
        borderColor: styles.borderColor,
      };
    });

    return result;
  } finally {
    if (page) {
      await page.close().catch(() => {});
    }
  }
}

async function renderWithRetries() {
  let lastError;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    let browser;
    try {
      browser = await puppeteer.connect({ browserWSEndpoint: WS_ENDPOINT });
      return await renderPage(browser);
    } catch (err) {
      lastError = err;
      if (isTransientError(err) && attempt < MAX_RETRIES) {
        console.error(
          `Transient error on attempt ${attempt}/${MAX_RETRIES}: ${err.message}. Retrying...`
        );
        continue;
      }
      throw new Error(
        `Failed to render ${url} after ${attempt} attempt(s): ${err.message}`
      );
    } finally {
      if (browser) {
        await browser.disconnect().catch(() => {});
      }
    }
  }
  throw lastError;
}

(async () => {
  try {
    const result = await renderWithRetries();
    console.log(JSON.stringify(result, null, 2));
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
})();
