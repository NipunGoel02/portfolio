import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Button from "../components/Button";
import { words } from "../constants";

import { useTheme } from "../context/ThemeContext";
const Hero = () => {
  const { theme } = useTheme();
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      <div className="hero-layout">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Shaping
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt="person"
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>into Real Projects</h1>
              <h1>that Deliver Results</h1>
            </div>

            <p className={`${theme === "light" ? "text-shadow-black-50" : "text-white"}text-white-50 md:text-xl relative z-10 pointer-events-none`}>
            Hi, I’m Nipun, a web developer with a passion for building the future, one line of code at a time
            </p>

            <Button
              text="See My Work"
              className="md:w-80 md:h-16 w-60 h-12"
              id="counter"
            />
          </div>
        </header>

        {/* RIGHT: Modern Animated Visual */}
        <figure className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
              <img 
                src="/images/mainphoto.jpg" 
                alt="Modern Developer" 
                className="absolute inset-0 w-full h-full object-contain animate-float"
              />
              <div className="absolute inset-0 rounded-full border-2 border-white-50 opacity-20 animate-pulse"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-xl opacity-30 animate-rotate"></div>
            </div>
          </div>
        </figure>
      </div>

      
    </section>
  );
};

export default Hero;
