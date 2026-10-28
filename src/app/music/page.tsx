import React from "react";
import type { Metadata } from "next";
import MusicPageClient from "@/components/music/MusicPageClient";

export const metadata: Metadata = {
  title: "Music & Releases — NIYAM | Official Discography",
  description:
    "Explore the complete discography of Delhi-based independent pop duo NIYAM (@niyamszn). Stream 'Tum Se Tum Tak' and 'Afsana'.",
  openGraph: {
    title: "Music & Releases — NIYAM",
    description:
      "Listen to the official catalog of NIYAM featuring Jey Khamari & Kinshu. Available on Spotify, Apple Music, and YouTube.",
    images: [{ url: "/images/tum-se-tum-tak.png" }],
  },
};

export default function MusicPage() {
  return <MusicPageClient />;
}
