"use client";

import { useEffect } from "react";

export default function ScrollTop() {
  useEffect(() => {
    const scrollTop = document.querySelector(".scroll-top");

    if (!scrollTop) return;

    const toggle = () => {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    };

    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", toggle);
    window.addEventListener("load", toggle);

    return () => {
      window.removeEventListener("scroll", toggle);
    };
  }, []);

  return null;
}
