"use client";

import { useState } from "react";

type ChatInputProps = {
    onSend: (text: string) => void;
    disabled: boolean;
    };

    const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
    const [input, setInput] = useState("");

    const submit = () => {
        const text = input.trim();
        if (!text || disabled) return;

        onSend(text);
        setInput("");
    };

    return (
        <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-2 rounded-xl border border-[#9dff4f]/50 bg-black/30 p-1.5 transition focus-within:border-[#9dff4f] focus-within:shadow-[0_0_20px_rgba(157,255,79,0.2)]">
            <input
            className="flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/30"
            placeholder="Ask about my projects, skills, experience..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            />
            <button
            onClick={submit}
            disabled={disabled || !input.trim()}
            className="flex items-center gap-2 rounded-lg bg-[#9dff4f] px-4 py-2 text-sm font-bold text-black shadow-[0_4px_20px_rgba(157,255,79,0.3)] transition hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
            >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M3.4 20.4 22 12 3.4 3.6 3.3 10l13 2-13 2z" />
            </svg>
            Send
            </button>
        </div>
        </div>
    );
    };

export default ChatInput;