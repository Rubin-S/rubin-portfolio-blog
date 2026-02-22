export type Typography = "serif" | "sans" | "mono";

export function typographyToClasses(t: Typography) {
  switch (t) {
    case "serif":
      return "font-serif leading-relaxed";
    case "sans":
      return "font-sans leading-relaxed";
    case "mono":
      return "font-mono leading-relaxed";
  }
}
