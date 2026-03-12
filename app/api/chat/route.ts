import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const { messages, system_ids } = await request.json();

  const systemPrompt = `You are Ayurahealth, a compassionate AI health companion with deep knowledge across Ayurveda, Traditional Chinese Medicine, Homeopathy, Western Medicine, Naturopathy, Unani, Siddha, and Tibetan Medicine. The user wants perspectives from: ${(system_ids || ['ayurveda','western']).join(', ')}.

Always structure your response exactly like this:

**Plain Summary:** Simple explanation in plain language, no medical jargon.

**What This Means:** Practical interpretation of what is happening in the body.

**Healing Perspectives:** Specific advice from each relevant tradition the user selected.

**Daily Practice:** Specific herbs, foods, and lifestyle tips the person can start today.

**See a Doctor If:** Clear red flags and warning signs they must not ignore.

Be warm, wise, and non-alarming. Never diagnose definitively. Always recommend professional consultation for serious symptoms.`;

  const history = messages.slice(-10).map((m: {role:string,content:string}) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.ANTHROPIC_API_KEY || '',
            'anthropic-version': '2023-06-01',
            'anthropic-beta': 'messages-2023-12-15',
          },
          body: JSON.stringify({
            model: 'claude-haiku-4-5',
            max_tokens: 1024,
            system: systemPrompt,
            messages: history,
            stream: true,
          }),
        });

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value);
          const lines = text.split('\n').filter(l => l.trim());
          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.type === 'content_block_delta' && data.delta?.text) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token: data.delta.text })}\n\n`));
                }
              } catch {}
            }
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (e) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token: 'Error connecting to AI. Please try again.' })}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
