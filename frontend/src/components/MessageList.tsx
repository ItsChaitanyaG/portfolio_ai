"use client";

import { useEffect, useRef } from "react";
import Message from "./Message";
import type { ChatMessage } from "@/types/chat";

type MessageListProps = {
    messages: ChatMessage[];
    loading: boolean;
};

const MessageList = ({ messages, loading }: MessageListProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {messages.map((m, i) => (
                <Message key={i} role={m.role} content={m.content} time={m.time} />
            ))}

            {loading && (
                <div className="flex items-end gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#9dff4f] bg-[#9dff4f]/10 text-[10px] font-bold text-[#9dff4f]">
                        AI
                    </div>
                    <div className="flex gap-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                className="h-2 w-2 animate-bounce rounded-full bg-[#9dff4f]"
                                style={{ animationDelay: `${i * 150}ms` }}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div ref={bottomRef}></div>
        </div>
    );
};

export default MessageList;