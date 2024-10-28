import Footer from "@/components/layout/Footer";
import Hero from "./_components/Hero";
import Services from "./_components/Services";
import AboutUs from "./_components/AboutUs";
import MainProducts from "./_components/MainProducts";
import Location from "./_components/Location";
import WhyChooseUs from "./_components/WhyUs";
import Reviews from "./_components/Reviews";
import ContactusSection from "./_components/ContactUsSection";
import ScrollUp from "./_components/ScrollUp";

export default function Homepage() {
  return (
    <>
      <main className="flex-grow bg-white ">
        <Hero />
        <AboutUs />
        <Services />
        <MainProducts />
        <Location />
        <WhyChooseUs />
        <Reviews />
        <ContactusSection />
        <ScrollUp /> 
      </main>
      <Footer />
    </>
  );
}
