import React from "react";
import { FaLink, FaLinkedin } from "react-icons/fa";
import { useState } from "react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="Navbar justify-between flex align-middle bg-[#411A50] h-16 items-center"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <div className="flex justify-center items-center text-white font-bold text-xl">
        <motion.div
          className="w-9 h-9 bg-white my-3 mx-5"
          animate={{
            scale: [1, 1, 1.3, 1.3, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        ></motion.div>
        EVolve
      </div>
      <div className="Menu flex mr-5 gap-2 justify-center items-center mt-3 font-bold text-md">
        <motion.a
          smooth={true}
          duration={500}
          className="px-2 py-1 rounded-md text-white"
          whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
          onClick={()=>navigate('/home')}
        >
          Home
        </motion.a>
        <motion.a
          smooth={true}
          duration={500}
          className="px-2 py-1 rounded-md text-white"
          whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
          onClick={()=>navigate('/mapcontainer')}
        >
          Routes
        </motion.a>
        <motion.a
          smooth={true}
          duration={500}
          className="px-2 py-1 rounded-md text-white"
          whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
          onClick={()=>navigate('/chargingStations')}
        >
          Charging Stations
        </motion.a>
        <motion.a
          smooth={true}
          duration={500}
          className="px-2 py-1 rounded-md text-white"
          whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
          onClick={()=>navigate('/cabService')}
        >
          Cab Services
        </motion.a>
        <motion.a
          smooth={true}
          duration={500}
          className="px-2 py-1 rounded-md text-white"
          whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
          onClick={()=>navigate('/towService')}
        >
          Towing Services
        </motion.a>

        {/* <motion.a
          href="#experiences"
          smooth={true}
          duration={500}
          className="px-2 py-1 rounded-md text-white"
          whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
        >
          Experiences
        </motion.a> */}
      </div>
    </motion.div>
  );
}

export default Navbar;