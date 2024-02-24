import React, { Component } from "react";
import { styles } from "../Components/Timeline/styles";
import { staggerContainer } from "../utils/motion";
import { motion } from "framer-motion";

export const SectionWrapper = (Component, idName) =>
  // Section Alignment
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component />
      </motion.section>
    );
  };
