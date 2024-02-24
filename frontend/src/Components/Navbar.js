import React from "react";
import { FaLink, FaLinkedin } from "react-icons/fa";
import { useState } from "react";

import {motion} from 'framer-motion'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      className="Navbar justify-between flex align-middle bg-[#0c0c1d] h-16 items-center"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <div className="flex justify-center items-center text-white font-bold text-xl">
      <motion.div
        className="w-9 h-9 bg-white my-3 mx-5"
        animate={{
          scale: [1, 1, 1.3, 1.3, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"]
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }}
      ></motion.div>
      EVolve
      </div>
      <div className="Menu flex mr-5 gap-2 self-center mt-3 font-bold text-md">
        <motion.a
          href="#about"
          smooth={true}
          duration={500}
          className="px-2 py-1 rounded-md text-white"
          whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
        >
          About
        </motion.a>
        <motion.a
          href="#projects"
          smooth={true}
          duration={500}
          className="px-2 py-1 rounded-md text-white"
          whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
        >
          Projects
        </motion.a>
        <motion.a
          href="#skills"
          smooth={true}
          duration={500}
          className="px-2 py-1 rounded-md text-white"
          whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
        >
          Skills
        </motion.a>
        <motion.a
          href="#experiences"
          smooth={true}
          duration={500}
          className="px-2 py-1 rounded-md text-white"
          whileHover={{ backgroundColor: "#ffffff", color: "#000000" }}
        >
          Experiences
        </motion.a>
        <motion.nav
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className="links px-2 py-2 rounded-md"
          style={{ position: "relative" }}
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(!isOpen)}
            style={{ position: "relative" }}
          >
            <FaLink />
            <motion.div
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 }
              }}
              transition={{ duration: 0.2 }}
              style={{ originY: 0.55 }}
            >
              <svg width="15" height="15" viewBox="0 0 20 20">
                <path d="M0 7 L 20 7 L 10 16" />
              </svg>
            </motion.div>
          </motion.button>
          <motion.ul
            animate={isOpen ? "open" : "closed"}
            style={{
              pointerEvents: isOpen ? "auto" : "none",
              position: "absolute",
              top: "100%",
              right: 5,
              backgroundColor: "#ffffff",
              color: "#000000",
              padding: "5px 20px 15px 20px"
            }}
            variants={{
              open: {
                clipPath: "inset(0% 0% 0% 0% round 10px)",
                width: "fit-content",
                height: "auto",
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.7,
                  delayChildren: 0.3,
                  staggerChildren: 0.05
                }
              },
              closed: {
                clipPath: "inset(10% 50% 90% 50% round 10px)",
                height: 0,
                transition: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.3
                }
              }
            }}
          >
            <motion.li
              variants={itemVariants}
              style={{ display: "flex", alignItems: "center" }}
            >
              {/* <FaLinkedin style={{ marginRight: '5px' }} /><a>darshini_kadme</a> */}
              Item 1
            </motion.li>
            <motion.li variants={itemVariants}>Item 2 </motion.li>
            <motion.li variants={itemVariants}>Item 3 </motion.li>
            <motion.li variants={itemVariants}>Item 4 </motion.li>
            <motion.li variants={itemVariants}>Item 5 </motion.li>
          </motion.ul>
        </motion.nav>
      </div>
    </motion.div>
  );
}


export default Navbar;