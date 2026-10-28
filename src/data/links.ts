/**
 * Centralized External Links Configuration
 * Verified official NIYAM profiles, streaming destinations, and correspondence endpoints.
 */

export const artistLinks = {
  instagram: "https://www.instagram.com/niyamszn/",
  spotify:
    "https://open.spotify.com/artist/5gSTgaslwP1tp7SO8cHBYL?si=wxhMlgu2SXSd9GpGpObQcA",
  youtube: "https://www.youtube.com/@niyamszn",
  appleMusic: "https://music.apple.com/us/artist/niyam/1851575978",
  email: "management@niyamszn.com",
} as const;

export type ArtistLinks = typeof artistLinks;
