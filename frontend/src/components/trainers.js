import TrainerCard from "./TrainerCard";

export default function Trainers() {
  const trainers = [
    {
      image: "/images/trainers/trainer-1.jpg",
      name: "Walter White",
      role: "Web Development",
      description:
        "Expert full-stack developer with 10+ years of experience in modern web technologies.",
      socials: {
        twitter: "#",
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
      index:1
    },
    {
      image: "/images/trainers/trainer-2.jpg",
      name: "Sarah Johnson",
      role: "Digital Marketing",
      description:
        "Certified marketing strategist specializing in SEO, paid ads, and brand growth.",
      socials: {
        twitter: "#",
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
      index:2
    },
    {
      image: "/images/trainers/trainer-3.jpg",
      name: "William Anderson",
      role: "Content Strategy",
      description:
        "Content creator and copywriter focused on storytelling and conversions.",
      socials: {
        twitter: "#",
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
      index:3
    },
  ];

  return (
    <section id="trainers-index" className="section trainers-index py-5">
      <div className="container">
        <div className="row">
          {trainers.map((trainer, index) => (
            <TrainerCard key={index} {...trainer} />
          ))}
        </div>
      </div>
    </section>
  );
}
