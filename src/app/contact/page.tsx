import React from "react";
import type { Metadata } from "next";
import ContactPageClient from "@/components/contact/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact & Management — NIYAM | Delhi Pop Duo",
  description:
    "Get in touch with NIYAM for booking inquiries, press correspondence, and collaborations. Management inbox: management@niyamszn.com.",
  openGraph: {
    title: "Contact & Management — NIYAM",
    description:
      "Direct correspondence for Delhi independent pop duo NIYAM (Jey Khamari & Kinshu).",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
