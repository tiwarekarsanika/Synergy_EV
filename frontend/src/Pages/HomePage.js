import React from 'react';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';

function HomePage() {
  return (
    <div className="Home flex">
      <Navbar />
      <Sidebar />
      <div className='Details flex flex-grow justify-end mt-16'>
        <div>
          
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
}

export default HomePage;