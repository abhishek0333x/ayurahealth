'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface Dosha {
  type: 'Vata' | 'Pitta' | 'Kapha'
  emoji: string
  tagline: string
  description: string
  strengths: string
  watch: string
  color: string
  bg: string
  border: string
}

const DOSHAS: Record<string, Dosha> = {
  Vata: {
    type: 'Vata',
    emoji: '🌬️',
    tagline: 'Air & Space — The Creative Force',
    description: 'You are quick-thinking, creative, and full of energy in bursts. Vata types are imaginative and adaptable, but can become anxious, scattered, or exhausted when out of balance.',
    strengths: 'Creative, enthusiastic, quick learner, adaptable',
    watch: 'Anxiety, dry skin, insomnia, irregular digestion',
    color: '#5b7fa6',
    bg: '#eef3f9',
    border: '#b8cfe8',
  },
  Pitta: {
    type: 'Pitta',
    emoji: '🔥',
    tagline: 'Fire & Water — The Driven Achiever',
    description: 'You are sharp, focused, and naturally leadership-oriented. Pitta types are passionate and precise, but can become irritable, overheated, or perfectionistic when imbalanced.',
    strengths: 'Focused, intelligent, courageous, natural leader',
    watch: 'Inflammation, acid reflux, anger, skin sensitivity',
    color: '#b85c2a',
    bg: '#fdf3ee',
    border: '#f0c4a8',
  },
  Kapha: {
    type: 'Kapha',
    emoji: '🌍',
    tagline: 'Earth & Water — The Steady Nurturer',
    description: 'You are calm, loving, and deeply reliable. Kapha types have great endurance and loyalty, but can tend toward sluggishness, weight gain, or resistance to change when imbalanced.',
    strengths: 'Calm, compassionate, strong, loyal, great memory',
    watch: 'Weight gain, congestion, depression, lethargy',
    color: '#3a7a4a',
    bg: '#eef6f1',
    border: '#a8d4b4',
  },
}

const QUESTIONS = [
  {
    id: 1,
    question: 'What best describes your body frame?',
    emoji: '🧍',
    options: [
      { label: 'Thin & light — hard to gain weight', dosha: 'Vata' },
      { label: 'Medium & athletic — gain/lose easily', dosha: 'Pitta' },
      { label: 'Large & solid — gain weight easily', dosha: 'Kapha' },
    ],
  },
  {
    id: 2,
    question: 'How is your digestion usually?',
    emoji: '🌿',
    options: [
      { label: 'Irregular — sometimes constipated or gassy', dosha: 'Vata' },
      { label: 'Strong & sharp — get very hungry, irritable if I skip meals', dosha: 'Pitta' },
      { label: 'Slow & steady — rarely hungry, feel heavy after eating', dosha: 'Kapha' },
    ],
  },
  {
    id: 3,
    question: 'How do you typically sleep?',
    emoji: '🌙',
    options: [
      { label: 'Light sleeper — wake easily, vivid dreams', dosha: 'Vata' },
      { label: 'Moderate — intense dreams, wake feeling warm', dosha: 'Pitta' },
      { label: 'Deep & long — hard to wake up, love sleeping', dosha: 'Kapha' },
    ],
  },
  {
    id: 4,
    question: 'When stressed, you tend to become…',
    emoji: '🧠',
    options: [
      { label: 'Anxious, worried, or overwhelmed', dosha: 'Vata' },
      { label: 'Irritable, intense, or critical', dosha: 'Pitta' },
      { label: 'Withdrawn, stubborn, or unmotivated', dosha: 'Kapha' },
    ],
  },
  {
    id: 5,
    question: 'What best describes your skin?',
    emoji: '✨',
    options: [
      { label: 'Dry, rough, or cool to touch', dosha: 'Vata' },
      { label: 'Warm, sensitive, or prone to redness', dosha: 'Pitta' },
      { label: 'Thick, oily, or soft and moist', dosha: 'Kapha' },
    ],
  },
]

const MEDICINE_SYSTEMS = [
  { id: 'ayurveda', label: '🌿 Ayurveda' },
  { id: 'tcm', label: '☯️ Chinese Medicine' },
  { id: 'western', label: '💊 Western' },
  { id: 'homeopathy', label: '💧 Homeopathy' },
  { id: 'naturopathy', label: '🌱 Naturopathy' },
  { id: 'unani', label: '🌙 Unani' },
  { id: 'siddha', label: '✨ Siddha' },
  { id: 'tibetan', label: '🏔️ Tibetan' },
]

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1.05rem;font-weight:700;margin:0.8rem 0 0.3rem;color:#2d5a1b">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.15rem;font-weight:700;margin:0.8rem 0 0.3rem;color:#2d5a1b">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-size:1.25rem;font-weight:700;margin:0.8rem 0 0.3rem;color:#2d5a1b">$1</h1>')
    .replace(/^- (.+)$/gm, '<li style="margin-left:1.2rem;list-style:disc;margin-bottom:2px">$1</li>')
    .replace(/\n/g, '<br/>')
}

