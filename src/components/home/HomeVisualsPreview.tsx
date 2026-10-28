"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function HomeVisualsPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scale: 0.96,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
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
              03 — VISUAL ARCHIVE
            </span>
          </div>
          <span className="font-mono-label text-[11px] text-muted tracking-widest hidden sm:inline-block">
            BETWEEN THE FRAMES
          </span>
        </div>

        {/* Large Cinematic Frame */}
        <div
          ref={imageRef}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] bg-[#111111] overflow-hidden border border-white/[0.08] shadow-2xl group mb-10"
        >
          <Image
            src={SITE_CONFIG.visualInterlude.image}
            alt="NIYAM studio visual preview"
            fill
            loading="eager"
            sizes="(max-width: 768px) 100vw, 1300px"
            className="object-cover object-center filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-1000 ease-out"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Statement Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 z-20">
            <div className="max-w-xl bg-black/70 backdrop-blur-md p-6 sm:p-8 border-l-2 border-accent-warm border-t border-white/5">
              <span className="font-mono-label text-[10px] tracking-widest text-accent-warm block mb-2">
                {SITE_CONFIG.visualInterlude.subtext}
              </span>
              <p className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-primary leading-snug">
                &ldquo;{SITE_CONFIG.visualInterlude.statement}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-secondary text-sm font-light max-w-xl">
            A curated photographic documentation of late-night sound design, songwriting sessions, and Delhi studio frames.
          </p>

          <Link
            href="/visuals"
            aria-label="View all visuals archive"
            className="inline-flex items-center gap-3 font-mono-label text-xs px-6 py-4 bg-primary text-black font-bold uppercase tracking-wider hover:bg-accent-warm hover:text-white transition-all duration-300 group shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm rounded-sm"
          >
            <span>VIEW ALL VISUALS</span>
            <ArrowUpRight
              size={16}
              className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
