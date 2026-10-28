import { artistLinks } from "./links";

export interface MusicRelease {
  id: string;
  title: string;
  year: string;
  releaseDate: string;
  catalogNumber: string;
  description: string;
  credits: string;
  coverImage: string;
  featured?: boolean;
  audioPreview?: string;
  links: {
    spotify: string;
    appleMusic: string;
    youtube: string;
  };
}

export interface ArtistProfile {
  name: string;
  role: string;
  bio: string;
  focus: string[];
  image: string;
  accentQuote?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "portraits" | "studio" | "covers";
  categoryLabel: string;
  src: string;
  aspect: string;
  caption: string;
  metadata: string;
}

export interface StoryChapter {
  num: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
}

export const SITE_CONFIG = {
  bandName: "NIYAM",
  handle: "@niyamszn",
  location: "DELHI, INDIA",
  genre: "INDEPENDENT POP",
  tagline: "DELHI, INDIA — INDEPENDENT POP",
  shortIntro: "CINEMATIC MUSIC FOR PEOPLE WHO FEEL DEEPLY",
  duoIntro: {
    label: "01 — THE DUO",
    primary:
      "NIYAM IS A DELHI-BASED INDEPENDENT POP DUO MAKING CINEMATIC MUSIC FOR THOSE WHO FEEL EVERYTHING A LITTLE TOO DEEPLY.",
    secondary:
      "BLENDING HINDI LYRICISM WITH IMMERSIVE PRODUCTION, THEY TURN HEARTBREAK, LONGING, AND INTROSPECTION INTO ATMOSPHERIC ANTHEMS.",
    manifesto:
      "BORN FROM A SHARED LEAP OF FAITH, NIYAM CREATES HONEST, EMOTIONALLY DRIVEN SONGS DESIGNED NOT JUST TO BE HEARD, BUT TO BE TRULY FELT.",
    heroImage: "/images/duo-cinematic-clean.png",
  },
  artists: {
    jey: {
      name: "JEY KHAMARI",
      role: "SINGER-SONGWRITER / PRODUCER",
      bio: "My story began at my Nani's place in Subhash Nagar as a certified foodie carrying a guitar bigger than me. I chose feelings over music theory, and writing English songs to impress a school crush accidentally made me a songwriter. After studying audio engineering in Canada, returning home inspired me to write in Hindi. Today, I create honest music with NIYAM, surrounded by people who feel the exact same way.",
      focus: ["Hindi Lyricism", "Lead Vocals", "Acoustic Guitars", "Songcraft"],
      image: "/images/jey-clean.png",
      accentQuote: "FEELINGS OVER MUSIC THEORY",
    } as ArtistProfile,
    kinshu: {
      name: "KINSHU",
      role: "SINGER-SONGWRITER / PRODUCER",
      bio: "My journey started with a piano in 4th grade and became an obsession by 8th, breaking down records to teach myself production. I started in hip-hop, but college pushed me into singing, songwriting, and finding my true sound through some of my toughest life chapters. Realizing music was the only life I wanted, a close friend believed in the dream, quit his job, and took the leap with me. Together, we built NIYAM.",
      focus: ["Audio Production", "Sound Design", "Synthesizers", "Arrangement"],
      image: "/images/kinshu-perfect.png",
      accentQuote: "A SHARED LEAP OF FAITH",
    } as ArtistProfile,
  },
  storyChapters: [
    {
      num: "01",
      year: "EARLY YEARS",
      title: "THE GUITAR & THE BEDROOM PIANO",
      subtitle: "SUBHASH NAGAR, NEW DELHI",
      description:
        "Jey's journey took shape carrying an oversized acoustic guitar, prioritizing honest raw emotions over rigid music theory. Simultaneously, Kinshu discovered the piano in 4th grade, turning an early curiosity into obsessive bedroom production by 8th grade.",
    },
    {
      num: "02",
      year: "EXPANSION",
      title: "STUDIES ABROAD & THE RETURN HOME",
      subtitle: "CANADA TO NEW DELHI",
      description:
        "After pursuing formal audio engineering in Canada, Jey returned home with a profound artistic clarity: his true voice lived in Hindi lyricism and poetic vulnerability. Kinshu broadened his sonic palette from raw hip-hop beats into melodic synthesizers and cinematic arrangement.",
    },
    {
      num: "03",
      year: "THE LEAP",
      title: "FOUNDING NIYAM",
      subtitle: "A SHARED COMMITMENT",
      description:
        "Believing completely in the collective dream, steady jobs were resigned and everything was invested into building NIYAM. Late-night studio sessions birthed a cohesive sonic architecture: deeply textured reverb, organic guitars, and driving modern basslines.",
    },
    {
      num: "04",
      year: "PRESENT",
      title: "SONGS BUILT TO BE TRULY FELT",
      subtitle: "AFSANA TO TUM SE TUM TAK",
      description:
        "From the melancholic acoustic intimacy of 'Afsana' to the driving modern indie-pop momentum of 'Tum Se Tum Tak', NIYAM continues to forge music for those navigating heartbreak, distance, and self-discovery.",
    },
  ] as StoryChapter[],
  releases: [
    {
      id: "tum-se-tum-tak",
      title: "TUM SE TUM TAK",
      year: "2026",
      releaseDate: "OCTOBER 15, 2026",
      catalogNumber: "NYM-007",
      description:
        "A soulful blend of modern indie-pop with traditional vocal layers, driving basslines, and immersive atmospheric production exploring the spaces between departure and return.",
      credits: "Written & Performed by Jey Khamari & Kinshu • Produced by NIYAM • Mastered in New Delhi",
      coverImage: "/images/covers/tum-se-tum-tak.png",
      featured: true,
      links: {
        spotify: artistLinks.spotify,
        appleMusic: artistLinks.appleMusic,
        youtube: artistLinks.youtube,
      },
    },
    {
      id: "zikr",
      title: "ZIKR",
      year: "2026",
      releaseDate: "2026",
      catalogNumber: "NYM-006",
      description:
        "A meditative, architectural soundscape of recurring memories and quiet affirmations, weaving repetitive melodic motifs with warm analog synthesis.",
      credits: "Composition & Production by Jey Khamari & Kinshu • NIYAM Audio Labs",
      coverImage: "/images/covers/zikr.png",
      featured: true,
      links: {
        spotify: artistLinks.spotify,
        appleMusic: artistLinks.appleMusic,
        youtube: artistLinks.youtube,
      },
    },
    {
      id: "behisaab",
      title: "BEHISAAB",
      year: "2025",
      releaseDate: "2025",
      catalogNumber: "NYM-005",
      description:
        "An expansive, emotionally unmeasured ballad capturing infinite longing through sweeping atmospheric pads, delicate falsettos, and acoustic cadence.",
      credits: "Lyrics & Acoustic Guitars by Jey Khamari • Sound Design & Mix by Kinshu",
      coverImage: "/images/covers/behisaab.png",
      featured: false,
      links: {
        spotify: artistLinks.spotify,
        appleMusic: artistLinks.appleMusic,
        youtube: artistLinks.youtube,
      },
    },
    {
      id: "iraada",
      title: "IRAADA",
      year: "2025",
      releaseDate: "2025",
      catalogNumber: "NYM-004",
      description:
        "A pulsing, resolve-driven anthem fueled by neon-drenched synth textures, driving percussion, and an unwavering commitment to holding on.",
      credits: "Vocals & Composition by Jey Khamari • Synthesizers & Arrangement by Kinshu",
      coverImage: "/images/covers/iraada.png",
      featured: false,
      links: {
        spotify: artistLinks.spotify,
        appleMusic: artistLinks.appleMusic,
        youtube: artistLinks.youtube,
      },
    },
    {
      id: "kya-karu",
      title: "KYA KARU",
      year: "2025",
      releaseDate: "2025",
      catalogNumber: "NYM-003",
      description:
        "A rhythmic, heartfelt exploration of confusion and emotional surrender, intertwining buoyant indie-pop melodies with earnest Hindi songwriting.",
      credits: "Written & Performed by Jey Khamari & Kinshu • Produced by NIYAM",
      coverImage: "/images/covers/kya-karu.png",
      featured: false,
      links: {
        spotify: artistLinks.spotify,
        appleMusic: artistLinks.appleMusic,
        youtube: artistLinks.youtube,
      },
    },
    {
      id: "kami",
      title: "KAMI",
      year: "2025",
      releaseDate: "2025",
      catalogNumber: "NYM-002",
      description:
        "A poignant narrative on absence and solitude amidst the overwhelming rush of urban New Delhi, underscored by melancholic piano and resonant bass.",
      credits: "Written & Arranged by NIYAM • Vocals by Jey Khamari • Keys by Kinshu",
      coverImage: "/images/covers/kami.png",
      featured: false,
      links: {
        spotify: artistLinks.spotify,
        appleMusic: artistLinks.appleMusic,
        youtube: artistLinks.youtube,
      },
    },
    {
      id: "afsana",
      title: "AFSANA",
      year: "2025",
      releaseDate: "2025",
      catalogNumber: "NYM-001",
      description:
        "An introspective cinematic debut anthem turning heartbreak and quiet vulnerability into rich acoustic chords, poignant Hindi poetry, and late-night reverb.",
      credits: "Lead Vocals & Guitars by Jey Khamari • Keys & Production by Kinshu",
      coverImage: "/images/covers/afsana.png",
      featured: true,
      links: {
        spotify: artistLinks.spotify,
        appleMusic: artistLinks.appleMusic,
        youtube: artistLinks.youtube,
      },
    },
  ] as MusicRelease[],
  visualGallery: [
    {
      id: "frame-01",
      title: "STUDIO AMBER ILLUMINATION",
      category: "studio",
      categoryLabel: "STUDIO SESSIONS",
      src: "/images/duo-cinematic-clean.png",
      aspect: "aspect-[16/10]",
      caption: "Jey Khamari and Kinshu during late-night studio session in New Delhi under warm side lighting.",
      metadata: "35MM FILM • AMBER TONE • NEW DELHI",
    },
    {
      id: "frame-02",
      title: "JEY KHAMARI — MONOCHROME PROFILE",
      category: "portraits",
      categoryLabel: "ARTIST PORTRAIT",
      src: "/images/jey-clean.png",
      aspect: "aspect-[3/4]",
      caption: "Jey Khamari looking upward into directional studio lighting.",
      metadata: "HIGH CONTRAST • MONOCHROME • VOCALS",
    },
    {
      id: "frame-03",
      title: "KINSHU — KEYS & SYNTHESIS",
      category: "portraits",
      categoryLabel: "ARTIST PORTRAIT",
      src: "/images/kinshu-perfect.png",
      aspect: "aspect-[3/4]",
      caption: "Kinshu seated with mini MIDI keyboard synthesizer during sound architecture development.",
      metadata: "MONOCHROME • SOUND ARCHITECTURE • SYNTHS",
    },
    {
      id: "frame-04",
      title: "THE DUO OUTLINE — HERO CUTOUT",
      category: "studio",
      categoryLabel: "STUDIO SESSIONS",
      src: "/images/hero-duo.png",
      aspect: "aspect-[4/3]",
      caption: "Monochrome dual silhouette of NIYAM emerging from shadow with graphic outline.",
      metadata: "STUDIO CUTOUT • ARTIST ARCHIVE",
    },
    {
      id: "frame-05",
      title: "TUM SE TUM TAK — COVER ARTWORK",
      category: "covers",
      categoryLabel: "SINGLE ARTWORK",
      src: "/images/covers/tum-se-tum-tak.png",
      aspect: "aspect-square",
      caption: "Official single cover for 'Tum Se Tum Tak' featuring dual film-grain framing and alleyway typography.",
      metadata: "RELEASE 2026 • CATALOG NYM-007",
    },
    {
      id: "frame-06",
      title: "ZIKR — COVER ARTWORK",
      category: "covers",
      categoryLabel: "SINGLE ARTWORK",
      src: "/images/covers/zikr.png",
      aspect: "aspect-square",
      caption: "Official single cover for 'Zikr' showcasing architectural nine-window geometry.",
      metadata: "RELEASE 2026 • CATALOG NYM-006",
    },
    {
      id: "frame-07",
      title: "BEHISAAB — COVER ARTWORK",
      category: "covers",
      categoryLabel: "SINGLE ARTWORK",
      src: "/images/covers/behisaab.png",
      aspect: "aspect-square",
      caption: "Official single cover for 'Behisaab' with melancholic blurred street photography and Hindi title.",
      metadata: "RELEASE 2025 • CATALOG NYM-005",
    },
    {
      id: "frame-08",
      title: "IRAADA — COVER ARTWORK",
      category: "covers",
      categoryLabel: "SINGLE ARTWORK",
      src: "/images/covers/iraada.png",
      aspect: "aspect-square",
      caption: "Official single cover for 'Iraada' featuring warm amber neon typography.",
      metadata: "RELEASE 2025 • CATALOG NYM-004",
    },
    {
      id: "frame-09",
      title: "KYA KARU — COVER ARTWORK",
      category: "covers",
      categoryLabel: "SINGLE ARTWORK",
      src: "/images/covers/kya-karu.png",
      aspect: "aspect-square",
      caption: "Official single cover for 'Kya Karu' with textured indie layout and subtle floral accents.",
      metadata: "RELEASE 2025 • CATALOG NYM-003",
    },
    {
      id: "frame-10",
      title: "KAMI — COVER ARTWORK",
      category: "covers",
      categoryLabel: "SINGLE ARTWORK",
      src: "/images/covers/kami.png",
      aspect: "aspect-square",
      caption: "Official single cover for 'Kami' featuring the yellow railway board sign in monochrome Delhi crowd.",
      metadata: "RELEASE 2025 • CATALOG NYM-002",
    },
    {
      id: "frame-11",
      title: "AFSANA — COVER ARTWORK",
      category: "covers",
      categoryLabel: "SINGLE ARTWORK",
      src: "/images/covers/afsana.png",
      aspect: "aspect-square",
      caption: "Official debut single cover for 'Afsana' with high-contrast monochrome profile and vintage parchment aesthetic.",
      metadata: "RELEASE 2025 • CATALOG NYM-001",
    },
    {
      id: "frame-12",
      title: "HANDS ON CONTROLLER",
      category: "studio",
      categoryLabel: "STUDIO SESSIONS",
      src: "/images/kinshu-hands.png",
      aspect: "aspect-[16/9]",
      caption: "Close-up of Kinshu shaping synthesizers and chords on hardware MIDI keys.",
      metadata: "TACTILE SYNTHESIS • SESSION STILL",
    },
    {
      id: "frame-13",
      title: "WARM PROFILE REFLECTION",
      category: "portraits",
      categoryLabel: "ARTIST PORTRAIT",
      src: "/images/jey-amber.png",
      aspect: "aspect-[3/4]",
      caption: "Jey Khamari in quiet introspection during vocal arrangement sessions.",
      metadata: "WARM REFLECTION • INTROSPECTION",
    },
    {
      id: "frame-14",
      title: "TUM SE TUM TAK — CINEMATIC TITLE FRAME",
      category: "covers",
      categoryLabel: "CINEMATIC VISUALIZER",
      src: "/images/covers/tum-se-tum-tak-wide.png",
      aspect: "aspect-[16/9]",
      caption: "Widescreen 16:9 cinematic title visualizer frame for 'Tum Se Tum Tak'.",
      metadata: "CINEMATIC 16:9 • VISUALIZER ARCHIVE",
    },
  ] as GalleryItem[],
  visualInterlude: {
    statement: "SOME THINGS ARE BETTER FELT THAN EXPLAINED.",
    subtext: "BETWEEN THE FRAMES — NEW DELHI",
    image: "/images/duo-cinematic-clean.png",
  },
  navigation: [
    { label: "HOME", href: "/" },
    { label: "STORY", href: "/story" },
    { label: "MUSIC", href: "/music" },
    { label: "VISUALS", href: "/visuals" },
    { label: "CONTACT", href: "/contact" },
  ],
  socials: {
    instagram: artistLinks.instagram,
    spotify: artistLinks.spotify,
    appleMusic: artistLinks.appleMusic,
    youtube: artistLinks.youtube,
    email: artistLinks.email,
  },
  footer: {
    brandStatement: "INDEPENDENT MUSIC. HONEST FEELINGS.",
    copyright: "© 2026 NIYAM. ALL RIGHTS RESERVED.",
    locationText: "NEW DELHI • INDIA",
  },
};
