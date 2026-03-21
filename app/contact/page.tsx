'use client'
import Link from 'next/link'
import { useState } from 'react'
import type { Metadata } from 'next'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailto = `mailto:hello@ayurahealth.com?subject=${encodeURIComponent(form.subject === 'clinic' ? 'Clinic Partnership Inquiry' : form.subject === 'support' ? 'Support Request' : 'General Inquiry')} — ${encodeURIComponent(form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    window.location.href = mailto
    setSent(true)
  }

  return (
    <main style={{ background: '#05100a', minHeight: '100vh', color: '#e8dfc8', fontFamily: '"DM Sans", -apple-system, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input, textarea, select { background: rgba(255,255,255,0.04); border: 1px solid rgba(106,191,138,0.15); color: #e8dfc8; border-radius: 10px; padding: 0.75rem 1rem; font-size: 0.9rem; font-family: -apple-system, sans-serif; width: 100%; outline: none; transition: border-color 0.2s; }
        input:focus, textarea:focus, select:focus { border-color: rgba(106,191,138,0.4); }
        input::placeholder, textarea::placeholder { color: rgba(232,223,200,0.25); }
        select option { background: #0d1f0d; }
        label { display: block; font-size: 0.78rem; color: rgba(232,223,200,0.4); margin-bottom: 0.4rem; letter-spacing: 0.06em; text-transform: uppercase; }
      `}</style>
      <nav style={{ background: 'rgba(5,16,10,0.95)', borderBottom: '1px solid rgba(106,191,138,0.1)', padding: '0 2rem', height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(20px)' }}>
        <Link href="/" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.1rem', fontWeight: 600, color: '#c9a84c', textDecoration: 'none' }}>🌿 AyuraHealth</Link>
        <Link href="/chat" style={{ fontSize: '0.8rem', color: 'rgba(106,191,138,0.7)', textDecoration: 'none', border: '1px solid rgba(106,191,138,0.2)', padding: '0.3rem 0.8rem', borderRadius: 20 }}>Open App →</Link>
      </nav>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '4rem 1.5rem' }}>
        <h1 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 300, color: '#c9a84c', marginBottom: '0.5rem' }}>Contact Us</h1>
        <p style={{ color: 'rgba(232,223,200,0.35)', fontSize: '0.9rem', marginBottom: '3rem', lineHeight: 1.7 }}>
          We typically respond within 24 hours. For clinic partnerships, medical questions, or general inquiries.
        </p>

        {/* Contact cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '3rem' }}>
          {[
            { icon: '🌿', label: 'General', email: 'hello@ayurahealth.com', desc: 'Questions & feedback' },
            { icon: '🏥', label: 'Clinics', email: 'clinics@ayurahealth.com', desc: 'Partnerships & trials' },
            { icon: '🔒', label: 'Privacy', email: 'privacy@ayurahealth.com', desc: 'Data & GDPR requests' },
          ].map((c, i) => (
            <a key={i} href={`mailto:${c.email}`} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(106,191,138,0.08)', borderRadius: 14, padding: '1.25rem', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(106,191,138,0.25)'; (e.currentTarget as HTMLElement).style.background = 'rgba(106,191,138,0.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(106,191,138,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)' }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <div style={{ color: '#e8dfc8', fontSize: '0.88rem', fontWeight: 500, marginBottom: '0.2rem' }}>{c.label}</div>
              <div style={{ color: 'rgba(232,223,200,0.3)', fontSize: '0.72rem' }}>{c.desc}</div>
              <div style={{ color: '#6abf8a', fontSize: '0.72rem', marginTop: '0.4rem' }}>{c.email}</div>
            </a>
          ))}
        </div>

        {/* Form */}
        {!sent ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label>Your Name</label>
                <input required placeholder="Abhishek" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <label>Email Address</label>
                <input required type="email" placeholder="hello@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
            </div>
            <div>
              <label>Subject</label>
              <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}>
                <option value="general">General Inquiry</option>
                <option value="clinic">Clinic Partnership</option>
                <option value="support">Technical Support</option>
                <option value="privacy">Privacy / Data Request</option>
                <option value="feedback">Product Feedback</option>
                <option value="press">Press / Media</option>
              </select>
            </div>
            <div>
              <label>Message</label>
              <textarea required rows={5} placeholder="Tell us how we can help..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
            </div>
            <button type="submit" style={{ background: 'linear-gradient(135deg, #2d5a1b, #3d7a28)', color: '#e8dfc8', border: 'none', borderRadius: 10, padding: '0.85rem 2rem', fontSize: '0.9rem', fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start', fontFamily: '-apple-system, sans-serif' }}>
              Send Message →
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', background: 'rgba(106,191,138,0.05)', border: '1px solid rgba(106,191,138,0.15)', borderRadius: 16 }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌿</div>
            <h2 style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.5rem', color: '#c9a84c', marginBottom: '0.5rem' }}>Message Sent</h2>
            <p style={{ color: 'rgba(232,223,200,0.4)', fontSize: '0.88rem' }}>We will respond within 24 hours. Thank you for reaching out.</p>
            <Link href="/" style={{ display: 'inline-block', marginTop: '1.5rem', color: '#6abf8a', fontSize: '0.85rem', textDecoration: 'none' }}>← Back to home</Link>
          </div>
        )}
      </div>

      <footer style={{ borderTop: '1px solid rgba(106,191,138,0.08)', padding: '2rem', textAlign: 'center', marginTop: '4rem' }}>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['Home', '/'], ['Privacy Policy', '/privacy'], ['Terms of Service', '/terms'], ['For Clinics', '/clinic']].map(([label, href]) => (
            <Link key={href} href={href} style={{ color: 'rgba(232,223,200,0.2)', fontSize: '0.72rem', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
      </footer>
    </main>
  )
}
