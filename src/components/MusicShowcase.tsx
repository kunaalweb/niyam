"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Play, Pause, Volume2 } from "lucide-react";
import { SITE_CONFIG, MusicRelease } from "@/data/siteConfig";

export default function MusicShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeRelease, setActiveRelease] = useState<string>("tum-se-tum-tak");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".release-row");
      if (cards && cards.length > 0) {
        gsap.from(cards, {
          y: 25,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      if (oscRef.current) {
        try {
          oscRef.current.stop();
        } catch {}
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Atmospheric audio preview (Web Audio API ambient soundscape on user interaction only)
  const toggleAudioPreview = (releaseId: string) => {
    if (isPlaying && activeRelease === releaseId) {
      // Stop
      if (gainRef.current && audioContextRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.3);
        setTimeout(() => {
          try {
            oscRef.current?.stop();
            oscRef.current?.disconnect();
          } catch {}
          setIsPlaying(false);
        }, 300);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = ctx;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Stop previous if any
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch {}
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Atmospheric chord based on song
      // Afsana: C# minor nostalgic ambient; Tum Se Tum Tak: E minor atmospheric
      const baseFreq = releaseId === "afsana" ? 138.59 : 164.81;
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
      setActiveRelease(releaseId);
      setIsPlaying(true);
    } catch {
      // Audio fallback silent
    }
  };

  return (
    <section
      id="music"
      ref={sectionRef}
      className="relative w-full py-28 md:py-44 bg-[#080808] border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-20 md:mb-28 border-b border-white/[0.08] gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent-warm" />
              <span className="font-mono-label text-xs tracking-ultra text-primary font-bold">
                03 — DISCOGRAPHY
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-primary tracking-tight uppercase">
              LISTEN TO NIYAM
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono-label text-[11px] text-muted tracking-widest hidden md:inline-block">
              CURATED RELEASES
            </span>
            <div className="flex items-center gap-2 font-mono text-[11px] text-secondary border border-white/10 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-warm" />
              <span>{SITE_CONFIG.releases.length} VERIFIED SINGLES</span>
            </div>
          </div>
        </div>

        {/* Record Collection List */}
        <div className="space-y-24 md:space-y-36">
          {SITE_CONFIG.releases.map((release: MusicRelease, idx: number) => {
            const isCurrentPlaying = isPlaying && activeRelease === release.id;

            return (
              <article
                key={release.id}
                className="release-row relative grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-14 items-center group"
              >
                {/* Large Asymmetrical Cover Artwork */}
                <div
                  className={`lg:col-span-5 ${
                    idx % 2 === 1 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative aspect-square w-full max-w-lg mx-auto bg-[#111111] border border-white/[0.09] shadow-2xl overflow-hidden group/cover">
                    {/* Catalog Index Tab */}
                    <div className="absolute top-4 left-4 z-20 font-mono-label text-[10px] tracking-widest text-primary/80 bg-black/70 px-2.5 py-1 backdrop-blur-sm border border-white/5">
                      {release.catalogNumber} // {release.year}
                    </div>

                    {/* Verified Release Date Badge */}
                    <div className="absolute bottom-4 right-4 z-20 font-mono-label text-[10px] tracking-widest text-accent-warm bg-black/80 px-2.5 py-1 border border-accent-warm/20">
                      RELEASE: {release.releaseDate}
                    </div>

                    {/* Album Artwork Image */}
                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={release.coverImage}
                        alt={`${release.title} single cover artwork by NIYAM`}
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover transition-transform duration-700 ease-out group-hover/cover:scale-105 filter contrast-110"
                      />
                    </div>

                    {/* Interactive Ambient Player Overlay Button */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => toggleAudioPreview(release.id)}
                        className="w-16 h-16 rounded-full bg-primary/95 text-black flex items-center justify-center transform transition-transform duration-300 hover:scale-110 shadow-2xl"
                        aria-label={
                          isCurrentPlaying
                            ? `Pause preview for ${release.title}`
                            : `Play atmospheric preview for ${release.title}`
                        }
                      >
                        {isCurrentPlaying ? (
                          <Pause size={24} className="fill-black" />
                        ) : (
                          <Play size={24} className="fill-black ml-1" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Release Details & Streaming Links */}
                <div
                  className={`lg:col-span-7 flex flex-col justify-center space-y-8 ${
                    idx % 2 === 1 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-accent-warm text-xs font-bold">
                        0{idx + 1}
                      </span>
                      <span className="font-mono-label text-[11px] text-muted tracking-widest">
                        ORIGINAL RELEASE • {release.year}
                      </span>
                      {isCurrentPlaying && (
                        <span className="flex items-center gap-1.5 font-mono text-[10px] text-accent-warm bg-accent-glow px-2 py-0.5 rounded-full border border-accent-warm/30">
                          <Volume2 size={12} className="animate-pulse" />
                          <span>PREVIEWING</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading text-5xl sm:text-7xl md:text-8xl text-primary tracking-tight leading-[0.9] group-hover:text-accent-warm transition-colors duration-500">
                      {release.title}
                    </h3>
                  </div>

                  <p className="text-secondary text-base sm:text-lg leading-relaxed font-light max-w-xl text-balance">
                    {release.description}
                  </p>

                  <div className="text-xs font-mono text-muted border-l border-white/10 pl-4 py-1">
                    {release.credits}
                  </div>

                  {/* Actions & Official Streaming Links */}
                  <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-4">
                    {/* Primary Listen Now Action */}
                    <a
                      href={release.links.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono-label text-xs px-6 py-3.5 bg-primary text-black font-bold uppercase tracking-wider rounded-none hover:bg-accent-warm transition-all duration-300 shadow-lg hover:shadow-accent-glow"
                    >
                      <span>LISTEN NOW</span>
                      <ArrowUpRight size={15} />
                    </a>

                    {/* Official Platform Direct Links */}
                    <a
                      href={release.links.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono-label text-[11px] px-4 py-3 border border-white/10 text-secondary hover:text-primary hover:border-white/30 transition-colors"
                    >
                      <span>SPOTIFY</span>
                      <ArrowUpRight size={12} />
                    </a>

                    <a
                      href={release.links.appleMusic}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono-label text-[11px] px-4 py-3 border border-white/10 text-secondary hover:text-primary hover:border-white/30 transition-colors"
                    >
                      <span>APPLE MUSIC</span>
                      <ArrowUpRight size={12} />
                    </a>

                    <a
                      href={release.links.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono-label text-[11px] px-4 py-3 border border-white/10 text-secondary hover:text-primary hover:border-white/30 transition-colors"
                    >
                      <span>YOUTUBE</span>
                      <ArrowUpRight size={12} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
