import React, { useEffect, useState } from "react";
import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import HandGestureDetection from "./context/HandgestureDectection";

const App = () => {
  const [activeGesture, setActiveGesture] = useState(null);
  const [scrolling, setScrolling] = useState(false);  // To track continuous scrolling
  const [scrollDirection, setScrollDirection] = useState(null);  // To track the direction of scroll (up/down)

  const handleGesture = (gesture) => {
    setActiveGesture(gesture);
    switch(gesture) {
      case 'One Finger Up':
        setScrollDirection('up');
        setScrolling(true);
        break;
      case 'Two Fingers Up':
        setScrollDirection('down');
        setScrolling(true);
        break;
      case 'Pause':
        setScrolling(false);
        setScrollDirection(null);
        break;
      default:
        setScrolling(false);
        setScrollDirection(null);
        break;
    }
  };

  useEffect(() => {
    let interval;
    if (scrolling) {
      interval = setInterval(() => {
        if (scrollDirection === 'up') {
          window.scrollBy(0, -window.innerHeight * 0.05);
        } else if (scrollDirection === 'down') {
          window.scrollBy(0, window.innerHeight * 0.05);
        }
      }, 100);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [scrolling, scrollDirection]);

  return (
    <>
      <ThemeProvider>
        <Navbar />
        <HandGestureDetection onGesture={handleGesture} />
        <Hero />
        <ShowcaseSection />
        <FeatureCards />
        <Experience />
        <TechStack />
        <Contact />
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
