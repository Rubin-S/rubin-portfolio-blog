"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { typographyToClasses, Typography } from "@/lib/typography";

const TypographyContext = createContext<{
  typography: Typography;
  setTypography: (t: Typography) => void;
}>({
  typography: "serif",
  setTypography: () => {},
});

export function TypographyProvider({ children }: { children: React.ReactNode }) {
  const [typography, setTypography] = useState<Typography>("serif");

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("rubin-typography");
    if (stored && ["serif", "sans", "mono"].includes(stored)) {
      setTypography(stored as Typography);
    }
  }, []);

  // Persist on change
  useEffect(() => {
    localStorage.setItem("rubin-typography", typography);
  }, [typography]);

  return (
    <TypographyContext.Provider value={{ typography, setTypography }}>
      <div className={typographyToClasses(typography)}>
        {children}
      </div>
    </TypographyContext.Provider>
  );
}

export function useTypography() {
  return useContext(TypographyContext);
}
