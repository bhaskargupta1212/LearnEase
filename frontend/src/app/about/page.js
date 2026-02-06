import PageTitle from "@/components/PageTitle";
import About from "@/components/about";

export const metadata = {
  title: "About Us | LearnEase",
};

export default function AboutPage() {
  return (
    <>
      <PageTitle
        title="About LearnEase"
        description="LearnEase is a modern learning platform focused on practical, job-ready skills through expertly designed courses and real-world projects."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

    {/* About Section */}
    <section className="section trainers-index py-5" data-testid="trainers-section">
        <div className="container">
            <div className="row">
                <About />
            </div>
        </div>
    </section>
</>
  );
}
