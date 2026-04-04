'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'

export default function ClinicPage() {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ clinicName: '', contactName: '', email: '', phone: '', tradition: '', patientCount: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/clinic-lead', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Failed to submit')
      }
      setSuccess(true)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: '100dvh', background: '#05100a', fontFamily: '"DM Sans", -apple-system, sans-serif', color: '#e8dfc8', position: 'relative' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .feature-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(106,191,138,0.08); border-radius: 16px; padding: 1.5rem; transition: all 0.25s; }
        .feature-card:hover { background: rgba(106,191,138,0.05); border-color: rgba(106,191,138,0.2); transform: translateY(-2px); }
        .price-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(106,191,138,0.08); border-radius: 20px; padding: 2rem; transition: all 0.2s; }
        .price-card.hi { background: rgba(106,191,138,0.06); border: 2px solid rgba(106,191,138,0.35); }
        .cta-btn { display: inline-block; padding: 1rem 2.5rem; background: linear-gradient(135deg, #2d5a1b, #3d7a28); color: #e8dfc8; border-radius: 980px; font-size: 1rem; font-weight: 500; text-decoration: none; transition: all 0.25s; box-shadow: 0 4px 24px rgba(45,90,27,0.35); border: none; cursor: pointer; font-family: inherit; }
        .cta-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 8px 32px rgba(45,90,27,0.5); }
        .cta-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .outline-btn { display: inline-block; padding: 1rem 2rem; border: 1px solid rgba(106,191,138,0.3); color: #6abf8a; background: transparent; border-radius: 980px; font-size: 0.95rem; text-decoration: none; transition: all 0.2s; cursor: pointer; font-family: inherit; }
        .outline-btn:hover { background: rgba(106,191,138,0.08); border-color: rgba(106,191,138,0.5); }
        .divider { width: 100%; height: 1px; background: linear-gradient(90deg, transparent, rgba(106,191,138,0.12), transparent); margin: 4rem 0; }
        .check { color: #6abf8a; margin-right: 0.5rem; }
        
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 1rem; }
        .modal { background: #081510; border: 1px solid rgba(106,191,138,0.2); border-radius: 20px; padding: 2.5rem; width: 100%; max-width: 500px; position: relative; box-shadow: 0 24px 64px rgba(0,0,0,0.6); }
        .form-input { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(106,191,138,0.15); border-radius: 8px; padding: 0.75rem 1rem; color: #e8dfc8; font-family: inherit; outline: none; transition: border-color 0.2s; margin-bottom: 1rem; }
        .form-input:focus { border-color: rgba(106,191,138,0.5); }
        .form-label { display: block; fontSize: 0.82rem; color: rgba(232,223,200,0.6); marginBottom: 0.4rem; }
      `}</style>

      {/* Nav */}
      <Nav showLangPicker={false} />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '5rem 1.5rem 4rem' }}>

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'inline-block', background: 'rgba(106,191,138,0.08)', border: '1px solid rgba(106,191,138,0.2)', borderRadius: 980, padding: '0.3rem 1.1rem', fontSize: '0.75rem', color: '#6abf8a', marginBottom: '2rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            For Ayurvedic Clinics & Wellness Centers
          </div>
          <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 300, color: '#e8dfc8', lineHeight: 1.15, marginBottom: '1.5rem' }}>
            Give Every Patient<br/>
            <span style={{ color: '#c9a84c' }}>Their Own AI Healer.</span>
          </h1>
          <p style={{ color: 'rgba(232,223,200,0.45)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 580, margin: '0 auto 2.5rem', fontFamily: '-apple-system, sans-serif' }}>
            AyuraHealth gives your clinic an AI that knows Charaka Samhita, Huangdi Neijing, and 6 other healing traditions — available to your patients 24/7 in 50+ languages.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setShowModal(true)} className="cta-btn">Start Free 30-Day Trial →</button>
            <button onClick={() => setShowModal(true)} className="outline-btn">Book a Demo</button>
          </div>
          <p style={{ color: 'rgba(200,200,200,0.25)', fontSize: '0.78rem', marginTop: '1rem', fontFamily: '-apple-system, sans-serif' }}>No credit card required · Setup in 10 minutes · Cancel anytime</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '5rem' }}>
          {[
            ['8', 'Healing Traditions'],
            ['50+', 'Languages Supported'],
            ['24/7', 'Patient Availability'],
            ['$0', 'Setup Cost'],
          ].map(([n, l], i) => (
            <div key={i} className="feature-card" style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2.8rem', fontWeight: 300, color: '#c9a84c', lineHeight: 1 }}>{n}</div>
              <div style={{ color: 'rgba(200,200,200,0.45)', fontSize: '0.82rem', marginTop: '0.5rem', fontFamily: '-apple-system, sans-serif' }}>{l}</div>
            </div>
          ))}
        </div>

        <div className="divider" />

        {/* Features */}
        <div style={{ marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 300, color: '#e8dfc8', textAlign: 'center', marginBottom: '0.75rem' }}>What Your Patients Get</h2>
          <p style={{ textAlign: 'center', color: 'rgba(232,223,200,0.25)', fontSize: '0.82rem', marginBottom: '2.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Every feature included in every plan</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '1rem' }}>
            {[
              ['🧬', 'Personalized Dosha Assessment', 'AI identifies Vata, Pitta or Kapha constitution and tailors every recommendation to the patient\'s unique body type.'],
              ['📄', 'Blood Report & Lab Analysis', 'Patients upload lab reports — VAIDYA analyzes from both modern medicine and Ayurvedic perspectives simultaneously.'],
              ['🌿', 'Classical Herb & Diet Guidance', 'Specific herbs with dosages from Charaka Samhita. Personalized diet charts based on dosha and season.'],
              ['🧠', 'VAIDYA Deep Mind Mode', 'Powered by advanced 120B parameter AI. For complex conditions — deeper cross-tradition analysis and nuanced guidance.'],
              ['🌍', '50+ Languages', 'Patients consult in their native language — Sanskrit, Hindi, Tamil, Japanese, Arabic, Spanish and 45+ more.'],
              ['🎤', 'Voice Consultations', 'Speak naturally — VAIDYA listens and responds by voice. Perfect for elderly patients or accessibility needs.'],
              ['📱', 'Mobile App — No App Store Needed', 'Installs instantly on iPhone and Android as a PWA. No downloads, no friction for your patients.'],
              ['🔒', 'Private by Default', 'Conversations stored only in the patient\'s browser. No health data stored on servers. GDPR compliant.'],
            ].map(([icon, title, desc], i) => (
              <div key={i} className="feature-card" style={{ display: 'flex', gap: '1.25rem' }}>
                <span style={{ fontSize: '1.75rem', flexShrink: 0, marginTop: '0.1rem' }}>{icon}</span>
                <div>
                  <div style={{ color: '#6abf8a', fontWeight: 500, marginBottom: '0.4rem', fontSize: '0.95rem' }}>{title}</div>
                  <div style={{ color: 'rgba(200,200,200,0.45)', fontSize: '0.85rem', lineHeight: 1.7, fontFamily: '-apple-system, sans-serif' }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* Pricing */}
        <div style={{ marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 300, color: '#e8dfc8', textAlign: 'center', marginBottom: '0.75rem' }}>Simple, Transparent Pricing</h2>
          <p style={{ textAlign: 'center', color: 'rgba(232,223,200,0.25)', fontSize: '0.82rem', marginBottom: '2.5rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Start free · Scale as you grow</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {[
              {
                name: 'Starter',
                price: 'Free',
                period: '30 days',
                desc: 'Perfect to evaluate',
                features: ['Up to 50 patients/month', 'All 8 healing traditions', '50+ languages', 'Voice & text', 'Email support'],
                hi: false,
                cta: 'Start Free Trial',
              },
              {
                name: 'Clinic',
                price: '$99',
                period: '/month',
                desc: 'For growing clinics',
                features: ['Unlimited patients', 'Custom clinic branding', 'Priority AI processing', 'Analytics dashboard', 'WhatsApp integration', 'Priority support'],
                hi: true,
                cta: 'Get Started',
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: '',
                desc: 'For hospital groups',
                features: ['Multi-location setup', 'API access', 'Custom AI training', 'Dedicated manager', 'SLA guarantee', 'White-label option'],
                hi: false,
                cta: 'Contact Sales',
              },
            ].map((p, i) => (
              <div key={i} className={`price-card${p.hi ? ' hi' : ''}`}>
                {p.hi && (
                  <div style={{ color: '#6abf8a', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>✦ Most Popular</div>
                )}
                <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', fontWeight: 400, color: '#c9a84c', marginBottom: '0.25rem' }}>{p.name}</div>
                <div style={{ color: 'rgba(232,223,200,0.3)', fontSize: '0.78rem', marginBottom: '1rem', fontFamily: '-apple-system, sans-serif' }}>{p.desc}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 600, color: '#e8dfc8', fontFamily: '"Cormorant Garamond", serif' }}>{p.price}</span>
                  <span style={{ color: 'rgba(200,200,200,0.35)', fontSize: '0.85rem', fontFamily: '-apple-system, sans-serif' }}>{p.period}</span>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', gap: '0.5rem', color: 'rgba(200,200,200,0.55)', fontSize: '0.83rem', marginBottom: '0.6rem', fontFamily: '-apple-system, sans-serif' }}>
                      <span className="check">✓</span><span>{f}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setShowModal(true)} style={{ display: 'block', width: '100%', padding: '0.8rem', background: p.hi ? 'linear-gradient(135deg, #2d5a1b, #3d7a28)' : 'transparent', border: `1px solid ${p.hi ? 'transparent' : 'rgba(106,191,138,0.25)'}`, borderRadius: 12, color: '#e8dfc8', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500, fontFamily: '-apple-system, sans-serif', transition: 'all 0.2s' }}>
                  {p.cta} →
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* Why AyuraHealth */}
        <div style={{ marginBottom: '5rem' }}>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 300, color: '#e8dfc8', textAlign: 'center', marginBottom: '2.5rem' }}>Why Clinics Choose AyuraHealth</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {[
              ['⏱️', 'Save 2+ hours daily', 'VAIDYA handles routine patient questions — herbs, diet, lifestyle — so practitioners focus on complex cases.'],
              ['🌍', 'Reach global patients', '50+ languages means your clinic serves Indian diaspora in Japan, USA, Middle East in their native tongue.'],
              ['📚', 'Classical knowledge base', 'Every recommendation traces back to Charaka Samhita, Ashtanga Hridayam, and other primary classical texts.'],
              ['💰', 'Revenue without overhead', '$99/month for unlimited patients. No extra staff. No infrastructure. Pure margin.'],
            ].map(([icon, title, desc], i) => (
              <div key={i} className="feature-card">
                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{icon}</div>
                <div style={{ color: '#e8dfc8', fontWeight: 500, marginBottom: '0.4rem', fontSize: '0.95rem' }}>{title}</div>
                <div style={{ color: 'rgba(200,200,200,0.4)', fontSize: '0.83rem', lineHeight: 1.7, fontFamily: '-apple-system, sans-serif' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div style={{ textAlign: 'center', background: 'rgba(45,90,27,0.1)', border: '1px solid rgba(106,191,138,0.15)', borderRadius: 24, padding: '4rem 2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌿</div>
          <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 300, color: '#e8dfc8', marginBottom: '1rem' }}>
            Ready to transform your clinic?
          </h2>
          <p style={{ color: 'rgba(200,200,200,0.4)', marginBottom: '2rem', fontFamily: '-apple-system, sans-serif', fontSize: '0.95rem' }}>
            Email us and we will set up your free trial within 24 hours.
          </p>
          <button onClick={() => setShowModal(true)} className="cta-btn" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
            Request Your Demo →
          </button>
          <p style={{ color: 'rgba(200,200,200,0.2)', fontSize: '0.75rem', marginTop: '1rem', fontFamily: '-apple-system, sans-serif' }}>
            Based in Tokyo · Serving clinics worldwide
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(106,191,138,0.08)', padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['Home', '/'], ['Privacy Policy', '/privacy'], ['Terms of Service', '/terms'], ['Contact', '/contact']].map(([label, href]) => (
            <Link key={href} href={href} style={{ color: 'rgba(232,223,200,0.2)', fontSize: '0.72rem', textDecoration: 'none', fontFamily: '-apple-system, sans-serif' }}>{label}</Link>
          ))}
        </div>
        <p style={{ color: 'rgba(232,223,200,0.1)', fontSize: '0.7rem', marginTop: '0.75rem', fontFamily: '-apple-system, sans-serif' }}>© 2026 AyuraHealth · ayurahealth.com</p>
      </footer>
      {showModal && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: 'rgba(232,223,200,0.5)', cursor: 'pointer', fontSize: '1.2rem' }}>×</button>
            <h3 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.8rem', fontWeight: 600, color: '#c9a84c', marginBottom: '0.5rem' }}>Partner with AyuraHealth</h3>
            <p style={{ color: 'rgba(232,223,200,0.5)', fontSize: '0.9rem', marginBottom: '2rem' }}>Leave your details and our team will get you set up within 24 hours.</p>
            
            {success ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
                <div style={{ color: '#6abf8a', fontSize: '1.2rem', fontWeight: 500, marginBottom: '0.5rem' }}>Application Received</div>
                <p style={{ color: 'rgba(232,223,200,0.5)', fontSize: '0.9rem' }}>Thank you. Our clinic success team will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && <div style={{ background: 'rgba(232,90,90,0.1)', color: '#e85a5a', padding: '0.75rem', borderRadius: 8, fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</div>}
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                  <div>
                    <label className="form-label">Clinic Name *</label>
                    <input required value={formData.clinicName} onChange={e => setFormData(p => ({ ...p, clinicName: e.target.value }))} className="form-input" placeholder="Sanjeevani Ayurveda" />
                  </div>
                  <div>
                    <label className="form-label">Contact Name *</label>
                    <input required value={formData.contactName} onChange={e => setFormData(p => ({ ...p, contactName: e.target.value }))} className="form-input" placeholder="Dr. Sharma" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                  <div>
                    <label className="form-label">Work Email *</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} className="form-input" placeholder="dr@clinic.com" />
                  </div>
                  <div>
                    <label className="form-label">Phone</label>
                    <input type="tel" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} className="form-input" placeholder="+1..." />
                  </div>
                </div>

                <div>
                  <label className="form-label">Primary Tradition / Modality</label>
                  <select value={formData.tradition} onChange={e => setFormData(p => ({ ...p, tradition: e.target.value }))} className="form-input" style={{ width: '100%', appearance: 'none' }}>
                    <option value="">Select one...</option>
                    <option value="Ayurveda">Ayurveda</option>
                    <option value="TCM">Traditional Chinese Medicine</option>
                    <option value="Kampo">Japanese Kampo</option>
                    <option value="Naturopathy">Naturopathy</option>
                    <option value="Integrative">Integrative / Functional Medicine</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <button type="submit" disabled={loading} className="cta-btn" style={{ width: '100%', marginTop: '1rem' }}>
                  {loading ? 'Submitting...' : 'Request Demo'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
