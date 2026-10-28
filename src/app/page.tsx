import React from "react";
import Hero from "@/components/Hero";
import HomeStoryPreview from "@/components/home/HomeStoryPreview";
import HomeMusicPreview from "@/components/home/HomeMusicPreview";
import HomeVisualsPreview from "@/components/home/HomeVisualsPreview";
import HomeContactPreview from "@/components/home/HomeContactPreview";

export const metadata = {
  title: "NIYAM — Official Artist Website",
  description:
    "Official homepage of NIYAM (@niyamszn), the Delhi-based independent pop duo featuring Jey Khamari and Kinshu. Atmospheric late-night anthems blending Hindi lyricism with cinematic production.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HomeStoryPreview />
      <HomeMusicPreview />
      <HomeVisualsPreview />
      <HomeContactPreview />
    </>
  );
}
