"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";

const tabs = [
    { href: "/", label: "About me" },
    { href: "/compatibility", label: "Compatibility" },
];

const Navbar = () => {
    const pathname = usePathname();

    useEffect(()=>{
        try {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/`)
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <nav className="flex justify-center px-4 py-4">
            <div className="flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
                {tabs.map((m) => (
                    <Link
                        key={m.href}
                        href={m.href}
                        className={`flex items-center rounded-lg px-4 py-1.5 text-sm font-semibold transition ${
                            pathname === m.href
                                ? "bg-[#9dff4f] text-black shadow-[0_0_16px_rgba(157,255,79,0.3)]"
                                : "text-white/60 hover:text-white"
                        }`}
                    >
                        {m.label}
                    </Link>
                ))}
                <a href={`${process.env.NEXT_PUBLIC_API_URL}/resume`}
                className="group flex items-center gap-2 rounded-xl border border-[#9dff4f]/50 bg-[#9dff4f]/5 px-3 py-2.5 text-sm font-semibold text-[#9dff4f] transition hover:border-[#9dff4f] hover:bg-[#9dff4f] hover:text-black hover:shadow-[0_0_20px_rgba(157,255,79,0.35)] sm:px-4"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4"
                    >
                        <path
                            d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M12 11v5m0 0-2-2m2 2 2-2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span className="hidden sm:inline">Download Resume</span>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;