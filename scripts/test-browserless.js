#!/usr/bin/env node
/**
 * test-browserless.js
 *
 * Diagnostic script that verifies the browserless.io connection used by
 * scripts/render-page.js: WebSocket connectivity, API key validity, and
 * basic page creation/navigation.
 *
 * Usage:  npm run test-browserless
 */

import puppeteer from 'puppeteer';

const WS_ENDPOINT = process.env.PUPPETEER_BROWSER_WS_ENDPOINT;
const CONNECT_TIMEOUT_MS = 15000;

function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}

function pass(message) {
  console.log(`✓ ${message}`);
}

function explainError(err) {
  const message = err?.message || String(err);

  if (message.includes('timeout') || message.includes('ETIMEDOUT')) {
    return `Connection timed out. Check that PUPPETEER_BROWSER_WS_ENDPOINT is reachable and your network allows outbound WebSocket connections.\nDetails: ${message}`;
  }
  if (message.includes('401') || message.includes('403') || message.toLowerCase().includes('unauthorized')) {
    return `Authorization failed (401/403). Verify your browserless.io API key/token in PUPPETEER_BROWSER_WS_ENDPOINT is correct and active.\nDetails: ${message}`;
  }
  if (message.includes('ENOTFOUND') || message.includes('ECONNREFUSED') || message.includes('EAI_AGAIN')) {
    return `Network unreachable. Could not resolve or connect to the browserless.io host. Check the endpoint URL and your network connection.\nDetails: ${message}`;
  }
  return `Unexpected error: ${message}`;
}

async function main() {
  if (!WS_ENDPOINT) {
    fail(
      'Missing PUPPETEER_BROWSER_WS_ENDPOINT env var. Set it to your browserless.io WebSocket endpoint, e.g. wss://chrome.browserless.io?token=YOUR_API_KEY'
    );
  }
  pass('PUPPETEER_BROWSER_WS_ENDPOINT is set');

  let browser;
  try {
    browser = await Promise.race([
      puppeteer.connect({ browserWSEndpoint: WS_ENDPOINT }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout: connection took too long')), CONNECT_TIMEOUT_MS)
      ),
    ]);
    pass('Connected to browserless.io WebSocket endpoint');
  } catch (err) {
    fail(explainError(err));
    return;
  }

  try {
    const version = await browser.version();
    pass(`Retrieved browser version: ${version}`);

    let page;
    try {
      page = await browser.newPage();
      pass('Created a new page');

      await page.goto('https://example.com', { waitUntil: 'domcontentloaded', timeout: 20000 });
      const title = await page.title();
      pass(`Navigated to https://example.com (title: "${title}")`);
    } finally {
      if (page) {
        await page.close().catch(() => {});
      }
    }

    console.log('\nAll browserless.io diagnostics passed.');
  } catch (err) {
    fail(explainError(err));
  } finally {
    await browser.disconnect().catch(() => {});
  }
}

main();
