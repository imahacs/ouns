"use client"; 
import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faClock, faPlay, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from "./../components/Footer";
import Header from "../header/header";

const WayWork = () => {
    const router = useRouter(); 
    const handleNavigation = () => {
        router.push('/interview'); 
    };

    return (
        <>
        <Header />
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-white">
            <div className="w-full md:w-3/4 flex flex-col items-center m-6">
                <div className="w-full flex justify-center mb-11">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">كيف يعمل أُنسَ؟</h1>
                </div>

                <div className="flex flex-col md:flex-row mb-8 w-full">
                    <div className="w-full md:w-1/3 p-6 md:p-12 flex flex-col justify-center items-center bg-white rounded-xl shadow-lg overflow-hidden mb-6 md:mb-0">
                        <FontAwesomeIcon icon={faQuestionCircle} className="text-blue-500 mb-4" size="3x" />
                        <h1 className="text-lg md:text-1xl font-bold text-gray-800 mb-4 text-center"> 3 اسئلة ودقائق</h1>
                        <p className="text-gray-600 mb-8 text-center">
                            سيتضمن التقييم 3 أسئلة، وكل سؤال سيستغرق دقيقة واحدة للإجابة عليه. 
                            تم إعداد هذه الأسئلة بعناية.
                        </p>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="w-20 h-1 md:w-40 bg-gray-800"></div>
                    </div>

                    <div className="w-full md:w-1/3 p-6 md:p-12 flex flex-col justify-center items-center bg-white rounded-xl shadow-lg overflow-hidden mb-6 md:mb-0">
                        <FontAwesomeIcon icon={faClock} className="text-blue-500 mb-4" size="3x" />
                        <h1 className="text-lg md:text-1xl font-bold text-gray-800 mb-4  text-center">تحليل الذكاء الاصطناعي</h1>
                        <p className="text-gray-600 mb-8 text-center">
                            سيقوم الذكاء الاصطناعي بتحليل إجاباتك بشكل فوري، لضمان دقة التقييم
                            واستخلاص النتائج الموثوقة.
                        </p>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="w-20 h-1 md:w-40 bg-gray-800"></div>
                    </div>

                    <div className="w-full md:w-1/3 p-6 md:p-12 flex flex-col justify-center items-center bg-white rounded-xl shadow-lg overflow-hidden">
                        <FontAwesomeIcon icon={faFileAlt} className="text-blue-500 mb-4" size="3x" />
                        <h1 className="text-lg md:text-1xl font-bold text-gray-800 mb-4">التقرير</h1>
                        <p className="text-gray-600 mb-8 text-center">احصل على تقرير مفصل بعد انتهاء التقييم.</p>
                    </div>
                </div>

                <button 
                    onClick={handleNavigation} 
                    className="flex items-center px-16 py-3 md:px-36 mt-6 md:mt-11 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
                >
                    بدء التقييم
                    <FontAwesomeIcon icon={faPlay} className="mr-2" />
                </button>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default WayWork;
