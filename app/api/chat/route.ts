import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const { messages, system_ids } = await request.json();

  const systemPrompt = `You are Ayurahealth, a compassionate AI health companion with deep knowledge across Ayurveda, Traditional Chinese Medicine, Homeopathy, Western Medicine, and Naturopathy. The user wants perspectives from: ${system_ids.join(', ')}.

Always structure your response exactly like this:

Plain Summary: Simple explanation in plain language.

What This Means: Practical interpretation.

Healing Perspectives: Specific advice from each relevant tradition.

Daily Practice: Specific herbs, foods, and lifestyle tips.

See a Doctor If: Clear red flags to watch for.

Be warm, clear, and always recommend professional consultation for serious symptoms.`;

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
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 1024,
            system: systemPrompt,
            stream: true,
            messages: messages.slice(-10).map((m: {role:string,content:string}) => ({
              role: m.role,
              content: m.content,
            })),
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
              const data = line.slice(6);
              if (data === '[DONE]') continue;
              try {
                const parsed = JSON.parse(data);
                if (parsed.type === 'content_block_delta') {
                  const token = parsed.delta?.text || '';
                  if (token) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`));
                  }
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
