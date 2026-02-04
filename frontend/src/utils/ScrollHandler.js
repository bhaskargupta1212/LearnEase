"use client";

import { useEffect } from "react";

export default function ScrollHandler() {
  useEffect(() => {
    const toggleScrolled = () => {
      const body = document.body;
      const header = document.querySelector("#header");
      if (!header) return;

      if (
        !header.classList.contains("scroll-up-sticky") &&
        !header.classList.contains("sticky-top") &&
        !header.classList.contains("fixed-top")
      )
        return;

      window.scrollY > 100
        ? body.classList.add("scrolled")
        : body.classList.remove("scrolled");
    };

    window.addEventListener("scroll", toggleScrolled);
    window.addEventListener("load", toggleScrolled);

    return () => {
      window.removeEventListener("scroll", toggleScrolled);
    };
  }, []);

  return null;
}
