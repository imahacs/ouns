"use client";
import React from 'react';
import Footer from "./../components/Footer";
import { useRouter } from 'next/navigation';

const GetStarted = () => {
    const router = useRouter(); 
    const handleNavigation = () => {
      router.push('/audiocheck'); 
    };

  return (
    <>
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-white">
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 flex flex-col sm:flex-row rounded-xl shadow-lg overflow-hidden bg-white m-6">
        <div className="w-full sm:w-1/2 p-4 sm:p-6 md:p-12 flex flex-col justify-center bg-white">
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4"> 
            أداة للكشف عن الصحة النفسية باستخدام الذكاء الاصطناعي
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-8">
            فحص أولي مدعوم بالذكاء الاصطناعي، يقدّم كشفًا شاملاً مع مرونة ودرجة عالية من الخصوصية.
          </p>
          <button 
            onClick={handleNavigation}
            className="w-full sm:w-auto px-6 sm:px-8 py-1 mt-8 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
          >
            ابدأ
          </button>
        </div>
        <div className="w-full sm:w-1/2 bg-blue-200"></div>
       
      </div>
    </div>
    <Footer />
    </>
  );
};

export default GetStarted;
