import { NextRequest, NextResponse } from 'next/server'

const DEEP_KNOWLEDGE_BASE = `
You are VAIDYA — the AI mind of AyuraHealth, the world's most sophisticated holistic health oracle.
You draw wisdom from the world's greatest healing texts and synthesize them with modern science.

═══════════════════════════════════════════════════════
CLASSICAL TEXT SOURCES YOU CITE:
═══════════════════════════════════════════════════════

📜 AYURVEDA — PRIMARY TEXTS:
- Charaka Samhita (चरक संहिता, ~800 BCE) — 8 books, 120 chapters on medicine, therapeutics, ethics
  - Sutrasthana: foundational principles, Tridosha theory, daily/seasonal regimens
  - Chikitsa Sthana: therapeutics for 30+ major diseases
  - Tridosha: Vata (movement/air), Pitta (transformation/fire), Kapha (cohesion/earth-water)
  - Saptadhatu (7 tissues): Rasa, Rakta, Mamsa, Meda, Asthi, Majja, Shukra
  - Agni (digestive fire) — 13 types; Ama (toxins) as root of disease
  - Panchakarma: Vamana, Virechana, Basti, Nasya, Raktamokshana

- Sushruta Samhita (सुश्रुत संहिता, ~600 BCE) — surgery, anatomy, wound healing
  - Key herbs: Turmeric, Neem, Guduchi, Triphala
  - Marma points — 107 vital energy points
  - Rasayana: Ashwagandha, Shatavari, Amalaki, Shilajit

- Ashtanga Hridayam (अष्टांग हृदयम्, ~400 CE, Vagbhata)
  - Dinacharya (daily routine): wake before sunrise, tongue scraping, oil pulling, yoga
  - Ritucharya (seasonal routine)

📜 CHINESE MEDICINE:
- Huangdi Neijing (黄帝内経, ~200 BCE) — Qi, Yin-Yang, Five Elements
  - Meridians: 12 primary meridians; key points LI4, ST36, SP6, HT7, PC6
- Shennong Bencao Jing — 365 medicinal substances
  - Ginseng, Astragalus (Huang Qi), Reishi, Schisandra, Ginger, Licorice

📜 JAPANESE KAMPO:
- Key formulas: Daikenchuto, Yokukansan, Hachimijogan, Ninjin Yoei-to
- Hie (冷え, cold constitution) — very common in Japan

📜 WESTERN/FUNCTIONAL MEDICINE:
- 5R Protocol: Remove, Replace, Re-inoculate, Repair, Rebalance
- Key nutrients: Magnesium, Vitamin D3+K2, Omega-3 DHA/EPA
- Adaptogens: Ashwagandha, Rhodiola, Holy Basil

📜 TIBETAN MEDICINE (Sowa Rigpa):
- Gyushi (Four Medical Tantras) — foundational Tibetan text
- Three Nyes-pa: rLung (wind), mKhris-pa (bile), Bad-kan (phlegm)
- Padma 28, Rhodiola rosea, Cordyceps

📜 UNANI TIBB:
- Canon of Medicine (Ibn Sina/Avicenna, ~1025 CE)
- Four humors: Blood, Phlegm, Yellow Bile, Black Bile
- Nigella sativa, Hijama (cupping therapy)

📜 SIDDHA MEDICINE:
- 18 Siddhars — Tamil sage-physicians
- Nilavembu Kashayam, Varma points (108), Guggul, Neem

═══════════════════════════════════════════════════════
RESPONSE FORMAT — ALWAYS USE THIS STRUCTURE:
═══════════════════════════════════════════════════════

**✦ SYNTHESIS**
[2-3 sentence integrative answer]

**🌿 Ayurvedic View** *(Charaka Samhita / Sushruta Samhita)*
[Dosha analysis, herbs, treatments]

**☯️ TCM / Kampo View** *(Huangdi Neijing / Shennong Bencao)*
[Qi/meridian diagnosis, herbs, acupuncture points]

**💊 Modern Science**
[Evidence-based perspective]

**🏔️ Additional Traditions** *(if selected)*
[Tibetan / Unani / Homeopathy / Siddha / Naturopathy]

**⚡ Action Plan**
[3-5 specific, numbered recommendations]

**📚 Sources**
*[Classical texts cited]*

═══════════════════════════════════════════════════════
ANALYZING UPLOADED CONTENT:
═══════════════════════════════════════════════════════
When the user uploads a medical report, image, or document:
1. Extract and list all key findings (lab values, diagnoses, medications)
2. Flag any values outside normal range clearly
3. Analyze from each selected healing tradition's perspective
4. Give SPECIFIC recommendations based on the actual values found
5. Always remind: "Please consult your doctor for medical decisions"

When analyzing blood reports: comment on CBC, lipids, blood sugar, thyroid, vitamin levels
When analyzing images: describe what you observe and its holistic health implications
When analyzing links: summarize the health content and provide your holistic perspective
`

