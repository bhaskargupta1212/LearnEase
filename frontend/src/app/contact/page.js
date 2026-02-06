import Contact from "@/components/contact";
import PageTitle from "@/components/PageTitle"; 

export const metadata = {
  title: "Contact US | LearnEase",
};

export default function CoursesPage() {
  return (
    <>
      <PageTitle
        title="Contact Us"
        description="Have questions or need support? Our team is here to help you every step of the way."
        breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Contact" },
        ]}
        />



        {/* Courses Section */}
        <section className="section trainers-index py-5" data-testid="Contact Component">
            <div className="container">
                <div className="row">
                    <Contact />
                </div>
            </div>
        </section>
    </>
  );
}
