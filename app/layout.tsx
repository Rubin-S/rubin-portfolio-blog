import type { Metadata } from "next";
import { Inter, Literata, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import "./globals.css";

// 1. Configure Fonts with Variable Support (Performance)
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Literata({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// 2. Define Global SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://www.rubz.fun/"),
  title: {
    default: "Rubin S | Developer & Writer",
    template: "%s | Rubin S",
  },
  description:
    "Rubin S is a developer and writer building digital experiences. Explore the portfolio, blog, and projects of a creative engineer.",
  keywords: [
    "Rubin",
    "Rubin S",
    "Rubin Portfolio",
    "Developer",
    "Writer",
    "Software Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Web Development",
    "Engineering",
    "Blog",
    "Creative Developer",
    "Frontend Engineer",
    "Full Stack",
  ],
  authors: [
    {
      name: "Rubin S",
      url: "https://www.rubz.fun/",
    },
  ],
  creator: "Rubin S",
  publisher: "Rubin S",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rubz.fun/",
    title: "Rubin S | Developer & Writer",
    description: "Personal digital garden and portfolio of Rubin S. Engineering, design, and thoughts.",
    siteName: "Rubin S",
    images: [
      {
        url: "https://placehold.co/1200x630/1a1a1a/ffffff?text=NANO+Banana+Pro",
        width: 1200,
        height: 630,
        alt: "Rubin S - NANO Banana Pro",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rubin S | Developer & Writer",
    description: "Personal digital garden and portfolio of Rubin S.",
    images: ["https://placehold.co/1200x630/1a1a1a/ffffff?text=NANO+Banana+Pro"],
    creator: "@rubin_s", // Placeholder, update if known
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.rubz.fun/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rubin S",
  url: "https://www.rubz.fun/",
  sameAs: [
    "https://github.com/rubin-s", // Placeholder
    "https://twitter.com/rubin_s", // Placeholder
    "https://linkedin.com/in/rubin-s", // Placeholder
  ],
  jobTitle: "Software Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Self-Employed",
  },
};

// 3. The Root Layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased selection:bg-foreground selection:text-background",
          fontSans.variable,
          fontSerif.variable,
          fontMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}