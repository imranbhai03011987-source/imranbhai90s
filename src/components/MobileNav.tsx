"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/** Hamburger menu for phones and small tablets; the desktop nav is rendered by Header. */
export function MobileNav({ items }: { items: readonly (readonly [string, string])[] }) {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#00D9FF]/40 bg-[#160a33] text-[#00D9FF] shadow-[0_0_10px_rgba(0,217,255,0.3)] hover:border-[#FF1493] hover:text-[#FF1493] transition"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
          {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b-2 border-[#FF1493] bg-[#0c0824]/98 backdrop-blur-xl shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
        >
          <div className="border-b border-white/10 px-6 py-2.5 bg-black/40 flex items-center justify-between text-xs font-mono text-[#FFD24A]">
            <span>📼 90s RETRO NAVIGATION</span>
            <span className="text-[#00D9FF]">[TAPE INDEX]</span>
          </div>
          <ul className="mx-auto max-w-[1366px] px-6 py-4 space-y-1">
            {items.map(([label, href]) => {
              const active = path === href || (href !== "/" && path.startsWith(href));
              return (
                <li key={label} className="border-b border-white/5 last:border-0">
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between py-3 font-[family-name:var(--font-bebas)] text-2xl tracking-wider transition ${
                      active
                        ? "text-[#FF1493] drop-shadow-[0_0_10px_rgba(255,20,147,0.7)]"
                        : "text-[#F5E6C8] hover:text-[#00D9FF] hover:translate-x-1"
                    }`}
                  >
                    <span>{label}</span>
                    <span className="font-mono text-sm opacity-50">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-white/10 bg-[#140b2b] p-6 space-y-4">
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#00D9FF]">
              ★ Official Facebook Communities
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href="https://www.facebook.com/share/19P1xEugxs/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-[#00D9FF]/40 bg-[#0a0a23] p-3 text-xs font-bold text-[#00D9FF] hover:bg-[#00D9FF]/10 transition"
              >
                <span>Beverly Hills 90210 Fan Club</span>
                <span className="rounded bg-[#1877F2] px-2 py-0.5 text-[10px] text-white">8.2K Fans</span>
              </a>
              <a
                href="https://www.facebook.com/share/18sdgkeXCu/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-[#FFD24A]/40 bg-[#0a0a23] p-3 text-xs font-bold text-[#FFD24A] hover:bg-[#FFD24A]/10 transition"
              >
                <span>Full House Fan Club</span>
                <span className="rounded bg-[#1877F2] px-2 py-0.5 text-[10px] text-white">2.5K Fans</span>
              </a>
            </div>
            <div className="pt-2">
              <Link
                href="/admin/login"
                className="block w-full text-center rounded-lg border-2 border-[#FF1493] bg-[#FF1493]/10 py-2.5 font-bold uppercase text-xs tracking-widest text-[#FF1493] hover:bg-[#FF1493] hover:text-white transition"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
  );
}
