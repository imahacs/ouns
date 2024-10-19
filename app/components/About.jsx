import React from "react";

const About = ({ id }) => {
  return (
    <>

      <section id={id} className="bg-gradient-to-t from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl text-center mb-8 font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text pb-2 pt-2">
            من نحن؟
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-center leading-loose">
            نحن في أُنس، نؤمن بأن الصحة النفسية هي جزء أساسي من الرفاهية العامة. 
            تأسست منصتنا لتوفير حلول مبتكرة وفعّالة تساعد الأفراد على فهم حالتهم النفسية والحصول على الدعم المناسب. 
            نحن نستخدم تقنيات متقدمة مثل الذكاء الاصطناعي لتحليل مشاعر الأفراد وتقديم تقييمات دقيقة وسريعة.
          </p>
        </div>
      </section>


      <section className="flex flex-col md:flex-row w-full h-auto">
        {/* Vision side */}
        <div className="flex-1 bg-[#3A4D8F] text-[#F0F4FF] py-12 px-8 flex items-center justify-center">
          <div>
            <h3 className="text-3xl font-semibold mb-4 text-center">رؤيتنا</h3>
            <p className="text-lg text-center leading-loose">
              أن نكون رائدين في مجال الصحة النفسية، ونوفر حلولاً مبتكرة تسهل الوصول إلى الدعم النفسي لجميع الأفراد.
            </p>
          </div>
        </div>
        
        {/* Mission side */}
        <div className="flex-1 bg-[#6F7EB5] text-[#1C1F3F] py-12 px-8 flex items-center justify-center"> {/* Changed background */}
          <div>
            <h3 className="text-3xl font-semibold mb-4 text-center">مهمتنا</h3>
            <p className="text-lg text-center leading-loose">
              تمكين الأفراد من تحسين صحتهم النفسية من خلال توفير تقييمات شاملة ودقيقة، وتعزيز الوعي بالصحة النفسية في المجتمع.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
