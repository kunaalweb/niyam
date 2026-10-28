"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ArrowRight,
  Camera,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { artistLinks } from "@/data/links";
import { InstagramIcon } from "@/components/ui/BrandIcons";

export default function VisualsPageClient() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  // Touch gesture support for mobile lightbox swipe
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const galleryItems = SITE_CONFIG.visualGallery;

  // Filtered gallery items
  const filteredItems = galleryItems.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.category === selectedFilter;
  });

  // Handle lightbox open
  const openLightbox = (index: number) => {
    setActiveItemIndex(index);
    document.body.style.overflow = "hidden";
  };

  // Handle lightbox close
  const closeLightbox = useCallback(() => {
    setActiveItemIndex(null);
    document.body.style.overflow = "auto";
  }, []);

  // Handle lightbox next
  const showNext = useCallback(() => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : 0
    );
  }, [activeItemIndex, filteredItems.length]);

  // Handle lightbox prev
  const showPrev = useCallback(() => {
    if (activeItemIndex === null) return;
    setActiveItemIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredItems.length) % filteredItems.length
        : 0
    );
  }, [activeItemIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeItemIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeItemIndex, closeLightbox, showNext, showPrev]);

  // Clean up body overflow if component unmounts while modal open
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Touch swipe handler
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      showNext();
    } else if (isRightSwipe) {
      showPrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Categories config
  const categories = [
    { id: "all", label: "ALL", count: galleryItems.length },
    {
      id: "portraits",
      label: "PORTRAITS",
      count: galleryItems.filter((i) => i.category === "portraits").length,
    },
    {
      id: "studio",
      label: "STUDIO SESSIONS",
      count: galleryItems.filter((i) => i.category === "studio").length,
    },
    {
      id: "covers",
      label: "COVERS",
      count: galleryItems.filter((i) => i.category === "covers").length,
    },
  ];

  const currentActiveItem =
    activeItemIndex !== null ? filteredItems[activeItemIndex] : null;

  return (
    <main className="min-h-screen bg-[#080808] text-primary pt-28 md:pt-36 pb-28 overflow-hidden">
      {/* 01. VISUALS HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-14">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent-warm" />
              <span className="font-mono-label text-xs tracking-ultra text-primary font-bold">
                03 — VISUAL ARCHIVE
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
            BETWEEN
            <br />
            <span className="text-secondary">THE FRAMES.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-4">
            <p className="md:col-span-8 font-sans text-secondary text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl">
              Monochrome studio sessions, high-contrast portraits, and tactile film stills capturing
              the intimate world of NIYAM. Curated from live recording spaces and release archives in New Delhi.
            </p>

            <div className="md:col-span-4 flex items-center md:justify-end gap-3 font-mono text-xs text-muted">
              <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-primary flex items-center gap-2">
                <Camera size={13} className="text-accent-warm" />
                {galleryItems.length} CURATED FRAMES
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 02. CATEGORY FILTER PILLS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((cat) => {
            const isActive = selectedFilter === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedFilter(cat.id);
                  setActiveItemIndex(null);
                }}
                className={`font-mono text-xs px-4 py-2 rounded-full border transition-all duration-300 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm ${
                  isActive
                    ? "bg-accent-warm text-white border-accent-warm font-bold"
                    : "border-white/10 bg-white/[0.02] text-secondary hover:text-primary hover:border-white/30"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-black/30 text-white" : "text-muted"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 03. ASYMMETRIC MASONRY / GRID GALLERY */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32 md:mb-44">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
          {filteredItems.map((item, index) => {
            // Asymmetric column spans for editorial balance
            let colSpan = "lg:col-span-6";
            if (index % 5 === 0) colSpan = "lg:col-span-8";
            else if (index % 5 === 1) colSpan = "lg:col-span-4";
            else if (index % 5 === 2) colSpan = "lg:col-span-4";
            else if (index % 5 === 3) colSpan = "lg:col-span-4";
            else if (index % 5 === 4) colSpan = "lg:col-span-4";

            return (
              <div
                key={item.id}
                className={`${colSpan} group relative cursor-pointer`}
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    openLightbox(index);
                  }
                }}
                aria-label={`Open photo lightbox: ${item.title}`}
              >
                <div
                  className={`relative ${item.aspect} w-full overflow-hidden rounded-sm border border-white/10 bg-[#111111] transition-all duration-500 group-hover:border-accent-warm/50 group-focus-visible:ring-1 group-focus-visible:ring-accent-warm`}
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    loading="eager"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                    className="object-cover object-center grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient & Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300" />

                  {/* Magnifier Hover Icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                    <Maximize2 size={14} />
                  </div>

                  {/* Metadata Stamp bottom */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-accent-warm">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-warm" />
                      <span>{item.categoryLabel}</span>
                    </div>

                    <h3 className="font-heading text-lg sm:text-xl text-primary uppercase tracking-wide truncate group-hover:text-accent-warm transition-colors">
                      {item.title}
                    </h3>

                    <p className="font-mono text-[10px] text-muted truncate mt-0.5">
                      {item.metadata}
                    </p>
                  </div>
                </div>

                {/* Subtle warm glow on hover */}
                <div className="absolute -inset-1 rounded-sm bg-accent-warm/0 blur-lg -z-10 group-hover:bg-accent-warm/10 transition-all duration-500" />
              </div>
            );
          })}
        </div>
      </section>

      {/* 04. FULLSCREEN INTERACTIVE LIGHTBOX MODAL */}
      {currentActiveItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6 md:p-10 transition-opacity duration-300 animate-fadeIn"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button Top Right */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close image lightbox"
          >
            <X size={22} />
          </button>

          {/* Navigation Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Navigation Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Next photo"
          >
            <ChevronRight size={24} />
          </button>

          {/* Lightbox Content Container */}
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Box */}
            <div className="relative w-full max-h-[70vh] aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-sm border border-white/15 bg-black shadow-2xl">
              <Image
                src={currentActiveItem.src}
                alt={currentActiveItem.title}
                fill
                sizes="(max-width: 1200px) 95vw, 1100px"
                className="object-contain"
                priority
              />
            </div>

            {/* Captions and Metadata Bar */}
            <div className="w-full mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-accent-warm font-semibold">
                    {currentActiveItem.categoryLabel}
                  </span>
                  <span className="text-muted">•</span>
                  <span className="font-mono text-xs text-muted">
                    {currentActiveItem.metadata}
                  </span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl text-primary uppercase mt-1">
                  {currentActiveItem.title}
                </h3>
                <p className="font-sans text-secondary text-xs sm:text-sm mt-1 max-w-2xl font-light">
                  {currentActiveItem.caption}
                </p>
              </div>

              {/* Counter & Keyboard / Touch Hint */}
              <div className="flex items-center gap-4 text-xs font-mono text-muted">
                <span className="px-3 py-1 rounded bg-white/10 border border-white/10 text-primary">
                  {String(activeItemIndex! + 1).padStart(2, "0")} /{" "}
                  {String(filteredItems.length).padStart(2, "0")}
                </span>
                <span className="hidden md:inline-block text-[11px] text-muted">
                  [← / → KEYS OR SWIPE TO BROWSE]
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 05. BOTTOM TRANSITION TO CONTACT PAGE */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative p-10 sm:p-14 md:p-20 rounded-sm border border-white/10 bg-gradient-to-br from-[#111111] via-[#0d0d0d] to-[#080808] overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-warm/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs text-accent-warm">
                <Sparkles size={14} />
                <span>CONNECT WITH NIYAM</span>
              </div>
              <h2 className="font-heading text-4xl sm:text-6xl text-primary tracking-tight uppercase leading-tight">
                WORK WITH US,
                <br />
                OR SAY HELLO.
              </h2>
              <p className="font-sans text-secondary text-sm sm:text-base font-light">
                Direct booking inquiries, press correspondence, or collaborative creative projects.
              </p>
            </div>

            <Link
              href="/contact"
              className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-primary text-background font-mono-label text-xs tracking-ultra font-bold rounded-sm transition-all duration-300 hover:bg-accent-warm hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
            >
              <span>GET IN TOUCH</span>
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
