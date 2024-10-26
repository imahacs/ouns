"use client"
import React, { useState } from 'react';
import Footer from "./../components/Footer";
import Header from "../components/HeaderTwo";
import { useRouter } from "next/navigation";


const Terms = () => {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleNavigation = () => {
    router.push("/audiocheck");
  };

  return (
    <>
      <Header />
      <div className="min-h-screen w-full flex justify-center items-start bg-gradient-to-r from-blue-100 to-white py-8">
        <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 flex flex-col rounded-xl shadow-lg overflow-hidden bg-white p-6 space-y-6 m-6">
          <h1 className="text-3xl font-bold text-center mb-4">شروط الاستخدام</h1>
          
          <div className="max-h-80 overflow-y-auto">
            <h2 className="text-xl font-semibold">1. قبول الشروط</h2>
            <p>بمجرد الوصول إلى الموقع واستخدامه، فإنك توافق على الالتزام بهذه الشروط. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام الموقع.</p>

            <h2 className="text-xl font-semibold">2. استخدام الموقع</h2>
            <p>يُسمح لك باستخدام الموقع لأغراض شخصية وغير تجارية فقط. يُحظر عليك استخدام الموقع لأي غرض غير قانوني أو ينتهك أي من الشروط المنصوص عليها هنا.</p>

            <h2 className="text-xl font-semibold">3. خصوصية البيانات</h2>
            <p>نحن نحترم خصوصيتك. جميع الفيديوهات التي تقوم بتصويرها أثناء استخدامك للموقع لا تُخزن على خوادمنا ولا تُجمع لأي غرض آخر. يتم حذفها تلقائيًا بعد انتهاء الجلسة.</p>

            <h2 className="text-xl font-semibold">4. معلومات التقرير</h2>
            <p>التقرير الذي ستحصل عليه بناءً على إجاباتك وتحليلات الكاميرا والميكروفون هو لأغراض إرشادية فقط. لا يُعتبر هذا التقرير بديلاً عن الاستشارة الطبية أو العلاج المتخصص.</p>

            <h2 className="text-xl font-semibold">5. الاستخدام المسؤول</h2>
            <p>أنت مسؤول عن أي محتوى تقوم بتحميله أو مشاركته من خلال الموقع. يجب أن تكون على علم بأن أي محتوى قد يتم إرساله يمكن أن يُستخدم لتحليل البيانات، لكن سيتم الحفاظ على سرية هويتك.</p>

            <h2 className="text-xl font-semibold">6. التعديلات على الشروط</h2>
            <p>نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطار المستخدمين بالتغييرات عبر إشعار على الموقع. استمرارك في استخدام الموقع بعد إجراء التعديلات يعني أنك توافق على الشروط المعدلة.</p>

            <h2 className="text-xl font-semibold">7. إخلاء المسؤولية</h2>
            <p>لا نضمن دقة أو اكتمال أو موثوقية أي معلومات أو محتوى متاح على الموقع. نحن غير مسؤولين عن أي أضرار أو خسائر قد تنشأ عن استخدام الموقع أو الاعتماد على المعلومات المقدمة.</p>

          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="termsCheckbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor="termsCheckbox" className="text-sm mr-3">
              أوافق على الشروط والأحكام
            </label>
          </div>

          <button
            onClick={handleNavigation}
            disabled={!isChecked}
            className={`items-center md:px-28 md:py-1 mt-6 md:mt-36 px-24 py-1 ${isChecked ? 'bg-blue-500 text-white' : 'bg-gray-400 text-gray-300 cursor-not-allowed'} rounded-full shadow-lg transition duration-200`}
          >
            متابعة
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Terms;
