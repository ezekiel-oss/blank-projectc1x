# AI Personal Assistant (Next.js + Vercel)

A minimal personal assistant web app following the 7-step guide:
1. Define scope (assistant prompt guides behavior)
2. Connect data sources (stubbed; ready to add Calendar/Email APIs)
3. Choose LLM (OpenAI via Chat Completions)
4. Agent logic (multi-turn chat; confirm sensitive actions)
5. Tool integration (add actions in `/app/api` routes)
6. Generative UI (you can extend rendering logic to parse structured outputs)
7. Deploy & monitor (Vercel-ready)

## Local Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Add your OpenAI key:
   - Create `.env.local` in the project root:
     ```
     OPENAI_API_KEY=your_key_here
     ```
   - Or set it in Vercel Project Settings as an Environment Variable.

3. Run locally:
   ```
   npm run dev
   ```

Open `http://localhost:3000`.

## Deploy to Vercel

- Push this repository to GitHub/GitLab/Bitbucket.
- Import into Vercel.
- Add Environment Variable `OPENAI_API_KEY`.
- Deploy.

## Extending per the article

- Data Sources: Add routes/integrations for Google Calendar, Gmail, etc. (OAuth).
- Knowledge Base: Add a vector DB and pass retrieved snippets to the LLM.
- Tool Actions: Create endpoints (e.g., `/app/api/schedule/route.js`) that the assistant calls upon confirmation.
- Generative UI: Optionally integrate **Thesys C1** React SDK to render UI components from model output.

## Notes

- This app does not store conversation history server-side; it stays in the browser state.
- For streaming responses or richer UI, expand `/app/api/chat/route.js` and the frontend in `/app/page.js`.