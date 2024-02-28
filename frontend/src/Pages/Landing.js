import React from "react";
import "./Landing.css";
import ComputerCanvas from "./Computer";
import trI from "../Images/try2.png";
import Navbar from "../Components/Navbar";
import Experience from "../Components/Timeline/Timeline";
import Feedbacks from "../Components/Feedbacks/Feedback";
import arrow from '../Images/arrow.png'
import { useNavigate } from "react-router-dom";

function Landing() {

    const navigate = useNavigate()

  return (
    <div className="h-full landingBg">
      <Navbar />
      <div className="flex flex-col items-center justify-center px-6 py-8  md:h-screen lg:py-0 bg-transparent mt-8">
        <div className="md:mt-0 w-3/4 h-3/4 xl:p-0 bg-gray-400 rounded-md bg-clip-padding bg-opacity-10 border border-gray-100 shadow-3xl ">
          <div className="grid grid-cols-2 place-items-center justify-center">
            <div className="grid grid-span-1">
              <h1 className="font-sans mt-36 ml-12 text-left  font-bold text-7xl text-white">
                <span className="tagline">EV</span>
                olve &
              </h1>
              <h2 className="font-sans mt-2 ml-12 text-left  font-bold text-6xl text-white">
                Find Your Path
              </h2>

              <h4
                id="typewriter"
                className="font-sans mt-5 pt-4 text-left ml-12 font-light text-2xl text-white"
              >
                Find A route and travel hassel free!
              </h4>
              <button className=" flex items-center gap-1 text-black font-Yeseva bg-yellow-700 px-4 py-1 rounded-full w-44 h-10 ml-16 mt-9"
              onClick={()=>navigate('./login')}>
                <span className="text-center font- pr-1  text-xl pd ">
                  Get Started
                </span>
                <img className="w-6 h-6" src={arrow} alt="Icon" />
              </button>
            </div>
            <div>
              <img className="mt-12" src={trI} />
              {/* <ComputerCanvas /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <Experience />
      </div>
      <div className="container">
        <div className="mt-24">
          <div className="border-t  border-opacity-30 border-gray-300"></div>
          <div className="flex justify-between items-center w-full">
            <div className="flex-1 text-center border-r  border-opacity-30 border-gray-300 mt-6 mb-6 pr-4">
              <h1 className="font-sans mt-2 font-bold text-5xl text-white">
                3K+
              </h1>
              <h3 className="font-sans mt-2  text-2xl text-indigo-400">
                Routes Generated
              </h3>
            </div>
            <div className="flex-1 text-center border-r border-opacity-30 border-gray-300  mt-6 mb-6 pr-4 pl-4">
              <h1 className="font-sans mt-2 font-bold text-5xl text-white">
                100K+
              </h1>
              <h3 className="font-sans mt-2  text-2xl text-indigo-400">
                Downloads
              </h3>
            </div>
            <div className="flex-1 text-center mt-6 mb-6 pl-4">
              <h1 className="font-sans mt-2 font-bold text-5xl text-white">
                50K+
              </h1>
              <h3 className="font-sans mt-2 text-2xl text-indigo-400">
                Impressions
              </h3>
            </div>
          </div>
          <div className="border-t border-b border-opacity-30 border-gray-300"></div>
        </div>
      </div>
      <div>
        <h4 className="font-mono mt-10 text-center  font-bold text-3xl  sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">
          Make Your Ride Safe And Sustainable
        </h4>
        <h2 className="font-sans mt-2 text-center font-bold text-4xl text-white">
          We crunch data and routes for you
        </h2>
        <h4 className="font-mono mt-2 text-center  font-light text-2xl text-white">
          to have a hassle-free ride.
        </h4>
      </div>
      <div></div>
    </div>
  );
}
export default Landing;
