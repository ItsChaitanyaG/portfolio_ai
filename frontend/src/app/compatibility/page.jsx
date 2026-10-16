"use client";

import JdUpload from "@/components/JdUpload";

export default function CompatibilityPage() {
    return (
        <main className="flex min-h-0 w-full flex-1 flex-col items-center overflow-y-auto">
            <div className="mb-5 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#9dff4f]">
                    Recruiter Tool
                </p>
                <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                    See How I Match Your <span className="text-[#9dff4f]">Job Description</span>
                </h1>
                <p className="mt-2 text-sm text-white/50">
                    Upload a JD and get an instant match score against my resume.
                </p>
            </div>

            <JdUpload />
        </main>
    );
}