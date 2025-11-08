export const metadata = {
  title: "AI Personal Assistant",
  description: "Chat-based personal assistant with Next.js"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif", backgroundColor: "#0f172a", color: "#e2e8f0" }}>
        {children}
      </body>
    </html>
  );
}