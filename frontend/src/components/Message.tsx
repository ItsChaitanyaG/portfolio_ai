import type { ChatMessage } from "@/types/chat";

const Message = ({ role, content, time }: ChatMessage) => {
    const isUser = role === "user";

    const avatar = isUser ? (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 text-[10px] font-bold text-white">
        YOU
        </div>
    ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#9dff4f] bg-[#9dff4f]/10 text-[10px] font-bold text-[#9dff4f]">
        AI
        </div>
    );

    return (
        <div className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
        {!isUser && avatar}

        <div className={`flex max-w-[80%] flex-col ${isUser ? "items-end" : "items-start"}`}>
            <div
            className={`whitespace-pre-wrap rounded-xl border px-4 py-2.5 text-sm leading-relaxed ${
                isUser
                ? "border-[#9dff4f] bg-[#9dff4f]/10 text-white shadow-[0_0_20px_rgba(157,255,79,0.15)]"
                : "border-white/10 bg-white/5 text-slate-200"
            }`}
            >
            {content}
            </div>
            {time && <span className="mt-1 text-[11px] text-white/40">{time}</span>}
        </div>

        {isUser && avatar}
        </div>
    );
    };

export default Message;