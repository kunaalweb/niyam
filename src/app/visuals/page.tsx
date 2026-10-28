import React from "react";
import type { Metadata } from "next";
import VisualsPageClient from "@/components/visuals/VisualsPageClient";

export const metadata: Metadata = {
  title: "Visuals — NIYAM | Photography & Editorial Archive",
  description:
    "Monochrome studio portraits, cinematic film stills, and release cover art for Delhi-based pop duo NIYAM (Jey Khamari & Kinshu).",
  openGraph: {
    title: "Visuals — NIYAM",
    description:
      "Explore the visual archive of NIYAM: studio sessions, 35mm film stills, and artist portraits.",
    images: [{ url: "/images/duo-cinematic-clean.png" }],
  },
};

export default function VisualsPage() {
  return <VisualsPageClient />;
}
