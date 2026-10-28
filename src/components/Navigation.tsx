"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/data/siteConfig";
import { artistLinks } from "@/data/links";
import { Menu, X } from "lucide-react";
import { InstagramIcon } from "@/components/ui/BrandIcons";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-[#080808]/90 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* NIYAM Wordmark (Returns to Home) */}
          <Link
            href="/"
            className="group flex items-center gap-2 tracking-ultra font-heading text-xl md:text-2xl text-primary transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm px-1 rounded-sm"
            aria-label="NIYAM — Return to Homepage"
          >
            <span>{SITE_CONFIG.bandName}</span>
            <span
              className={`w-1.5 h-1.5 rounded-full bg-accent-warm transition-opacity duration-300 ${
                pathname === "/" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            />
          </Link>

          {/* Desktop Navigation Links: HOME | STORY | MUSIC | VISUALS | CONTACT */}
          <nav className="hidden md:flex items-center space-x-9" aria-label="Main Navigation">
            {SITE_CONFIG.navigation.map((item, index) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`group relative font-mono-label text-xs transition-colors duration-300 py-1.5 px-0.5 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm rounded-sm ${
                    isActive ? "text-primary font-bold" : "text-secondary hover:text-primary"
                  }`}
                >
                  <span className="text-[10px] text-muted font-mono">0{index + 1}</span>
                  <span>{item.label}</span>
                  {/* Refined Active Indicator Underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-accent-warm transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}

            {/* Quick Instagram Pill Link */}
            <a
              href={artistLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow NIYAM on Instagram"
              className="group font-mono-label text-[11px] px-3.5 py-1.5 rounded-full border border-white/10 text-secondary hover:text-primary hover:border-accent-warm/50 transition-all duration-300 hover:bg-white/[0.03] flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
            >
              <InstagramIcon
                size={12}
                className="text-secondary group-hover:text-accent-warm transition-colors"
              />
              <span>{SITE_CONFIG.handle}</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-primary p-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm rounded-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#080808]/98 backdrop-blur-2xl md:hidden transition-all duration-500 ease-in-out flex flex-col justify-between px-8 py-24 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col space-y-6 mt-6">
          <p className="font-mono-label text-xs text-muted">INDEX // NAVIGATION</p>
          {SITE_CONFIG.navigation.map((item, index) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-baseline justify-between font-heading text-4xl transition-colors py-3 border-b border-white/5 ${
                  isActive ? "text-accent-warm" : "text-primary hover:text-accent-warm"
                }`}
              >
                <div className="flex items-center gap-3">
                  {isActive && <span className="w-2 h-2 rounded-full bg-accent-warm" />}
                  <span>{item.label}</span>
                </div>
                <span className="font-mono text-xs text-muted">0{index + 1}</span>
              </Link>
            );
          })}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col space-y-3">
          <p className="font-mono-label text-[10px] text-muted">
            {SITE_CONFIG.tagline}
          </p>
          <a
            href={artistLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit NIYAM on Instagram"
            className="group font-mono-label text-sm text-accent-warm hover:underline flex items-center gap-2 py-2"
          >
            <InstagramIcon size={14} />
            <span>{SITE_CONFIG.handle}</span>
            <span className="text-muted group-hover:translate-x-0.5 transition-transform">↗</span>
          </a>
        </div>
      </div>
    </>
  );
}
