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
  metadataBase: new URL("https://budget-analysis-veyra.vercel.app"),
  title: "VEYRA — Your Money, In Focus",
  description:
    "A cinematic personal finance and budget analysis experience for understanding spending, cash flow, savings and financial behaviour.",
  applicationName: "VEYRA",
  openGraph: {
    title: "VEYRA — Your Money, In Focus",
    description:
      "A cinematic personal finance and budget analysis experience for understanding spending, cash flow, savings and financial behaviour.",
    siteName: "VEYRA",
    type: "website",
    images: [{ url: "/veyra-social.png", width: 1200, height: 630, alt: "VEYRA. Your money, in focus." }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/veyra-social.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-background text-foreground font-sans bg-noise antialiased">
        <CustomCursor />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
