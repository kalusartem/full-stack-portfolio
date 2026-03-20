import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Artem Kalus | Full-Stack Portfolio",
  description: "Modern full-stack portfolio built with Next.js, Supabase, secure auth, admin CRUD, and premium motion design.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
