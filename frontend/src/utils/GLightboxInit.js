"use client";

import { useEffect } from "react";

export default function GLightboxInit() {
  useEffect(() => {
    let lightbox;

    (async () => {
      const GLightbox = (await import("glightbox")).default;

      lightbox = GLightbox({
        selector: ".glightbox",
        touchNavigation: true,
        loop: true,
        autoplayVideos: true,
      });
    })();

    return () => {
      if (lightbox) {
        lightbox.destroy();
      }
    };
  }, []);

  return null;
}
