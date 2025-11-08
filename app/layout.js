import "@crayonai/react-ui/styles/index.css";

export const metadata = {
  title: "AI Personal Assistant",
  description: "Chat-based personal assistant with Next.js + Thesys C1"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", backgroundColor: "#0f172a", color: "#e2e8f0" }}>
        {children}
      </body>
    </html>
  );
}