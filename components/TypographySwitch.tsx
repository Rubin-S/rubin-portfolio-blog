"use client";
import { useTypography } from "./TypographyProvider";
import type { Typography } from "@/lib/typography";

const order: Typography[] = ["serif", "sans", "mono"];

export default function TypographySwitch() {
  const { typography, setTypography } = useTypography();

  const cycle = () => {
    const next = order[(order.indexOf(typography) + 1) % order.length];
    setTypography(next);
  };

  return (
    <button
      onClick={cycle}
      className="rounded-lg border border-zinc-900/10 dark:border-white/10 px-3 py-1 text-sm"
    >
      {typography === "serif" && "Aa Serif"}
      {typography === "sans" && "Aa Sans"}
      {typography === "mono" && "Aa Mono"}
    </button>
  );
}
