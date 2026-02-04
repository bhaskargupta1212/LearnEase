"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section id="hero" className="hero section dark-background">
      {/* Background Image */}
      <Image
        src="/images/hero-bg.jpg"
        alt="LearnEase Online Learning Platform"
        fill
        priority
        className="hero-bg"
        data-aos="fade-in"
      />

      <div className="container position-relative">
        <h2 data-aos="fade-up" data-aos-delay="100">
          Learning Today,
          <br />
          Empowering Tomorrow
        </h2>

        <p data-aos="fade-up" data-aos-delay="200">
          LearnEase is a modern e-learning platform offering interactive and accessible education. It supports structured courses, assessments, and progress tracking.
        </p>

        <div
          className="d-flex mt-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Link href="/courses" className="btn-get-started">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
