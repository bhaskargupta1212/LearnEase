"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <header
      id="header"
      className="header d-flex align-items-center sticky-top shadow"
    >
      <div className="container-fluid container-xl position-relative d-flex align-items-center">

        {/* Logo */}
        <Link href="/" className="logo d-flex align-items-center me-auto">
          <h1 className="sitename">LearnEase</h1>
        </Link>

        {/* Navigation */}
        <nav id="navmenu" className="navmenu">
          <ul>

            <li>
              <Link href="/" className={isActive("/") ? "active" : ""}>
                Home
              </Link>
            </li>

            <li>
              <Link href="/about" className={isActive("/about") ? "active" : ""}>
                About
              </Link>
            </li>

            <li>
              <Link
                href="/courses"
                className={isActive("/courses") ? "active" : ""}
              >
                Courses
              </Link>
            </li>

            <li>
              <Link
                href="/trainers"
                className={isActive("/trainers") ? "active" : ""}
              >
                Trainers
              </Link>
            </li>  

            <li>
              <Link
                href="/contact"
                className={isActive("/contact") ? "active" : ""}
              >
                Contact
              </Link>
            </li>

          </ul>

          {/* Mobile toggle */}
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>

        {/* CTA */}
        <Link href="/login" className="btn-getstarted">
          Login / Signup
        </Link>

      </div>
    </header>
  );
}
