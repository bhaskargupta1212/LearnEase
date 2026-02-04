import PageTitle from "@/components/PageTitle";
import Trainers from "@/components/trainers";

export const metadata = {
  title: "Our Trainers | LearnEase",
  description:
    "Meet our expert trainers who bring real-world experience and industry knowledge to every course.",
};

export default function TrainersPage() {
  return (
    <>
      {/* Page Title */}
      <PageTitle
        title="Our Expert Trainers"
        description="Learn from experienced professionals who are passionate about teaching, mentoring, and helping you succeed in your career."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Trainers" },
        ]}
      />

      {/* Trainers Section */}
      <section className="section trainers-index py-5">
        <div className="container">
          <div className="row">
            <Trainers />
          </div>
        </div>
      </section>
    </>
  );
}
