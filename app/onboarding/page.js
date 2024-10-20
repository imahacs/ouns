"use client";
import React from 'react';
import Footer from "./../components/Footer";
// import Header from "./../components/Header";
import { useRouter } from 'next/navigation';

const GetStarted = () => {
    const router = useRouter(); 
    const handleNavigation = () => {
      router.push('/audiocheck'); 
    };

  return (
    <>
    {/* <Header /> */}
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-white">
      <div className="w-3/4 flex rounded-xl shadow-lg overflow-hidden">
      <div className="w-1/2 p-12 flex flex-col justify-center bg-white">
          <h1 className="text-3xl font-bold text-gray-800 mb-4"> أداة للكشف عن الصحة النفسية باستخدام الذكاء الاصطناعي</h1>
          <p className="text-gray-600 mb-8">
          فحص أولي مدعوم بالذكاء الاصطناعي، يقدّم كشفًا شاملاً مع مرونة ودرجة عالية من الخصوصية.</p>
          <button  onClick={handleNavigation}
           className="px-36 py-3 mt-11 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600">
            ابدأ
          </button>
        </div>

        <div className="w-1/2 bg-blue-200"></div>
       
      </div>
     
    </div>
     <Footer />
    </>
  );
};

export default GetStarted;
