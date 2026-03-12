'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

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

const SAMPLE_QUESTIONS = [
  'What herbs help with stress and anxiety?',
  'How can I improve my digestion naturally?',
  'What does Ayurveda say about sleep?',
  'Natural remedies for headaches?',
]

function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1.1rem;font-weight:700;margin:1rem 0 0.4rem;color:#2d5a1b">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.2rem;font-weight:700;margin:1rem 0 0.4rem;color:#2d5a1b">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="font-size:1.3rem;font-weight:700;margin:1rem 0 0.4rem;color:#2d5a1b">$1</h1>')
    .replace(/^- (.+)$/gm, '<li style="margin-left:1.2rem;list-style:disc">$1</li>')
    .replace(/\n/g, '<br/>')
}

export default function Home() {
  const [started, setStarted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedSystems, setSelectedSystems] = useState<string[]>(['ayurveda', 'tcm', 'western'])
  const [incognito, setIncognito] = useState(false)
  const [streaming, setStreaming] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

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
        body: JSON.stringify({ messages: newMessages, systems: selectedSystems, incognito }),
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
    } catch (err) {
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
    <main style={{ minHeight: '100vh', background: incognito ? '#0a0a0a' : '#faf8f2', fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <header style={{
        background: incognito ? '#111' : '#2d5a1b',
        padding: '0.75rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
      }}>
        <div>
          <h1 style={{ color: '#f0e6c8', fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>🌿 AyuraHealth</h1>
          <p style={{ color: '#a8c5a0', fontSize: '0.7rem', margin: 0 }}>AI Holistic Health Companion</p>
        </div>
        <button
          onClick={() => setIncognito(!incognito)}
          style={{
            background: incognito ? '#333' : 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: 20,
            padding: '0.35rem 0.75rem',
            color: '#f0e6c8',
            fontSize: '0.75rem',
            cursor: 'pointer'
          }}
        >
          {incognito ? '🔒 Incognito' : '👁️ Private'}
        </button>
      </header>

      {!started ? (
        /* Landing */
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '2rem 1.25rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>🌿</div>
            <h2 style={{ color: incognito ? '#e0d5c0' : '#2d5a1b', fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Ancient Wisdom, Modern AI
            </h2>
            <p style={{ color: incognito ? '#aaa' : '#5a7a4a', fontSize: '1rem', lineHeight: 1.6 }}>
              Explore health insights from 8 healing traditions — Ayurveda, Chinese Medicine, Homeopathy, and more.
            </p>
          </div>

          {/* Medicine Systems */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: incognito ? '#aaa' : '#5a4a2a', fontSize: '0.85rem', marginBottom: '0.6rem', textAlign: 'center' }}>
              Choose your healing traditions:
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
              {MEDICINE_SYSTEMS.map(sys => (
                <button
                  key={sys.id}
                  onClick={() => toggleSystem(sys.id)}
                  style={{
                    padding: '0.4rem 0.9rem',
                    borderRadius: 20,
                    border: selectedSystems.includes(sys.id) ? '2px solid #2d5a1b' : '1px solid #ccc',
                    background: selectedSystems.includes(sys.id) ? (incognito ? '#1a3a1a' : '#e8f5e2') : (incognito ? '#1a1a1a' : '#fff'),
                    color: selectedSystems.includes(sys.id) ? (incognito ? '#7fc87f' : '#2d5a1b') : (incognito ? '#888' : '#666'),
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    fontWeight: selectedSystems.includes(sys.id) ? 600 : 400,
                  }}
                >
                  {sys.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sample Questions */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ color: incognito ? '#aaa' : '#5a4a2a', fontSize: '0.85rem', marginBottom: '0.6rem', textAlign: 'center' }}>
              Try asking:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {SAMPLE_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => { setStarted(true); sendMessage(q) }}
                  style={{
                    padding: '0.7rem',
                    borderRadius: 10,
                    border: '1px solid',
                    borderColor: incognito ? '#333' : '#c8dfc8',
                    background: incognito ? '#111' : '#f5faf3',
                    color: incognito ? '#ccc' : '#3a5a2a',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    lineHeight: 1.4,
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStarted(true)}
            style={{
              width: '100%',
              padding: '0.9rem',
              background: '#2d5a1b',
              color: '#f0e6c8',
              border: 'none',
              borderRadius: 12,
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.02em'
            }}
          >
            Start Consultation →
          </button>

          <p style={{ textAlign: 'center', color: '#999', fontSize: '0.7rem', marginTop: '1rem', lineHeight: 1.5 }}>
            ⚠️ For educational purposes only. Not a substitute for professional medical advice.
          </p>
        </div>
      ) : (
        /* Chat */
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 0 100px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 56px)' }}>
          {/* System pills */}
          <div style={{ padding: '0.6rem 1rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', borderBottom: '1px solid', borderColor: incognito ? '#222' : '#e0ddd0' }}>
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
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', color: incognito ? '#555' : '#aaa', marginTop: '3rem', fontSize: '0.9rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🌿</div>
                Ask anything about holistic health...
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} style={{ marginBottom: '1rem', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '0.7rem 1rem',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.role === 'user'
                    ? (incognito ? '#1a3a1a' : '#2d5a1b')
                    : (incognito ? '#1a1a1a' : '#ffffff'),
                  color: msg.role === 'user' ? '#f0e6c8' : (incognito ? '#e0d5c0' : '#2a3a1a'),
                  border: msg.role === 'assistant' ? ('1px solid ' + (incognito ? '#333' : '#e0ddd0')) : 'none',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)'
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
                  padding: '0.7rem 1rem',
                  borderRadius: '18px 18px 18px 4px',
                  background: incognito ? '#1a1a1a' : '#ffffff',
                  color: incognito ? '#e0d5c0' : '#2a3a1a',
                  border: '1px solid ' + (incognito ? '#333' : '#e0ddd0'),
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                }}>
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(streaming) }} />
                  <span style={{ opacity: 0.5 }}>▋</span>
                </div>
              </div>
            )}
            {loading && !streaming && (
              <div style={{ display: 'flex', gap: '0.3rem', padding: '0.5rem 1rem' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: incognito ? '#4a7a4a' : '#2d5a1b',
                    animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`
                  }} />
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '0.75rem 1rem',
            background: incognito ? '#111' : '#faf8f2',
            borderTop: '1px solid',
            borderColor: incognito ? '#222' : '#e0ddd0',
          }}>
            <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask about your health..."
                rows={1}
                style={{
                  flex: 1,
                  padding: '0.7rem 1rem',
                  borderRadius: 24,
                  border: '1.5px solid',
                  borderColor: incognito ? '#333' : '#c8dfc8',
                  background: incognito ? '#1a1a1a' : '#fff',
                  color: incognito ? '#e0d5c0' : '#2a3a1a',
                  fontSize: '0.9rem',
                  resize: 'none',
                  outline: 'none',
                  lineHeight: 1.5,
                  maxHeight: 160,
                  overflowY: 'auto',
                  fontFamily: 'Georgia, serif'
                }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                style={{
                  width: 44,
                  height: 44,
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
              >
                ↑
              </button>
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
        textarea { font-family: Georgia, serif; }
      `}</style>
    </main>
  )
}
