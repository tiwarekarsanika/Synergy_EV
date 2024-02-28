import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate()

  return (
    <motion.div
      className="fixed inset-y-0 left-0 w-80  bg-[#411A50] z-50 top-16"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
    >
      <div className="p-4 my-5 mx-8 font-bold text-lg">
        <motion.button
          className="w-full py-5 px-4 bg-[#6D2D87] text-white rounded-md mb-5 mt-12 text-center hover:border-white hover:border-2"
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=>navigate('/chargingStations')}
        >
          Nearby Charging Stations
        </motion.button>
        <motion.button
          className="w-full py-5 px-4 bg-[#6D2D87] text-white rounded-md my-5 text-center hover:border-white hover:border-2"
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=>navigate('/mapcontainer')}
        >
          Plan a Trip
        </motion.button>
        <motion.button
          className="w-full py-5 px-4 bg-[#6D2D87] text-white rounded-md my-5 text-center hover:border-white hover:border-2"
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=>navigate('/cabService')}
        >
          Car Services
        </motion.button>
        <motion.button
          className="w-full py-5 px-4 bg-[#6D2D87] text-white rounded-md my-5 text-center hover:border-white hover:border-2"
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=>navigate('/towService')}
        >
          Tow Services
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;