import PageTitle from "@/components/PageTitle";
import Courses from "@/components/courses";

export const metadata = {
  title: "Courses | LearnEase",
};

export default function CoursesPage() {
  return (
    <>
      <PageTitle
        title="Our Courses"
        description="Explore expertly crafted courses designed to help you build in-demand skills and advance your career."
        breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Courses" },
        ]}
        />


        {/* Courses Section */}
        <section className="section trainers-index py-5">
            <div className="container">
                <div className="row">
                    <Courses />
                </div>
            </div>
        </section>
    </>
  );
}
