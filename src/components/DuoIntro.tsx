"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function DuoIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Text Reveal Animation
      const lines = textContainerRef.current?.querySelectorAll(".reveal-line");
      if (lines && lines.length > 0) {
        gsap.from(lines, {
          y: 25,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }

      // 2. Cinematic Image Clip-path Reveal
      if (imageContainerRef.current) {
        gsap.from(imageContainerRef.current, {
          scale: 0.98,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }

      // 3. Subtle Image Parallax during scrolling
      if (imageRef.current && sectionRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative w-full py-28 md:py-40 bg-[#080808] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Amber Ambient Glow */}
      <div
        className="ambient-glow w-[600px] h-[600px] -top-32 right-0 opacity-40"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Editorial Label */}
        <div className="flex items-center justify-between pb-8 mb-16 border-b border-white/[0.07]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent-warm" />
            <span className="font-mono-label text-xs tracking-ultra text-primary font-bold">
              {SITE_CONFIG.duoIntro.label}
            </span>
          </div>
          <span className="font-mono-label text-[11px] text-muted tracking-widest hidden sm:inline-block">
            {SITE_CONFIG.shortIntro}
          </span>
        </div>

        {/* Editorial Text Statement */}
        <div ref={textContainerRef} className="max-w-5xl mb-20 md:mb-28">
          <h2 className="reveal-line font-display font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.18] tracking-tight uppercase mb-8">
            {SITE_CONFIG.duoIntro.primary}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4">
            <div className="md:col-span-8">
              <p className="reveal-line text-secondary text-base sm:text-lg md:text-xl font-normal leading-relaxed text-balance">
                {SITE_CONFIG.duoIntro.secondary}
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col justify-end">
              <p className="reveal-line font-mono-label text-xs text-muted leading-relaxed border-l border-accent-warm/40 pl-4 py-1">
                {SITE_CONFIG.duoIntro.manifesto}
              </p>
            </div>
          </div>
        </div>

        {/* Cinematic Dual Photograph Frame */}
        <div
          ref={imageContainerRef}
          className="relative w-full rounded-none overflow-hidden bg-[#111111] border border-white/[0.08] shadow-2xl group"
        >
          {/* Hairline Editorial Header inside the frame */}
          <div className="absolute top-0 left-0 right-0 z-20 px-6 py-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
            <span className="font-mono-label text-[10px] tracking-widest text-primary/80">
              FRAME 01 // DELHI ARCHIVE
            </span>
            <span className="font-mono-label text-[10px] tracking-widest text-accent-warm">
              JEY KHAMARI + KINSHU
            </span>
          </div>

          <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
            <div ref={imageRef} className="relative w-full h-[120%] -top-[10%]">
              <Image
                src={SITE_CONFIG.duoIntro.heroImage}
                alt="NIYAM — Jey Khamari and Kinshu in warm amber studio lighting"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1280px"
                className="object-cover object-center filter grayscale-[25%] contrast-110 brightness-95 group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
              />
            </div>

            {/* Dark Photographic Overlays for depth and contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
          </div>

          {/* Bottom Caption Bar */}
          <div className="px-6 py-4 bg-[#0a0a0a] border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="font-mono-label text-[11px] text-secondary">
              STUDIO SESSION — INDEPENDENT EMOTIONAL POP
            </span>
            <span className="font-mono-label text-[10px] text-muted tracking-widest">
              NEW DELHI, INDIA • 28°38&apos;N 77°13&apos;E
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
