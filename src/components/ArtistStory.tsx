"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function ArtistStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const jeyRef = useRef<HTMLDivElement>(null);
  const kinshuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Jey Khamari Entrance
      if (jeyRef.current) {
        const titleChars = jeyRef.current.querySelectorAll(".jey-char");
        const bio = jeyRef.current.querySelector(".jey-bio");
        const portrait = jeyRef.current.querySelector(".jey-image-container");

        const tlJey = gsap.timeline({
          scrollTrigger: {
            trigger: jeyRef.current,
            start: "top 90%",
            once: true,
          },
        });

        tlJey
          .from(titleChars, { y: 25, duration: 0.8, stagger: 0.03, ease: "power4.out" })
          .from(bio, { y: 20, duration: 0.8, ease: "power3.out" }, "-=0.5")
          .from(portrait, { y: 25, scale: 0.98, duration: 1.0, ease: "power3.out" }, "-=0.7");

        // Scroll Parallax for Jey
        const jeyImg = jeyRef.current.querySelector(".jey-img");
        if (jeyImg) {
          gsap.to(jeyImg, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: jeyRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      }

      // 2. Kinshu Entrance
      if (kinshuRef.current) {
        const titleChars = kinshuRef.current.querySelectorAll(".kinshu-char");
        const bio = kinshuRef.current.querySelector(".kinshu-bio");
        const portrait = kinshuRef.current.querySelector(".kinshu-image-container");

        const tlKinshu = gsap.timeline({
          scrollTrigger: {
            trigger: kinshuRef.current,
            start: "top 90%",
            once: true,
          },
        });

        tlKinshu
          .from(titleChars, { y: 25, duration: 0.8, stagger: 0.04, ease: "power4.out" })
          .from(bio, { y: 20, duration: 0.8, ease: "power3.out" }, "-=0.5")
          .from(portrait, { y: 25, scale: 0.98, duration: 1.0, ease: "power3.out" }, "-=0.7");

        // Scroll Parallax for Kinshu
        const kinshuImg = kinshuRef.current.querySelector(".kinshu-img");
        if (kinshuImg) {
          gsap.to(kinshuImg, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: {
              trigger: kinshuRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const jey = SITE_CONFIG.artists.jey;
  const kinshu = SITE_CONFIG.artists.kinshu;

  return (
    <section
      id="artists"
      ref={sectionRef}
      className="relative w-full py-28 md:py-44 bg-[#080808] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-24 md:mb-36">
        <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent-warm" />
            <span className="font-mono-label text-xs tracking-ultra text-primary font-bold">
              02 — ARTIST VOICES
            </span>
          </div>
          <span className="font-mono-label text-[11px] text-muted tracking-widest hidden sm:inline-block">
            TWO PEOPLE, ONE SOUND
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-40 md:space-y-56">
        {/* =========================================
            ARTIST 01: JEY KHAMARI
            Layout: Portrait right, text left
           ========================================= */}
        <div
          id="artist-jey"
          ref={jeyRef}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Subtle large background typography watermark */}
          <div
            className="absolute -top-16 -left-8 font-heading text-[12vw] text-white/[0.02] select-none pointer-events-none leading-none"
            aria-hidden="true"
          >
            KHAMARI
          </div>

          {/* Left Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-accent-warm text-xs">01</span>
              <span className="font-mono-label text-[10px] text-muted tracking-widest">
                VOCALS / LYRICISM / GUITARS
              </span>
            </div>

            <h3
              className="font-heading text-5xl sm:text-7xl md:text-8xl text-primary tracking-tight uppercase leading-[0.9] mb-4"
              aria-label={jey.name}
            >
              {jey.name.split("").map((char, i) => (
                <span key={i} className="jey-char inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h3>

            <p className="font-mono-label text-xs tracking-widest text-accent-warm uppercase mb-8">
              {jey.role}
            </p>

            <div className="jey-bio space-y-6 max-w-xl">
              <p className="text-secondary text-base sm:text-lg leading-relaxed font-light text-balance">
                &ldquo;{jey.bio}&rdquo;
              </p>

              {/* Verified Artist Pillars */}
              <div className="pt-6 border-t border-white/[0.07] grid grid-cols-2 sm:grid-cols-4 gap-4">
                {jey.focus.map((item) => (
                  <div key={item} className="flex flex-col">
                    <span className="text-[10px] font-mono text-muted uppercase">FOCUS</span>
                    <span className="font-mono-label text-xs text-primary/90 mt-1">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Monochrome Portrait */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end z-10">
            <div className="jey-image-container relative w-full max-w-md aspect-[3/4] bg-[#111111] overflow-hidden border border-white/[0.08] shadow-2xl group">
              {/* Frame Label */}
              <div className="absolute top-4 left-4 z-20 font-mono-label text-[10px] tracking-widest text-primary/70 bg-black/60 px-2 py-1 backdrop-blur-sm">
                PORTRAIT 01 // JEY
              </div>

              <div className="relative w-full h-[115%] -top-[7.5%] overflow-hidden">
                <Image
                  src={jey.image}
                  alt="Jey Khamari — Singer-Songwriter & Producer for NIYAM"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="jey-img object-cover object-top filter grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Edge Gradient Shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute inset-0 border border-white/5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* =========================================
            ARTIST 02: KINSHU
            Layout: Reversed — Portrait left, text right
           ========================================= */}
        <div
          id="artist-kinshu"
          ref={kinshuRef}
          className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8"
        >
          {/* Subtle large background typography watermark */}
          <div
            className="absolute -top-16 -right-8 font-heading text-[12vw] text-white/[0.02] select-none pointer-events-none leading-none"
            aria-hidden="true"
          >
            KINSHU
          </div>

          {/* Left Column: Monochrome Portrait (Seated with synthesizer) */}
          <div className="lg:col-span-5 order-1 flex justify-center lg:justify-start z-10">
            <div className="kinshu-image-container relative w-full max-w-md aspect-[3/4] bg-[#111111] overflow-hidden border border-white/[0.08] shadow-2xl group">
              {/* Frame Label */}
              <div className="absolute top-4 left-4 z-20 font-mono-label text-[10px] tracking-widest text-primary/70 bg-black/60 px-2 py-1 backdrop-blur-sm">
                PORTRAIT 02 // KINSHU
              </div>

              <div className="relative w-full h-[115%] -top-[7.5%] overflow-hidden">
                <Image
                  src={kinshu.image}
                  alt="Kinshu — Producer & Songwriter seated with MIDI keyboard synthesizer"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="kinshu-img object-cover object-center filter grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Edge Gradient Shadow */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80 pointer-events-none" />
              <div className="absolute inset-0 border border-white/5 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-accent-warm text-xs">02</span>
              <span className="font-mono-label text-[10px] text-muted tracking-widest">
                PRODUCTION / SYNTHESIZERS / SOUND ARCHITECTURE
              </span>
            </div>

            <h3
              className="font-heading text-5xl sm:text-7xl md:text-8xl text-primary tracking-tight uppercase leading-[0.9] mb-4"
              aria-label={kinshu.name}
            >
              {kinshu.name.split("").map((char, i) => (
                <span key={i} className="kinshu-char inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h3>

            <p className="font-mono-label text-xs tracking-widest text-accent-warm uppercase mb-8">
              {kinshu.role}
            </p>

            <div className="kinshu-bio space-y-6 max-w-xl">
              <p className="text-secondary text-base sm:text-lg leading-relaxed font-light text-balance">
                &ldquo;{kinshu.bio}&rdquo;
              </p>

              {/* Verified Artist Pillars */}
              <div className="pt-6 border-t border-white/[0.07] grid grid-cols-2 sm:grid-cols-4 gap-4">
                {kinshu.focus.map((item) => (
                  <div key={item} className="flex flex-col">
                    <span className="text-[10px] font-mono text-muted uppercase">FOCUS</span>
                    <span className="font-mono-label text-xs text-primary/90 mt-1">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
