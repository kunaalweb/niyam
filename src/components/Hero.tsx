"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const meetRef = useRef<HTMLHeadingElement>(null);
  const niyamRef = useRef<HTMLHeadingElement>(null);
  const portraitsRef = useRef<HTMLDivElement>(null);
  const bottomLabelRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const ambientGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(
          [
            wordmarkRef.current,
            meetRef.current,
            niyamRef.current,
            portraitsRef.current,
            bottomLabelRef.current,
            scrollIndicatorRef.current,
          ],
          { opacity: 1, y: 0 }
        );
        return;
      }

      // Initial state
      gsap.set(wordmarkRef.current, { opacity: 0, y: -10 });
      gsap.set(meetRef.current, { opacity: 0, y: 25 });
      gsap.set(portraitsRef.current, {
        opacity: 0,
        y: 45,
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        scale: 0.96,
      });
      gsap.set(bottomLabelRef.current, { opacity: 0, y: 15 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0 });
      gsap.set(ambientGlowRef.current, { opacity: 0, scale: 0.8 });

      // Stagger characters for NIYAM
      const niyamChars = niyamRef.current?.querySelectorAll(".char");
      if (niyamChars && niyamChars.length > 0) {
        gsap.set(niyamChars, { opacity: 0, y: 40, rotateX: 25 });
      }

      // Primary Entrance Timeline
      const tl = gsap.timeline({
        delay: 0.2,
        defaults: { ease: "power3.out" },
      });

      // 1. Ambient warm atmosphere rises
      tl.to(ambientGlowRef.current, {
        opacity: 0.7,
        scale: 1,
        duration: 2.2,
        ease: "sine.out",
      })
        // 2. Small top wordmark fades in
        .to(
          wordmarkRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
          },
          "-=1.8"
        )
        // 3. MEET reveals with vertical slide
        .to(
          meetRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
          },
          "-=1.2"
        )
        // 4. NIYAM appears using staggered character reveal
        .to(
          niyamChars || [],
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.0,
            stagger: 0.08,
            ease: "power4.out",
          },
          "-=0.9"
        )
        // 5. Artist portraits emerge through cinematic clip-path reveal
        .to(
          portraitsRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: 1.5,
            ease: "power3.inOut",
          },
          "-=0.8"
        )
        // 6. Bottom label & scroll indicator fade in last
        .to(
          bottomLabelRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          "-=0.5"
        )
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 1,
            duration: 0.8,
          },
          "-=0.4"
        );

      // Subtle Scroll-linked Parallax on Hero elements
      if (heroRef.current) {
        gsap.to(portraitsRef.current, {
          y: 70,
          scale: 0.98,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to([meetRef.current, niyamRef.current], {
          y: -50,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "70% top",
            scrub: 1,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("story");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between items-center bg-[#080808] px-5 sm:px-8 pt-20 sm:pt-24 md:pt-28 pb-8 md:pb-10 overflow-hidden select-none"
    >
      {/* Cinematic Ambient Glow behind the duo */}
      <div
        ref={ambientGlowRef}
        className="ambient-glow w-[380px] h-[280px] sm:w-[550px] sm:h-[350px] md:w-[750px] md:h-[450px] bottom-12 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      />

      {/* Subtle fine concentric circles for editorial feel */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035]"
        aria-hidden="true"
      >
        <div className="w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] rounded-full border border-white" />
        <div className="absolute w-[750px] h-[750px] sm:w-[950px] sm:h-[950px] rounded-full border border-white" />
      </div>

      {/* Top Editorial Sub-bar */}
      <div
        ref={wordmarkRef}
        className="w-full max-w-7xl mx-auto flex items-center justify-between text-muted font-mono-label text-[10px] md:text-xs z-10 pt-2"
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-warm animate-pulse" />
          <span>CINEMATIC AUDIO ARCHIVE</span>
        </span>
        <span className="tracking-widest">
          EST. 2024 • NEW DELHI
        </span>
      </div>

      {/* Upper-Middle Typography: MEET / NIYAM */}
      <div className="relative z-10 flex flex-col items-center text-center my-auto pt-2 sm:pt-4">
        <h2
          ref={meetRef}
          className="font-display font-medium text-[11px] sm:text-xs md:text-sm tracking-[0.45em] uppercase text-secondary mb-1"
        >
          MEET
        </h2>
        <h1
          ref={niyamRef}
          className="font-heading text-6xl sm:text-8xl md:text-[11rem] lg:text-[14rem] leading-[0.85] text-primary tracking-tighter"
          aria-label="NIYAM"
        >
          {"NIYAM".split("").map((letter, idx) => (
            <span key={idx} className="char inline-block">
              {letter}
            </span>
          ))}
        </h1>

        {/* Lower Half: Duo Cutout Emerging From Darkness */}
        <div
          ref={portraitsRef}
          className="relative z-20 w-full max-w-[340px] sm:max-w-[460px] md:max-w-[580px] lg:max-w-[640px] mx-auto flex justify-center -mt-6 sm:-mt-12 md:-mt-20 pointer-events-none"
        >
          <div className="relative w-full aspect-[405/278]">
            <Image
              src="/images/hero-duo.png"
              alt="NIYAM — Jey Khamari and Kinshu"
              fill
              priority
              sizes="(max-width: 640px) 340px, (max-width: 768px) 460px, 640px"
              className="object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)]"
            />
            {/* Seamless gradient fade at the base */}
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom Information Row: Location Label & Scroll Indicator */}
      <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 z-20 border-t border-white/[0.06]">
        <div
          ref={bottomLabelRef}
          className="font-mono-label text-[10px] sm:text-[11px] md:text-xs text-secondary flex items-center gap-2.5 tracking-widest text-center sm:text-left"
        >
          <span className="text-accent-warm font-mono">•</span>
          <span>{SITE_CONFIG.tagline}</span>
        </div>

        <div
          ref={scrollIndicatorRef}
          className="flex items-center gap-3 text-muted hover:text-primary transition-colors cursor-pointer group"
          onClick={handleScrollDown}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleScrollDown();
            }
          }}
          aria-label="Scroll down to Story"
        >
          <span className="font-mono-label text-[10px] tracking-widest text-muted group-hover:text-primary transition-colors">
            SCROLL TO EXPLORE
          </span>
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-warm/40 group-hover:translate-y-0.5 transition-all duration-300">
            <ChevronDown size={13} className="text-secondary group-hover:text-accent-warm" />
          </div>
        </div>
      </div>
    </section>
  );
}
