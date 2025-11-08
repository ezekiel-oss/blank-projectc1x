# AI Personal Assistant (Next.js + Thesys C1 + Vercel)

A minimal personal assistant web app following the 7-step guide, now using Thesys C1 for Generative UI.

1. Define scope (assistant prompt guides behavior)
2. Connect data sources (stubbed; ready to add Calendar/Email APIs)
3. Choose LLM (Thesys C1 via OpenAI-compatible Chat Completions)
4. Agent logic (multi-turn chat; confirm sensitive actions)
5. Tool integration (add actions in `/app/api` routes)
6. Generative UI (rendered via C1 React SDK)
7. Deploy & monitor (Vercel-ready)

## Local Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Add your Thesys API key:
   - Create `.env.local` in the project root:
     ```
     THESYS_API_KEY=your_key_here
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
- Add Environment Variable `THESYS_API_KEY`.
- Deploy.

## How it works with Thesys C1

- Backend: `/app/api/chat/route.js` posts `messages` to `https://api.thesys.dev/v1/embed/chat/completions` with `model: "c1-nightly"`.
- Frontend: `/app/page.js` uses `<C1Chat apiUrl="/api/chat" />` to render dynamic, interactive UI in chat.
- Styles: `@crayonai/react-ui/styles/index.css` imported in `app/layout.js`, Inter font added.

## Extending per the article

- Data Sources: Add routes/integrations for Google Calendar, Gmail, etc. (OAuth), then invoke from the assistant via tool-calling patterns.
- Knowledge Base: Add a vector DB and pass retrieved snippets to the LLM.
- Tool Actions: Create endpoints (e.g., `/app/api/schedule/route.js`) that the assistant calls upon confirmation.
- Styling: Use `ThemeProvider` (built into `<C1Chat>`) and the styling docs to match your brand.

## Notes

- This app does not store conversation history server-side; `<C1Chat>` manages runtime history in the client.
- For streaming responses or more control, implement streaming in `/app/api/chat/route.js` and switch to `<C1Component>` with your own state management.