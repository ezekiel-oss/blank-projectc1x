export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Chat API that forwards messages to Thesys C1 (OpenAI-compatible) Chat Completions API.
 * Expects body: { messages: Array<{role: 'system'|'user'|'assistant', content: string}> }
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    if (!process.env.THESYS_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing THESYS_API_KEY" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const payload = {
      model: "c1-nightly",
      temperature: 0.7,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      }))
    };

    const res = await fetch("https://api.thesys.dev/v1/embed/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.THESYS_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text();
      return new Response(JSON.stringify({ error: text || "C1 error" }), {
        status: res.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    const data = await res.json();
    // C1 responses may contain UI spec; pass the raw assistant message content to the frontend.
    const reply = data?.choices?.[0]?.message?.content ?? "No response from C1.";
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