"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

const ThankYou = () => {
  const router = useRouter();

  // Simulate report download (you can replace this with actual report download logic)
  const downloadReport = () => {
    const reportUrl = "/path-to-your-report/report.pdf"; // Change this to your report's URL
    const link = document.createElement('a');
    link.href = reportUrl;
    link.download = 'report.pdf'; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-white">
      <div className="w-3/4 flex flex-col rounded-xl shadow-lg overflow-hidden bg-white p-6 space-y-4 text-center">
        <div className="flex justify-center items-center">
          <Image 
            src="/images/thanku.png" // Add leading slash for relative path
            alt="Thank you"
            width={100} // Set appropriate width
            height={90} // Set appropriate height
            className=""
          />
        </div>
        <h1 className="text-2xl font-bold">شكرًا لك!</h1>
        <p className="text-lg">لقد أتممت التشخيص الافتراضي بنجاح. نحن نقدر وقتك وجهودك.</p>

        <div className="flex justify-center space-x-4 mt-8"> {/* Flexbox container for buttons */}
          <button
            onClick={downloadReport}
            className="px-10 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
          >
            تحميل التقرير
          </button>

          <button
            onClick={() => router.push('/interview')} // Navigate back to interview page
            className="px-10 py-3  text-blue-500 rounded-full hover:underline"
          >
            العودة إلى التشخيص الافتراضي
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
