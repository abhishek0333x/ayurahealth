import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — AyuraHealth',
  description: 'Terms and conditions for using AyuraHealth AI holistic health companion.',
}

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using AyuraHealth ("the Service"), you agree to be bound by these Terms. If you do not agree, do not use the Service. These Terms are governed by the laws of Japan.',
  },
  {
    title: '2. Description of Service',
    content: 'AyuraHealth is a free AI-powered educational platform providing health information from 8 healing traditions: Ayurveda, Traditional Chinese Medicine, Tibetan Medicine, Unani, Siddha, Homeopathy, Naturopathy, and Western/Functional Medicine. The Service is for educational purposes only.',
  },
  {
    title: '3. Medical Disclaimer — Read Carefully',
    content: `THE SERVICE IS NOT A MEDICAL DEVICE AND DOES NOT PROVIDE MEDICAL ADVICE.\n\nAyuraHealth is not a licensed healthcare provider. Information provided:\n• Is for educational and informational purposes only\n• Does not constitute medical advice, diagnosis, or treatment\n• Should not replace consultation with qualified healthcare professionals\n• May not be accurate, complete, or up-to-date\n\nALWAYS SEEK PROFESSIONAL MEDICAL ADVICE for health conditions. In emergencies, call your local emergency services immediately.`,
  },
  {
    title: '4. VAIDYA Deep Mind & AI',
    content: `VAIDYA Deep Mind is powered by NVIDIA Nemotron 120B via OpenRouter. AI responses:\n• Are generated automatically and may contain errors\n• Should be verified with qualified practitioners before acting on them\n• Represent educational synthesis of traditional knowledge, not clinical recommendations\n• May vary between sessions as AI models are updated`,
  },
  {
    title: '5. User Responsibilities',
    content: `You agree to:\n• Use the Service only for lawful educational purposes\n• Not upload illegal, harmful, or privacy-violating content\n• Not use the Service to diagnose or treat others professionally\n• Be at least 13 years old\n• Not attempt to reverse engineer, hack, or abuse the Service`,
  },
  {
    title: '6. Intellectual Property',
    content: 'All content, design, code, and branding of AyuraHealth is owned by AyuraHealth. The traditional medical knowledge referenced is in the public domain but our AI synthesis, presentation, and curation is proprietary. You may not copy, reproduce, or distribute our content without written permission.',
  },
  {
    title: '7. Uploaded Content',
    content: 'When you upload medical reports, images, or documents, you grant us a temporary license to process this content solely for generating your AI response. We do not store uploaded content on our servers beyond the duration of your session.',
  },
  {
    title: '8. Limitation of Liability',
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW:\n\nAyuraHealth shall not be liable for any damages arising from your use of the Service, including health decisions made based on AI information. Our total liability shall not exceed ¥0 / $0 (the Service is free of charge).`,
  },
  {
    title: '9. Service Availability',
    content: 'We provide the Service "as is" without warranty of any kind. We do not guarantee uptime, accuracy, or continuity. We may modify or discontinue the Service at any time. VAIDYA Deep Mind availability depends on third-party API availability (NVIDIA Nemotron via OpenRouter).',
  },
  {
    title: '10. Governing Law',
    content: 'These Terms are governed by the laws of Japan. Any disputes shall be resolved in the courts of Tokyo, Japan.',
  },
  {
    title: '11. Contact',
    content: 'Legal questions: legal@ayurahealth.com\nGeneral: hello@ayurahealth.com\n\nAyuraHealth · Tokyo, Japan · March 2026',
  },
]

export default function Terms() {
  return (
    <main style={{ background: '#05100a', minHeight: '100vh', color: '#e8dfc8', fontFamily: '"DM Sans", -apple-system, sans-serif' }}>

  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #05100a; }
    .section { margin-bottom: 2.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid rgba(106,191,138,0.07); }
    .section:last-child { border-bottom: none; }
    a { color: #6abf8a; text-decoration: none; }
    a:hover { text-decoration: underline; }
  `}</style>

      <nav style={{ background: 'rgba(5,16,10,0.95)', borderBottom: '1px solid rgba(106,191,138,0.1)', padding: '0 2rem', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)' }}>
        <Link href="/" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontWeight: 600, color: '#c9a84c', textDecoration: 'none', letterSpacing: '0.02em' }}>🌿 AyuraHealth</Link>
        <Link href="/chat" style={{ fontSize: '0.8rem', color: 'rgba(106,191,138,0.7)', textDecoration: 'none', border: '1px solid rgba(106,191,138,0.2)', padding: '0.3rem 0.8rem', borderRadius: 20, transition: 'all 0.2s' }}>Open App →</Link>
      </nav>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, color: '#c9a84c', marginBottom: '0.5rem' }}>Terms of Service</h1>
          <p style={{ color: 'rgba(232,223,200,0.3)', fontSize: '0.8rem', letterSpacing: '0.05em' }}>Last updated: March 2026 · AyuraHealth, Tokyo, Japan</p>
          <p style={{ color: 'rgba(232,223,200,0.45)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '1rem', padding: '1rem', background: 'rgba(106,191,138,0.05)', borderRadius: 12, border: '1px solid rgba(106,191,138,0.1)' }}>
            AyuraHealth is a free educational service. These terms protect both you and us. Please read Section 3 (Medical Disclaimer) carefully before using the Service.
          </p>
        </div>
        {sections.map((s, i) => (
          <div key={i} className="section">
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.25rem', fontWeight: 400, color: '#6abf8a', marginBottom: '0.75rem' }}>{s.title}</h2>
            <p style={{ color: 'rgba(232,223,200,0.55)', fontSize: '0.88rem', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{s.content}</p>
          </div>
        ))}
      </div>

      <footer style={{ borderTop: '1px solid rgba(106,191,138,0.08)', padding: '2rem', textAlign: 'center', marginTop: '4rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['Home', '/'], ['Privacy Policy', '/privacy'], ['Terms of Service', '/terms'], ['For Clinics', '/clinic'], ['Contact', '/contact']].map(([label, href]) => (
            <Link key={href} href={href} style={{ color: 'rgba(232,223,200,0.2)', fontSize: '0.72rem', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
        <p style={{ color: 'rgba(232,223,200,0.1)', fontSize: '0.7rem', marginTop: '1rem' }}>© 2026 AyuraHealth · Tokyo, Japan · For educational purposes only</p>
      </footer>

    </main>
  )
}
