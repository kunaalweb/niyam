"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  Loader2,
  Clock,
  MapPin,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/siteConfig";
import { artistLinks } from "@/data/links";
import {
  InstagramIcon,
  SpotifyIcon,
  AppleMusicIcon,
  YouTubeIcon,
} from "@/components/ui/BrandIcons";

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "Booking / Live Performance",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const managementEmail = artistLinks.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(managementEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please enter your name.";
    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please provide a valid email format.";
    }
    if (!formData.subject.trim()) errs.subject = "Please enter a subject.";
    if (!formData.message.trim()) {
      errs.message = "Please write your message.";
    } else if (formData.message.trim().length < 15) {
      errs.message = "Message must be at least 15 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate editorial transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const directoryLinks = [
    {
      num: "01",
      label: "INSTAGRAM",
      value: SITE_CONFIG.handle,
      href: artistLinks.instagram,
      icon: <InstagramIcon size={14} className="text-secondary" />,
      isExternal: true,
    },
    {
      num: "02",
      label: "SPOTIFY",
      value: "Official Artist Profile",
      href: artistLinks.spotify,
      icon: <SpotifyIcon size={14} className="text-[#1DB954]" />,
      isExternal: true,
    },
    {
      num: "03",
      label: "APPLE MUSIC",
      value: "Official Artist Profile",
      href: artistLinks.appleMusic,
      icon: <AppleMusicIcon size={14} className="text-[#FA243C]" />,
      isExternal: true,
    },
    {
      num: "04",
      label: "YOUTUBE",
      value: "@niyamszn",
      href: artistLinks.youtube,
      icon: <YouTubeIcon size={14} className="text-[#FF0000]" />,
      isExternal: true,
    },
    {
      num: "05",
      label: "MANAGEMENT INBOX",
      value: managementEmail,
      href: `mailto:${managementEmail}`,
      icon: <Mail size={14} className="text-accent-warm" />,
      isExternal: false,
    },
  ];

  return (
    <main className="min-h-screen bg-[#080808] text-primary pt-28 md:pt-36 pb-28 overflow-hidden">
      {/* 01. CONTACT HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-32">
        <div className="flex flex-col gap-6 border-b border-white/[0.08] pb-14">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-accent-warm" />
              <span className="font-mono-label text-xs tracking-ultra text-primary font-bold">
                04 — DIRECT CORRESPONDENCE
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
            LET&apos;S STAY
            <br />
            <span className="text-secondary">CONNECTED.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-4">
            <p className="md:col-span-8 font-sans text-secondary text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl">
              For booking inquiries, press releases, synchronization licensing, or creative collaborations,
              reach out directly through our management channel or submit the correspondence form below.
            </p>

            <div className="md:col-span-4 flex items-center md:justify-end gap-3 font-mono text-xs text-muted">
              <span className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-primary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                MANAGEMENT ACTIVE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 02. TWO-COLUMN EDITORIAL CONTACT INTERFACE */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 mb-32 md:mb-44">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Column 1: Directory & Management Email */}
          <div className="lg:col-span-5 flex flex-col space-y-10">
            {/* Direct Email Card */}
            <div className="p-8 rounded-sm border border-white/10 bg-[#111111]/60 relative group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-label text-[11px] tracking-widest text-accent-warm font-semibold">
                  OFFICIAL INBOX
                </span>
                <span className="font-mono text-[10px] text-muted">DIRECT ROUTE</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl text-primary tracking-wide mb-2 break-all">
                {managementEmail}
              </h2>

              <p className="font-sans text-xs text-secondary mb-6 font-light">
                Direct route to Jey Khamari, Kinshu, and official representation.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyEmail}
                  className="font-mono text-xs px-4 py-2.5 rounded-sm border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] text-primary transition-all duration-300 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm min-h-[44px]"
                  aria-label="Copy management email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={13} className="text-[#10B981]" />
                      <span className="text-[#10B981]">COPIED TO CLIPBOARD</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>COPY ADDRESS</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${managementEmail}?subject=NIYAM%20Inquiry`}
                  className="font-mono text-xs px-4 py-2.5 rounded-sm bg-accent-warm text-white hover:bg-accent-warm/90 transition-all duration-300 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm min-h-[44px]"
                  aria-label={`Open mail app to send email to ${managementEmail}`}
                >
                  <Mail size={13} />
                  <span>OPEN MAIL APP</span>
                </a>
              </div>
            </div>

            {/* Social & Network Directory with Brand Icons */}
            <div className="space-y-4">
              <span className="font-mono-label text-[10px] tracking-widest text-muted uppercase block">
                OFFICIAL NETWORK DIRECTORY
              </span>

              <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
                {directoryLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                    aria-label={`Open ${link.label}`}
                    className="group py-4 flex items-center justify-between font-mono text-xs text-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-muted text-[10px]">{link.num}</span>
                      <span className="shrink-0">{link.icon}</span>
                      <span className="text-primary font-medium group-hover:text-accent-warm transition-colors">
                        {link.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-muted group-hover:text-secondary transition-colors text-[11px]">
                        {link.value}
                      </span>
                      <ArrowUpRight
                        size={13}
                        className="text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Location & Studio Details */}
            <div className="p-6 rounded-sm border border-white/[0.06] bg-[#0c0c0c] space-y-3 font-mono text-xs text-muted">
              <div className="flex items-center gap-2 text-secondary">
                <MapPin size={13} className="text-accent-warm" />
                <span>LOCATION: NEW DELHI, INDIA</span>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <Clock size={13} className="text-accent-warm" />
                <span>TYPICAL RESPONSE TIME: WITHIN 24–48 HOURS</span>
              </div>
            </div>
          </div>

          {/* Column 2: Editorial Validated Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 md:p-12 rounded-sm border border-white/10 bg-[#111111]/40 backdrop-blur-sm">
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl text-primary uppercase">
                    EDITORIAL INQUIRY FORM
                  </h3>
                  <p className="font-sans text-xs text-muted mt-1 font-light">
                    Direct transmission or correspondence with {managementEmail}
                  </p>
                </div>
                <ShieldCheck size={20} className="text-accent-warm" />
              </div>

              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-accent-warm/10 border border-accent-warm/30 flex items-center justify-center text-accent-warm">
                    <Check size={28} />
                  </div>

                  <div className="space-y-2 max-w-md">
                    <h4 className="font-heading text-2xl text-primary uppercase">
                      INQUIRY LOGGED
                    </h4>
                    <p className="font-sans text-secondary text-sm font-light">
                      Thank you for reaching out, {formData.name}. Your inquiry regarding{" "}
                      <span className="text-accent-warm">{formData.inquiryType}</span> has been formatted.
                      You can also dispatch directly via your native email client below.
                    </p>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-4 justify-center">
                    <a
                      href={`mailto:${managementEmail}?subject=${encodeURIComponent(
                        formData.subject || `Inquiry: ${formData.inquiryType}`
                      )}&body=${encodeURIComponent(
                        `From: ${formData.name} (${formData.email})\nInquiry Type: ${formData.inquiryType}\n\n${formData.message}`
                      )}`}
                      className="font-mono text-xs px-6 py-3.5 rounded-sm bg-accent-warm text-white hover:bg-accent-warm/90 transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white min-h-[44px]"
                    >
                      <Mail size={13} />
                      <span>DISPATCH VIA EMAIL CLIENT</span>
                      <ArrowUpRight size={13} />
                    </a>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          inquiryType: "Booking / Live Performance",
                          subject: "",
                          message: "",
                        });
                      }}
                      className="font-mono text-xs px-6 py-3.5 rounded-sm border border-white/10 text-secondary hover:text-primary hover:border-white/20 transition-all min-h-[44px]"
                    >
                      START NEW INQUIRY
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Name & Email Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono-label text-[10px] uppercase text-muted tracking-widest mb-2">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        placeholder="e.g. Maya Sharma"
                        className={`w-full px-4 py-3 rounded-sm bg-[#080808] border font-sans text-sm text-primary placeholder:text-muted/50 focus:outline-none transition-colors ${
                          errors.name
                            ? "border-red-500/80 focus:border-red-500"
                            : "border-white/10 focus:border-accent-warm"
                        }`}
                      />
                      {errors.name && (
                        <span className="font-mono text-[10px] text-red-400 mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block font-mono-label text-[10px] uppercase text-muted tracking-widest mb-2">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        placeholder="you@domain.com"
                        className={`w-full px-4 py-3 rounded-sm bg-[#080808] border font-sans text-sm text-primary placeholder:text-muted/50 focus:outline-none transition-colors ${
                          errors.email
                            ? "border-red-500/80 focus:border-red-500"
                            : "border-white/10 focus:border-accent-warm"
                        }`}
                      />
                      {errors.email && (
                        <span className="font-mono text-[10px] text-red-400 mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Inquiry Type Dropdown */}
                  <div>
                    <label className="block font-mono-label text-[10px] uppercase text-muted tracking-widest mb-2">
                      INQUIRY CATEGORY
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) =>
                        setFormData({ ...formData, inquiryType: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-sm bg-[#080808] border border-white/10 font-sans text-sm text-primary focus:outline-none focus:border-accent-warm transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Booking / Live Performance">
                        Booking / Live Performance
                      </option>
                      <option value="Press & Media Correspondence">
                        Press & Media Correspondence
                      </option>
                      <option value="Synchronization & Licensing">
                        Synchronization & Licensing
                      </option>
                      <option value="Creative Collaboration">
                        Creative Collaboration
                      </option>
                      <option value="General Correspondence">
                        General Correspondence
                      </option>
                    </select>
                  </div>

                  {/* Subject Line */}
                  <div>
                    <label className="block font-mono-label text-[10px] uppercase text-muted tracking-widest mb-2">
                      SUBJECT *
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => {
                        setFormData({ ...formData, subject: e.target.value });
                        if (errors.subject) setErrors({ ...errors, subject: "" });
                      }}
                      placeholder="Brief headline of your inquiry"
                      className={`w-full px-4 py-3 rounded-sm bg-[#080808] border font-sans text-sm text-primary placeholder:text-muted/50 focus:outline-none transition-colors ${
                        errors.subject
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-white/10 focus:border-accent-warm"
                      }`}
                    />
                    {errors.subject && (
                      <span className="font-mono text-[10px] text-red-400 mt-1 block">
                        {errors.subject}
                      </span>
                    )}
                  </div>

                  {/* Message Body */}
                  <div>
                    <label className="block font-mono-label text-[10px] uppercase text-muted tracking-widest mb-2">
                      YOUR MESSAGE *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: "" });
                      }}
                      placeholder="Provide details about dates, venue, concept, or your inquiry..."
                      className={`w-full px-4 py-3 rounded-sm bg-[#080808] border font-sans text-sm text-primary placeholder:text-muted/50 focus:outline-none transition-colors resize-none ${
                        errors.message
                          ? "border-red-500/80 focus:border-red-500"
                          : "border-white/10 focus:border-accent-warm"
                      }`}
                    />
                    {errors.message && (
                      <span className="font-mono text-[10px] text-red-400 mt-1 block">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button & Direct Fallback Note */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-background font-mono-label text-xs tracking-ultra font-bold rounded-sm transition-all duration-300 hover:bg-accent-warm hover:text-white disabled:opacity-50 min-h-[48px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>FORMATTING INQUIRY...</span>
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          <span>SUBMIT INQUIRY</span>
                        </>
                      )}
                    </button>

                    <p className="font-mono text-[10px] text-muted">
                      Prefer direct client? Write to{" "}
                      <a
                        href={`mailto:${managementEmail}`}
                        className="text-accent-warm hover:underline"
                      >
                        {managementEmail}
                      </a>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 03. BOTTOM RETURN TO HOME */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="border-t border-white/[0.08] pt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="font-heading text-xl text-primary">{SITE_CONFIG.bandName}</span>
            <span className="text-muted">•</span>
            <span className="font-mono text-xs text-secondary">{SITE_CONFIG.location}</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <Link
              href="/"
              className="text-secondary hover:text-accent-warm transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm py-1"
            >
              <span>RETURN TO HOME</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/story"
              className="text-secondary hover:text-accent-warm transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm py-1"
            >
              <span>DISCOVER OUR STORY</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
