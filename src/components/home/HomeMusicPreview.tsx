"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { SpotifyIcon, AppleMusicIcon, YouTubeIcon } from "@/components/ui/BrandIcons";

export default function HomeMusicPreview() {
  const containerRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (rowsRef.current) {
        gsap.from(rowsRef.current.children, {
          y: 25,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rowsRef.current,
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-16 border-b border-white/[0.08] gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-accent-warm" />
              <span className="font-mono-label text-xs tracking-ultra text-primary font-bold">
                02 — DISCOGRAPHY ARCHIVE ({SITE_CONFIG.releases.length} TRACKS)
              </span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl text-primary tracking-tight uppercase">
              FEATURED RELEASES
            </h2>
          </div>

          <Link
            href="/music"
            className="group inline-flex items-center gap-2 font-mono-label text-xs px-5 py-3 border border-white/10 text-primary hover:border-accent-warm hover:text-accent-warm transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
          >
            <span>EXPLORE ALL 7 SONGS</span>
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>

        {/* Releases Grid Preview */}
        <div ref={rowsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {SITE_CONFIG.releases.map((release, idx) => {
            const isHero = idx === 0;

            if (isHero) {
              return (
                <div
                  key={release.id}
                  className="md:col-span-2 bg-[#111111] border border-white/[0.08] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-8 lg:gap-12 items-center group hover:border-white/20 transition-all duration-300 relative rounded-sm"
                >
                  <div className="relative aspect-square w-full md:w-[320px] lg:w-[380px] shrink-0 overflow-hidden bg-black border border-white/10 rounded-sm">
                    <Image
                      src={release.coverImage}
                      alt={`${release.title} cover artwork`}
                      fill
                      loading="eager"
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-110"
                    />
                    <div className="absolute top-3 left-3 font-mono-label text-[10px] bg-accent-warm text-white font-bold px-2.5 py-1">
                      LATEST RELEASE
                    </div>
                    <div className="absolute bottom-3 left-3 font-mono-label text-[10px] bg-black/80 backdrop-blur-sm px-2.5 py-1 text-primary/90 border border-white/10">
                      {release.catalogNumber} // {release.year}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between w-full h-full">
                    <div>
                      <div className="flex items-center justify-between font-mono-label text-[11px] text-muted mb-2">
                        <span className="text-accent-warm font-bold">OFFICIAL SINGLE</span>
                        <span>RELEASED {release.releaseDate}</span>
                      </div>
                      <h3 className="font-heading text-3xl sm:text-5xl lg:text-6xl text-primary tracking-tight mb-4 group-hover:text-accent-warm transition-colors">
                        {release.title}
                      </h3>
                      <p className="text-secondary text-sm sm:text-base leading-relaxed font-light mb-6">
                        {release.description}
                      </p>
                      <div className="p-3.5 rounded-sm border border-white/[0.06] bg-white/[0.02] mb-6">
                        <span className="font-mono-label text-[10px] tracking-widest text-muted uppercase block mb-1">
                          RECORD CREDITS
                        </span>
                        <p className="font-mono text-xs text-primary/80">
                          {release.credits}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.06]">
                      <a
                        href={release.links.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Stream ${release.title} on Spotify`}
                        className="group/btn inline-flex items-center gap-2 font-mono-label text-[10px] px-4 py-2.5 bg-primary text-black font-bold hover:bg-accent-warm hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm rounded-sm"
                      >
                        <SpotifyIcon size={12} className="text-current" />
                        <span>SPOTIFY</span>
                        <ArrowUpRight
                          size={11}
                          className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                        />
                      </a>

                      <a
                        href={release.links.appleMusic}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Stream ${release.title} on Apple Music`}
                        className="group/btn inline-flex items-center gap-2 font-mono-label text-[10px] px-4 py-2.5 border border-white/10 text-secondary hover:text-primary hover:border-white/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm rounded-sm"
                      >
                        <AppleMusicIcon size={12} className="text-current" />
                        <span>APPLE MUSIC</span>
                        <ArrowUpRight
                          size={11}
                          className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                        />
                      </a>

                      <a
                        href={release.links.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Watch ${release.title} on YouTube`}
                        className="group/btn inline-flex items-center gap-2 font-mono-label text-[10px] px-4 py-2.5 border border-white/10 text-secondary hover:text-primary hover:border-white/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm rounded-sm"
                      >
                        <YouTubeIcon size={12} className="text-[#FF0000]" />
                        <span>YOUTUBE</span>
                        <ArrowUpRight
                          size={11}
                          className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                        />
                      </a>

                      <Link
                        href={`/music#${release.id}`}
                        aria-label={`View release details for ${release.title}`}
                        className="group/detail inline-flex items-center gap-1.5 font-mono-label text-[10px] px-3.5 py-2.5 text-accent-warm hover:underline ml-auto"
                      >
                        <span>DETAILS & AUDIO</span>
                        <ArrowUpRight
                          size={12}
                          className="group-hover/detail:translate-x-0.5 group-hover/detail:-translate-y-0.5 transition-transform"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={release.id}
                className="bg-[#111111] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between group hover:border-white/20 transition-all duration-300 relative rounded-sm"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-black mb-6 border border-white/5 rounded-sm">
                  <Image
                    src={release.coverImage}
                    alt={`${release.title} cover artwork`}
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-110"
                  />
                  <div className="absolute top-3 left-3 font-mono-label text-[10px] bg-black/80 backdrop-blur-sm px-2.5 py-1 text-primary/80 border border-white/10">
                    {release.catalogNumber} // {release.year}
                  </div>
                  {release.featured && (
                    <div className="absolute top-3 right-3 font-mono-label text-[9px] bg-white/10 backdrop-blur-sm px-2 py-0.5 text-accent-warm border border-accent-warm/30">
                      FEATURED
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between font-mono-label text-[11px] text-muted mb-2">
                    <span>SINGLE RELEASE</span>
                    <span className="text-accent-warm">{release.releaseDate}</span>
                  </div>
                  <h3 className="font-heading text-3xl sm:text-4xl text-primary tracking-tight mb-3 group-hover:text-accent-warm transition-colors">
                    {release.title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed font-light mb-6 line-clamp-2">
                    {release.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/[0.06]">
                    <a
                      href={release.links.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Stream ${release.title} on Spotify`}
                      className="group/btn inline-flex items-center gap-1.5 font-mono-label text-[10px] px-3.5 py-2 bg-primary text-black font-bold hover:bg-accent-warm hover:text-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm rounded-sm"
                    >
                      <SpotifyIcon size={12} className="text-current" />
                      <span>SPOTIFY</span>
                      <ArrowUpRight
                        size={11}
                        className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                      />
                    </a>

                    <a
                      href={release.links.appleMusic}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Stream ${release.title} on Apple Music`}
                      className="group/btn inline-flex items-center gap-1.5 font-mono-label text-[10px] px-3.5 py-2 border border-white/10 text-secondary hover:text-primary hover:border-white/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm rounded-sm"
                    >
                      <AppleMusicIcon size={12} className="text-current" />
                      <span>APPLE</span>
                      <ArrowUpRight
                        size={11}
                        className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                      />
                    </a>

                    <Link
                      href={`/music#${release.id}`}
                      aria-label={`View release details for ${release.title}`}
                      className="group/detail inline-flex items-center gap-1 font-mono-label text-[10px] px-2.5 py-2 text-accent-warm hover:underline ml-auto"
                    >
                      <span>DETAILS</span>
                      <ArrowUpRight
                        size={11}
                        className="group-hover/detail:translate-x-0.5 group-hover/detail:-translate-y-0.5 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono-label text-xs text-muted">
            AVAILABLE ON ALL MAJOR STREAMING PLATFORMS WORLDWIDE
          </p>
          <Link
            href="/music"
            className="group inline-flex items-center gap-2 font-mono-label text-xs text-primary hover:text-accent-warm transition-colors"
          >
            <span>VIEW COMPLETE DISCOGRAPHY ARCHIVE ({SITE_CONFIG.releases.length} TRACKS)</span>
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
