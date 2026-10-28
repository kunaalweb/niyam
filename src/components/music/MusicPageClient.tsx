"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Play,
  Pause,
  ArrowRight,
  ArrowUpRight,
  Disc,
  ExternalLink,
} from "lucide-react";
import { SITE_CONFIG, MusicRelease } from "@/data/siteConfig";
import { artistLinks } from "@/data/links";
import {
  SpotifyIcon,
  AppleMusicIcon,
  YouTubeIcon,
  InstagramIcon,
} from "@/components/ui/BrandIcons";

export default function MusicPageClient() {
  const [activeRelease, setActiveRelease] = useState<string>("tum-se-tum-tak");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch {}
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        try {
          audioContextRef.current.close();
        } catch {}
      }
    };
  }, []);

  const toggleAudioPreview = (releaseId: string) => {
    if (isPlaying && activeRelease === releaseId) {
      // Fade out and stop
      if (gainRef.current && audioContextRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(
          0.0001,
          audioContextRef.current.currentTime + 0.25
        );
        setTimeout(() => {
          try {
            oscRef.current?.stop();
            oscRef.current?.disconnect();
          } catch {}
          setIsPlaying(false);
        }, 250);
      }
      return;
    }

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = audioContextRef.current || new AudioCtx();
      audioContextRef.current = ctx;

      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch {}
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Atmospheric ambient frequency for all 7 catalog releases
      const FREQ_MAP: Record<string, number> = {
        "tum-se-tum-tak": 164.81, // E3 driving atmospheric indie
        zikr: 123.47,             // B2 deep meditative resonance
        behisaab: 155.56,         // Eb3 ethereal longing
        iraada: 146.83,           // D3 resolved neon pulse
        "kya-karu": 174.61,       // F3 buoyant melodic indie
        kami: 130.81,             // C3 melancholic urban solitude
        afsana: 138.59,           // C#3 introspective acoustic warmth
      };
      const baseFreq = FREQ_MAP[releaseId] || 150.0;
      osc.type = "sine";
      osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscRef.current = osc;
      gainRef.current = gain;
      setActiveRelease(releaseId);
      setIsPlaying(true);
    } catch {
      // Audio fallback safe
    }
  };

  return (
    <main className="min-h-screen bg-[#080808] text-primary pt-28 md:pt-36 pb-28 overflow-hidden">
      {/* 01. MUSIC HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-32">
        <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-14">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent-warm" />
              <span className="font-mono-label text-xs tracking-ultra text-primary font-bold">
                02 — COMPLETE DISCOGRAPHY
              </span>
            </div>

            {/* Verified Instagram pill */}
            <a
              href={artistLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow NIYAM on Instagram"
              className="hidden sm:inline-flex items-center gap-2 font-mono text-xs text-secondary hover:text-primary border border-white/10 hover:border-accent-warm/40 px-3.5 py-1.5 rounded-full transition-all duration-300"
            >
              <InstagramIcon size={12} className="text-accent-warm" />
              <span>{SITE_CONFIG.handle}</span>
            </a>
          </div>

          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[0.88]">
            THE ARCHIVE
            <br />
            <span className="text-secondary">OF SOUND.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-4">
            <p className="md:col-span-8 font-sans text-secondary text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl">
              Introspective Hindi lyricism, organic acoustic textures, and late-night atmospheric production.
              Stream verified releases from Delhi duo Jey Khamari & Kinshu on all official platforms.
            </p>

            <div className="md:col-span-4 flex items-center md:justify-end gap-3 font-mono text-xs text-muted">
              <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-primary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-warm animate-pulse" />
                {SITE_CONFIG.releases.length} OFFICIAL SINGLES
              </span>
              <span className="px-3.5 py-1.5 rounded-full border border-white/10 text-secondary">
                LOSSLESS AUDIO
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 02. DETAILED DISCOGRAPHY SHOWCASE */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 mb-32 md:mb-44">
        <div className="space-y-32 md:space-y-44">
          {SITE_CONFIG.releases.map((release: MusicRelease, idx: number) => {
            const isCurrentPlaying = isPlaying && activeRelease === release.id;

            return (
              <article
                id={release.id}
                key={release.id}
                className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center scroll-mt-32"
              >
                {/* Artwork Column (Asymmetric ordering) */}
                <div
                  className={`lg:col-span-5 ${
                    idx % 2 === 1 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative group max-w-md mx-auto lg:max-w-none">
                    <div className="relative aspect-square w-full overflow-hidden rounded-sm border border-white/10 bg-[#111111] shadow-2xl">
                      <Image
                        src={release.coverImage}
                        alt={`${release.title} cover artwork`}
                        fill
                        loading="eager"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover object-center grayscale contrast-125 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                        priority={idx === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                      {/* Interactive Ambient Player Button Overlay */}
                      <button
                        onClick={() => toggleAudioPreview(release.id)}
                        className={`absolute bottom-6 right-6 px-4 py-2.5 rounded-full border transition-all duration-300 flex items-center gap-2.5 backdrop-blur-md shadow-lg min-h-[44px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm ${
                          isCurrentPlaying
                            ? "bg-accent-warm text-white border-accent-warm"
                            : "bg-black/60 text-primary border-white/20 hover:border-accent-warm/60 hover:bg-black/80"
                        }`}
                        aria-label={
                          isCurrentPlaying
                            ? `Stop ambient preview for ${release.title}`
                            : `Play ambient soundscape for ${release.title}`
                        }
                      >
                        {isCurrentPlaying ? (
                          <>
                            <Pause size={14} className="fill-current" />
                            <span className="font-mono text-xs font-bold">PREVIEW PLAYING</span>
                            {/* Animated sound waves */}
                            <div className="flex items-center gap-0.5 ml-1">
                              <span className="w-0.5 h-3 bg-white animate-bounce" style={{ animationDelay: "0ms" }} />
                              <span className="w-0.5 h-4 bg-white animate-bounce" style={{ animationDelay: "150ms" }} />
                              <span className="w-0.5 h-2 bg-white animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                          </>
                        ) : (
                          <>
                            <Play size={14} className="fill-current ml-0.5" />
                            <span className="font-mono text-xs">AUDIO PREVIEW</span>
                          </>
                        )}
                      </button>

                      {/* Catalog Tag Top Left */}
                      <div className="absolute top-4 left-4 font-mono text-[10px] px-2.5 py-1 rounded bg-black/70 border border-white/10 text-secondary backdrop-blur-sm">
                        {release.catalogNumber}
                      </div>
                    </div>

                    {/* Warm glow behind cover */}
                    <div className="absolute -inset-2 rounded-sm bg-accent-warm/5 blur-2xl -z-10 group-hover:bg-accent-warm/15 transition-all duration-500" />
                  </div>
                </div>

                {/* Release Details Column */}
                <div
                  className={`lg:col-span-7 flex flex-col justify-between space-y-6 ${
                    idx % 2 === 1 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <div>
                    {/* Index & Year Metadata */}
                    <div className="flex items-center gap-4 text-xs font-mono text-muted mb-4">
                      <span className="text-accent-warm font-bold">
                        CATALOG #{release.catalogNumber}
                      </span>
                      <span>•</span>
                      <span>RELEASED {release.releaseDate}</span>
                      <span>•</span>
                      <span>ORIGINAL MASTER</span>
                    </div>

                    {/* Song Title */}
                    <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl text-primary tracking-tight uppercase leading-[0.9] mb-6">
                      {release.title}
                    </h2>

                    {/* Description */}
                    <p className="font-sans text-secondary text-base sm:text-lg font-light leading-relaxed mb-6">
                      {release.description}
                    </p>

                    {/* Official Credits */}
                    <div className="p-4 rounded-sm border border-white/[0.08] bg-[#111111]/40 mb-8">
                      <span className="font-mono-label text-[10px] tracking-widest text-muted uppercase block mb-1.5">
                        OFFICIAL RECORD CREDITS
                      </span>
                      <p className="font-mono text-xs text-primary/90 leading-relaxed">
                        {release.credits}
                      </p>
                    </div>
                  </div>

                  {/* Streaming Platforms Links with Verified Brand Icons */}
                  <div>
                    <span className="font-mono-label text-[10px] tracking-widest text-muted uppercase block mb-3">
                      STREAM ON OFFICIAL PLATFORMS
                    </span>

                    <div className="flex flex-wrap gap-3">
                      {/* Spotify with Brand Icon */}
                      <a
                        href={release.links.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Listen to ${release.title} on Spotify`}
                        className="group/link font-mono text-xs px-5 py-3 rounded-sm border border-white/10 bg-white/[0.02] text-primary hover:text-white hover:border-accent-warm/50 hover:bg-[#111111] transition-all duration-300 flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
                      >
                        <SpotifyIcon size={14} className="text-[#1DB954]" />
                        <span>SPOTIFY</span>
                        <ArrowUpRight
                          size={13}
                          className="text-muted transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-primary"
                        />
                      </a>

                      {/* Apple Music with Brand Icon */}
                      <a
                        href={release.links.appleMusic}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Listen to ${release.title} on Apple Music`}
                        className="group/link font-mono text-xs px-5 py-3 rounded-sm border border-white/10 bg-white/[0.02] text-primary hover:text-white hover:border-accent-warm/50 hover:bg-[#111111] transition-all duration-300 flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
                      >
                        <AppleMusicIcon size={14} className="text-[#FA243C]" />
                        <span>APPLE MUSIC</span>
                        <ArrowUpRight
                          size={13}
                          className="text-muted transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-primary"
                        />
                      </a>

                      {/* YouTube with Brand Icon */}
                      <a
                        href={release.links.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Listen to ${release.title} on YouTube`}
                        className="group/link font-mono text-xs px-5 py-3 rounded-sm border border-white/10 bg-white/[0.02] text-primary hover:text-white hover:border-accent-warm/50 hover:bg-[#111111] transition-all duration-300 flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
                      >
                        <YouTubeIcon size={14} className="text-[#FF0000]" />
                        <span>YOUTUBE</span>
                        <ArrowUpRight
                          size={13}
                          className="text-muted transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-primary"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 03. CATALOG ARCHIVE INDEX TABLE */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 mb-32 md:mb-44">
        <div className="border-t border-white/[0.08] pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-white/[0.08] gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent-warm" />
                <span className="font-mono-label text-xs tracking-ultra text-primary font-bold">
                  CATALOG REGISTRY
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl text-primary tracking-tight uppercase">
                RELEASE ARCHIVE INDEX
              </h2>
            </div>
            <span className="font-mono text-xs text-muted">
              NIYAM MUSIC RECORDINGS • NEW DELHI
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10 text-muted uppercase text-[10px] tracking-wider">
                  <th className="py-4 px-4 font-normal">CATALOG NO</th>
                  <th className="py-4 px-4 font-normal">TITLE</th>
                  <th className="py-4 px-4 font-normal">RELEASE DATE</th>
                  <th className="py-4 px-4 font-normal">FORMAT</th>
                  <th className="py-4 px-4 font-normal">PERSONNEL</th>
                  <th className="py-4 px-4 font-normal text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {SITE_CONFIG.releases.map((release) => (
                  <tr
                    key={release.catalogNumber}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-4 px-4 text-accent-warm font-bold">
                      {release.catalogNumber}
                    </td>
                    <td className="py-4 px-4 font-heading text-base tracking-wide text-primary uppercase">
                      {release.title}
                    </td>
                    <td className="py-4 px-4 text-secondary">
                      {release.releaseDate}
                    </td>
                    <td className="py-4 px-4 text-muted">
                      DIGITAL / LOSSLESS
                    </td>
                    <td className="py-4 px-4 text-secondary truncate max-w-xs">
                      {release.credits}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <a
                        href={release.links.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Stream ${release.title} on Spotify`}
                        className="inline-flex items-center gap-1.5 text-accent-warm hover:underline"
                      >
                        <SpotifyIcon size={12} className="text-[#1DB954]" />
                        <span>STREAM</span>
                        <ExternalLink size={12} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 04. BOTTOM TRANSITION TO VISUALS PAGE */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative p-10 sm:p-14 md:p-20 rounded-sm border border-white/10 bg-gradient-to-br from-[#111111] via-[#0d0d0d] to-[#080808] overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-warm/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs text-accent-warm">
                <Disc size={14} className="animate-spin-slow" />
                <span>NEXT CHAPTER</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-6xl text-primary tracking-tight uppercase leading-tight">
                THE IMAGERY
                <br />
                BEHIND THE MUSIC.
              </h2>
              <p className="font-sans text-secondary text-sm sm:text-base font-light">
                Explore the monochrome photography archive, intimate studio sessions, and single cover visuals.
              </p>
            </div>

            <Link
              href="/visuals"
              className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-primary text-background font-mono-label text-xs tracking-ultra font-bold rounded-sm transition-all duration-300 hover:bg-accent-warm hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
            >
              <span>VIEW ALL VISUALS</span>
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
