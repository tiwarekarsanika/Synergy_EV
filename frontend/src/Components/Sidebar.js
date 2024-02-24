import React from "react";
import {motion} from 'framer-motion'

const Sidebar = () => {
    return (
      <motion.div
        className="fixed inset-y-0 left-0 w-80 bg-[#0c0c1d] z-50 top-16"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
      >
        <div className="p-4 my-10 mx-8 font-bold text-lg">
        <motion.button
      className="w-full py-5 px-4 bg-[#191931] text-white rounded-md my-10 text-center hover:border-white hover:border-2"
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
    >
      Nearby Charging Stations
    </motion.button>
          <button className="w-full py-5 px-4 bg-[#191931] text-white rounded-md mb-10">
            Plan a Trip
          </button>
          <button className="w-full py-5 px-4 bg-[#191931] text-white rounded-md">
            Profile
          </button>
        </div>
      </motion.div>
    );
};

export default Sidebar;