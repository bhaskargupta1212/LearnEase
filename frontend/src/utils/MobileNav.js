"use client";

import { useEffect } from "react";

export default function MobileNav() {
  useEffect(() => {
    const toggleBtn = document.querySelector(".mobile-nav-toggle");

    if (!toggleBtn) return;

    const toggleNav = () => {
      document.body.classList.toggle("mobile-nav-active");
      toggleBtn.classList.toggle("bi-list");
      toggleBtn.classList.toggle("bi-x");
    };

    toggleBtn.addEventListener("click", toggleNav);

    return () => {
      toggleBtn.removeEventListener("click", toggleNav);
    };
  }, []);

  return null;
}
