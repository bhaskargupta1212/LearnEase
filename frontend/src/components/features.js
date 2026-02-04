"use client";

import Link from "next/link";

export default function Features() {
  return (
    <section id="features" className="features section">
      <div className="container">
        <div className="row gy-4">

          <Feature
            icon="bi-eye"
            color="#ffbb2c"
            title="Smart Learning Dashboard"
            delay="100"
          />

          <Feature
            icon="bi-infinity"
            color="#5578ff"
            title="Unlimited Course Access"
            delay="200"
          />

          <Feature
            icon="bi-mortarboard"
            color="#e80368"
            title="Certified Skill Programs"
            delay="300"
          />

          <Feature
            icon="bi-nut"
            color="#e361ff"
            title="Custom Learning Paths"
            delay="400"
          />

          <Feature
            icon="bi-shuffle"
            color="#47aeff"
            title="Flexible Course Navigation"
            delay="500"
          />

          <Feature
            icon="bi-star"
            color="#ffa76e"
            title="Performance-Based Ratings"
            delay="600"
          />

          <Feature
            icon="bi-x-diamond"
            color="#11dbcf"
            title="High-Quality Learning Content"
            delay="700"
          />

          <Feature
            icon="bi-camera-video"
            color="#4233ff"
            title="Video-Based Lessons"
            delay="800"
          />

          <Feature
            icon="bi-command"
            color="#b2904f"
            title="Interactive Assessments"
            delay="900"
          />

          <Feature
            icon="bi-dribbble"
            color="#b20969"
            title="Modern UI Experience"
            delay="1000"
          />

          <Feature
            icon="bi-activity"
            color="#ff5828"
            title="Real-Time Progress Tracking"
            delay="1100"
          />

          <Feature
            icon="bi-brightness-high"
            color="#29cc61"
            title="Continuous Learning Support"
            delay="1200"
          />

        </div>
      </div>
    </section>
  );
}

/* Reusable Feature Card */
function Feature({ icon, color, title, delay }) {
  return (
    <div
      className="col-lg-3 col-md-4"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="features-item">
        <i className={`bi ${icon}`} style={{ color }}></i>
        <h3>
          <Link href="/features" className="stretched-link">
            {title}
          </Link>
        </h3>
      </div>
    </div>
  );
}
