"use client";

export default function Counts() {
  return (
    <section id="counts" className="section counts light-background">
      <div
        className="container"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="row gy-4">
          {/* Students */}
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span
                className="purecounter"
                data-purecounter-start="0"
                data-purecounter-end="1500"
                data-purecounter-duration="1"
              ></span>
              <p>Students Enrolled</p>
            </div>
          </div>

          {/* Courses */}
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span
                className="purecounter"
                data-purecounter-start="0"
                data-purecounter-end="75"
                data-purecounter-duration="1"
              ></span>
              <p>Available Courses</p>
            </div>
          </div>

          {/* Assessments */}
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span
                className="purecounter"
                data-purecounter-start="0"
                data-purecounter-end="120"
                data-purecounter-duration="1"
              ></span>
              <p>Assessments Conducted</p>
            </div>
          </div>

          {/* Trainers */}
          <div className="col-lg-3 col-md-6">
            <div className="stats-item text-center w-100 h-100">
              <span
                className="purecounter"
                data-purecounter-start="0"
                data-purecounter-end="35"
                data-purecounter-duration="1"
              ></span>
              <p>Expert Trainers</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
