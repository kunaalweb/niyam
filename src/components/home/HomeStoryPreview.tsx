"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function HomeStoryPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.from(textRef.current.children, {
          y: 25,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }

      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          y: 30,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
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
      id="story"
      ref={containerRef}
      className="relative w-full py-28 md:py-36 bg-[#080808] border-t border-white/[0.06] overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Label */}
        <div className="flex items-center justify-between pb-6 mb-16 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent-warm" />
            <span className="font-mono-label text-xs tracking-ultra text-primary font-bold">
              01 — OUR STORY
            </span>
          </div>
          <span className="font-mono-label text-[11px] text-muted tracking-widest hidden sm:inline-block">
            TWO PEOPLE, ONE SOUND
          </span>
        </div>

        {/* Headline Statement */}
        <div ref={textRef} className="max-w-5xl mb-16">
          <h2 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl text-primary leading-[1.18] tracking-tight uppercase mb-6">
            {SITE_CONFIG.duoIntro.primary}
          </h2>
          <p className="text-secondary text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl mb-8">
            {SITE_CONFIG.duoIntro.secondary}
          </p>
          <div>
            <Link
              href="/story"
              aria-label="Discover our story"
              className="inline-flex items-center gap-3 font-mono-label text-xs px-6 py-4 bg-primary text-black font-bold uppercase tracking-wider hover:bg-accent-warm hover:text-white transition-all duration-300 group rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
            >
              <span>DISCOVER OUR STORY</span>
              <ArrowUpRight
                size={16}
                className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Dual Teaser Cards for Jey & Kinshu */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Jey Teaser */}
          <Link
            href="/story#jey"
            className="group relative bg-[#111111] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-500 overflow-hidden"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black mb-6">
              <Image
                src={SITE_CONFIG.artists.jey.image}
                alt="Jey Khamari portrait preview"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover object-top filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-3 left-3 font-mono-label text-[10px] bg-black/70 px-2 py-1 text-primary/80">
                01 // JEY KHAMARI
              </div>
            </div>

            <div>
              <p className="font-mono-label text-[10px] text-accent-warm tracking-widest mb-1">
                {SITE_CONFIG.artists.jey.role}
              </p>
              <h3 className="font-heading text-3xl sm:text-4xl text-primary tracking-tight mb-3 group-hover:text-accent-warm transition-colors">
                {SITE_CONFIG.artists.jey.name}
              </h3>
              <p className="text-secondary text-sm leading-relaxed line-clamp-3 font-light mb-6">
                &ldquo;{SITE_CONFIG.artists.jey.bio}&rdquo;
              </p>
              <div className="flex items-center gap-2 font-mono-label text-xs text-primary group-hover:text-accent-warm transition-colors">
                <span>READ JEY&apos;S STORY</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          </Link>

          {/* Kinshu Teaser */}
          <Link
            href="/story#kinshu"
            className="group relative bg-[#111111] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-500 overflow-hidden"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black mb-6">
              <Image
                src={SITE_CONFIG.artists.kinshu.image}
                alt="Kinshu portrait preview"
                fill
                sizes="(max-width: 768px) 100vw, 550px"
                className="object-cover object-center filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-3 left-3 font-mono-label text-[10px] bg-black/70 px-2 py-1 text-primary/80">
                02 // KINSHU
              </div>
            </div>

            <div>
              <p className="font-mono-label text-[10px] text-accent-warm tracking-widest mb-1">
                {SITE_CONFIG.artists.kinshu.role}
              </p>
              <h3 className="font-heading text-3xl sm:text-4xl text-primary tracking-tight mb-3 group-hover:text-accent-warm transition-colors">
                {SITE_CONFIG.artists.kinshu.name}
              </h3>
              <p className="text-secondary text-sm leading-relaxed line-clamp-3 font-light mb-6">
                &ldquo;{SITE_CONFIG.artists.kinshu.bio}&rdquo;
              </p>
              <div className="flex items-center gap-2 font-mono-label text-xs text-primary group-hover:text-accent-warm transition-colors">
                <span>READ KINSHU&apos;S STORY</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
