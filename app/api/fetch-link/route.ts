import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url || typeof url !== 'string') return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })

    // SSRF Protection: Validate URL protocol and hostname
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      return NextResponse.json({ error: 'Unsupported protocol' }, { status: 400 });
    }

    // Sanitize hostname to prevent regex bypasses (e.g. trailing dot or IPv6 brackets)
    const hostname = parsedUrl.hostname.toLowerCase();
    const sanitizedHost = hostname.replace(/\.$/, '').replace(/^\[(.*)\]$/, '$1');

    // Check against internal, loopback, and cloud metadata IPs (including unbracketed IPv6 loopback)
    const isLocalOrInternal = /^(localhost|127\.0\.0\.1|0\.0\.0\.0|169\.254\.169\.254|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2[0-9]|3[0-1])\.\d+\.\d+|192\.168\.\d+\.\d+|::1|\[::1\])$/.test(sanitizedHost);
    if (isLocalOrInternal || sanitizedHost.endsWith('.internal') || sanitizedHost.endsWith('.local')) {
      return NextResponse.json({ error: 'Access to internal network is not allowed' }, { status: 403 });
    }

    // Pass original toString to fetch but set redirect logic to error if necessary,
    // Note: Node's fetch default follows redirects. A full robust protection would check redirect chains.
    // For this scope, the initial URL filter significantly reduces attack surface.
    const res = await fetch(parsedUrl.toString(), {
      headers: { 'User-Agent': 'Mozilla/5.0 AyuraIntelligence/1.0' },
      signal: AbortSignal.timeout(8000),
      redirect: 'error', // Prevent redirection to internal IPs
    })
    if (!res.ok) return NextResponse.json({ error: 'Could not fetch URL' }, { status: 400 })

    const html = await res.text()

    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const title = titleMatch ? titleMatch[1].trim() : url

    // Strip HTML tags and extract clean text (first 3000 chars)
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 3000)

    return NextResponse.json({ title, text, url })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch link' }, { status: 500 })
  }
}
