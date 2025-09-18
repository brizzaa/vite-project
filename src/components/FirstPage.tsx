import Circle from "./bits/Circle";
import Quadrato from "./bits/Quadrato";
import gsap from "gsap";
import Star from "./bits/Star";
import { useEffect, useRef } from "react";

const FirstPage = () => {
  const quadratoRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  // Funzioni per animazioni di click sui bits
  const handleQuadratoClick = () => {
    gsap.to(quadratoRef.current, {
      rotation: "+=720", // 2 giri completi
      duration: 0.8,
      ease: "power2.out",
    });
  };

  const handleStarClick = () => {
    gsap.to(starRef.current, {
      rotation: "+=1080", // 3 giri completi
      duration: 1,
      ease: "power2.out",
    });
  };

  const handleCircleClick = () => {
    gsap.to(circleRef.current, {
      rotation: "+=900", // 2.5 giri completi
      duration: 0.9,
      ease: "power2.out",
    });
  };

  useEffect(() => {
    // Timeline per animazioni sequenziali
    const tl = gsap.timeline();

    // Animazione per testo1 con scale easing
    tl.fromTo(
      ".testo1",
      {
        scale: 0,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.7)", // Effetto di rimbalzo
      }
    )
      // Animazione per testo2
      .fromTo(
        ".testo2",
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      ) // Inizia 0.2 secondi prima che finisca il precedente
      // Animazione per testo3
      .fromTo(
        ".testo3",
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      )
      // Animazione per Quadrato
      .fromTo(
        ".quadrato-bit",
        {
          scale: 0,
          opacity: 0,
          rotation: -180,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )
      // Animazione per Star
      .fromTo(
        ".star-bit",
        {
          scale: 0,
          opacity: 0,
          rotation: 180,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 90,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      )
      // Animazione per Circle
      .fromTo(
        ".circle-bit",
        {
          scale: 0,
          opacity: 0,
          rotation: -90,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );
  }, []);
  return (
    <div className="hero-bg h-screen w-full flex items-center justify-center">
      <div className="hero-card flex flex-col items-center justify-center border-8 rounded-[100px]">
        <h1 className="hero-text testo1  bg-[#70AEFF] border-10 px-20 mb-8 leading-40 mt-10">
          Bringing your
        </h1>
        <h1 className="hero-text testo2  bg-[#FF9DEF] border-10 px-18  leading-35 mt-8 mb-20  rotate-10">
          Ideas
        </h1>
        <h1 className="hero-text testo3 bg-[#FFFFFF] border-10 px-50 mb-10 leading-40 -rotate-4 ">
          <span className="font-extralight">To</span>{" "}
          <span className="font-black">life.</span>
        </h1>
        <div
          ref={quadratoRef}
          className="absolute top-10 left-20 quadrato-bit cursor-pointer"
          onClick={handleQuadratoClick}
        >
          <Quadrato />
        </div>
        <div
          ref={starRef}
          className="absolute bottom-0 right-10 star-bit cursor-pointer"
          onClick={handleStarClick}
        >
          <Star />
        </div>
        <div
          ref={circleRef}
          className="absolute bottom-80 right-90 circle-bit cursor-pointer"
          onClick={handleCircleClick}
        >
          <Circle />
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
