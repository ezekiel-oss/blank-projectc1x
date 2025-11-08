"use client";

import { useState, useRef, useEffect } from "react";

const initialSystemPrompt = `You are a helpful personal assistant. 
- Be proactive, concise, and polite.
- When asked about schedules, reply clearly and ask follow-ups if needed.
- If an action seems sensitive (send email, schedule), draft details and ask for confirmation.
- If you can present tabular or list data, format it cleanly in markdown.
`;

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "system", content: initialSystemPrompt },
    { role: "assistant", content: "Hi! I’m your personal assistant. How can I help today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(e) {
    e.preventDefault();
    const content = input.trim();
    if (!content) return;
    setInput("");
    const newHistory = [...messages, { role: "user", content }];
    setMessages(newHistory);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory })
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Request failed");
      }
      const data = await res.json();
      setMessages([...newHistory, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setMessages([
        ...newHistory,
        { role: "assistant", content: `Sorry, I hit an error: ${err.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateRows: "auto 1fr auto" }}>
      <header style={{ padding: "16px 24px", borderBottom: "1px solid #1f2937" }}>
        <h1 style={{ margin: 0, fontSize: 18 }}>AI Personal Assistant</h1>
        <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: 13 }}>
          Built with Next.js. Deployable on Vercel. Add your OPENAI_API_KEY in project settings.
        </p>
      </header>

      <main style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12, padding: 16 }}>
        <div
          ref={listRef}
          style={{
            border: "1px solid #1f2937",
            borderRadius: 12,
            padding: 16,
            height: "60vh",
            overflowY: "auto",
            backgroundColor: "#0b1220"
          }}
        >
          {messages
            .filter(m => m.role !== "system")
            .map((m, i) => (
              <MessageBubble key={i} role={m.role} content={m.content} />
            ))}
          {loading && <TypingBubble />}
        </div>

        <form onSubmit={sendMessage} style={{ display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask me anything…"
            style={{
              flex: 1,
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid #1f2937",
              backgroundColor: "#0b1220",
              color: "#e2e8f0"
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 16px",
              borderRadius: 10,
              border: "1px solid #1f2937",
              backgroundColor: loading ? "#334155" : "#22c55e",
              color: "#0b1220",
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Thinking…" : "Send"}
          </button>
        </form>
      </main>

      <footer style={{ padding: 16, borderTop: "1px solid #1f2937", fontSize: 12, color: "#94a3b8" }}>
        Tip: Try “Summarize my emails from today” or “Draft a polite reschedule email.”
      </footer>
    </div>
  );
}

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: 10
      }}
    >
      <div
        style={{
          maxWidth: "70ch",
          whiteSpace: "pre-wrap",
          borderRadius: 12,
          padding: "10px 12px",
          backgroundColor: isUser ? "#1f2937" : "#0b1220",
          border: "1px solid #1f2937"
        }}
      >
        <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>
          {isUser ? "You" : "Assistant"}
        </div>
        <div style={{ fontSize: 14 }}>{content}</div>
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
      <div
        style={{
          borderRadius: 12,
          padding: "10px 12px",
          backgroundColor: "#0b1220",
          border: "1px solid #1f2937"
        }}
      >
        <div style={{ fontSize: 12, color: "#94a3b8", marginBottom: 4 }}>Assistant</div>
        <div style={{ display: "flex", gap: 6 }}>
          <Dot /> <Dot /> <Dot />
        </div>
      </div>
    </div>
  );
}

function Dot() {
  return (
    <span
      style={{
        width: 6,
        height: 6,
        display: "inline-block",
        borderRadius: "50%",
        backgroundColor: "#94a3b8",
        opacity: 0.8
      }}
    />
  );
}