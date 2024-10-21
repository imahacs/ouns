import React from "react";
import { FaUser, FaLightbulb, FaQuestionCircle, FaChartLine, FaHandsHelping } from "react-icons/fa";

const HowItWorks = ({ id }) => {
  const steps = [
    {
      stepNumber: "1",
      title: "الاشتراك السريع",
      description: "سجل حسابًا مجانيًا في أُنس.",
      icon: <FaUser className="text-6xl text-[#010D3E]" />, 
    },
    {
      stepNumber: "2",
      title: "تقييم بنقرة واحدة",
      description: "اضغط على زر واحد لبدء التقييم.",
      icon: <FaLightbulb className="text-6xl text-[#010D3E]" />, 
    },
    {
      stepNumber: "3",
      title: "أسئلة سريعة",
      description: "3 أسئلة في 3 دقائق.",
      icon: <FaQuestionCircle className="text-6xl text-[#010D3E]" />, 
    },
    {
      stepNumber: "4",
      title: "تحليل النتائج",
      description: "احصل على تحليل ذكي لحالتك النفسية.",
      icon: <FaChartLine className="text-6xl text-[#010D3E]" />, 
    },
    {
      stepNumber: "5",
      title: "دعم مستمر",
      description: "توجيهات  للخطوات التالية.",
      icon: <FaHandsHelping className="text-6xl text-[#010D3E]" />, 
    },
  ];

  return (
    <section id={id} className="bg-gradient-to-t from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl text-center mb-12 font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text pb-2 pt-2"> 
          كيف يعمل أُنس؟
        </h2>
        <div className="relative">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center mb-6 w-full relative justify-center">
              <div className="absolute top-0 left-1/2 h-full border-l border-gray-300 transform -translate-x-1/2"></div>

              <div className={`flex-shrink-0 w-1/4 flex items-center justify-center ${index % 2 === 0 ? 'order-2' : ''}`}>
                {step.icon}
              </div>

              <div className={`flex flex-col items-center text-center w-1/4 ${index % 2 === 0 ? 'order-1' : ''}`}>
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border border-[#010D3E] text-[#010D3E] font-bold text-xl mx-4 bg-white"> {/* Matching the border color */}
                  {step.stepNumber}
                </div>
                <h3 className="text-xl font-semibold mt-2 text-[#010D3E]"> 
                  {step.title}
                </h3>
                <p className="text-gray-700">{step.description}</p> 
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
