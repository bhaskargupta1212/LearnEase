"use client";

import Link from "next/link";

export default function ScrollTopButton() {
  return (
    <Link
      href="#"
      className="scroll-top d-flex align-items-center justify-content-center"
      aria-label="Scroll to top"
    >
      <i className="bi bi-arrow-up-short"></i>
    </Link>
  );
}
