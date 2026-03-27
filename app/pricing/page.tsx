'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const PRICING_TIERS = [
  {
    name: 'Free',
    price: 0,
    period: 'Forever',
    description: 'Perfect for exploring ancient wisdom',
    features: [
      'Dosha Quiz (5-minute assessment)',
      'Basic Health Guidance',
      'Blood Report Analysis (basic)',
      'Diet Chart Generation',
      '50+ Language Support',
      'Private by Default',
      'No Account Required',
      'Ad-Free Experience',
    ],
    cta: 'Start Free',
    ctaHref: '/chat',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: 4.99,
    period: 'month',
    description: 'For serious health tracking',
    features: [
      'Everything in Free +',
      'Advanced Blood Analysis',
      'Personalized Weekly Meal Plans',
      'Health Progress Tracking',
      'Consultation History',
      'Export Reports (PDF)',
      'Priority Support',
      'Offline Access',
    ],
    cta: 'Start 7-Day Free Trial',
    ctaHref: '/pricing/checkout?tier=premium',
    highlighted: true,
  },
  {
    name: 'Premium Plus',
    price: 9.99,
    period: 'month',
    description: 'For comprehensive wellness',
    features: [
      'Everything in Premium +',
      'Unlimited AI Consultations',
      'Monthly Doctor Consultations',
      'Personalized Supplement Plans',
      'Wearable Device Integration',
      'Advanced Health Analytics',
      'Priority Customer Support',
      'Custom Meal Plans (Unlimited)',
    ],
    cta: 'Start 7-Day Free Trial',
    ctaHref: '/pricing/checkout?tier=premium-plus',
    highlighted: false,
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const getPrice = (monthlyPrice: number) => {
    if (monthlyPrice === 0) return '$0'
    if (billingCycle === 'annual') {
      const annualPrice = monthlyPrice * 12 * 0.8 // 20% discount for annual
      return `$${annualPrice.toFixed(2)}`
    }
    return `$${monthlyPrice.toFixed(2)}`
  }

  const getPeriod = (monthlyPrice: number) => {
    if (monthlyPrice === 0) return 'Forever'
    if (billingCycle === 'annual') return '/year'
    return '/month'
  }

  return (
    <main style={{ background: '#05100a', minHeight: '100vh', color: '#e8dfc8', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #05100a; }
        .pricing-header { font-family: 'Cormorant Garamond', Georgia, serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 300; line-height: 1.1; letter-spacing: -0.02em; background: linear-gradient(160deg, #e8dfc8 0%, #c9a84c 50%, #6abf8a 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .pricing-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(106,191,138,0.1); border-radius: 16px; padding: 2rem; transition: all 0.3s; }
        .pricing-card.highlighted { background: rgba(106,191,138,0.08); border-color: rgba(106,191,138,0.3); transform: scale(1.05); }
        .pricing-card:hover { background: rgba(106,191,138,0.05); border-color: rgba(106,191,138,0.25); }
        .btn-primary { display: inline-block; background: linear-gradient(135deg, #2d5a1b, #3d7a28); color: #e8dfc8; padding: 1rem 2.4rem; border-radius: 980px; font-size: 1rem; font-weight: 600; text-decoration: none; transition: all 0.25s; box-shadow: 0 4px 24px rgba(45,90,27,0.4); border: none; cursor: pointer; width: 100%; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(45,90,27,0.55); }
        .billing-toggle { display: flex; gap: 1rem; align-items: center; justify-content: center; margin: 2rem 0; }
        .toggle-btn { background: rgba(255,255,255,0.04); border: 1px solid rgba(106,191,138,0.2); color: rgba(232,223,200,0.75); padding: 0.5rem 1.2rem; border-radius: 980px; cursor: pointer; transition: all 0.2s; font-size: 0.9rem; }
        .toggle-btn.active { background: rgba(106,191,138,0.15); border-color: rgba(106,191,138,0.5); color: #e8dfc8; }
        .feature-list { list-style: none; margin: 2rem 0; }
        .feature-list li { padding: 0.75rem 0; color: rgba(232,223,200,0.75); display: flex; align-items: center; gap: 0.75rem; font-size: 0.95rem; }
        .feature-list li:before { content: '✓'; color: #6abf8a; font-weight: bold; font-size: 1.1rem; }
        .price-display { font-family: 'Cormorant Garamond', serif; font-size: 3rem; font-weight: 300; color: #e8dfc8; margin: 1rem 0; }
        .price-period { color: rgba(232,223,200,0.5); font-size: 0.9rem; }
        .savings-badge { background: rgba(106,191,138,0.15); border: 1px solid rgba(106,191,138,0.3); color: #6abf8a; padding: 0.5rem 1rem; border-radius: 980px; font-size: 0.8rem; display: inline-block; margin-top: 1rem; }
        @media (max-width: 768px) { .pricing-card.highlighted { transform: scale(1); } }
      `}</style>

      {/* Navigation */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(5,16,10,0.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(106,191,138,0.15)', transition: 'all 0.35s' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663443572913/nQYKCbsnkVANj8fjMcN4AQ/ayurahealth-logo-modern-ai-ancient-Masdabix7xfaPSuHh7ULd8.webp" alt="AyuraHealth" style={{ height: 48, width: 48, borderRadius: '8px' }} />
          <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.35rem', fontWeight: 600, color: '#e8dfc8', letterSpacing: '0.02em' }}>AyuraHealth</span>
        </Link>
        <Link href="/" style={{ color: 'rgba(232,223,200,0.75)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#e8dfc8'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(232,223,200,0.75)'}>← Back to Home</Link>
      </nav>

      {/* Header Section */}
      <section style={{ minHeight: '30vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '7rem 2rem 4rem', position: 'relative' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="pricing-header" style={{ marginBottom: '1rem' }}>Simple, Transparent Pricing</h1>
          <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: 'rgba(232,223,200,0.65)', maxWidth: 600, lineHeight: 1.7, marginBottom: '2rem' }}>
            Choose the plan that fits your wellness journey. All plans include our core features.
          </p>

          {/* Billing Toggle */}
          <div className="billing-toggle">
            <button
              className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`toggle-btn ${billingCycle === 'annual' ? 'active' : ''}`}
              onClick={() => setBillingCycle('annual')}
            >
              Annual
              <span style={{ marginLeft: '0.5rem', color: '#6abf8a', fontSize: '0.8rem' }}>Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section style={{ padding: '4rem 2rem', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
          {PRICING_TIERS.map((tier) => (
            <div key={tier.name} className={`pricing-card ${tier.highlighted ? 'highlighted' : ''}`}>
              {tier.highlighted && (
                <div style={{ background: 'rgba(106,191,138,0.15)', border: '1px solid rgba(106,191,138,0.3)', color: '#6abf8a', padding: '0.5rem 1rem', borderRadius: '980px', fontSize: '0.75rem', display: 'inline-block', marginBottom: '1rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Most Popular
                </div>
              )}

              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#e8dfc8', marginBottom: '0.5rem' }}>{tier.name}</h3>
              <p style={{ color: 'rgba(232,223,200,0.5)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{tier.description}</p>

              {tier.price === 0 ? (
                <div style={{ marginBottom: '2rem' }}>
                  <div className="price-display">Free</div>
                  <p className="price-period">Forever</p>
                </div>
              ) : (
                <div style={{ marginBottom: '2rem' }}>
                  <div className="price-display">{getPrice(tier.price)}</div>
                  <p className="price-period">{getPeriod(tier.price)}</p>
                  {billingCycle === 'annual' && (
                    <div className="savings-badge">Save ${((tier.price * 12 * 0.2).toFixed(2))}/year</div>
                  )}
                </div>
              )}

              <button
                className="btn-primary"
                onClick={() => window.location.href = tier.ctaHref}
                style={{ marginBottom: '2rem' }}
              >
                {tier.cta}
              </button>

              <ul className="feature-list">
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '5rem 2rem', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <h2 className="pricing-header" style={{ marginBottom: '3rem' }}>Frequently Asked Questions</h2>

        <div style={{ display: 'grid', gap: '2rem', textAlign: 'left' }}>
          {[
            {
              q: 'Can I switch plans anytime?',
              a: 'Yes! You can upgrade, downgrade, or cancel your subscription anytime. Changes take effect at the end of your billing cycle.',
            },
            {
              q: 'Is there a free trial?',
              a: 'Yes! Premium and Premium Plus plans include a 7-day free trial. No credit card required to start.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards, debit cards, and local payment methods (UPI, NetBanking for India).',
            },
            {
              q: 'Is my data private?',
              a: 'Absolutely. Your health data stays private. We never sell your data. Free tier conversations stay in your browser only.',
            },
            {
              q: 'Do you offer refunds?',
              a: 'Yes, we offer a 30-day money-back guarantee if you\'re not satisfied with your subscription.',
            },
            {
              q: 'What if I have more questions?',
              a: 'Contact our support team at support@ayurahealth.com or visit our help center.',
            },
          ].map((faq, idx) => (
            <div key={idx}>
              <h3 style={{ color: '#e8dfc8', marginBottom: '0.75rem', fontSize: '1.1rem' }}>{faq.q}</h3>
              <p style={{ color: 'rgba(232,223,200,0.65)', lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '5rem 2rem', textAlign: 'center', borderTop: '1px solid rgba(106,191,138,0.1)' }}>
        <h2 className="pricing-header" style={{ marginBottom: '1.5rem' }}>Ready to Transform Your Health?</h2>
        <p style={{ fontSize: '1.1rem', color: 'rgba(232,223,200,0.65)', marginBottom: '2rem', maxWidth: 600, margin: '0 auto 2rem' }}>
          Start your wellness journey today. Free forever, or upgrade anytime for advanced features.
        </p>
        <Link href="/chat" className="btn-primary" style={{ maxWidth: 300, margin: '0 auto' }}>
          Start Your Free Assessment →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem 2rem', borderTop: '1px solid rgba(106,191,138,0.1)', textAlign: 'center', color: 'rgba(232,223,200,0.3)', fontSize: '0.85rem' }}>
        <p style={{ marginBottom: '1rem' }}>© 2026 AyuraHealth. All rights reserved.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <Link href="/privacy" style={{ color: 'rgba(232,223,200,0.5)', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/terms" style={{ color: 'rgba(232,223,200,0.5)', textDecoration: 'none' }}>Terms of Service</Link>
          <Link href="/contact" style={{ color: 'rgba(232,223,200,0.5)', textDecoration: 'none' }}>Contact</Link>
        </div>
      </footer>
    </main>
  )
}
