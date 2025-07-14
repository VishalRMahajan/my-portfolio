import { Archivo_Black, Space_Grotesk } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import AppShell from "@/components/AppShell";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-head",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vishalrmahajan.in"),
  title: {
    default: "Hi, I'm Vishal Mahajan",
    template: "%s | Vishal Mahajan",
  },
  description:
    "Hey, I’m Vishal Mahajan aka VishalRMahajan. This is my little corner of the internet. Feel free to scroll through.",
  keywords: [
    "Vishal Mahajan",
    "Vishal R Mahajan",
    "VishalRMahajan",
    "Vishal Rajesh Mahajan",
    "Software Engineer",
    "React Developer",
    "Node.js Developer",
    "Backend Developer",
    "Software Development",
    "Portfolio",
    "Pixel retro portfolio",
    "vishal",
    "vishalrmahajan",
  ],
  openGraph: {
    title: "Vishal Mahajan",
    description:
      "Hey, I’m Vishal Mahajan aka VishalRMahajan. This is my little corner of the internet. Feel free to scroll through.",
    url: "https://vishalrmahajan.in",
    siteName: "Vishal Mahajan | Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://vishalrmahajan.in/VishalRMahajanOgCard.png",
        width: 1200,
        height: 630,
        alt: "Vishal Rajesh Mahajan",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@VishalRMahajan",
    creator: "@VishalRMahajan",
    title: "Vishal Mahajan",
    description:
      "Hey, I’m Vishal Mahajan aka VishalRMahajan. This is my little corner of the internet. Feel free to scroll through.",
    images: [
      {
        url: "https://vishalrmahajan.in/VishalRMahajanOgCard.png",
        width: 1200,
        height: 630,
        alt: "Vishal Rajesh Mahajan",
      },
    ],
  },
  verification: {
    other: {
      me: [
        "https://github.com/VishalRMahajan",
        "https://linkedin.com/in/VishalRMahajan",
        "https://twitter.com/VishalRMahajan",
        "https://instagram.com/VishalRMahajan",
      ],
    },
  },
  alternates: {
    canonical: "https://vishalrmahajan.in",
    languages: {
      "en-US": "https://vishalrmahajan.in",
    },
  },
  category: "technology & web development",
  authors: [
    {
      name: "Vishal Mahajan",
      url: "https://vishalrmahajan.in",
    },
  ],
  creator: "Vishal Mahajan",
  publisher: "Vishal Rajesh Mahajan",
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
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Vishal Mahajan",
  alternateName: [
    "Vishal R Mahajan",
    "Vishal Rajesh Mahajan",
    "VishalRMahajan",
  ],
  description:
    "Hey, I’m Vishal Mahajan aka VishalRMahajan. This is my little corner of the internet. Feel free to scroll through.",
  image: "https://vishalrmahajan.in/Vishal_Mahajan.png",
  url: "https://vishalrmahajan.in",
  sameAs: [
    "https://github.com/VishalRMahajan",
    "https://linkedin.com/in/VishalRMahajan",
    "https://twitter.com/VishalRMahajan",
    "https://instagram.com/VishalRMahajan",
  ],
  jobTitle: "Backend Developer",
  worksFor: [
    {
      "@type": "Organization",
      name: "",
      description: "",
    },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "St Francis Institute of Technology",
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
    },
  },
  knowsAbout: [
    "React",
    "Node.js",
    "Python",
    "C++",
    "Machine Learning",
    "MongoDb",
    "ExpressJS",
    "Leadership",
    "TypeScript",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  seeks: "Full time Roles, Freelance Projects, Internships and Collaborations",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Personal",
    email: "vism06@gmail.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${archivoBlack.variable} ${space.variable} relative min-h-screen bg-black text-white`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