type Screen = 'landing' | 'quiz' | 'result' | 'chat'

export default function Home() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [dosha, setDosha] = useState<Dosha | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streaming, setStreaming] = useState('')
  const [selectedSystems, setSelectedSystems] = useState<string[]>(['ayurveda', 'tcm', 'western'])
  const [incognito, setIncognito] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const bg = incognito ? '#0a0a0a' : '#faf8f2'
  const headerBg = incognito ? '#111' : '#2d5a1b'
  const textPrimary = incognito ? '#e0d5c0' : '#2a3a1a'
  const textMuted = incognito ? '#888' : '#6b7a5a'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  useEffect(() => {
    if (screen === 'result') {
      setTimeout(() => setRevealed(true), 300)
    } else {
      setRevealed(false)
    }
  }, [screen])

  const calcDosha = (ans: string[]) => {
    const counts: Record<string, number> = { Vata: 0, Pitta: 0, Kapha: 0 }
    ans.forEach(a => { counts[a] = (counts[a] || 0) + 1 })
    const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
    return DOSHAS[winner]
  }

  const handleAnswer = (doshaVote: string) => {
    const newAnswers = [...answers, doshaVote]
    setAnswers(newAnswers)
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      const result = calcDosha(newAnswers)
      setDosha(result)
      setScreen('result')
    }
  }

  const startChat = () => {
    setScreen('chat')
    const greeting: Message = {
      role: 'assistant',
      content: dosha
        ? `Namaste! 🙏 Based on your quiz, you have a **${dosha.type}** constitution — ${dosha.tagline}.\n\n${dosha.description}\n\nI'll personalize all my recommendations to balance your ${dosha.type} dosha. What health topic would you like to explore today?`
        : `Namaste! 🙏 Welcome to AyuraHealth. I'm your holistic health companion drawing from 8 healing traditions. What health topic would you like to explore today?`,
    }
    setMessages([greeting])
  }

  const toggleSystem = (id: string) => {
    setSelectedSystems(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  const sendMessage = async (text?: string) => {
    const content = text || input.trim()
    if (!content || loading) return
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'

    const newMessages: Message[] = [...messages, { role: 'user', content }]
    setMessages(newMessages)
    setLoading(true)
    setStreaming('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          systems: selectedSystems,
          incognito,
          dosha: dosha?.type || null,
        }),
      })

      if (!res.ok) throw new Error('API error')
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let full = ''

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6))
                if (data.content) {
                  full += data.content
                  setStreaming(full)
                }
              } catch {}
            }
          }
        }
      }
      setMessages(prev => [...prev, { role: 'assistant', content: full }])
      setStreaming('')
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
      setStreaming('')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
  }

  return (
    <main style={{ minHeight: '100vh', background: bg, fontFamily: 'Georgia, serif' }}>

      {/* Header */}
      <header style={{
        background: headerBg,
        padding: '0.75rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}>
        <div onClick={() => setScreen('landing')} style={{ cursor: 'pointer' }}>
          <h1 style={{ color: '#f0e6c8', fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>🌿 AyuraHealth</h1>
          <p style={{ color: '#a8c5a0', fontSize: '0.7rem', margin: 0 }}>AI Holistic Health Companion</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          {dosha && screen === 'chat' && (
            <span style={{
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              borderRadius: 20,
              padding: '0.25rem 0.7rem',
              color: '#f0e6c8',
              fontSize: '0.75rem',
            }}>
              {dosha.emoji} {dosha.type}
            </span>
          )}
          <button
            onClick={() => setIncognito(!incognito)}
            style={{
              background: incognito ? '#333' : 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 20,
              padding: '0.35rem 0.75rem',
              color: '#f0e6c8',
              fontSize: '0.75rem',
              cursor: 'pointer',
            }}
          >
            {incognito ? '🔒 Incognito' : '👁️ Private'}
          </button>
        </div>
      </header>

      {/* ── LANDING ── */}
      {screen === 'landing' && (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem 1.25rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🌿</div>
            <h2 style={{ color: incognito ? '#e0d5c0' : '#2d5a1b', fontSize: '1.9rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Ancient Wisdom, Modern AI
            </h2>
            <p style={{ color: textMuted, fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Personalized health guidance from 8 healing traditions — Ayurveda, Chinese Medicine, Homeopathy, and more.
            </p>
          </div>

          {/* Quiz CTA */}
          <div style={{
            background: incognito ? '#111' : '#fff',
            border: `1.5px solid ${incognito ? '#333' : '#c8dfc8'}`,
            borderRadius: 16,
            padding: '1.5rem',
            marginBottom: '1rem',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🧬</div>
            <h3 style={{ color: incognito ? '#e0d5c0' : '#2d5a1b', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Discover Your Dosha
            </h3>
            <p style={{ color: textMuted, fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
              Take our 5-question quiz to find your Ayurvedic constitution. The AI will then personalize every recommendation just for you.
            </p>
            <button
              onClick={() => { setCurrentQ(0); setAnswers([]); setScreen('quiz') }}
              style={{
                width: '100%',
                padding: '0.85rem',
                background: '#2d5a1b',
                color: '#f0e6c8',
                border: 'none',
                borderRadius: 12,
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Take the Dosha Quiz →
            </button>
          </div>

          <button
            onClick={() => { setDosha(null); startChat() }}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'transparent',
              color: textMuted,
              border: `1px solid ${incognito ? '#333' : '#ddd'}`,
              borderRadius: 12,
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            Skip quiz — go straight to chat
          </button>

          <p style={{ textAlign: 'center', color: '#999', fontSize: '0.7rem', marginTop: '1.5rem', lineHeight: 1.5 }}>
            ⚠️ For educational purposes only. Not a substitute for professional medical advice.
          </p>
        </div>
      )}

      {/* ── QUIZ ── */}
      {screen === 'quiz' && (
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1.25rem' }}>

          {/* Progress bar */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ color: textMuted, fontSize: '0.8rem' }}>Question {currentQ + 1} of {QUESTIONS.length}</span>
              <span style={{ color: textMuted, fontSize: '0.8rem' }}>{Math.round(((currentQ) / QUESTIONS.length) * 100)}%</span>
            </div>
            <div style={{ height: 6, background: incognito ? '#222' : '#e0ddd0', borderRadius: 3 }}>
              <div style={{
                height: 6,
                background: '#2d5a1b',
                borderRadius: 3,
                width: `${(currentQ / QUESTIONS.length) * 100}%`,
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>

          {/* Question */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{QUESTIONS[currentQ].emoji}</div>
            <h2 style={{ color: incognito ? '#e0d5c0' : '#2d5a1b', fontSize: '1.3rem', fontWeight: 700, lineHeight: 1.4 }}>
              {QUESTIONS[currentQ].question}
            </h2>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {QUESTIONS[currentQ].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.dosha)}
                style={{
                  padding: '1rem 1.25rem',
                  background: incognito ? '#111' : '#fff',
                  border: `1.5px solid ${incognito ? '#333' : '#c8dfc8'}`,
                  borderRadius: 14,
                  color: textPrimary,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  lineHeight: 1.5,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => {
                  (e.target as HTMLElement).style.borderColor = '#2d5a1b'
                  ;(e.target as HTMLElement).style.background = incognito ? '#1a3a1a' : '#f0f9ec'
                }}
                onMouseLeave={e => {
                  (e.target as HTMLElement).style.borderColor = incognito ? '#333' : '#c8dfc8'
                  ;(e.target as HTMLElement).style.background = incognito ? '#111' : '#fff'
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {currentQ > 0 && (
            <button
              onClick={() => { setCurrentQ(currentQ - 1); setAnswers(answers.slice(0, -1)) }}
              style={{ marginTop: '1rem', background: 'none', border: 'none', color: textMuted, fontSize: '0.85rem', cursor: 'pointer' }}
            >
              ← Back
            </button>
          )}
        </div>
      )}

      {/* ── RESULT ── */}
      {screen === 'result' && dosha && (
        <div style={{ maxWidth: 560, margin: '0 auto', padding: '2rem 1.25rem' }}>
          <div style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s ease',
          }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>{dosha.emoji}</div>
              <p style={{ color: textMuted, fontSize: '0.9rem', marginBottom: '0.3rem' }}>Your Ayurvedic constitution is</p>
              <h2 style={{ color: dosha.color, fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>{dosha.type}</h2>
              <p style={{ color: textMuted, fontSize: '0.95rem', fontStyle: 'italic', marginTop: '0.3rem' }}>{dosha.tagline}</p>
            </div>

            {/* Result card */}
            <div style={{
              background: incognito ? '#111' : dosha.bg,
              border: `1.5px solid ${incognito ? '#333' : dosha.border}`,
              borderRadius: 16,
              padding: '1.5rem',
              marginBottom: '1rem',
            }}>
              <p style={{ color: textPrimary, fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                {dosha.description}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <p style={{ color: dosha.color, fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Strengths</p>
                  <p style={{ color: textPrimary, fontSize: '0.85rem', lineHeight: 1.5 }}>{dosha.strengths}</p>
                </div>
                <div>
                  <p style={{ color: dosha.color, fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Watch for</p>
                  <p style={{ color: textPrimary, fontSize: '0.85rem', lineHeight: 1.5 }}>{dosha.watch}</p>
                </div>
              </div>
            </div>

            <button
              onClick={startChat}
              style={{
                width: '100%',
                padding: '0.9rem',
                background: dosha.color,
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                marginBottom: '0.75rem',
              }}
            >
              Start My Personalized Consultation →
            </button>

            <button
              onClick={() => { setCurrentQ(0); setAnswers([]); setScreen('quiz') }}
              style={{
                width: '100%',
                padding: '0.7rem',
                background: 'transparent',
                color: textMuted,
                border: `1px solid ${incognito ? '#333' : '#ddd'}`,
                borderRadius: 12,
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              Retake quiz
            </button>

            <p style={{ textAlign: 'center', color: '#999', fontSize: '0.7rem', marginTop: '1rem', lineHeight: 1.5 }}>
              Share your result: <strong style={{ color: textMuted }}>ayurahealth.vercel.app</strong>
            </p>
          </div>
        </div>
      )}

      {/* ── CHAT ── */}
      {screen === 'chat' && (
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 56px)' }}>

          {/* System pills */}
          <div style={{
            padding: '0.5rem 1rem',
            display: 'flex',
            gap: '0.4rem',
            flexWrap: 'wrap',
            borderBottom: `1px solid ${incognito ? '#222' : '#e0ddd0'}`,
            background: incognito ? '#0d0d0d' : '#f5f3ec',
          }}>
            {MEDICINE_SYSTEMS.map(sys => (
              <button
                key={sys.id}
                onClick={() => toggleSystem(sys.id)}
                style={{
                  padding: '0.25rem 0.6rem',
                  borderRadius: 20,
                  border: selectedSystems.includes(sys.id) ? '1.5px solid #2d5a1b' : '1px solid #ccc',
                  background: selectedSystems.includes(sys.id) ? (incognito ? '#1a3a1a' : '#e8f5e2') : 'transparent',
                  color: selectedSystems.includes(sys.id) ? (incognito ? '#7fc87f' : '#2d5a1b') : (incognito ? '#666' : '#999'),
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                }}
              >
                {sys.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1rem 0' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: '1rem', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '0.75rem 1rem',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user'
                    ? (incognito ? '#1a3a1a' : '#2d5a1b')
                    : (incognito ? '#1a1a1a' : '#ffffff'),
                  color: msg.role === 'user' ? '#f0e6c8' : textPrimary,
                  border: msg.role === 'assistant' ? `1px solid ${incognito ? '#333' : '#e0ddd0'}` : 'none',
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                }}>
                  {msg.role === 'assistant'
                    ? <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                    : msg.content}
                </div>
              </div>
            ))}

            {streaming && (
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '0.75rem 1rem',
                  borderRadius: '18px 18px 18px 4px',
                  background: incognito ? '#1a1a1a' : '#ffffff',
                  color: textPrimary,
                  border: `1px solid ${incognito ? '#333' : '#e0ddd0'}`,
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                }}>
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(streaming) }} />
                  <span style={{ opacity: 0.4 }}>▋</span>
                </div>
              </div>
            )}

            {loading && !streaming && (
              <div style={{ display: 'flex', gap: '0.3rem', padding: '0.5rem 0.25rem' }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: incognito ? '#4a7a4a' : '#2d5a1b',
                    animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div style={{
            position: 'sticky',
            bottom: 0,
            padding: '0.75rem 1rem',
            background: incognito ? '#111' : '#faf8f2',
            borderTop: `1px solid ${incognito ? '#222' : '#e0ddd0'}`,
          }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder={dosha ? `Ask about your ${dosha.type} health...` : 'Ask about your health...'}
                rows={1}
                style={{
                  flex: 1,
                  padding: '0.7rem 1rem',
                  borderRadius: 24,
                  border: `1.5px solid ${incognito ? '#333' : '#c8dfc8'}`,
                  background: incognito ? '#1a1a1a' : '#fff',
                  color: textPrimary,
                  fontSize: '0.9rem',
                  resize: 'none',
                  outline: 'none',
                  lineHeight: 1.5,
                  maxHeight: 160,
                  overflowY: 'auto',
                  fontFamily: 'Georgia, serif',
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                style={{
                  width: 44, height: 44,
                  borderRadius: '50%',
                  background: loading || !input.trim() ? '#ccc' : '#2d5a1b',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.1rem',
                  cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >↑</button>
            </div>
            <p style={{ textAlign: 'center', color: '#999', fontSize: '0.65rem', marginTop: '0.3rem' }}>
              Educational only — not medical advice
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
        }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </main>
  )
}
