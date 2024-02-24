import React from "react";
import "./Landing.css";
function Landing() {
  function handleSubmit() {
    console.log("hello");
  }
  return (
    <div className="landingBg">
      <div className="flex flex-col items-center justify-center px-6 py-8  md:h-screen lg:py-0 bg-transparent ">
        <div className="md:mt-0 w-3/4 h-3/4 xl:p-0 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
          <div className="flex flex-col ">
            <div>
              <h1 className="font-sans mt-44 ml-12 text-left  font-bold text-7xl text-white">
                EVolve &
              </h1>
              <h2 className="font-sans mt-2 ml-12 text-left  font-bold text-6xl text-white">
                Find Your Path
              </h2>

              <h4 className="font-sans mt-5 text-left ml-12 font-light text-2xl text-white">
                Find A route and travel hassel free!
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Landing;
