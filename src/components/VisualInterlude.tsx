"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function VisualInterlude() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Slow reveal on scroll
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          {
            opacity: 0.2,
            scale: 0.94,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );

        // Parallax image movement
        const img = imageWrapperRef.current.querySelector("img");
        if (img) {
          gsap.to(img, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }
      }

      // 2. Text quote entrance
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="visuals"
      ref={sectionRef}
      className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center bg-[#080808] py-24 md:py-36 overflow-hidden border-t border-white/[0.06]"
    >
      {/* Background Amber Atmospheric Glow */}
      <div
        className="ambient-glow w-[700px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
        {/* Frame Header */}
        <div className="w-full flex items-center justify-between pb-4 mb-8 border-b border-white/[0.06] font-mono-label text-[10px] text-muted">
          <span>04 — BETWEEN THE FRAMES</span>
          <span>FILMED IN DELHI</span>
        </div>

        {/* Large Immersive Image Container */}
        <div
          ref={imageWrapperRef}
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] bg-[#111111] overflow-hidden border border-white/[0.08] shadow-2xl"
        >
          <div className="relative w-full h-[125%] -top-[12.5%] overflow-hidden">
            <Image
              src={SITE_CONFIG.visualInterlude.image}
              alt="NIYAM — Cinematic amber lighting portrait"
              fill
              sizes="(max-width: 768px) 100vw, 1400px"
              className="object-cover object-center filter contrast-115 brightness-90"
            />
          </div>

          {/* Cinematic Vignette and Dark Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />

          {/* Statement Overlay (Center / Bottom Asymmetric) */}
          <div
            ref={quoteRef}
            className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 md:p-16 z-20"
          >
            <div className="max-w-2xl bg-black/60 backdrop-blur-md p-6 sm:p-8 border-l-2 border-accent-warm border-t border-white/5">
              <span className="font-mono-label text-[10px] tracking-widest text-accent-warm block mb-3">
                {SITE_CONFIG.visualInterlude.subtext}
              </span>
              <p className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-primary leading-snug tracking-tight">
                &ldquo;{SITE_CONFIG.visualInterlude.statement}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Frame Footer Meta */}
        <div className="w-full flex items-center justify-between pt-4 mt-4 font-mono-label text-[10px] text-muted">
          <span>NIYAM AUDIOVISUAL ARCHIVE</span>
          <span>ORIGINAL 35MM FILM TONE</span>
        </div>
      </div>
    </section>
  );
}
