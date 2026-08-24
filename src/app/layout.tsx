import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { Navbar } from "@/components/nav/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AETHER // Cinematic Financial Intelligence",
  description:
    "An editorial, high-precision personal budget analysis and financial command center.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-background text-foreground font-sans selection:bg-white/20 selection:text-white bg-noise antialiased">
        <CustomCursor />
        <Navbar />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
