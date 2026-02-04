import About from "@/components/about";
import Counts from "@/components/count";
import Courses from "@/components/courses";
import Features from "@/components/features";
import Hero from "@/components/hero";
import ScrollTopButton from "@/components/ScrollTopButton";
import Trainers from "@/components/trainers";
import WhyUs from "@/components/WhyUs";
export default function Home() {
  return (
    <>
    <Hero />
    <About />
    <Counts />
    <WhyUs />
    <Features />
    <Courses />
    <Trainers />
    <ScrollTopButton />
    </>
  );
}
