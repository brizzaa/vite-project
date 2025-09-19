import Circle from "./bits/Circle";
import Quadrato from "./bits/Quadrato";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Star from "./bits/Star";
import { useEffect, useRef, useState } from "react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface FirstPageProps {
  triggerScrollAnimations?: boolean;
}

const FirstPage = ({ triggerScrollAnimations = false }: FirstPageProps) => {
  const quadratoRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollAnimationsRef = useRef<gsap.core.Timeline | null>(null);
  const [elementsAnimated, setElementsAnimated] = useState(false);

  const handleQuadratoClick = () => {
    // Kill any existing animation to prevent conflicts
    gsap.killTweensOf(quadratoRef.current);
    gsap.to(quadratoRef.current, {
      rotation: "+=720", // 2 giri completi
      duration: 1.2,
      ease: "elastic.out(1, 0.6)",
      transformOrigin: "center center",
      onComplete: () => {
        // Reset rotation to prevent accumulation
        gsap.set(quadratoRef.current, { rotation: 0 });
      },
    });
  };

  const handleStarClick = () => {
    // Kill any existing animation to prevent conflicts
    gsap.killTweensOf(starRef.current);
    gsap.to(starRef.current, {
      rotation: "+=1080", // 3 giri completi
      duration: 1.4,
      ease: "back.out(1.7)",
      transformOrigin: "center center",
      onComplete: () => {
        // Reset rotation to prevent accumulation
        gsap.set(starRef.current, { rotation: 90 });
      },
    });
  };

  const handleCircleClick = () => {
    // Kill any existing animation to prevent conflicts
    gsap.killTweensOf(circleRef.current);
    gsap.to(circleRef.current, {
      rotation: "+=900", // 2.5 giri completi
      duration: 1.3,
      ease: "power3.out",
      transformOrigin: "center center",
      onComplete: () => {
        // Reset rotation to prevent accumulation
        gsap.set(circleRef.current, { rotation: 0 });
      },
    });
  };

  useEffect(() => {
    // Kill any existing timeline to prevent conflicts
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Timeline per animazioni sequenziali
    const tl = gsap.timeline({
      onComplete: () => {
        // Clean up timeline reference when complete
        timelineRef.current = null;
      },
    });

    // Store timeline reference
    timelineRef.current = tl;

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
        duration: 1.0,
        ease: "back.out(1.4)", // Effetto più fluido e naturale
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
          duration: 1.0,
          ease: "back.out(1.4)",
        },
        "-=0.4"
      ) // Inizia 0.4 secondi prima che finisca il precedente
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
          duration: 1.0,
          ease: "back.out(1.4)",
        },
        "-=0.4"
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
          duration: 1.0,
          ease: "elastic.out(1, 0.8)",
        },
        "-=0.4"
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
          duration: 1.1,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.3"
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
          duration: 1.1,
          ease: "elastic.out(1, 0.7)",
        },
        "-=0.3"
      )
      // Animazione typewriter per "Bringing your" - rivela le lettere una per una
      .to(
        ".letter",
        {
          scale: 1,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08, // Ritardo ottimizzato per fluidità
          ease: "back.out(1.2)",
        },
        "-=0.2"
      ) // Inizia subito dopo l'effetto LEGO
      // Animazione typewriter per "Ideas" - in parallelo
      .to(
        ".letter-ideas",
        {
          scale: 1,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: "back.out(1.2)",
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
          duration: 0.4,
          stagger: 0.08,
          ease: "back.out(1.2)",
        },
        "-=0.1"
      ) // Inizia quasi subito dopo "Ideas"
      // Animazione finale più sottile

      // Timeline principale completata
      .call(() => {
        console.log("Timeline principale completata");
        // Scroll animations will be triggered programmatically
      });

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, []);

  // Cleanup scroll animations
  useEffect(() => {
    return () => {
      if (scrollAnimationsRef.current) {
        scrollAnimationsRef.current.kill();
        scrollAnimationsRef.current = null;
      }
      // Reset state when component unmounts
      setElementsAnimated(false);
    };
  }, []);

  // Effect to trigger scroll animations programmatically
  useEffect(() => {
    if (triggerScrollAnimations && !elementsAnimated) {
      // Kill any existing scroll animations and reset state
      if (scrollAnimationsRef.current) {
        scrollAnimationsRef.current.kill();
        scrollAnimationsRef.current = null;
      }

      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      // Create scroll animations timeline
      const scrollTl = gsap.timeline({
        onComplete: () => {
          setElementsAnimated(true);
          scrollAnimationsRef.current = null;
        },
      });
      scrollAnimationsRef.current = scrollTl;

      // Animate elements based on scroll effect
      if (quadratoRef.current) {
        scrollTl.to(
          quadratoRef.current,
          {
            x: -windowWidth * 0.6,
            y: -windowHeight * 0.6,
            duration: 1.5,
            ease: "back.inOut",
          },
          0
        );
      }

      if (starRef.current) {
        scrollTl.to(
          starRef.current,
          {
            x: windowWidth * 0.6,
            y: -windowHeight * 0.6,
            duration: 1.5,
            ease: "back.inOut",
          },
          0
        );
      }

      if (circleRef.current) {
        scrollTl.to(
          circleRef.current,
          {
            x: windowWidth * 0.6,
            y: windowHeight * 0.6,
            duration: 1.5,
            ease: "back.inOut",
          },
          0
        );
      }

      // Text boxes animations
      scrollTl.to(
        ".testo1",
        {
          x: -windowWidth * 0.7,
          y: -windowHeight * 0.7,
          duration: 1.5,
          ease: "back.inOut",
        },
        0
      );

      scrollTl.to(
        ".testo2",
        {
          x: windowWidth * 0.7,
          y: -windowHeight * 0.7,
          duration: 1.5,
          ease: "back.inOut",
        },
        0
      );

      scrollTl.to(
        ".testo3",
        {
          x: -windowWidth * 0.7,
          y: windowHeight * 0.7,
          duration: 1.5,
          ease: "back.inOut",
        },
        0
      );
    } else if (!triggerScrollAnimations && elementsAnimated) {
      // Reset elements to original positions when returning to first page
      if (scrollAnimationsRef.current) {
        scrollAnimationsRef.current.kill();
        scrollAnimationsRef.current = null;
      }

      // Create reset animation timeline
      const resetTl = gsap.timeline({
        onComplete: () => {
          setElementsAnimated(false);
          scrollAnimationsRef.current = null;
        },
      });

      // Animate elements back to original positions
      if (quadratoRef.current) {
        resetTl.to(
          quadratoRef.current,
          {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          0
        );
      }

      if (starRef.current) {
        resetTl.to(
          starRef.current,
          {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          0
        );
      }

      if (circleRef.current) {
        resetTl.to(
          circleRef.current,
          {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          0
        );
      }

      // Text boxes reset animations
      resetTl.to(
        ".testo1",
        {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
        0
      );

      resetTl.to(
        ".testo2",
        {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
        0
      );

      resetTl.to(
        ".testo3",
        {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.7)",
        },
        0
      );
    }
  }, [triggerScrollAnimations, elementsAnimated]);

  // Reset state when component becomes visible again
  useEffect(() => {
    if (!triggerScrollAnimations && elementsAnimated) {
      // Kill any existing animations first
      if (scrollAnimationsRef.current) {
        scrollAnimationsRef.current.kill();
        scrollAnimationsRef.current = null;
      }

      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        setElementsAnimated(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [triggerScrollAnimations, elementsAnimated]);
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
