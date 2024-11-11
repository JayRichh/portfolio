"use client";

import { useEffect, useState } from "react";
import { Header } from "./Header";
import { AppLogo } from "./app-logo";
import { SiteNavigation } from "./site-navigation";
import React from "react";

export function SiteHeader() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < lastScrollY || currentScrollY < 100) {
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);

  return (
    <Header
      // logo={<AppLogo />}
      navigation={<SiteNavigation />}
      isVisible={isVisible}
    />
  );
}
