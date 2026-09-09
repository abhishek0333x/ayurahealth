import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url || typeof url !== 'string') return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })

    let currentUrl = url;
    let res;
    let redirectCount = 0;
    const MAX_REDIRECTS = 3;

    while (redirectCount <= MAX_REDIRECTS) {
      let parsedUrl: URL;
      try {
        parsedUrl = new URL(currentUrl);
      } catch {
        return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
      }

      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        return NextResponse.json({ error: 'Invalid URL protocol' }, { status: 400 });
      }

      const hostname = parsedUrl.hostname.replace(/\.$/, '').replace(/^\[(.*)\]$/, '$1');
      const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';

      // Ensure it only matches full IP strings, not subdomains like 10.example.com
      const isPrivateIPLiteral = /^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
        /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
        /^192\.168\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
        /^169\.254\.\d{1,3}\.\d{1,3}$/.test(hostname) ||
        /^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname);

      if (isLocalhost || isPrivateIPLiteral) {
        return NextResponse.json({ error: 'Access to local or private network is forbidden' }, { status: 403 });
      }

      res = await fetch(currentUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 AyuraIntelligence/1.0' },
        signal: AbortSignal.timeout(8000),
        redirect: 'manual', // Security fix: Manually handle redirects to validate each hop
      });

      if (res.status >= 300 && res.status < 400 && res.headers.has('location')) {
        currentUrl = new URL(res.headers.get('location')!, currentUrl).toString();
        redirectCount++;
      } else {
        break;
      }
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
