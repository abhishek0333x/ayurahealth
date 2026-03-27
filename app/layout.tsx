import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const BASE_URL = 'https://ayurahealth.com'

export const viewport: Viewport = {
  themeColor: '#05100a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'AyuraHealth — Ancient Wisdom, Modern AI',
    template: '%s | AyuraHealth',
  },
  description: 'Your personal holistic health companion — combining Ayurveda, Chinese Medicine, Tibetan, Unani, Siddha, Homeopathy, Naturopathy and Western Medicine. Powered by NVIDIA Nemotron. Free forever.',
  keywords: [
    'ayurveda', 'holistic health', 'dosha quiz', 'vata pitta kapha',
    'TCM', 'Chinese medicine', 'natural healing', 'AI health',
    'Charaka Samhita', 'Huangdi Neijing', 'VAIDYA', 'AyuraHealth',
    'アーユルヴェーダ', 'आयुर्वेद', '아유르베다', 'طب أيورفيدي',
  ],
  authors: [{ name: 'AyuraHealth', url: BASE_URL }],
  creator: 'AyuraHealth',
  publisher: 'AyuraHealth',

  // ─── Open Graph (WhatsApp · Line · Telegram · Facebook · LinkedIn · Slack · Discord) ───
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'AyuraHealth',
    title: 'AyuraHealth — Ancient Wisdom, Modern AI',
    description: 'Discover your Ayurvedic dosha in 2 minutes. Get personalized health guidance from 8 healing traditions powered by NVIDIA Nemotron. Free forever.',
    locale: 'en_US',
    alternateLocale: ['ja_JP', 'hi_IN', 'zh_CN', 'ko_KR', 'ar_SA'],
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'AyuraHealth — Ancient Wisdom, Modern AI · Natural Healing',
        type: 'image/png',
      },
      // Square image for platforms that prefer it (WhatsApp profile / Instagram)
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 1200,
        alt: 'AyuraHealth — Ancient Wisdom, Modern AI',
        type: 'image/png',
      },
    ],
  },

  // ─── Twitter / X ───
  twitter: {
    card: 'summary_large_image',
    site: '@ayurahealth',
    creator: '@ayurahealth',
    title: 'AyuraHealth — Ancient Wisdom, Modern AI',
    description: 'Discover your Ayurvedic dosha. Personalized health guidance from 8 ancient healing traditions + NVIDIA Nemotron AI.',
    images: [`${BASE_URL}/opengraph-image`],
  },

  // ─── PWA / Mobile ───
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'AyuraHealth',
    startupImage: [`${BASE_URL}/opengraph-image`],
  },

  // ─── SEO ───
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      'en': BASE_URL,
      'ja': BASE_URL,
      'hi': BASE_URL,
      'zh': BASE_URL,
      'ko': BASE_URL,
      'ar': BASE_URL,
    },
  },
  verification: {
    google: 'nJKShriBws7A7s1eIeWX_Bm1XzV4m2NZYACYKzmbryc',
  },
  category: 'health',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.groq.com https://api.openai.com; frame-ancestors 'none';" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />

        {/* ─── Extra meta for LINE / KakaoTalk / WeChat / Viber ─── */}
        <meta property="og:image" content={`${BASE_URL}/opengraph-image`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="AyuraHealth — Ancient Wisdom, Modern AI" />

        {/* iMessage / Apple */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="AyuraHealth" />

        {/* Google Search Console */}
        <meta name="google-site-verification" content="nJKShriBws7A7s1eIeWX_Bm1XzV4m2NZYACYKzmbryc" />
        <meta name="google-site-verification" content="9rHQNZ_b92_fT7LKLBsju3GcS926wb8yc8ZVrYiQGt8" />

        {/* ─── LINE specific ─── */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={BASE_URL} />
        <meta property="og:site_name" content="AyuraHealth" />

        {/* ─── WhatsApp forces this exact format ─── */}
        <meta property="og:title" content="AyuraHealth — Ancient Wisdom, Modern AI" />
        <meta property="og:description" content="Discover your Ayurvedic dosha. Personalized health guidance from 8 ancient healing traditions. Free forever." />

        {/* ─── Schema.org for Google rich results ─── */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "AyuraHealth",
          "url": BASE_URL,
          "description": "AI-powered holistic health companion combining Ayurveda, TCM, and 6 other healing traditions",
          "applicationCategory": "HealthApplication",
          "operatingSystem": "Any",
          "inLanguage": ["en", "ja", "hi", "zh", "ko", "ar", "sa"],
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "image": `${BASE_URL}/opengraph-image`,
          "author": { "@type": "Organization", "name": "AyuraHealth", "url": BASE_URL },
        })}} />

        {/* ─── Organization Schema ─── */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "AyuraHealth",
          "url": BASE_URL,
          "logo": `${BASE_URL}/favicon.png`,
          "description": "AI-powered holistic health companion",
          "sameAs": [
            "https://www.linkedin.com/company/ayurahealth",
            "https://twitter.com/ayurahealth",
            "https://www.instagram.com/ayurahealth",
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Support",
            "email": "support@ayurahealth.com",
          },
        })}} />

        {/* ─── FAQ Schema ─── */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is AyuraHealth?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "AyuraHealth is an AI-powered holistic health companion that combines Ayurveda, Chinese Medicine, Tibetan, Unani, Siddha, Homeopathy, Naturopathy and Western Medicine."
              }
            },
            {
              "@type": "Question",
              "name": "Is AyuraHealth free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, AyuraHealth is completely free. No account required, no hidden charges."
              }
            },
            {
              "@type": "Question",
              "name": "What is a dosha quiz?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A dosha quiz is a 5-question assessment that reveals your Ayurvedic constitution (Vata, Pitta, or Kapha) based on 5,000 years of Ayurvedic wisdom."
              }
            },
          ]
        })}} />

        {/* ─── Security Headers ─── */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>
        {children}
        <Analytics />
        
        {/* ─── Performance Monitoring ─── */}
        <script dangerouslySetInnerHTML={{ __html: `
          if ('PerformanceObserver' in window) {
            try {
              const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                  console.log('Performance:', entry.name, entry.duration);
                }
              });
              observer.observe({ entryTypes: ['navigation', 'resource', 'paint', 'measure'] });
            } catch (e) {
              console.error('Performance monitoring error:', e);
            }
          }
        ` }} />
      </body>
    </html>
  )
}
