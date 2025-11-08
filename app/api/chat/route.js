export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Simple chat API that forwards messages to OpenAI Chat Completions API.
 * Expects body: { messages: Array<{role: 'system'|'user'|'assistant', content: string}> }
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing OPENAI_API_KEY" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const payload = {
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      }))
    };

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text();
      return new Response(JSON.stringify({ error: text || "LLM error" }), {
        status: res.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content ?? "I couldn't generate a response.";
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || "Unknown error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}