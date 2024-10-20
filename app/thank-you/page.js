"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Footer from "./../components/Footer";
import { thx } from "../../public/assets/assets";

const ThankYou = () => {
  const router = useRouter();

  const downloadReport = () => {
    const reportUrl = "/assets/report.pdf";  // المسار الصحيح هنا
    const link = document.createElement('a');
    link.href = reportUrl;
    link.download = 'report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-blue-100 to-white">
      <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 flex flex-col rounded-xl shadow-lg overflow-hidden bg-white p-4 sm:p-6 md:p-10 space-y-4 text-center m-6">
        <div className="flex justify-center items-center">
          <Image 
            src={thx}
            alt="Thank you"
            width={100}
            height={90}
          />
        </div>
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">شكرًا لك!</h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">لقد أتممت التشخيص الافتراضي بنجاح. نحن نقدر وقتك وجهودك.</p>

        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mt-8">
          <button
            onClick={downloadReport}
            className="w-full sm:w-auto sm:px-8 py-1 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
          >
            تحميل التقرير
          </button>

          <button
            onClick={() => router.push('/interview')}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 text-blue-500 rounded-full hover:underline"
          >
            العودة إلى التشخيص الافتراضي
          </button>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ThankYou;
