const SecondPage = () => {
  return (
    <div className="h-screen w-full bg-[#FFE055]">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full h-40 bg-[#FFFCA2] my-10 border-t-6 border-b-6">
          <div className="carousel flex items-center justify-center h-full gap-7 pointer-events-none">
            <div className="slider-text bg-white px-20 ">Java</div>
            <div className="slider-text bg-white px-20  ">Spring</div>
            <div className="slider-text bg-white px-20 ">React</div>
            <div className="slider-text bg-white px-10 ">Typescript</div>
            <div className="slider-text bg-white px-10 ">Javascript</div>
            <div className="slider-text bg-white px-10 ">Node.js</div>
            <div className="slider-text bg-white px-10 ">MongoDB</div>
            <div className="slider-text bg-white px-10 ">MySQL</div>
            <div className="slider-text bg-white px-10 ">Git</div>
            <div className="slider-text bg-white px-10 ">GitHub</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPage;
