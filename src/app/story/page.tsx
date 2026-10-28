import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowDownRight, ArrowUpRight, Compass, Disc3 } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { artistLinks } from "@/data/links";
import { InstagramIcon } from "@/components/ui/BrandIcons";

export const metadata: Metadata = {
  title: "Our Story — NIYAM | Delhi-Based Independent Pop Duo",
  description:
    "The journey of Jey Khamari and Kinshu: from Subhash Nagar and bedroom piano lessons to founding NIYAM in New Delhi.",
  openGraph: {
    title: "Our Story — NIYAM",
    description:
      "Two voices, one cinematic sound. Learn how Jey Khamari and Kinshu built NIYAM.",
    images: [{ url: "/images/duo-cinematic-clean.png" }],
  },
};

export default function StoryPage() {
  const { duoIntro, artists, storyChapters } = SITE_CONFIG;

  return (
    <main className="min-h-screen bg-[#080808] text-primary pt-28 md:pt-36 pb-28 overflow-hidden">
      {/* 01. STORY HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 mb-24 md:mb-36">
        <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-14">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent-warm" />
              <span className="font-mono-label text-xs tracking-ultra text-primary font-bold">
                01 — ARTIST GENESIS & ARCHIVE
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
            TWO VOICES,
            <br />
            <span className="text-secondary">ONE CINEMATIC SOUND.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-4">
            <p className="md:col-span-8 font-sans text-secondary text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl">
              From bedroom recordings in Subhash Nagar to audio engineering in Canada and back home to New Delhi.
              NIYAM is a commitment to honest Hindi lyricism, cinematic soundscapes, and feeling everything without filter.
            </p>

            <div className="md:col-span-4 flex flex-wrap gap-3 md:justify-end">
              <a
                href="#jey"
                className="font-mono text-xs text-secondary hover:text-accent-warm border border-white/10 hover:border-accent-warm/40 px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
              >
                <span>JEY KHAMARI</span>
                <ArrowDownRight size={13} />
              </a>
              <a
                href="#kinshu"
                className="font-mono text-xs text-secondary hover:text-accent-warm border border-white/10 hover:border-accent-warm/40 px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
              >
                <span>KINSHU</span>
                <ArrowDownRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 02. DUO CINEMATIC STATEMENT & HERO FRAME */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 mb-32 md:mb-44">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
          {/* Large Cinematic Frame */}
          <div className="lg:col-span-7 relative group">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-white/10 bg-[#111111]">
              <Image
                src={duoIntro.heroImage}
                alt="NIYAM — Jey Khamari and Kinshu in Studio"
                fill
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-secondary">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-warm" />
                  JEY KHAMARI & KINSHU
                </span>
                <span className="tracking-widest text-muted">NEW DELHI • STUDIO ARCHIVE</span>
              </div>
            </div>
            {/* Subtle warm accent glow */}
            <div className="absolute -inset-1 rounded-sm bg-accent-warm/5 blur-xl -z-10 group-hover:bg-accent-warm/10 transition-all duration-500" />
          </div>

          {/* Manifesto & Purpose */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <span className="font-mono-label text-[11px] tracking-widest text-accent-warm font-semibold">
                THE DUO MANIFESTO
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl text-primary leading-tight">
                {duoIntro.primary}
              </h2>
            </div>

            <p className="font-sans text-secondary text-sm sm:text-base leading-relaxed">
              {duoIntro.secondary}
            </p>

            <blockquote className="border-l-2 border-accent-warm/60 pl-5 py-1 text-sm sm:text-base font-sans italic text-primary/90 leading-relaxed bg-white/[0.01]">
              &ldquo;{duoIntro.manifesto}&rdquo;
            </blockquote>

            <div className="pt-2 flex items-center gap-6 text-xs font-mono text-muted">
              <div>
                <span className="block text-primary font-bold">2025 — PRESENT</span>
                <span>NEW DELHI, INDIA</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div>
                <span className="block text-primary font-bold">INDEPENDENT</span>
                <span>SELF-PRODUCED POP</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. ARTIST PROFILE: JEY KHAMARI */}
      <section id="jey" className="relative max-w-7xl mx-auto px-6 md:px-12 mb-32 md:mb-44 scroll-mt-28">
        <div className="border-t border-white/[0.08] pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
            {/* Profile Info & Text */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8 order-2 lg:order-1">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-muted">01</span>
                  <span className="font-mono-label text-[11px] tracking-widest text-accent-warm font-semibold">
                    {artists.jey.role}
                  </span>
                  <span className="text-muted">•</span>
                  <a
                    href={artistLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View NIYAM on Instagram"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-secondary hover:text-accent-warm transition-colors"
                  >
                    <InstagramIcon size={12} />
                    <span>{SITE_CONFIG.handle}</span>
                    <ArrowUpRight size={11} />
                  </a>
                </div>
                <h2 className="font-heading text-4xl sm:text-6xl text-primary tracking-tight uppercase mb-4">
                  {artists.jey.name}
                </h2>
                <p className="font-heading text-xl sm:text-2xl text-accent-warm tracking-wide mb-8">
                  &ldquo;{artists.jey.accentQuote}&rdquo;
                </p>

                <p className="font-sans text-secondary text-base sm:text-lg leading-relaxed mb-6 font-light">
                  {artists.jey.bio}
                </p>
              </div>

              {/* Pillars / Musical Focus */}
              <div className="pt-6 border-t border-white/[0.08]">
                <span className="font-mono-label text-[10px] tracking-widest text-muted uppercase block mb-3">
                  ARTISTIC FOCUS & CONTRIBUTIONS
                </span>
                <div className="flex flex-wrap gap-2">
                  {artists.jey.focus.map((pillar) => (
                    <span
                      key={pillar}
                      className="font-mono text-xs px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-primary"
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Editorial Portrait */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:ml-auto overflow-hidden rounded-sm border border-white/10 bg-[#111111] group">
                <Image
                  src={artists.jey.image}
                  alt={artists.jey.name}
                  fill
                  loading="eager"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-secondary">
                  <span>JEY KHAMARI</span>
                  <span className="text-muted">PORTRAIT ARCHIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. ARTIST PROFILE: KINSHU */}
      <section id="kinshu" className="relative max-w-7xl mx-auto px-6 md:px-12 mb-32 md:mb-44 scroll-mt-28">
        <div className="border-t border-white/[0.08] pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
            {/* Editorial Portrait with Inset Detail */}
            <div className="lg:col-span-6">
              <div className="relative max-w-md mx-auto lg:mr-auto">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-white/10 bg-[#111111] group">
                  <Image
                    src={artists.kinshu.image}
                    alt={artists.kinshu.name}
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover object-center grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-secondary">
                    <span>KINSHU</span>
                    <span className="text-muted">PORTRAIT ARCHIVE</span>
                  </div>
                </div>

                {/* Tactile Synth Keys Inset (Bottom corner accent) */}
                <div className="hidden sm:block absolute -bottom-8 -right-8 w-44 aspect-[16/10] overflow-hidden rounded-sm border border-white/20 shadow-2xl bg-black">
                  <Image
                    src="/images/kinshu-hands.png"
                    alt="Kinshu playing MIDI synthesizer"
                    fill
                    loading="eager"
                    sizes="180px"
                    className="object-cover grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-1 right-2 text-[9px] font-mono text-accent-warm">
                    SESSION STILL
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Info & Text */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="font-mono text-xs text-muted">02</span>
                  <span className="font-mono-label text-[11px] tracking-widest text-accent-warm font-semibold">
                    {artists.kinshu.role}
                  </span>
                  <span className="text-muted">•</span>
                  <a
                    href={artistLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View NIYAM on Instagram"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] text-secondary hover:text-accent-warm transition-colors"
                  >
                    <InstagramIcon size={12} />
                    <span>{SITE_CONFIG.handle}</span>
                    <ArrowUpRight size={11} />
                  </a>
                </div>
                <h2 className="font-heading text-4xl sm:text-6xl text-primary tracking-tight uppercase mb-4">
                  {artists.kinshu.name}
                </h2>
                <p className="font-heading text-xl sm:text-2xl text-accent-warm tracking-wide mb-8">
                  &ldquo;{artists.kinshu.accentQuote}&rdquo;
                </p>

                <p className="font-sans text-secondary text-base sm:text-lg leading-relaxed mb-6 font-light">
                  {artists.kinshu.bio}
                </p>
              </div>

              {/* Pillars / Musical Focus */}
              <div className="pt-6 border-t border-white/[0.08]">
                <span className="font-mono-label text-[10px] tracking-widest text-muted uppercase block mb-3">
                  ARTISTIC FOCUS & CONTRIBUTIONS
                </span>
                <div className="flex flex-wrap gap-2">
                  {artists.kinshu.focus.map((pillar) => (
                    <span
                      key={pillar}
                      className="font-mono text-xs px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-primary"
                    >
                      {pillar}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05. VISUAL TIMELINE / STORY CHAPTERS */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 mb-32 md:mb-44">
        <div className="border-t border-white/[0.08] pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/[0.08] gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-accent-warm" />
                <span className="font-mono-label text-xs tracking-ultra text-primary font-bold">
                  THE TIMELINE
                </span>
              </div>
              <h2 className="font-heading text-4xl sm:text-6xl text-primary tracking-tight uppercase">
                CHRONICLES & MILESTONES
              </h2>
            </div>
            <span className="font-mono text-xs text-muted">
              4 DEFINING CHAPTERS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {storyChapters.map((chapter) => (
              <div
                key={chapter.num}
                className="relative p-8 rounded-sm border border-white/[0.08] bg-[#111111]/40 hover:bg-[#111111]/80 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-6 text-muted">
                    <span className="text-accent-warm font-bold">{chapter.num}</span>
                    <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[10px]">
                      {chapter.year}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl text-primary uppercase leading-tight mb-2 group-hover:text-accent-warm transition-colors">
                    {chapter.title}
                  </h3>

                  <span className="font-mono text-[11px] text-muted block mb-4 uppercase tracking-wider">
                    {chapter.subtitle}
                  </span>

                  <p className="font-sans text-secondary text-xs sm:text-sm leading-relaxed font-light">
                    {chapter.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-muted">
                  <span>CHAPTER ARCHIVE</span>
                  <Compass size={14} className="text-secondary group-hover:rotate-45 transition-transform duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06. BOTTOM TRANSITION TO MUSIC PAGE */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative p-10 sm:p-14 md:p-20 rounded-sm border border-white/10 bg-gradient-to-br from-[#111111] via-[#0d0d0d] to-[#080808] overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-warm/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs text-accent-warm">
                <Disc3 size={14} className="animate-spin-slow" />
                <span>CONTINUE THE JOURNEY</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-6xl text-primary tracking-tight uppercase leading-tight">
                HEAR THE SONGS
                <br />
                BORN FROM THIS STORY.
              </h2>
              <p className="font-sans text-secondary text-sm sm:text-base font-light">
                Listen to &ldquo;Tum Se Tum Tak&rdquo; and &ldquo;Afsana&rdquo; with official streaming links and interactive previews.
              </p>
            </div>

            <Link
              href="/music"
              className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-primary text-background font-mono-label text-xs tracking-ultra font-bold rounded-sm transition-all duration-300 hover:bg-accent-warm hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
            >
              <span>EXPLORE THE MUSIC</span>
              <ArrowRight size={15} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
