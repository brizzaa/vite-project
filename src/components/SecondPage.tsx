import Star2 from "./bits/Star2";

const SecondPage = () => {
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

  return (
    <div className="h-screen w-full bg-[#FFE055]">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full h-40 bg-[#FFFCA2] my-10 border-t-6 border-b-6">
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
          className="about-card h-180 w-300 bg-[#FFFCA2] right-100 top-65 absolute border-6 z-10"
          style={{ overflow: "hidden" }}
        >
          <div
            className="bg-white absolute "
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
            className="mt-10 bg-black h-40 w-110 absolute left-10 text-white text-[9rem] font-bold text-center leading-45"
            style={{ zIndex: 10 }}
          >
            LUCA
          </div>
          <div
            className="bg-white leading-12 text-[2rem] font-light absolute left-45 top-46 px-4 rounded-full"
            style={{ zIndex: 10 }}
          >
            Brizzante
          </div>
          <div className="absolute left-107 top-15 antialiased z-40">
            <Star2 />
          </div>
          <div className="bg-white absolute left-180 h-70 w-70 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
