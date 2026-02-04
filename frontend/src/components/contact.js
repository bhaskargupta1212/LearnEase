"use client";

export default function Contact() {
  return (
    <section id="contact" className="contact section">
      {/* Google Map */}
      <div
        className="mb-5"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <iframe
          title="Office Location"
          style={{ border: 0, width: "100%", height: "300px" }}
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div
        className="container"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="row gy-4">
          {/* Contact Info */}
          <div className="col-lg-4">
            <div
              className="info-item d-flex"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <i className="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>Office Address</h3>
                <p>
                  123 Innovation Drive<br />
                  San Francisco, CA 94107
                </p>
              </div>
            </div>

            <div
              className="info-item d-flex"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <i className="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>Call Us</h3>
                <p>+1 (415) 987-6543</p>
              </div>
            </div>

            <div
              className="info-item d-flex"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <i className="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>Email Us</h3>
                <p>support@learnease.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-8">
            <form
              className="php-email-form"
              data-aos="fade-up"
              data-aos-delay="200"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="row gy-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Full Name"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email Address"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    required
                  />
                </div>

                <div className="col-md-12">
                  <textarea
                    className="form-control"
                    rows="6"
                    placeholder="Tell us how we can help you..."
                    required
                  ></textarea>
                </div>

                <div className="col-md-12 text-center">
                  <button
                    type="submit"
                    className="btn btn-primary px-4"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* End Contact Form */}
        </div>
      </div>
    </section>
  );
}
