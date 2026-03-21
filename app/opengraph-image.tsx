import { ImageResponse } from 'next/og'
import { readFile } from 'fs/promises'
import { join } from 'path'

export const runtime = 'nodejs'
export const alt = 'AyuraHealth — Ancient Wisdom, Modern AI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const neemData = await readFile(join(process.cwd(), 'public/neem.jpg'))
  const neemBase64 = `data:image/jpeg;base64,${neemData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#05100a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          fontFamily: 'Georgia, serif',
          overflow: 'hidden',
        }}
      >
        {/* Left — neem leaf image */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '480px', display: 'flex', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={neemBase64}
            alt="Neem"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
          />
          {/* Gradient overlay so text is readable */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent 0%, #05100a 85%)', display: 'flex' }} />
        </div>

        {/* Right — text content */}
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '680px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '60px 72px 60px 40px' }}>

          {/* Badge */}
          <div style={{ display: 'flex', marginBottom: '28px', background: 'rgba(106,191,138,0.1)', border: '1px solid rgba(106,191,138,0.25)', borderRadius: '100px', padding: '6px 18px' }}>
            <span style={{ fontSize: '13px', color: 'rgba(106,191,138,0.9)', letterSpacing: '0.1em' }}>AYURVEDA · TCM · 8 TRADITIONS</span>
          </div>

          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <span style={{ fontSize: '72px', fontWeight: 300, lineHeight: 1.0, color: '#e8dfc8' }}>Ancient</span>
            <span style={{ fontSize: '72px', fontWeight: 300, lineHeight: 1.0, color: '#c9a84c' }}>Wisdom.</span>
            <span style={{ fontSize: '72px', fontWeight: 300, lineHeight: 1.0, color: '#6abf8a' }}>Modern AI.</span>
          </div>

          {/* Description */}
          <div style={{ fontSize: '20px', color: 'rgba(232,223,200,0.4)', lineHeight: 1.5, marginBottom: '36px', display: 'flex' }}>
            Natural healing powered by NVIDIA Nemotron
          </div>

          {/* URL pill */}
          <div style={{ background: 'rgba(45,90,27,0.6)', border: '1px solid rgba(106,191,138,0.3)', borderRadius: '100px', padding: '12px 28px', display: 'flex' }}>
            <span style={{ color: '#e8dfc8', fontSize: '18px' }}>ayurahealth.vercel.app</span>
          </div>
        </div>

        {/* Border */}
        <div style={{ position: 'absolute', inset: '16px', border: '1px solid rgba(106,191,138,0.08)', borderRadius: '20px', display: 'flex' }} />
      </div>
    ),
    { ...size }
  )
}
