"use client";

import Link from "next/link";

export default function WhyUs() {
  return (
    <section id="why-us" className="section why-us" data-testid="why-us-section">
      <div className="container">
        <div className="row gy-4">

          {/* Why Box */}
          <div
            className="col-lg-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="why-box">
              <h3>Why Choose LearnEase?</h3>
              <p>
                LearnEase is built to provide accessible, skill-oriented education
                through structured courses, interactive learning, and real-time
                performance tracking. Our platform focuses on practical knowledge
                that prepares learners for real-world challenges.
              </p>
              <div className="text-center">
                <Link href="/about" className="more-btn">
                  <span>Learn More</span>{" "}
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
          {/* End Why Box */}

          {/* Feature Boxes */}
          <div className="col-lg-8 d-flex align-items-stretch">
            <div
              className="row gy-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >

              <div className="col-xl-4">
                <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-clipboard-data"></i>
                  <h4>Structured Learning Paths</h4>
                  <p>
                    Well-organized courses with clear progress tracking to guide
                    learners from basics to advanced concepts.
                  </p>
                </div>
              </div>

              <div
                className="col-xl-4"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-gem"></i>
                  <h4>Skill-Focused Content</h4>
                  <p>
                    Industry-relevant content designed to enhance practical skills
                    and improve career readiness.
                  </p>
                </div>
              </div>

              <div
                className="col-xl-4"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-inboxes"></i>
                  <h4>Assessments & Insights</h4>
                  <p>
                    Interactive assessments with detailed performance insights to
                    help learners track growth and improve continuously.
                  </p>
                </div>
              </div>

            </div>
          </div>
          {/* End Feature Boxes */}

        </div>
      </div>
    </section>
  );
}
