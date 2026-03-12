'use client';
import { useState, useRef, useEffect } from 'react';

const SYSTEMS = [
  { id: 'ayurveda', label: '🌿 Ayurveda', color: '#5a7c45' },
  { id: 'chinese', label: '☯️ Chinese', color: '#c0392b' },
  { id: 'western', label: '🔬 Western', color: '#8e44ad' },
  { id: 'homeopathy', label: '💧 Homeopathy', color: '#2980b9' },
];

const SAMPLES = [
  'I have fatigue and joint stiffness every morning',
  'My blood sugar is 118 mg/dL, what does this mean?',
  'I feel anxious and cannot sleep well lately',
  'I have bloating and digestive issues after meals',
];

function renderMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>');
}

export default function Home() {
  const [messages, setMessages] = useState<{role:string,content:string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [systems, setSystems] = useState(['ayurveda','western']);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (query?: string) => {
    const text = query || input;
    if (!text.trim() || loading) return;
    setStarted(true);
    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setLoading(true);
    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, system_ids: systems }),
      });
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let full = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.token) {
                full += data.token;
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: 'assistant', content: full };
                  return updated;
                });
              }
            } catch {}
          }
        }
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error connecting to AI. Please try again.' }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(160deg,#faf7f0,#ede8dc)', fontFamily:'Georgia,serif' }}>
      <style>{\`
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes bounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
        .msg{animation:fadeUp 0.3s ease forwards}
        *{box-sizing:border-box;margin:0;padding:0}
        textarea:focus{outline:none}
        button{cursor:pointer;border:none;background:none;font-family:Georgia,serif}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:#c8a86b;border-radius:10px}
        strong{font-weight:700;color:#2d5a1b}
        p{margin-bottom:8px}
        @media(max-width:640px){
          .system-btn{padding:3px 7px !important;font-size:9px !important}
          .hero-title{font-size:26px !important}
          .sample-grid{grid-template-columns:1fr 1fr !important}
          .sample-btn{font-size:11px !important;padding:9px 10px !important}
        }
      \`}</style>

      <div style={{ position:'sticky',top:0,zIndex:50,background:'rgba(250,247,240,0.97)',backdropFilter:'blur(12px)',borderBottom:'1px solid rgba(139,105,20,0.15)',padding:'0 16px',height:56,display:'flex',alignItems:'center',justifyContent:'space-between' }}>
        <div style={{ display:'flex',alignItems:'center',gap:8 }}>
          <div style={{ width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,#5a7c45,#8B6914)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,flexShrink:0 }}>🌿</div>
          <div>
            <div style={{ fontWeight:700,fontSize:17,color:'#2d5a1b' }}>Ayurahealth</div>
            <div style={{ fontSize:8,color:'#8B6914',letterSpacing:'0.12em',textTransform:'uppercase' }}>AI Health Companion</div>
          </div>
        </div>
        <div style={{ display:'flex',gap:4,flexWrap:'wrap',justifyContent:'flex-end',maxWidth:'58%' }}>
          {SYSTEMS.map(s => (
            <button key={s.id} className="system-btn" onClick={() => setSystems(prev => prev.includes(s.id)?prev.filter(x=>x!==s.id):[...prev,s.id])}
              style={{ padding:'4px 9px',borderRadius:50,fontSize:10,fontWeight:600,border:\`1.5px solid \${systems.includes(s.id)?s.color:'#d4c9b0'}\`,background:systems.includes(s.id)?\`\${s.color}18\`:'transparent',color:systems.includes(s.id)?s.color:'#9a8a78',transition:'all 0.2s',whiteSpace:'nowrap' }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:780,margin:'0 auto',padding:'0 16px 160px' }}>
        {!started && (
          <div style={{ textAlign:'center',padding:'44px 0 28px',animation:'fadeUp 0.5s ease' }}>
            <div style={{ fontSize:44,marginBottom:12 }}>🌿</div>
            <h1 className="hero-title" style={{ fontSize:'clamp(26px,6vw,46px)',fontWeight:700,color:'#2d5a1b',lineHeight:1.2,marginBottom:10 }}>
              Your Holistic<br/><em style={{ color:'#8B6914' }}>Health Companion</em>
            </h1>
            <p style={{ fontSize:13,color:'#6b6b4f',maxWidth:420,margin:'0 auto 24px',lineHeight:1.8,fontWeight:300 }}>
              Ask any health question. Get wisdom from Ayurveda, Chinese Medicine, and Western Medicine combined.
            </p>
            <div className="sample-grid" style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))',gap:8,maxWidth:540,margin:'0 auto' }}>
              {SAMPLES.map((q,i) => (
                <button key={i} className="sample-btn" onClick={() => send(q)}
                  style={{ padding:'11px 13px',borderRadius:11,border:'1px solid rgba(139,105,20,0.18)',background:'rgba(255,255,255,0.8)',textAlign:'left',fontSize:12,color:'#3d3d2e',lineHeight:1.5 }}>
                  💬 {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {started && (
          <div style={{ paddingTop:18,display:'flex',flexDirection:'column',gap:13 }}>
            {messages.map((m,i) => (
              <div key={i} className="msg" style={{ display:'flex',justifyContent:m.role==='user'?'flex-end':'flex-start',alignItems:'flex-start',gap:8 }}>
                {m.role==='assistant' && (
                  <div style={{ width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,#5a7c45,#8B6914)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,flexShrink:0,marginTop:4 }}>🌿</div>
                )}
                <div style={{ maxWidth:'83%',padding:m.role==='user'?'9px 15px':'13px 16px',borderRadius:m.role==='user'?'17px 17px 4px 17px':'4px 17px 17px 17px',background:m.role==='user'?'linear-gradient(135deg,#5a7c45,#3d5a2a)':'rgba(255,255,255,0.95)',border:m.role==='assistant'?'1px solid rgba(139,105,20,0.15)':'none',boxShadow:'0 2px 10px rgba(0,0,0,0.07)',fontSize:13,lineHeight:1.7 }}>
                  {m.role==='user'
                    ? <p style={{ color:'#fff',margin:0 }}>{m.content}</p>
                    : <div style={{ color:'#2d2d1a' }} dangerouslySetInnerHTML={{ __html: \`<p>\${renderMarkdown(m.content)}</p>\` }}/>
                  }
                </div>
              </div>
            ))}
            {loading && (
              <div className="msg" style={{ display:'flex',alignItems:'flex-start',gap:8 }}>
                <div style={{ width:28,height:28,borderRadius:'50%',background:'linear-gradient(135deg,#5a7c45,#8B6914)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13 }}>🌿</div>
                <div style={{ padding:'13px 16px',borderRadius:'4px 17px 17px 17px',background:'rgba(255,255,255,0.95)',border:'1px solid rgba(139,105,20,0.15)' }}>
                  <div style={{ display:'flex',gap:4 }}>
                    {[0,1,2].map(i => <span key={i} style={{ width:6,height:6,borderRadius:'50%',background:'#8B6914',display:'inline-block',animation:\`bounce 1.2s \${i*0.2}s infinite\` }}/>)}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>
        )}
      </div>

      <div style={{ position:'fixed',bottom:0,left:0,right:0,padding:'8px 16px 18px',background:'linear-gradient(to top,rgba(250,247,240,0.99) 75%,transparent)',zIndex:50 }}>
        <div style={{ maxWidth:780,margin:'0 auto' }}>
          <div style={{ display:'flex',alignItems:'flex-end',gap:8,background:'rgba(255,255,255,0.97)',border:'1.5px solid rgba(139,105,20,0.22)',borderRadius:16,padding:'7px 11px',boxShadow:'0 4px 20px rgba(139,105,20,0.12)' }}>
            <textarea ref={textareaRef} value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();} }}
              placeholder="Describe your symptoms or ask a health question..."
              rows={1}
              style={{ flex:1,border:'none',background:'transparent',fontSize:13,color:'#2d2d1a',lineHeight:1.6,padding:'4px 0',resize:'none',maxHeight:90,fontFamily:'Georgia,serif' }}
              onInput={e => { const t=e.target as HTMLTextAreaElement;t.style.height='auto';t.style.height=Math.min(t.scrollHeight,90)+'px'; }}
            />
            <button onClick={() => send()} disabled={loading||!input.trim()}
              style={{ width:36,height:36,borderRadius:'50%',background:loading||!input.trim()?'#e0d8c8':'linear-gradient(135deg,#5a7c45,#8B6914)',color:'#fff',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:loading?'none':'0 3px 10px rgba(90,124,69,0.4)',transition:'all 0.2s' }}>
              ✦
            </button>
          </div>
          <p style={{ textAlign:'center',marginTop:5,fontSize:10,color:'#b5a88a' }}>Powered by AyuraHealth AI 🌿 · Not a substitute for medical advice</p>
        </div>
      </div>
    </div>
  );
}
