import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const { messages, system_ids } = await request.json();
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'No API key' }), { status: 500 });
  }
  const systemPrompt = `You are Ayurahealth, a compassionate AI health companion with deep knowledge across Ayurveda, Traditional Chinese Medicine, Homeopathy, Western Medicine, Naturopathy, Unani, Siddha, and Tibetan Medicine. The user wants perspectives from: ${(system_ids || ['ayurveda','western']).join(', ')}.

Structure your response with these sections:
**Plain Summary:** Simple explanation in plain language.
**What This Means:** Practical interpretation.
**Healing Perspectives:** Advice from each relevant tradition.
**Daily Practice:** Herbs, foods, and lifestyle tips.
**See a Doctor If:** Clear red flags to watch for.

Be warm, clear, and always recommend professional consultation for serious symptoms.`;

  const history = messages.slice(-10).map((m: {role:string,content:string}) => ({ role: m.role as 'user' | 'assistant', content: m.content }));
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
          body: JSON.stringify({
            model: 'llama-3.3-70b-versatile',
            max_tokens: 1024,
            messages: [{ role: 'system', content: systemPrompt }, ...history],
            stream: true,
          }),
        });
        if (!response.ok) {
          const err = await response.text();
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token: `Error ${response.status}: ${err}` })}\n\n`));
          controller.close();
          return;
        }
        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
              try {
                const data = JSON.parse(line.slice(6));
                const token = data.choices?.[0]?.delta?.content || '';
                if (token) controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`));
              } catch {}
            }
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (e: any) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token: `Error: ${e.message}` })}\n\n`));
        controller.close();
      }
    },
  });
  return new Response(stream, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', 'Connection': 'keep-alive' } });
}
