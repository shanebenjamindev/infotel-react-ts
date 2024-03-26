import "./home.scss";
import HeroSection from "../../components/HomeComponent/Hero/Hero";
import Feature from "../../components/HomeComponent/Feature/Feature";
import Testimonials from "../../components/HomeComponent/Testimonials/Testinonials";
import Booking from "../../components/HomeComponent/Booking/Booking";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Booking />
      <Feature />
      <Testimonials />
    </div>
  );
};

export default Home;
