
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat with Chaitanya's AI",
  description: "Ask my AI assistant anything about my work and skills.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div
          className="flex h-dvh flex-col bg-[#111214] text-white"
          style={{ backgroundImage: `
                  radial-gradient(circle at 50% 0%, rgba(157,255,79,0.18), transparent 45%),
                  linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)`,
                backgroundSize: "100% 100%, 90px 100%", }}
        >
          <Navbar />
          <div className="flex min-h-0 flex-1 flex-col items-center px-4 pb-6">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
