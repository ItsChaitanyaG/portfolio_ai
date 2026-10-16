"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
    { href: "/", label: "About me" },
    { href: "/compatibility", label: "Compatibility" },
];

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="flex justify-center px-4 py-4">
            <div className="flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
                {tabs.map((m) => (
                    <Link
                        key={m.href}
                        href={m.href}
                        className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition ${
                            pathname === m.href
                                ? "bg-[#9dff4f] text-black shadow-[0_0_16px_rgba(157,255,79,0.3)]"
                                : "text-white/60 hover:text-white"
                        }`}
                    >
                        {m.label}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;