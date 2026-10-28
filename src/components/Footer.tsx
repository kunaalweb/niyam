"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { artistLinks } from "@/data/links";
import {
  InstagramIcon,
  SpotifyIcon,
  AppleMusicIcon,
  YouTubeIcon,
} from "@/components/ui/BrandIcons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      name: "INSTAGRAM",
      href: artistLinks.instagram,
      icon: <InstagramIcon size={14} className="text-current" />,
      tag: SITE_CONFIG.handle,
    },
    {
      name: "SPOTIFY",
      href: artistLinks.spotify,
      icon: <SpotifyIcon size={14} className="text-current" />,
      tag: "ARTIST PROFILE",
    },
    {
      name: "APPLE MUSIC",
      href: artistLinks.appleMusic,
      icon: <AppleMusicIcon size={14} className="text-current" />,
      tag: "ARTIST PROFILE",
    },
    {
      name: "YOUTUBE",
      href: artistLinks.youtube,
      icon: <YouTubeIcon size={14} className="text-current" />,
      tag: "@niyamszn",
    },
  ];

  return (
    <footer className="w-full bg-[#050505] border-t border-white/[0.08] text-muted py-14 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col space-y-10">
        {/* Top Footer Row: Wordmark, Brand Statement & Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/[0.06]">
          <div>
            <Link
              href="/"
              className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary tracking-ultra block hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
              aria-label="NIYAM — Return to top"
            >
              {SITE_CONFIG.bandName}
            </Link>
            <p className="font-mono-label text-xs text-accent-warm tracking-widest mt-2">
              {SITE_CONFIG.footer.brandStatement}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 font-mono-label text-xs">
            {SITE_CONFIG.navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm py-1"
              >
                {item.label}
              </Link>
            ))}

            {/* Functional Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-primary hover:text-accent-warm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm rounded-sm py-1 min-h-[36px]"
              aria-label="Back to top of page"
            >
              <span>BACK TO TOP</span>
              <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent-warm group-hover:-translate-y-0.5 transition-all duration-300">
                <ArrowUp size={13} />
              </div>
            </button>
          </div>
        </div>

        {/* Middle Row: Verified Social & Streaming Links with Icons */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.04]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Official NIYAM on ${link.name}`}
                className="group flex items-center gap-2 font-mono-label text-xs text-secondary hover:text-primary transition-colors py-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
              >
                <span className="text-muted group-hover:text-accent-warm transition-colors">
                  {link.icon}
                </span>
                <span>{link.name}</span>
                <ArrowUpRight
                  size={12}
                  className="text-muted group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            ))}
          </div>

          {/* Direct Email link */}
          <a
            href={`mailto:${artistLinks.email}`}
            className="group flex items-center gap-2 font-mono text-xs text-secondary hover:text-primary transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
            aria-label={`Send email to ${artistLinks.email}`}
          >
            <Mail size={13} className="text-muted group-hover:text-accent-warm transition-colors" />
            <span>{artistLinks.email}</span>
          </a>
        </div>

        {/* Bottom Metadata & Legal */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-muted">
          <p>{SITE_CONFIG.footer.copyright}</p>
          <p>{SITE_CONFIG.footer.locationText} • {SITE_CONFIG.genre}</p>
        </div>
      </div>
    </footer>
  );
}
