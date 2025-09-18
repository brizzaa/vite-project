import Circle from "./bits/Circle";
import Quadrato from "./bits/Quadrato";
import Star from "./bits/Star";

const FirstPage = () => {
  return (
    <div className="hero-bg h-screen w-full flex items-center justify-center">
      <div className="hero-card flex flex-col items-center justify-center border-8 rounded-[100px]">
        <h1 className="hero-text  bg-[#70AEFF] border-10 px-20 mb-8 leading-40 mt-10">
          Bringing your
        </h1>
        <h1 className="hero-text  bg-[#FF9DEF] border-10 px-18  leading-35 mt-8 mb-20  rotate-10">
          Ideas
        </h1>
        <h1 className="hero-text bg-[#FFFFFF] border-10 px-50 mb-10 leading-40 -rotate-4 ">
          <span className="font-extralight">To</span>{" "}
          <span className="font-black">life.</span>
        </h1>
        <div className="absolute top-10 left-20 ">
          <Quadrato />
        </div>
        <div className="absolute bottom-0 right-10  rotate-90">
          <Star />
        </div>
        <div className="absolute bottom-80 right-90">
          <Circle />
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
