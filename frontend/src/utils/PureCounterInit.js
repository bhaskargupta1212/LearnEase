"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PureCounterInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initCounter = () => {
      if (window.PureCounter) {
        new window.PureCounter();
      }
    };

    // Load script only once
    if (!window.PureCounter) {
      const script = document.createElement("script");
      script.src = "/vendor/purecounter/purecounter_vanilla.js";
      script.async = true;
      script.onload = initCounter;
      document.body.appendChild(script);
    } else {
      // Re-init on route change
      initCounter();
    }
  }, [pathname]); // IMPORTANT

  return null;
}
