import React from "react";
import Image from "next/image";
import { showcase } from "../../public/assets/assets";

const Showcase = ({ id }) => {
  return (
    <section
      id={id}
      className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[840px] mx-auto text-center">
          <div className="flex flex-col justify-center items-center">
            <div className="tag">أُنس لكي تأنس</div>
          </div>
          <h2 className="text-3xl md:text-[54px] md:leading-[60px] font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-5 pb-2 pt-2">
            أُنس: حل مبتكر لدعم الصحة النفسية
          </h2>
          <p className="text-[22px] leading-[30px] tracking-tight text-[#010D3E] mt-5">
            باستخدام تقنيات الذكاء الاصطناعي، يمكنك الآن تقييم حالتك النفسية في
            دقائق معدودة!
          </p>
        </div>
        <div className="relative flex justify-center">
          <Image
            src={showcase}
            alt="دكتور"
            className="mt-10 "
            width={400}
            height={200}
          />
        </div>
      </div>
    </section>
  );
};

export default Showcase;
