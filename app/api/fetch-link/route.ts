import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url || typeof url !== 'string') return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })

    function isForbiddenIP(hostname: string) {
      // Security concern: prevent regex bypasses and block internal/private IPs
      const sanitized = hostname.replace(/\.$/, '').replace(/^\[(.*)\]$/, '$1');
      return (
        sanitized === 'localhost' ||
        /^(10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.|169\.254\.|0\.|127\.|fd|fc|fe80)/.test(sanitized)
      );
    }

    let currentUrl = url;
    let res: Response | null = null;

    // SSRF mitigation: up to 3 redirects, validate each hop
    for (let i = 0; i < 3; i++) {
      let parsed;
      try {
        parsed = new URL(currentUrl);
      } catch {
        return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 })
      }

      if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
        return NextResponse.json({ error: 'Invalid protocol' }, { status: 400 })
      }

      if (isForbiddenIP(parsed.hostname)) {
        return NextResponse.json({ error: 'Access to internal network is forbidden' }, { status: 403 })
      }

      const fetchRes = await fetch(currentUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 AyuraIntelligence/1.0' },
        signal: AbortSignal.timeout(8000),
        redirect: 'manual'
      })
      res = fetchRes;

      if (fetchRes.status >= 300 && fetchRes.status < 400 && fetchRes.headers.get('location')) {
        let location = fetchRes.headers.get('location')!;
        if (location.startsWith('/')) {
          location = new URL(location, currentUrl).toString();
        }
        currentUrl = location;
        continue;
      }
      break;
    }

    if (!res || !res.ok) return NextResponse.json({ error: 'Could not fetch URL' }, { status: 400 })

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