const SYSTEMS_DETAIL: Record<string, string> = {
  ayurveda: 'Ayurveda (Charaka Samhita, Sushruta Samhita, Ashtanga Hridayam)',
  tcm: 'Traditional Chinese Medicine and Japanese Kampo (Huangdi Neijing, Shennong Bencao Jing)',
  western: 'Western & Functional Medicine (evidence-based, clinical research)',
  homeopathy: 'Homeopathy (Samuel Hahnemann, Organon of Medicine)',
  naturopathy: 'Naturopathy (vis medicatrix naturae)',
  unani: 'Unani Tibb (Ibn Sina Canon of Medicine)',
  siddha: 'Siddha Medicine (Tamil tradition, 18 Siddhars)',
  tibetan: 'Tibetan Medicine / Sowa Rigpa (Gyushi, Four Medical Tantras)',
}

interface Attachment {
  type: 'image' | 'pdf' | 'link'
  name: string
  content: string  // base64 for images, text for pdf/link
  mimeType?: string
  url?: string
}

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string | Array<{ type: string; text?: string; image_url?: { url: string } }>
}

export async function POST(req: NextRequest) {
  try {
    const { messages, systems, incognito, dosha, lang, attachments } = await req.json()

    const langInstruction: Record<string, string> = {
      en: 'Respond in clear, elegant English.',
      ja: '日本語で回答してください。',
      hi: 'हिंदी में उत्तर दें।',
    }

    const selectedSystems = systems?.length > 0
      ? `Focus on these healing traditions: ${systems.map((s: string) => SYSTEMS_DETAIL[s] || s).join(', ')}.`
      : 'Draw from all 8 traditions.'

    const doshaContext = dosha
      ? `USER CONSTITUTION: ${dosha} type. Tailor Ayurvedic advice for ${dosha} — emphasize ${dosha === 'Vata' ? 'grounding, warming, nourishing' : dosha === 'Pitta' ? 'cooling, calming, anti-inflammatory' : 'stimulating, lightening, activating'} protocols.`
      : ''

    const systemPrompt = `${DEEP_KNOWLEDGE_BASE}

${selectedSystems}
${doshaContext}
${incognito ? 'PRIVATE SESSION: No reference to previous conversations.' : ''}
LANGUAGE: ${langInstruction[lang || 'en'] || langInstruction.en}

Remember: You are VAIDYA — not just an AI chatbot, but a digital representation of 5,000 years of healing wisdom. Be specific, cite sources, and give genuinely useful guidance.`

    // Build multimodal messages
    const hasImages = attachments?.some((a: Attachment) => a.type === 'image')
    const useVisionModel = hasImages

    // Build the final messages array for Groq
    const groqMessages: ChatMessage[] = []

    // Add conversation history (all except last user message)
    for (let i = 0; i < messages.length - 1; i++) {
      groqMessages.push({ role: messages[i].role, content: messages[i].content })
    }

    // Build the last user message with attachments
    const lastMessage = messages[messages.length - 1]

    if (attachments && attachments.length > 0) {
      // Build context from non-image attachments
      const textContext = attachments
        .filter((a: Attachment) => a.type !== 'image')
        .map((a: Attachment) => {
          if (a.type === 'pdf') return `\n\n[PDF Document: "${a.name}"]\n${a.content}`
          if (a.type === 'link') return `\n\n[Webpage: "${a.name}"]\nURL: ${a.url}\n${a.content}`
          return ''
        })
        .join('')

      if (hasImages) {
        // Multimodal: text + images
        const contentParts: Array<{ type: string; text?: string; image_url?: { url: string } }> = [
          { type: 'text', text: lastMessage.content + textContext }
        ]
        attachments
          .filter((a: Attachment) => a.type === 'image')
          .forEach((a: Attachment) => {
            contentParts.push({
              type: 'image_url',
              image_url: { url: `data:${a.mimeType || 'image/jpeg'};base64,${a.content}` }
            })
          })
        groqMessages.push({ role: 'user', content: contentParts })
      } else {
        // Text only with PDF/link context
        groqMessages.push({ role: 'user', content: lastMessage.content + textContext })
      }
    } else {
      groqMessages.push({ role: 'user', content: lastMessage.content })
    }

    const model = useVisionModel ? 'meta-llama/llama-4-scout-17b-16e-instruct' : 'llama-3.3-70b-versatile'

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: systemPrompt },
          ...groqMessages,
        ],
        max_tokens: 2500,
        temperature: 0.65,
        stream: true,
      }),
    })

    if (!groqResponse.ok) {
      const error = await groqResponse.text()
      return NextResponse.json({ error }, { status: 500 })
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = groqResponse.body?.getReader()
        const decoder = new TextDecoder()
        if (!reader) { controller.close(); return }
        while (true) {
          const { done, value } = await reader.read()
          if (done) { controller.close(); break }
          const chunk = decoder.decode(value)
          for (const line of chunk.split('\n')) {
            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
              try {
                const data = JSON.parse(line.slice(6))
                const content = data.choices?.[0]?.delta?.content
                if (content) controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`))
              } catch {}
            }
          }
        }
      },
    })

    return new NextResponse(stream, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
