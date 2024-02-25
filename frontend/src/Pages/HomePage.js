import React from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import { FaUserCircle } from "react-icons/fa";
import MyCarCanvas from './MyCar';
import Cars from '../Components/Cars.json'
import { useEffect } from 'react';
import { useMotionValue, useTransform, animate } from 'framer-motion'
import { motion } from 'framer-motion'
import { IoIosSpeedometer } from "react-icons/io";
import { GiPathDistance } from "react-icons/gi";
import { FaBoltLightning } from "react-icons/fa6";
import axios from 'axios';

function HomePage() {

  const count = useMotionValue(0);
  const top_speed = useTransform(count, Math.round);
  const count2 = useMotionValue(0);
  const efficiency = useTransform(count2, Math.round); // Use count2 instead of count
  const count3 = useMotionValue(0);
  const range = useTransform(count3, Math.round);

  var mname = ''
  const myFunction = async () => {
    const response = await axios.get('http://localhost:5000/model-info', {
      params: {
        modelName: "Model 3 Long Range Dual Motor",
      },
    });
    console.log(response);

    const animation = animate(count, response.data.efficiency_wh_km, { duration: 5 });
    const animation2 = animate(count2, response.data.top_speed, { duration: 5 });
    const animation3 = animate(count3, response.data.range_km, { duration: 5 });
    mname = response.data.model;
    console.log(Cars[0]['Range(Km)'])
    return () => {
      animation.stop();
      animation2.stop();
      animation3.stop();
    };
  };


  useEffect(() => {
    myFunction();
  });

  return (
    <div className="Home flex">
      <Navbar />
      <Sidebar />
      <div className='Details flex flex-grow justify-end mt-20  mx-5'>
        <div className='w-1/4'>
          <div className=' border-2 rounded-lg h-fit p-5 flex flex-col justify-center items-center'>
            <FaUserCircle size={50} />
            <p className='text-xl font-bold'>Darshini</p>
            <p className='text-lg font-semibold'>+91 9767228282</p>
          </div>
          <div className='mt-2 border-2 rounded-lg h-fit p-5 flex flex-col justify-center items-center'>
            <MyCarCanvas />
            <p className='font-bold text-lg w-2/3'>{mname}</p>
            <div className='grid grid-cols-3'>
              <div className="rounded-sm shadow-md border my-3 shadow-gray-300 text-gray-800">
                <div className="grid place-items-center px-3 py-2">
                  <IoIosSpeedometer />
                  <div className="text-md">Speed</div>
                  <div className="font-bold text-lg flex justify-center items-baseline"><motion.h1>{top_speed}</motion.h1><p className='text-xs ml-1 font-light'>KmH</p></div>
                </div>
              </div>
              <div className="rounded-sm shadow-md border my-3 shadow-gray-300 text-gray-800">
                <div className="grid place-items-center px-2 py-2">
                  <FaBoltLightning />
                  <div className="text-md">Efficiency</div>
                  <div className="font-bold text-lg flex justify-center items-baseline"><motion.h1>{efficiency}</motion.h1><p className='text-xs ml-1 font-light'>Wh/Km</p></div>
                </div>
              </div>
              <div className="rounded-sm shadow-md border my-3 shadow-gray-300 text-gray-800">
                <div className="grid place-items-center px-3 py-2">
                  <GiPathDistance />
                  <div className="text-md">Range</div>
                  <div className="font-bold text-lg flex justify-center items-baseline"><motion.h1>{range}</motion.h1><p className='text-xs ml-1 font-light'>Km</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;