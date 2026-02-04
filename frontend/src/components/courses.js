"use client";

import Image from "next/image";
import Link from "next/link";

export default function Courses() {
  return (
    <section id="courses" className="courses section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Courses</h2>
        <p>Popular Courses</p>
      </div>

      <div className="container">
        <div className="row">

          {/* Course 1 */}
          <CourseCard
            image="/images/course-1.jpg"
            category="Web Development"
            price="₹1,999"
            title="Full Stack Web Development"
            description="Learn modern frontend and backend technologies to build scalable web applications."
            trainerImage="/images/trainers/trainer-1-2.jpg"
            trainerName="Antonio"
            users="50"
            likes="65"
            delay="100"
          />

          {/* Course 2 */}
          <CourseCard
            image="/images/course-2.jpg"
            category="Digital Marketing"
            price="₹2,499"
            title="SEO & Digital Marketing"
            description="Master search engine optimization and online marketing strategies to grow businesses."
            trainerImage="/images/trainers/trainer-2.jpg"
            trainerName="Lana"
            users="35"
            likes="42"
            delay="200"
          />

          {/* Course 3 */}
          <CourseCard
            image="/images/course-3.jpg"
            category="Content Writing"
            price="₹1,799"
            title="Professional Copywriting"
            description="Develop persuasive writing skills for branding, advertising, and digital platforms."
            trainerImage="/images/trainers/trainer-3.jpg"
            trainerName="Brandon"
            users="20"
            likes="85"
            delay="300"
          />

        </div>
      </div>
    </section>
  );
}

/* Reusable Course Card */
function CourseCard({
  image,
  category,
  price,
  title,
  description,
  trainerImage,
  trainerName,
  users,
  likes,
  delay,
}) {
  return (
    <div
      className="col-lg-4 col-md-6 d-flex align-items-stretch"
      data-aos="zoom-in"
      data-aos-delay={delay}
    >
      <div className="course-item">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="img-fluid"
        />

        <div className="course-content">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="category">{category}</p>
            <p className="price">{price}</p>
          </div>

          <h3>
            <Link href="/courses/details">{title}</Link>
          </h3>

          <p className="description">{description}</p>

          <div className="trainer d-flex justify-content-between align-items-center">
            <div className="trainer-profile d-flex align-items-center">
              <Image
                src={trainerImage}
                alt={trainerName}
                width={50}
                height={50}
                className="img-fluid rounded-circle"
              />
              <span className="trainer-link ms-2">{trainerName}</span>
            </div>

            <div className="trainer-rank d-flex align-items-center">
              <i className="bi bi-person user-icon"></i>&nbsp;{users}
              &nbsp;&nbsp;
              <i className="bi bi-heart heart-icon"></i>&nbsp;{likes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
