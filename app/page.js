"use client";

import { C1Chat } from "@thesysai/genui-sdk";

const initialSystemPrompt = `You are a helpful personal assistant.
- Be proactive, concise, and polite.
- When asked about schedules, reply clearly and ask follow-ups if needed.
- If an action seems sensitive (send email, schedule), draft details and ask for confirmation.
- Prefer Generative UI when clarity or action is improved (tables, lists, forms, buttons).
`;

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateRows: "auto 1fr auto" }}>
      <header style={{ padding: "16px 24px", borderBottom: "1px solid #1f2937" }}>
        <h1 style={{ margin: 0, fontSize: 18 }}>AI Personal Assistant</h1>
        <p style={{ margin: "4px 0 0", color: "#94a3b8", fontSize: 13 }}>
          Powered by Thesys C1 (Generative UI). Set THESYS_API_KEY in project settings.
        </p>
      </header>

      <main style={{ padding: 16 }}>
        <div style={{ border: "1px solid #1f2937", borderRadius: 12 }}>
          <C1Chat
            apiUrl="/api/chat"
            initialMessages={[
              { role: "system", content: initialSystemPrompt },
              { role: "assistant", content: "Hi! I’m your personal assistant. How can I help today?" }
            ]}
          />
        </div>
      </main>

      <footer style={{ padding: 16, borderTop: "1px solid #1f2937", fontSize: 12, color: "#94a3b8" }}>
        Tip: Try “Show today’s agenda as a table” or “Create a form to draft a reschedule email.”
      </footer>
    </div>
  );
}