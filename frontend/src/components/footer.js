"use client";

import Link from "next/link";

export default function Footer({
  brand = {
    name: "LearnEase",
    address: ["123 Innovation Drive", "San Francisco, CA 94107"],
    phone: "+1 (415) 987-6543",
    email: "support@learnease.com",
  },
  socials = [
    { icon: "twitter-x", href: "#" },
    { icon: "facebook", href: "#" },
    { icon: "instagram", href: "#" },
    { icon: "linkedin", href: "#" },
  ],
  quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  services = [
    { label: "Web Development", href: "/services/web-development" },
    { label: "UI/UX Design", href: "/services/ui-ux" },
    { label: "Digital Marketing", href: "/services/marketing" },
    { label: "Content Strategy", href: "/services/content" },
    { label: "Tech Consulting", href: "/services/consulting" },
  ],
  newsletter = {
    title: "Join Our Newsletter",
    description:
      "Get expert insights, new course launches, and industry trends delivered straight to your inbox.",
    placeholder: "Enter your email address",
    buttonText: "Subscribe",
  },
}) {
  return (
    <footer className="footer position-relative light-background">
      <div className="container footer-top">
        <div className="row gy-4">
          {/* Brand */}
          <div className="col-lg-4 col-md-6 footer-about">
            <Link href="/" className="logo d-flex align-items-center">
              <span className="sitename">{brand.name}</span>
            </Link>

            <div className="footer-contact pt-3">
              {brand.address.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              <p className="mt-3">
                <strong>Phone:</strong> {brand.phone}
              </p>
              <p>
                <strong>Email:</strong> {brand.email}
              </p>
            </div>

            <div className="social-links d-flex mt-4">
              {socials.map((s, i) => (
                <a key={i} href={s.href}>
                  <i className={`bi bi-${s.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Quick Links</h4>
            <ul>
              {quickLinks.map((l, i) => (
                <li key={i}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Services</h4>
            <ul>
              {services.map((s, i) => (
                <li key={i}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>{newsletter.title}</h4>
            <p>{newsletter.description}</p>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="d-flex gap-2 newsletter-form">
                <input
                  type="email"
                  className="form-control"
                  placeholder={newsletter.placeholder}
                  required
                />
                <button className="btn-subscriber">
                  {newsletter.buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container text-center mt-4">
        <p>
          © {new Date().getFullYear()}{" "}
          <strong>{brand.name}</strong> All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
