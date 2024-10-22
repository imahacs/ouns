"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Footer from "./../components/Footer";
import { thx } from "../../public/assets/assets";
import Header from "../header/header";

const ThankYou = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [loadingText, setLoadingText] = useState("تحليل البيانات");

  useEffect(() => {
    const loadingDots = setInterval(() => {
      setLoadingText((prevText) => {
        if (prevText.length < 15) {
          return prevText + ".";
        } else {
          return "تحليل البيانات"; 
        }
      });
    }, 500); 

    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000); 

    return () => {
      clearInterval(loadingDots); 
      clearTimeout(timer);       
    };
  }, []);

  const downloadReport = () => {
    const reportUrl = "https://imahacs.github.io/ouns/assets/repoet.pdf";
    const link = document.createElement('a');
    link.target = "_blank";
    link.href = reportUrl;
    link.download = 'report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-blue-100 to-white">
        <div className="text-center">
          <div className="loader mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold">{loadingText}</h1>
          <p className="text-lg mt-4">جارٍ تحليل نتائجك، يرجى الانتظار...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Header />
      <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-blue-100 to-white">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 flex flex-col rounded-xl shadow-lg overflow-hidden bg-white p-4 sm:p-6 md:p-10 space-y-4 text-center m-6">
          <div className="flex justify-center items-center">
            <Image 
              src={thx}
              alt="Thank youu"
              width={100}
              height={90}
            />
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">شكرًا لك!</h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl">
            لقد أتممت التشخيص الافتراضي بنجاح. نحن نقدر وقتك وجهودك.
          </p>

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
