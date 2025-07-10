"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/loading";
import OnekoCat from "@/components/onekaCat";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(timer);
    };
  }, []);

  const loadingProps = isMobile
    ? {
        imgSrc: "/first-frame-mobile.png",
        width: 480,
        height: 848,
      }
    : {
        imgSrc: "/first-frame-desktop.png",
        width: 1365,
        height: 768,
      };

  return (
    <>
      {!hasMounted ? null : (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="fixed top-0 left-0 w-full h-full object-cover -z-20 md:hidden"
          >
            <source src="/video-mobile.mp4" type="video/mp4" />
          </video>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="fixed top-0 left-0 w-full h-full object-cover -z-20 hidden md:block"
          >
            <source src="/video-desktop.mp4" type="video/mp4" />
          </video>

          <div className="fixed inset-0 bg-black/40 z-[-15]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <OnekoCat />
            {children}
          </div>
          <Footer />

          {isLoading && <LoadingScreen {...loadingProps} />}
        </>
      )}
    </>
  );
}
