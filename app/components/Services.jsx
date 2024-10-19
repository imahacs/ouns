import React from "react";
import { FaClipboardCheck, FaFileAlt, FaUserShield, FaCalendarAlt } from 'react-icons/fa';

const Services = ({ id }) => {
  const services = [
    {
      title: "تقييمات نفسية شاملة",
      description: "نقدم مجموعة متنوعة من التقييمات النفسية التي تساعد الأفراد على قياس مستويات القلق والاكتئاب وفهم احتياجاتهم بشكل أفضل.",
      icon: <FaClipboardCheck className="w-10 h-10 text-[#001E80]" />,
    },
    {
      title: "تقارير مخصصة",
      description: "بعد اجتياز التقييم، يحصل المستخدمون على تقارير شاملة تتضمن معلومات مفيدة وتوصيات مخصصة لتحسين صحتهم النفسية.",
      icon: <FaFileAlt className="w-10 h-10 text-[#001E80]" />,
    },
    {
      title: "دعم نفسي احترافي",
      description: "نتعاون مع أخصائيين نفسيين معتمدين لتوفير الدعم والمشورة للمستخدمين بناءً على نتائج التقييم.",
      icon: <FaUserShield className="w-10 h-10 text-[#001E80]" />,
    },
    {
      title: "متابعة دورية",
      description: "يتم توفير تذكيرات وتقييمات دورية لضمان الالتزام بالخطة العلاجية وتحقيق أفضل النتائج.",
      icon: <FaCalendarAlt className="w-10 h-10 text-[#001E80]" />,
    },
  ];

  return (
    <section id={id} className="py-24 bg-gradient-to-b from-[#F5F5FA] to-[#D2DCFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-5xl text-center mb-12 font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text pb-2 pt-2">
          خدماتنا
        </h2>
        <div className="space-y-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="flex-1 text-right">
                  <h3 className="text-2xl font-semibold text-[#010D3E] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-700">{service.description}</p>
                </div>
                <div className="ml-4">{service.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
