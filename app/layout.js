import "./globals.css";

export const metadata = {
  title: "அறம் ARAM · Constitutional Intelligence",
  description: "ARAM helps every Indian understand how the Constitution applies to their real-life situation through context-based reasoning.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
