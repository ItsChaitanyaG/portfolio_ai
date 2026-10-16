// app/page.tsx
"use client";

import Chat from "@/components/Chat";


export default function Home() {
  return (
    <main
      className="flex min-h-0 w-full flex-1 flex-col items-center"
    >
      <div className="mb-5 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9dff4f]">
          Query Assistant
        </p>
        <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
          Ask Anything About <span className="text-[#9dff4f]">Chaitanya</span>
        </h1>
        <p className="mt-2 text-sm text-white/50">
          Projects, skills, experience. My AI has the answers.
        </p>
      </div>

      <div className="flex min-h-0 w-full max-w-2xl flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#18191c]/90 shadow-2xl backdrop-blur">
        <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#9dff4f] bg-[#9dff4f]/10 font-bold text-[#9dff4f]">
            C
          </div>
          <div>
            <h2 className="font-semibold">Chaitanya&apos;s AI</h2>
            <p className="flex items-center gap-1.5 text-xs text-white/50">
              <span className="h-2 w-2 rounded-full bg-[#9dff4f] shadow-[0_0_8px_#9dff4f]" />
              Online
            </p>
          </div>
        </header>
        <Chat />
      </div>
    </main>
  );
}
