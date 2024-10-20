"use client"; 
import React from 'react';
import { useRouter } from 'next/navigation';

const WayWork = () => {
    const router = useRouter(); 
    const handleNavigation = () => {
        router.push('/interview'); 
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-white">
            <div className="w-3/4 flex flex-col items-center">
                <div className="w-full flex justify-center mb-11">
                    <h1 className="text-3xl font-bold text-gray-800">طريقة عمل الخدمة</h1>
                </div>

                <div className="flex mb-8 w-full">
                    <div className="w-1/2 p-12 flex flex-col justify-center items-center bg-white rounded-xl shadow-lg overflow-hidden">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">3 أسئلة</h1>
                        <p className="text-gray-600 mb-8">ستتضمن المقابلة 3 أسئلة.</p>
                    </div>

                    <div className="flex items-center">
                        <div className="w-40 h-1 bg-gray-800"></div>
                    </div>

                    <div className="w-1/2 p-12 flex flex-col justify-center items-center bg-white rounded-xl shadow-lg overflow-hidden">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">3 دقائق</h1>
                        <p className="text-gray-600 mb-8">سيستغرق كل سؤال دقيقة واحدة للإجابة عليه.</p>
                    </div>
                </div>
                <button 
                    onClick={handleNavigation} 
                    className="px-36 py-3 mt-11 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
                >
                    بدء المقابلة
                </button>
            </div>
        </div>
    );
};

export default WayWork;
