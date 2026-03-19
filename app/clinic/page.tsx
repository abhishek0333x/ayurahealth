import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AyuraHealth for Clinics — AI Health Assistant for Ayurvedic & Wellness Centers',
  description: 'Give your patients personalized AI health guidance from 8 healing traditions. Free 30-day trial for clinics.',
}

export default function ClinicPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#05100a', fontFamily: '"DM Sans", system-ui, sans-serif', color: '#e8dfc8' }}>
      <header style={{ background: 'rgba(5,16,10,0.95)', borderBottom: '1px solid rgba(106,191,138,0.12)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontWeight: 700, color: '#c9a84c', textDecoration: 'none' }}>🌿 AyuraHealth</Link>
        <a href="mailto:clinics@ayurahealth.com" style={{ fontSize: '0.85rem', color: '#6abf8a', textDecoration: 'none', border: '1px solid rgba(106,191,138,0.3)', padding: '0.4rem 1rem', borderRadius: 20 }}>Contact Us</a>
      </header>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-block', background: 'rgba(106,191,138,0.1)', border: '1px solid rgba(106,191,138,0.3)', borderRadius: 20, padding: '0.3rem 1rem', fontSize: '0.8rem', color: '#6abf8a', marginBottom: '1.5rem' }}>🏥 For Ayurvedic Clinics & Wellness Centers</div>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#c9a84c', lineHeight: 1.2, marginBottom: '1rem' }}>Give Every Patient Their Own<br/>AI Holistic Health Advisor</h1>
          <p style={{ color: 'rgba(232,223,200,0.6)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 2rem' }}>AyuraHealth gives your clinic an AI that knows Charaka Samhita, Huangdi Neijing, and 6 other healing traditions — available to your patients 24/7.</p>
          <a href="mailto:clinics@ayurahealth.com?subject=Clinic Partnership Inquiry" style={{ display: 'inline-block', padding: '1rem 2.5rem', background: 'linear-gradient(135deg, #2d5a1b, #3d7a28)', color: '#f0e6c8', borderRadius: 14, fontSize: '1rem', fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 20px rgba(45,90,27,0.4)' }}>Start Free 30-Day Trial →</a>
          <p style={{ color: 'rgba(200,200,200,0.3)', fontSize: '0.8rem', marginTop: '0.75rem' }}>No credit card required · Setup in 10 minutes</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '4rem' }}>
          {[['8','Healing traditions'],['3','Languages EN/JA/HI'],['24/7','Available to patients']].map(([n,l],i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(106,191,138,0.1)', borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.5rem', color: '#c9a84c', fontWeight: 700 }}>{n}</div>
              <div style={{ color: 'rgba(200,200,200,0.5)', fontSize: '0.85rem', marginTop: '0.3rem' }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', color: '#c9a84c', textAlign: 'center', marginBottom: '2rem' }}>What Your Patients Get</h2>
          {[
            ['🧬','Personalized Dosha Assessment','AI identifies Vata/Pitta/Kapha constitution and personalizes every recommendation'],
            ['📄','Blood Report Analysis','Upload lab reports — VAIDYA analyzes from both modern medicine and Ayurvedic perspectives'],
            ['🌿','Herb & Diet Recommendations','Specific herbs with dosages from Charaka Samhita, personalized diet charts'],
            ['🎤','Voice Consultations','Patients speak in English, Hindi or Japanese — VAIDYA responds in kind'],
            ['📱','Mobile App Experience','Installs on iPhone and Android like a native app — no App Store required'],
          ].map(([icon,title,desc],i) => (
            <div key={i} style={{ display: 'flex', gap: '1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(106,191,138,0.08)', borderRadius: 16, padding: '1.25rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '2rem', flexShrink: 0 }}>{icon}</span>
              <div><div style={{ color: '#6abf8a', fontWeight: 600, marginBottom: '0.3rem' }}>{title}</div><div style={{ color: 'rgba(200,200,200,0.55)', fontSize: '0.9rem', lineHeight: 1.6 }}>{desc}</div></div>
            </div>
          ))}
        </div>
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', color: '#c9a84c', textAlign: 'center', marginBottom: '2rem' }}>Simple Pricing</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {[
              { name: 'Starter', price: 'Free', period: '30 days', features: ['Up to 50 patients/month','All 8 traditions','3 languages','Email support'], hi: false },
              { name: 'Clinic', price: '$99', period: '/month', features: ['Unlimited patients','Custom branding','Priority AI','WhatsApp integration','Analytics report'], hi: true },
              { name: 'Enterprise', price: 'Custom', period: '', features: ['Multi-location','API access','Custom AI training','Dedicated manager'], hi: false },
            ].map((p,i) => (
              <div key={i} style={{ background: p.hi ? 'rgba(106,191,138,0.08)' : 'rgba(255,255,255,0.02)', border: `${p.hi?'2px':'1px'} solid ${p.hi?'rgba(106,191,138,0.4)':'rgba(106,191,138,0.08)'}`, borderRadius: 20, padding: '1.5rem' }}>
                {p.hi && <div style={{ color: '#6abf8a', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Most Popular</div>}
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', color: '#c9a84c', marginBottom: '0.25rem' }}>{p.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 700, color: '#e8dfc8' }}>{p.price}</span>
                  <span style={{ color: 'rgba(200,200,200,0.4)', fontSize: '0.85rem' }}>{p.period}</span>
                </div>
                {p.features.map((f,j) => <div key={j} style={{ display: 'flex', gap: '0.5rem', color: 'rgba(200,200,200,0.6)', fontSize: '0.85rem', marginBottom: '0.5rem' }}><span style={{ color: '#6abf8a' }}>✓</span><span>{f}</span></div>)}
                <a href="mailto:clinics@ayurahealth.com" style={{ display: 'block', marginTop: '1.25rem', padding: '0.75rem', background: p.hi ? 'linear-gradient(135deg, #2d5a1b, #3d7a28)' : 'transparent', border: `1px solid ${p.hi?'transparent':'rgba(106,191,138,0.25)'}`, borderRadius: 12, color: '#f0e6c8', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>Get Started →</a>
              </div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center', background: 'rgba(45,90,27,0.15)', border: '1px solid rgba(106,191,138,0.2)', borderRadius: 24, padding: '3rem 2rem' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', color: '#c9a84c', marginBottom: '0.75rem' }}>Ready to transform your clinic?</h2>
          <p style={{ color: 'rgba(200,200,200,0.5)', marginBottom: '1.5rem' }}>Email us and we will set up your free trial within 24 hours.</p>
          <a href="mailto:clinics@ayurahealth.com?subject=Clinic Partnership" style={{ display: 'inline-block', padding: '1rem 2.5rem', background: 'linear-gradient(135deg, #2d5a1b, #3d7a28)', color: '#f0e6c8', borderRadius: 14, fontSize: '1rem', fontWeight: 600, textDecoration: 'none' }}>clinics@ayurahealth.com →</a>
        </div>
      </div>
      <footer style={{ borderTop: '1px solid rgba(106,191,138,0.08)', padding: '1.5rem', textAlign: 'center' }}>
        <p style={{ color: 'rgba(200,200,200,0.3)', fontSize: '0.8rem' }}>
          <Link href="/" style={{ color: 'rgba(200,200,200,0.4)', textDecoration: 'none' }}>Home</Link>{' · '}
          <Link href="/privacy" style={{ color: 'rgba(200,200,200,0.4)', textDecoration: 'none' }}>Privacy</Link>{' · '}
          <Link href="/terms" style={{ color: 'rgba(200,200,200,0.4)', textDecoration: 'none' }}>Terms</Link>
        </p>
      </footer>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap'); *{box-sizing:border-box;margin:0;padding:0} body{margin:0}`}</style>
    </main>
  )
}
