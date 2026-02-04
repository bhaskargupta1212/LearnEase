"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="row gy-4 align-items-center">
          {/* Image Column */}
          <div
            className="col-lg-6 order-1 order-lg-2"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <Image
              src="/images/about.jpg"
              alt="About LearnEase"
              width={600}
              height={450}
              className="img-fluid rounded"
            />
          </div>

          {/* Content Column */}
          <div
            className="col-lg-6 order-2 order-lg-1 content"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3>Empowering Learning Through Technology</h3>

            <p className="fst-italic">
              LearnEase is designed to simplify online education by combining
              modern technology with an intuitive learning experience.
            </p>

            <ul>
              <li>
                <i className="bi bi-check-circle"></i>
                <span>
                  User-friendly platform for accessing courses anytime and
                  anywhere.
                </span>
              </li>

              <li>
                <i className="bi bi-check-circle"></i>
                <span>
                  Structured learning paths with assessments to evaluate
                  performance.
                </span>
              </li>

              <li>
                <i className="bi bi-check-circle"></i>
                <span>
                  Secure authentication, progress tracking, and scalable system
                  architecture.
                </span>
              </li>
            </ul>

            <Link href="/about" className="read-more">
              <span>Read More</span>
              <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
