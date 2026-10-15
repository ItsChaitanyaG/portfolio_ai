export type ChatMessage = {
    role: "user" | "assistant";
    content: string;
    time?: string;
};