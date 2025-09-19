import Star2 from "./bits/Star2";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface SecondPageProps {
  triggerScrollAnimations?: boolean;
  isActive?: boolean;
}

const SecondPage = ({
  triggerScrollAnimations = false,
  isActive = false,
}: SecondPageProps) => {
  // Refs per gli elementi da animare
  const aboutCardRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const surnameRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const roleCardRef = useRef<HTMLDivElement>(null);
  const descriptionCardRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const whoAmIRef = useRef<HTMLDivElement>(null);
  const myWorkRef = useRef<HTMLDivElement>(null);
  const whoAmITextRef = useRef<HTMLDivElement>(null);
  const myWorkTextRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollAnimationsRef = useRef<gsap.core.Timeline | null>(null);
  const [elementsAnimated, setElementsAnimated] = useState(false);
  const [entranceAnimationsPlayed, setEntranceAnimationsPlayed] =
    useState(false);
  const [activeTab, setActiveTab] = useState<"who-am-i" | "my-work">(
    "who-am-i"
  );

  // Array di tecnologie per il carousel
  const technologies = [
    { name: "Java", padding: "px-20" },
    { name: "Spring", padding: "px-20" },
    { name: "React", padding: "px-20" },
    { name: "Typescript", padding: "px-10" },
    { name: "Javascript", padding: "px-10" },
    { name: "Node.js", padding: "px-10" },
    { name: "MySQL", padding: "px-10" },
    { name: "Git", padding: "px-10" },
    { name: "GitHub", padding: "px-10" },
  ];

  // Funzioni di animazione per hover
  const handleStarHover = () => {
    if (starRef.current) {
      gsap.to(starRef.current, {
        rotation: "+=180",
        scale: 1.2,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleStarLeave = () => {
    if (starRef.current) {
      gsap.to(starRef.current, {
        rotation: "+=180",
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      });
    }
  };

  // Funzioni per gestire il cambio di tab
  const handleTabClick = (tab: "who-am-i" | "my-work") => {
    if (tab === activeTab) return; // Se è già attiva, non fare nulla

    setActiveTab(tab);

    // Animazioni di scambio dimensioni
    if (tab === "who-am-i") {
      // WHO AM I diventa attiva (dimensioni originali)
      if (whoAmIRef.current) {
        gsap.to(whoAmIRef.current, {
          width: "400px", // w-100 equivalente
          height: "120px", // h-30 equivalente
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      }
      // Testo WHO AM I diventa grande
      if (whoAmITextRef.current) {
        gsap.to(whoAmITextRef.current, {
          fontSize: "3rem", // text-[3rem]
          y: 0, // Posizione normale
          x: 0, // Posizione normale (torna a destra)
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      }
      // MY WORK diventa inattiva (dimensioni ridotte)
      if (myWorkRef.current) {
        gsap.to(myWorkRef.current, {
          width: "240px", // w-60 equivalente
          height: "100px", // h-25 equivalente
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      }
      // Testo MY WORK diventa piccolo
      if (myWorkTextRef.current) {
        gsap.to(myWorkTextRef.current, {
          fontSize: "2rem", // text-[2rem]
          y: 0, // Posizione normale
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      }
    } else {
      // MY WORK diventa attiva (dimensioni di WHO AM I)
      if (myWorkRef.current) {
        gsap.to(myWorkRef.current, {
          width: "400px", // dimensioni di WHO AM I
          height: "120px",
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      }
      // Testo MY WORK diventa grande
      if (myWorkTextRef.current) {
        gsap.to(myWorkTextRef.current, {
          fontSize: "3rem", // dimensioni di WHO AM I
          y: 0, // Posizione normale
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      }
      // WHO AM I diventa inattiva (dimensioni di MY WORK)
      if (whoAmIRef.current) {
        gsap.to(whoAmIRef.current, {
          width: "240px", // dimensioni di MY WORK
          height: "100px",
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      }
      // Testo WHO AM I diventa piccolo
      if (whoAmITextRef.current) {
        gsap.to(whoAmITextRef.current, {
          fontSize: "2rem", // dimensioni di MY WORK
          y: -10, // Sposta leggermente verso l'alto quando è inattiva
          x: 8, // Sposta 5px a sinistra quando è inattiva
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      }
    }
  };

  // Animazioni di entrata - si attivano solo quando la pagina diventa attiva
  useEffect(() => {
    // Solo se la pagina è attiva e le animazioni di entrata non sono ancora state eseguite
    if (isActive && !entranceAnimationsPlayed) {
      // Kill any existing timeline to prevent conflicts
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Timeline per animazioni sequenziali
      const tl = gsap.timeline({
        onComplete: () => {
          timelineRef.current = null;
          setEntranceAnimationsPlayed(true); // Marca le animazioni di entrata come completate
        },
      });

      timelineRef.current = tl;

      // Nascondi inizialmente tutti gli elementi
      gsap.set(".about-card", { scale: 0, opacity: 0, y: 100 });
      gsap.set(".carousel", { y: 50, opacity: 0 });
      gsap.set(".photo", { scale: 0, opacity: 0 });
      gsap.set(".name-text", { x: -100, opacity: 0 });
      gsap.set(".surname-text", { x: 100, opacity: 0 });
      gsap.set(".star-element", { scale: 0, opacity: 0, rotation: 180 });
      gsap.set(".role-card", { scale: 0, opacity: 0, y: 50 });
      gsap.set(".description-card", { scale: 0, opacity: 0, y: 50 });

      // Animazione del carousel
      tl.to(".carousel", {
        y: 0,
        opacity: 1,
        duration: 1.0,
        ease: "back.out(1.4)",
      })
        // Animazione della card principale
        .to(
          ".about-card",
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.8)",
          },
          "-=0.6"
        )
        // Animazione della foto
        .to(
          ".photo",
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        // Animazione del nome
        .to(
          ".name-text",
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.4)",
          },
          "-=0.3"
        )
        // Animazione del cognome
        .to(
          ".surname-text",
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "back.out(1.4)",
          },
          "-=0.6"
        )
        // Animazione della stella
        .to(
          ".star-element",
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 1.0,
            ease: "elastic.out(1, 0.6)",
          },
          "-=0.4"
        )
        // Animazione della card del ruolo
        .to(
          ".role-card",
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.4)",
          },
          "-=0.2"
        )
        // Animazione della card descrizione
        .to(
          ".description-card",
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.4)",
          },
          "-=0.2"
        );

      // Cleanup function
      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill();
          timelineRef.current = null;
        }
      };
    }
  }, [isActive, entranceAnimationsPlayed]); // Si attiva quando isActive diventa true

  // Cleanup scroll animations
  useEffect(() => {
    return () => {
      if (scrollAnimationsRef.current) {
        scrollAnimationsRef.current.kill();
        scrollAnimationsRef.current = null;
      }
      setElementsAnimated(false);
    };
  }, []);

  // Effect to trigger scroll animations programmatically
  useEffect(() => {
    if (triggerScrollAnimations && !elementsAnimated) {
      if (scrollAnimationsRef.current) {
        scrollAnimationsRef.current.kill();
        scrollAnimationsRef.current = null;
      }

      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;

      const scrollTl = gsap.timeline({
        onComplete: () => {
          setElementsAnimated(true);
          scrollAnimationsRef.current = null;
        },
      });
      scrollAnimationsRef.current = scrollTl;

      // Animate elements based on scroll effect
      if (aboutCardRef.current) {
        scrollTl.to(
          aboutCardRef.current,
          {
            x: -windowWidth * 0.4,
            y: -windowHeight * 0.3,
            rotation: -5,
            duration: 1.5,
            ease: "back.inOut",
          },
          0
        );
      }

      if (carouselRef.current) {
        scrollTl.to(
          carouselRef.current,
          {
            x: windowWidth * 0.3,
            y: -windowHeight * 0.2,
            duration: 1.5,
            ease: "back.inOut",
          },
          0
        );
      }

      if (roleCardRef.current) {
        scrollTl.to(
          roleCardRef.current,
          {
            x: windowWidth * 0.5,
            y: windowHeight * 0.3,
            rotation: 3,
            duration: 1.5,
            ease: "back.inOut",
          },
          0
        );
      }

      if (descriptionCardRef.current) {
        scrollTl.to(
          descriptionCardRef.current,
          {
            x: -windowWidth * 0.3,
            y: windowHeight * 0.4,
            rotation: -2,
            duration: 1.5,
            ease: "back.inOut",
          },
          0
        );
      }
    } else if (!triggerScrollAnimations && elementsAnimated) {
      if (scrollAnimationsRef.current) {
        scrollAnimationsRef.current.kill();
        scrollAnimationsRef.current = null;
      }

      const resetTl = gsap.timeline({
        onComplete: () => {
          setElementsAnimated(false);
          scrollAnimationsRef.current = null;
        },
      });

      // Reset animations
      if (aboutCardRef.current) {
        resetTl.to(
          aboutCardRef.current,
          {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          0
        );
      }

      if (carouselRef.current) {
        resetTl.to(
          carouselRef.current,
          {
            x: 0,
            y: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          0
        );
      }

      if (roleCardRef.current) {
        resetTl.to(
          roleCardRef.current,
          {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          0
        );
      }

      if (descriptionCardRef.current) {
        resetTl.to(
          descriptionCardRef.current,
          {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
          },
          0
        );
      }
    }
  }, [triggerScrollAnimations, elementsAnimated]);

  // Reset state when component becomes visible again
  useEffect(() => {
    if (!triggerScrollAnimations && elementsAnimated) {
      if (scrollAnimationsRef.current) {
        scrollAnimationsRef.current.kill();
        scrollAnimationsRef.current = null;
      }

      const timer = setTimeout(() => {
        setElementsAnimated(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [triggerScrollAnimations, elementsAnimated]);

  // Imposta lo stato iniziale delle tab quando la pagina diventa attiva
  useEffect(() => {
    if (isActive && whoAmIRef.current && myWorkRef.current) {
      // WHO AM I inizia attiva (dimensioni originali)
      gsap.set(whoAmIRef.current, {
        width: "400px",
        height: "120px",
      });
      // Testo WHO AM I inizia grande
      if (whoAmITextRef.current) {
        gsap.set(whoAmITextRef.current, {
          fontSize: "3rem",
          y: 0, // Posizione normale quando è attiva
          x: 0, // Posizione normale quando è attiva
        });
      }
      // MY WORK inizia inattiva (dimensioni ridotte)
      gsap.set(myWorkRef.current, {
        width: "240px",
        height: "100px",
      });
      // Testo MY WORK inizia piccolo
      if (myWorkTextRef.current) {
        gsap.set(myWorkTextRef.current, {
          fontSize: "2rem",
          y: 0, // Posizione normale quando è inattiva
        });
      }
    }
  }, [isActive]);

  return (
    <div className="h-screen w-full bg-[#FFE055]">
      <div className="flex flex-col items-center justify-center">
        <div
          ref={carouselRef}
          className="w-full h-40 bg-[#FFFCA2] my-10 border-t-6 border-b-6 carousel"
        >
          <div className="carousel h-full">
            <div className="carousel-track">
              {/* Prima serie di elementi */}
              {technologies.map((tech, index) => (
                <div
                  key={`first-${index}`}
                  className={`slider-text bg-white ${tech.padding}`}
                >
                  {tech.name}
                </div>
              ))}
              {/* Seconda serie di elementi per l'effetto infinito */}
              {technologies.map((tech, index) => (
                <div
                  key={`second-${index}`}
                  className={`slider-text bg-white ${tech.padding}`}
                >
                  {tech.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          ref={aboutCardRef}
          className="about-card h-180 w-300 bg-[#FFFCA2] right-110 top-65 absolute border-6 z-10 "
          style={{ overflow: "hidden" }}
        >
          <div
            ref={photoRef}
            className="bg-white absolute foto photo"
            style={{
              zIndex: 1,
              width: "20%",
              height: "60%",
              left: "12%",
              top: "23%",
            }}
          >
            <img
              src="/public/img/1736890614-avatar.png"
              className="w-full h-full object-cover about-card border-6"
              style={{
                objectPosition: "center",
              }}
            ></img>
          </div>
          <div
            ref={nameRef}
            className="mt-10 bg-black h-40 w-110 absolute left-10 text-white text-[9rem] font-bold text-center leading-45 text-luca name-text"
            style={{ zIndex: 10 }}
          >
            LUCA
          </div>
          <div
            ref={surnameRef}
            className="bg-white leading-12 text-[2rem] font-light absolute left-45 top-46 px-4 rounded-full surname-text"
            style={{ zIndex: 10 }}
          >
            Brizzante
          </div>
          <div
            ref={starRef}
            className="absolute left-107 top-15 antialiased z-40 star-element cursor-pointer"
            onMouseEnter={handleStarHover}
            onMouseLeave={handleStarLeave}
          >
            <Star2 />
          </div>
          <div
            ref={roleCardRef}
            className="about-card-2 bg-white absolute mt-125 left-155 h-40 w-130 rounded-full flex flex-col items-center justify-center leading-[1] role-card"
            style={{ boxShadow: "8px 8px 0px 0px #000000" }}
          >
            <div className="text-[3rem] font-bold text-center">
              FULL STACK <br />
              WEB-DEVELOPER
            </div>
            <div className="text-[2rem] font-light text-center">
              Based in Veneto(IT)
            </div>
          </div>
          <div
            ref={descriptionCardRef}
            className="h-100 w-100 bg-white absolute left-170 top-10 text-center leading-[1] text-[2.6rem] font-light px-4 about-card-2 description-card"
            style={{ boxShadow: "8px 8px 0px 0px #000000" }}
          >
            <div className="mt-10 ">
              A young web developer with a passion for Graphic Design.
              <br />
              <br />
              currently looking for new challenges!
            </div>
          </div>
        </div>
      </div>
      <div
        ref={whoAmIRef}
        className="bg-white absolute -right-20 top-110 rounded-4xl border-6 about-card cursor-pointer"
        onClick={() => handleTabClick("who-am-i")}
      >
        <div
          ref={whoAmITextRef}
          className="font-bold text-center leading-30 absolute
          right-20"
        >
          WHO AM I?
        </div>
      </div>
      <div
        ref={myWorkRef}
        className="bg-white absolute -right-8 top-145 rounded-4xl border-6 about-card cursor-pointer"
        onClick={() => handleTabClick("my-work")}
      >
        <div
          ref={myWorkTextRef}
          className="font-bold text-center mt-5 absolute
          right-10"
        >
          MY WORK
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
