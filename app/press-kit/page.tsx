'use client'

import Link from 'next/link'
import { ArrowLeft, Download, FileText, Image as ImageIcon, Palette } from 'lucide-react'

export default function PressKitPage() {
  const assets = [
    {
      category: 'Logo & Branding',
      icon: <Palette className="w-6 h-6" />,
      items: [
        { name: 'Logo - Full Color (PNG)', size: '2.4 MB', color: 'bg-emerald-100' },
        { name: 'Logo - White (PNG)', size: '1.8 MB', color: 'bg-slate-100' },
        { name: 'Logo - Dark (PNG)', size: '1.9 MB', color: 'bg-slate-900' },
        { name: 'Brand Guidelines (PDF)', size: '3.2 MB', color: 'bg-blue-100' },
      ],
    },
    {
      category: 'Media & Images',
      icon: <ImageIcon className="w-6 h-6" />,
      items: [
        { name: 'Hero Image - High Res (JPG)', size: '4.5 MB', color: 'bg-amber-100' },
        { name: 'Product Screenshots (ZIP)', size: '12.3 MB', color: 'bg-purple-100' },
        { name: 'Team Photos (ZIP)', size: '8.7 MB', color: 'bg-pink-100' },
        { name: 'Social Media Assets (ZIP)', size: '6.2 MB', color: 'bg-cyan-100' },
      ],
    },
    {
      category: 'Documents',
      icon: <FileText className="w-6 h-6" />,
      items: [
        { name: 'Press Release - Launch (PDF)', size: '0.8 MB', color: 'bg-red-100' },
        { name: 'Company Fact Sheet (PDF)', size: '1.2 MB', color: 'bg-green-100' },
        { name: 'Product Overview (PDF)', size: '2.1 MB', color: 'bg-indigo-100' },
        { name: 'Media Kit (PDF)', size: '3.5 MB', color: 'bg-orange-100' },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
            <span className="text-sm text-slate-600">Back to Home</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Press Kit</h1>
          <div className="w-20" /> {/* Spacer for alignment */}
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Media & Press Resources</h2>
          <p className="text-xl text-slate-600">
            Download everything you need to write about AyuraHealth
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 px-4 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">About AyuraHealth</h3>
          <p className="text-slate-700 mb-4">
            AyuraHealth is a revolutionary AI-powered holistic health companion that combines the wisdom of Ayurveda, Chinese Medicine, Tibetan, Unani, Siddha, Homeopathy, Naturopathy, and Western Medicine. Our mission is to democratize access to personalized health guidance for everyone, everywhere—especially those in low-resource communities.
          </p>
          <p className="text-slate-700 mb-4">
            Powered by advanced AI reasoning and available in 50+ languages, AyuraHealth provides personalized health recommendations, blood report analysis, and customized diet charts—all completely free.
          </p>
          <p className="text-slate-700">
            Founded in 2026, AyuraHealth is committed to bridging ancient wisdom with modern technology to guide humanity back to natural balance.
          </p>
        </div>
      </section>

      {/* Key Facts */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Key Facts</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
              <p className="text-sm text-emerald-600 font-semibold mb-2">MISSION</p>
              <p className="text-slate-900 font-semibold">Democratize holistic health globally</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-sm text-blue-600 font-semibold mb-2">LANGUAGES</p>
              <p className="text-slate-900 font-semibold">50+ languages supported</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <p className="text-sm text-purple-600 font-semibold mb-2">TRADITIONS</p>
              <p className="text-slate-900 font-semibold">8 healing traditions integrated</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <p className="text-sm text-amber-600 font-semibold mb-2">PRICING</p>
              <p className="text-slate-900 font-semibold">Free forever for everyone</p>
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable Assets */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Downloadable Assets</h3>

          {assets.map((section, idx) => (
            <div key={idx} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-emerald-600">{section.icon}</div>
                <h4 className="text-xl font-bold text-slate-900">{section.category}</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {section.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className={`${item.color} rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer`}
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{item.name}</p>
                      <p className="text-sm text-slate-600">{item.size}</p>
                    </div>
                    <Download className="w-5 h-5 text-slate-600" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Media Inquiries?</h3>
          <p className="text-slate-300 mb-6">
            For press inquiries, interviews, or additional information, please contact our media team.
          </p>
          <a href="mailto:press@ayurahealth.com" className="inline-block bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-lg font-semibold transition-colors">
            Contact Press Team
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2026 AyuraHealth. Healing has always been natural.</p>
        </div>
      </footer>
    </div>
  )
}
