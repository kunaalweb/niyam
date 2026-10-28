"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, Instagram } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.from(headlineRef.current, {
          y: 25,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }

      const linkItems = linksRef.current?.querySelectorAll(".editorial-link-row");
      if (linkItems && linkItems.length > 0) {
        gsap.from(linkItems, {
          y: 15,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: linksRef.current,
            start: "top 95%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactLinks = [
    {
      num: "01",
      name: "INSTAGRAM",
      meta: "@niyamszn",
      url: SITE_CONFIG.socials.instagram,
    },
    {
      num: "02",
      name: "SPOTIFY",
      meta: "ARTIST PROFILE",
      url: SITE_CONFIG.socials.spotify,
    },
    {
      num: "03",
      name: "APPLE MUSIC",
      meta: "DISCOGRAPHY",
      url: SITE_CONFIG.socials.appleMusic,
    },
    {
      num: "04",
      name: "YOUTUBE",
      meta: "MUSIC VIDEOS & SESSIONS",
      url: SITE_CONFIG.socials.youtube,
    },
    {
      num: "05",
      name: "MANAGEMENT / BOOKINGS",
      meta: SITE_CONFIG.socials.email,
      url: `mailto:${SITE_CONFIG.socials.email}?subject=NIYAM%20Booking%20/%20Inquiry`,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-28 md:py-44 bg-[#080808] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Accent Glow */}
      <div
        className="ambient-glow w-[500px] h-[500px] bottom-0 left-1/3 opacity-25"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 mb-16 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent-warm" />
            <span className="font-mono-label text-xs tracking-ultra text-primary font-bold">
              05 — GET IN TOUCH
            </span>
          </div>
          <span className="font-mono-label text-[11px] text-muted tracking-widest hidden sm:inline-block">
            DIRECT INQUIRIES & PLATFORMS
          </span>
        </div>

        {/* Large Editorial Headline */}
        <div className="max-w-5xl mb-20 md:mb-28">
          <h2
            ref={headlineRef}
            className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-primary tracking-tighter leading-[0.9] uppercase"
          >
            LET&apos;S STAY <br />
            <span className="text-secondary/70">CONNECTED.</span>
          </h2>
        </div>

        {/* Editorial Link Rows (inspired by reference styling) */}
        <div ref={linksRef} className="border-t border-white/[0.08] divide-y divide-white/[0.08]">
          {contactLinks.map((item) => (
            <a
              key={item.num}
              href={item.url}
              target={item.url.startsWith("mailto:") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="editorial-link-row group flex flex-col sm:flex-row sm:items-center justify-between py-8 px-2 hover:bg-white/[0.02] transition-all duration-300"
            >
              <div className="flex items-baseline gap-6 sm:gap-12">
                <span className="font-mono text-xs text-muted group-hover:text-accent-warm transition-colors">
                  {item.num}
                </span>
                <span className="font-heading text-2xl sm:text-3xl md:text-4xl text-primary group-hover:text-accent-warm tracking-tight transition-colors">
                  {item.name}
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 mt-3 sm:mt-0">
                <span className="font-mono-label text-xs text-muted group-hover:text-secondary transition-colors">
                  {item.meta}
                </span>
                <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-warm group-hover:bg-accent-warm group-hover:text-black transition-all duration-300">
                  <ArrowUpRight
                    size={16}
                    className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Direct Email Callout */}
        <div className="mt-20 p-8 md:p-12 bg-[#111111] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="font-mono-label text-[10px] text-accent-warm tracking-widest">
              OFFICIAL MANAGEMENT
            </span>
            <p className="font-display font-bold text-xl md:text-2xl text-primary">
              For live bookings, festival curation, and scoring collaborations:
            </p>
          </div>

          <a
            href={`mailto:${SITE_CONFIG.socials.email}`}
            className="inline-flex items-center gap-3 font-mono-label text-xs px-6 py-4 bg-primary text-black font-bold uppercase tracking-wider hover:bg-accent-warm transition-colors shrink-0"
          >
            <Mail size={16} />
            <span>EMAIL MANAGEMENT</span>
          </a>
        </div>
      </div>
    </section>
  );
}
