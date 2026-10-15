"use client";

import { useState } from "react";

const ChatInput = () => {
    const [input, setInput] = useState("");

    const submit = () => {
        const text = input.trim()

        if(!text || disabled) return;
        
        onSend(text);
        setInput("")
    }

    return (
        <div className="flex gap-2 border-t p-3">
            <input
            className="flex-1 rounded-lg border px-3 py-2 outline-none focus:ring-2"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            />
            <button
            onClick={submit}
            disabled={disabled}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
            >
                Send
            </button>
        </div>
    )
}

export default ChatInput;