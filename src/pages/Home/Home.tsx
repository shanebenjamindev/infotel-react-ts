import { useState } from "react";
import "./home.scss"; // Import your custom CSS file
import HeroSection from "./Hero/Hero";
import Feature from "./Feature/Feature";
import Testimonials from "./Testimonials/Testinonials";
import Booking from "./Booking/Booking";

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
