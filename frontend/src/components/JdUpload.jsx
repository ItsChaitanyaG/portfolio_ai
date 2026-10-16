"use client";

import { useRef, useState } from "react";
import axios from "axios";
import ScoreCard from "./ScoreCard";

const JdUpload = () => {
    const [file, setFile] = useState(null);
    const inputRef = useRef(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const analyse = async () => {
        if (!file || loading) return;

        setLoading(true);
        setErr("");
        setResult(null);

        const formdata = new FormData();
        formdata.append("file", file);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/score`, formdata);
            setResult(res.data);
        } catch (error) {
            const detail = error.response?.data?.detail;
            setErr(typeof detail === "string" ? detail : "Something went wrong, try again later...");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl space-y-5 pb-2">
            {/* Upload card */}
            <div className="rounded-2xl border border-white/10 bg-[#18191c]/90 p-5 shadow-2xl backdrop-blur">
                <input
                    className="hidden"
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.txt"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <button
                    type="button"
                    onClick={() => inputRef.current.click()}
                    className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-white/20 px-6 py-10 text-center transition hover:border-[#9dff4f]/60 hover:bg-white/5"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#9dff4f" strokeWidth="1.8" className="h-8 w-8">
                        <path
                            d="M12 16V4m0 0-4 4m4-4 4 4M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className="text-sm font-semibold">
                        {file ? file.name : "Click to upload a job description"}
                    </span>
                    <span className="text-xs text-white/40">
                        {file ? `${(file.size / 1024).toFixed(1)} KB` : "PDF or TXT"}
                    </span>
                </button>

                {err && <p className="mt-3 text-sm text-red-400">{err}</p>}

                <button
                    onClick={analyse}
                    disabled={!file || loading}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#9dff4f] px-4 py-2.5 text-sm font-bold text-black shadow-[0_4px_20px_rgba(157,255,79,0.3)] transition hover:brightness-110 disabled:opacity-40 disabled:shadow-none"
                >
                    {loading && (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                    )}
                    {loading ? "Analyzing..." : "Generate Compatibility"}
                </button>
            </div>

            {/* Result card */}
            {result && <ScoreCard result={result} />}
        </div>
    );
};

export default JdUpload;