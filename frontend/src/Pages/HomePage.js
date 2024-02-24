import React from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import { FaUserCircle } from "react-icons/fa";

function HomePage() {
  return (
    <div className="Home flex">
      <Navbar />
      <Sidebar />
      <div className='Details flex flex-grow justify-end mt-20  mx-5'>
        <div className='w-1/4'>
            <div className=' border-2 rounded-lg h-fit p-5 flex flex-col justify-center items-center'>
              <FaUserCircle size={70}/>
              <p className='text-xl font-bold'>Darshini</p>
              <p className='text-lg font-semibold'>+91 9767228282</p>
            </div>
            <div className='mt-2 border-2 rounded-lg h-fit p-5 flex flex-col justify-center items-center'>
              
            </div>
          </div>
      </div>
    </div>
  );
}

export default HomePage;