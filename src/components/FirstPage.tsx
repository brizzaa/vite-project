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

  // Scroll animation for SVG elements
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.min(scrollY / (windowHeight * 2), 1);

      // Move SVG elements based on scroll - MOVIMENTI 5X ESAGERATI
      if (quadratoRef.current) {
        gsap.to(quadratoRef.current, {
          x: scrollProgress * -4000, // Move left 5X ESAGERATO
          y: scrollProgress * -3000, // Move up 5X ESAGERATO
          rotation: scrollProgress * 1800, // Rotate 5X more
          duration: 0.1,
          ease: "none",
        });
      }

      if (starRef.current) {
        gsap.to(starRef.current, {
          x: scrollProgress * 3500, // Move right 5X ESAGERATO
          y: scrollProgress * -2500, // Move up 5X ESAGERATO
          rotation: scrollProgress * -1200, // Rotate 5X more
          duration: 0.1,
          ease: "none",
        });
      }

      if (circleRef.current) {
        gsap.to(circleRef.current, {
          x: scrollProgress * -3000, // Move left 5X ESAGERATO
          y: scrollProgress * 2000, // Move down 5X ESAGERATO
          rotation: scrollProgress * 900, // Rotate 5X more
          duration: 0.1,
          ease: "none",
        });
      }

      // Move text boxes based on scroll - MOVIMENTI 5X ESAGERATI
      gsap.to(".testo1", {
        x: scrollProgress * -6000, // Move left 5X ESAGERATO
        y: scrollProgress * -4000, // Move up 5X ESAGERATO
        duration: 0.1,
        ease: "none",
      });

      gsap.to(".testo2", {
        x: scrollProgress * 5000, // Move right 5X ESAGERATO
        y: scrollProgress * -4500, // Move up 5X ESAGERATO
        duration: 0.1,
        ease: "none",
      });

      gsap.to(".testo3", {
        x: scrollProgress * -4500, // Move left 5X ESAGERATO
        y: scrollProgress * 3500, // Move down 5X ESAGERATO
        duration: 0.1,
        ease: "none",
      });
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Initial call to set starting positions
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Timeline per animazioni sequenziali
    const tl = gsap.timeline();

    // Nascondi inizialmente tutte le lettere con scaling ESAGERATO
    gsap.set(".letter", { scale: 0, y: 100, rotation: 360, opacity: 0 });
    gsap.set(".letter-ideas", { scale: 0, y: 100, rotation: 360, opacity: 0 });
    gsap.set(".letter-life", { scale: 0, y: 100, rotation: 360, opacity: 0 });

    // Animazione per testo1 - effetto LEGO (solo il contenitore)
    tl.fromTo(
      ".testo1",
      {
        y: 200, // Parte da sotto
        opacity: 0,
        rotation: -15, // Leggermente ruotato
        scale: 0.8,
      },
      {
        y: 0, // Arriva nella posizione finale
        opacity: 1,
        rotation: 0, // Si raddrizza
        scale: 1,
        duration: 0.8,
        ease: "bounce.out(1.2)", // Effetto di rimbalzo come un mattoncino LEGO
      }
    )
      // Animazione per testo2 - effetto LEGO
      .fromTo(
        ".testo2",
        {
          y: 200,
          opacity: 0,
          rotation: 15,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          rotation: 10, // Mantiene la rotazione finale
          scale: 1,
          duration: 0.8,
          ease: "bounce.out(1.2)",
        },
        "-=0.3"
      ) // Inizia 0.3 secondi prima che finisca il precedente
      // Animazione per testo3 - effetto LEGO
      .fromTo(
        ".testo3",
        {
          y: 200,
          opacity: 0,
          rotation: -10,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          rotation: -4, // Mantiene la rotazione finale
          scale: 1,
          duration: 0.8,
          ease: "bounce.out(1.2)",
        },
        "-=0.3"
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
      )
      // Animazione typewriter per "Bringing your" - rivela le lettere una per una
      .to(
        ".letter",
        {
          scale: 1,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05, // Ritardo minore tra ogni lettera
          ease: "elastic.out(1, 0.3)",
        },
        "-=0.3"
      ) // Inizia subito dopo l'effetto LEGO
      // Animazione typewriter per "Ideas" - in parallelo
      .to(
        ".letter-ideas",
        {
          scale: 1,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "elastic.out(1, 0.3)",
        },
        "-=0.1"
      ) // Inizia quasi subito dopo "Bringing your"
      // Animazione typewriter per "To life" - in parallelo
      .to(
        ".letter-life",
        {
          scale: 1,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "elastic.out(1, 0.3)",
        },
        "-=0.1"
      ) // Inizia quasi subito dopo "Ideas"
      // Animazione finale più sottile

      // Timeline principale completata
      .call(() => {
        console.log("Timeline principale completata");
      });
  }, []);
  return (
    <div className="hero-bg h-screen w-full flex items-center justify-center absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_9px,transparent_3px)] [background-size:16px_16px]">
      <div className="hero-card flex flex-col items-center justify-center border-8 rounded-[100px]">
        <h1 className="hero-text testo1 bg-[#70AEFF] border-10 px-20 mb-8 leading-40 mt-10">
          <span className="letter">B</span>
          <span className="letter">r</span>
          <span className="letter">i</span>
          <span className="letter">n</span>
          <span className="letter">g</span>
          <span className="letter">i</span>
          <span className="letter">n</span>
          <span className="letter">g</span>
          <span className="letter">&nbsp;</span>
          <span className="letter">y</span>
          <span className="letter">o</span>
          <span className="letter">u</span>
          <span className="letter">r</span>
        </h1>
        <h1 className="hero-text testo2 bg-[#FF9DEF] border-10 px-18 leading-35 mt-8 mb-20 rotate-10">
          <span className="letter-ideas">I</span>
          <span className="letter-ideas">d</span>
          <span className="letter-ideas">e</span>
          <span className="letter-ideas">a</span>
          <span className="letter-ideas">s</span>
        </h1>
        <h1 className="hero-text testo3 bg-[#FFFFFF] border-10 px-50 mb-10 leading-40 -rotate-4">
          <span className="letter-life font-extralight">T</span>
          <span className="letter-life font-extralight">o</span>
          <span className="letter-life">&nbsp;</span>
          <span className="letter-life font-black">l</span>
          <span className="letter-life font-black">i</span>
          <span className="letter-life font-black">f</span>
          <span className="letter-life font-black">e</span>
          <span className="letter-life font-black">.</span>
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
