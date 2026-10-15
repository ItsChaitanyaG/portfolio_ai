"use client";

import { useState } from "react";
import axios from "axios";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import type { ChatMessage } from "@/types/chat";

const now = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const Chat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: "assistant", content: "Hi! Ask me anything about my work, skills, or projects." },
    ]);
    const [loading, setLoading] = useState(false);

    const handleSend = async (text: string) => {
        setMessages((m) => [...m, { role: "user", content: text, time: now() }]);
        setLoading(true);

        try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
            question: text,
        });
        setMessages((m) => [...m, { role: "assistant", content: res.data, time: now() }]);
        } catch {
        setMessages((m) => [
            ...m,
            {
            role: "assistant",
            content: "Something went wrong, try again later...",
            time: now(),
            },
        ]);
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="flex min-h-0 flex-1 flex-col">
        <MessageList messages={messages} loading={loading} />
        <ChatInput onSend={handleSend} disabled={loading} />
        </div>
    );
    };

export default Chat;