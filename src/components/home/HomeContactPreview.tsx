"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function HomeContactPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 25,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-28 md:py-36 bg-[#080808] border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Label */}
        <div className="flex items-center justify-between pb-6 mb-16 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent-warm" />
            <span className="font-mono-label text-xs tracking-ultra text-primary font-bold">
              04 — CONNECT
            </span>
          </div>
          <span className="font-mono-label text-[11px] text-muted tracking-widest hidden sm:inline-block">
            DIRECT INQUIRIES
          </span>
        </div>

        {/* Content Box */}
        <div className="p-8 sm:p-14 md:p-20 bg-[#111111] border border-white/[0.08] relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div
            className="ambient-glow w-[450px] h-[300px] -right-20 -bottom-20 opacity-30"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl">
            <span className="font-mono-label text-[11px] text-accent-warm tracking-widest uppercase block mb-3">
              LIVE BOOKINGS • SCORING • PRESS
            </span>
            <h2
              ref={titleRef}
              className="font-heading text-4xl sm:text-6xl md:text-7xl text-primary tracking-tight leading-[0.9] uppercase mb-6"
            >
              LET&apos;S STAY CONNECTED.
            </h2>
            <p className="text-secondary text-base sm:text-lg font-light leading-relaxed mb-10 text-balance">
              For festival bookings, musical collaborations, film and synch scoring inquiries, reach out directly to NIYAM management.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                aria-label="Get in touch with NIYAM"
                className="inline-flex items-center gap-3 font-mono-label text-xs px-7 py-4 bg-primary text-black font-bold uppercase tracking-wider hover:bg-accent-warm hover:text-white transition-all duration-300 shadow-xl group rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight
                  size={16}
                  className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>

              <a
                href={`mailto:${SITE_CONFIG.socials.email}?subject=NIYAM%20Inquiry`}
                aria-label={`Send email to ${SITE_CONFIG.socials.email}`}
                className="inline-flex items-center gap-2 font-mono-label text-xs px-6 py-4 border border-white/10 text-secondary hover:text-primary hover:border-white/30 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm min-h-[48px]"
              >
                <Mail size={15} />
                <span>EMAIL MANAGEMENT</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
