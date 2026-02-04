"use client";

import { useEffect } from "react";

export default function Preloader() {
  useEffect(() => {
    const preloader = document.querySelector("#preloader");
    if (!preloader) return;

    window.addEventListener("load", () => {
      preloader.remove();
    });
  }, []);

  return null;
}
