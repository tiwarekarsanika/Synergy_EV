// import { motion } from "framer-motion";
// import React from "react";
// import { styles } from "../Timeline/styles";
// import { SectionWrapper } from "../../hoc/SectionWrapper";
// import { fadeIn, textVariant } from "../../utils/motion";
// import { testimonials } from "../../constants/index";

// const FeedbackCard = ({
//   index,
//   testimonial,
//   name,
//   designation,
//   company,
//   image,
// }) => (
//   <motion.div
//     variants={fadeIn("", "spring", index * 0.5, 0.75)}
//     className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full"
//   >
//     <p className="text-white font-black text-[48px]">"</p>

//     <div className="mt-1">
//       <p className="text-white tracking-wider text-[18px]">{testimonial}</p>

//       <div className="mt-7 flex justify-between items-center gap-1">
//         <div className="flex-1 flex flex-col">
//           <p className="text-white font-medium text-[16px]">
//             {/* Why span here */}
//             <span className="blue-text-gradient">@</span> {name}
//           </p>
//           <p className="mt-1 text-secondary text-[12px]">
//             {designation} at {company}
//           </p>
//         </div>

//         <img
//           src={image}
//           alt={`feedback-by-${name}`}
//           className="w-10 h-10 rounded-full object-cover"
//         />
//       </div>
//     </div>
//   </motion.div>
// );

// const Feedbacks = () => {
//   return (
//     <div className="mt-12 bg-black-100 rounded-[20px]">
//       <div
//         className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}
//       >
//         <motion.div variants={textVariant()}>
//           <p className={styles.sectionSubText}>What others say</p>
//           <h2 className={styles.sectionHeadText}>Testimonials</h2>
//         </motion.div>
//       </div>

//       <div className={`${styles.paddingX} -mt-20 pb-14 flex flex-wrap gap-7`}>
//         {testimonials.map((testimonial, index) => (
//           <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SectionWrapper(Feedbacks, "");
import React from "react";
import Tilt from "react-parallax-tilt";

function Feedbacks() {
  return (
    <Tilt className="Tilt" options={{ max: 25, scale: 1.05 }}>
      <div className="flex flex-row md:mt-0 sm:max-w-md xl:p-0 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <div className="pd-4 ml-8">Hello</div>
        <div>Hello</div>
        <div>Hello</div>
      </div>
    </Tilt>
  );
}

export default Feedbacks;
