import React from "react";
import Image from "next/image";
import { MdArrowForward } from "react-icons/md";
import { header } from "../assets/assets";

const Hero = ({ id }) => {
  return (
    <section id={id}
      className="relative px-16 pt-8 pb-20 min-h-[500px] md:min-h-[700px] lg:min-h-[900px] overflow-hidden bg-[radial-gradient(ellipse_200%_100%_at_bottom_right,#183EC2,rgba(234,238,250,0.66))]"
    >
      <div className="container mx-auto relative z-10">
        <div>
          <div className="tag">
            الإصدار 2.0 هنا
          </div>
          <h1 className="text-5xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#002E80] text-transparent bg-clip-text mt-6 mb-4 py-4">
            طريق الإنتاجية
          </h1>
          <p className="text-xl text-[#010D3E] tracking-tight mt-6">
            نص تجريبي هنا، يمكنك استبداله بنص عربي يناسب محتواك.
          </p>
          <div className="flex gap-1 items-center mt-[30px]">
            <button className="btn btn-primary">احصل عليه مجانًا</button>
            <button className="btn btn-text gap-1">
              <MdArrowForward className="h-5 w-5" />
              <span>تعلم المزيد</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <Image
          src={header}
          alt="Wave background"
          layout="responsive"
          width={1920}
          height={400}
          objectFit="cover"
          className="w-full"
        />
      </div>
    </section>
  );
};

export default Hero;
