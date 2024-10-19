'use client'

import React from "react";
import { MdAccessTime, MdBarChart, MdHandshake } from "react-icons/md";
import { motion } from 'framer-motion';

const Ticker = () => {
  const items = [
    {
      icon: <MdAccessTime className="h-6 w-6" />,
      text: "التزامك بصحتك النفسية يبدأ هنا. جرب أُنس الآن!",
    },
    {
      icon: <MdBarChart className="h-6 w-6" />,
      text: "استكشف موارد الذكاء الاصطناعي المتاحة لتعزيز صحتك النفسية!",
    },
    {
      icon: <MdHandshake className="h-6 w-6" />,
      text: "انضم إلى مجتمع أُنس وشارك تجاربك!",
    },
  ];

  return (
    <div className="py-8 md:py-12 bg-white">
      <div className="container">
        <div
          className="flex overflow-hidden"
          style={{ maskImage: 'linear-gradient(to right, transparent, black, transparent)' }}
        >
          <motion.div
            className="flex gap-14 flex-none text-xl text-gray-800"
            animate={{ x: ["0%", "100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear",  repeatType:"loop"}}
          >
            {/* Render first set of items */}
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}

            {/* Render second set of items for continuous effect */}
            {items.map((item, index) => (
              <div key={index + items.length} className="flex items-center gap-2">
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Ticker;
