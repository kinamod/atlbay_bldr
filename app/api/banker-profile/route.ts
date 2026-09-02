import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_BUILDER_API_KEY!;
const PORTAL_PASSWORD = '1234';

interface LicensedStateEntry {
  state?: string;
}

function normalizeLicensedStates(entries: (LicensedStateEntry | string)[] | undefined): string[] {
  return (entries || [])
    .map((entry) => (typeof entry === 'string' ? entry : entry?.state))
    .filter((value): value is string => Boolean(value));
}

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get('name')?.trim();

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }

  const url = `https://cdn.builder.io/api/v3/content/mortgage-banker-data?apiKey=${PUBLIC_API_KEY}&query.data.fullName=${encodeURIComponent(name)}&limit=1&cachebust=true`;
  const res = await fetch(url, { cache: 'no-store' });
  const json = await res.json();
  let entry = json?.results?.[0];

  if (!entry) {
    const allUrl = `https://cdn.builder.io/api/v3/content/mortgage-banker-data?apiKey=${PUBLIC_API_KEY}&limit=100&cachebust=true`;
    const allRes = await fetch(allUrl, { cache: 'no-store' });
    const allJson = await allRes.json();
    entry = (allJson?.results || []).find(
      (item: { data?: { fullName?: string } }) =>
        item?.data?.fullName?.trim().toLowerCase() === name.toLowerCase()
    );
  }

  if (!entry) {
    return NextResponse.json({ error: 'No banker found with that name' }, { status: 404 });
  }

  return NextResponse.json({
    contentId: entry.id,
    fullName: entry.data?.fullName,
    slug: entry.data?.slug,
    headshot: entry.data?.headshot || '',
    licensedStates: normalizeLicensedStates(entry.data?.licensedStates),
    phone: entry.data?.phone || '',
  });
}

export async function POST(request: NextRequest) {
  const privateKey = process.env.BUILDER_PRIVATE_KEY;

  if (!privateKey) {
    return NextResponse.json({ error: 'Server is not configured for writes' }, { status: 500 });
  }

  const body = await request.json();
  const { password, contentId, data } = body || {};

  if (password !== PORTAL_PASSWORD) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  if (!contentId || !data) {
    return NextResponse.json({ error: 'Missing contentId or data' }, { status: 400 });
  }

  const patchBody: Record<string, unknown> = {};
  if (typeof data.headshot === 'string') {
    patchBody.headshot = data.headshot;
  }
  if (typeof data.phone === 'string') {
    patchBody.phone = data.phone;
  }
  if (Array.isArray(data.licensedStates)) {
    patchBody.licensedStates = data.licensedStates
      .filter((state: string) => Boolean(state?.trim()))
      .map((state: string) => ({ state: state.trim() }));
  }

  const writeRes = await fetch(`https://builder.io/api/v1/write/mortgage-banker-data/${contentId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${privateKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: patchBody }),
  });

  if (!writeRes.ok) {
    const errorText = await writeRes.text();
    return NextResponse.json({ error: `Failed to update profile: ${errorText}` }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
