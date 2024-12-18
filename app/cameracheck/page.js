"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "./../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { cam } from "../../public/assets/assets";
import Header from "../components/HeaderTwo";

const CameraCheck = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [isCameraGood, setIsCameraGood] = useState(false);
  const [isCameraLoading, setIsCameraLoading] = useState(false); 
  const [cameraError, setCameraError] = useState(""); 
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isRecording && videoStream) {
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error("empty");
        return;
      }

      const ctx = canvas.getContext("2d");
      const video = document.createElement("video");
      video.srcObject = videoStream;
      video.play();

      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        draw();
      };

      const draw = () => {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.save();
          ctx.scale(-1, 1);
          ctx.translate(-canvas.width, 0);
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          ctx.restore();

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          let totalBrightness = 0;

          for (let i = 0; i < data.length; i += 4) {
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
            totalBrightness += brightness;
          }

          const averageBrightness = totalBrightness / (data.length / 4);
          const cameraIsGood = averageBrightness > 100;
          setIsCameraGood(cameraIsGood);
          console.log("متوسط السطوع:", averageBrightness); 
          console.log("جودة الكاميرا:", cameraIsGood); 

          animationRef.current = requestAnimationFrame(draw);
        } else {
          console.error("السياق الخاص بالكانفاس فارغ");
        }
      };

      draw();
    }

    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
      cancelAnimationFrame(animationRef.current);
    };
  }, [isRecording, videoStream]);

  const startRecording = async () => {
    setIsCameraLoading(true);   
    setCameraError(""); 
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      setIsRecording(true);
    } catch (err) {
      console.error("خطأ في الوصول إلى الكاميرا: ", err);
      setCameraError("تعذر الوصول إلى الكاميرا. يرجى التأكد من اتصال الكاميرا ومنح الإذن.");
    } finally {
      setIsCameraLoading(false); 
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
    }
  };

  const continueToNextPage = () => {
    if (isCameraGood) {
      router.push("/waywork");
    } else {
      console.log("الكاميرا ليست جيدة بما يكفي، لا يمكن الانتقال."); 
    }
  };

  return (
    <>
    <Header />
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-white p-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-xl shadow-lg overflow-hidden bg-white border border-gray-300">
          <div className="md:w-1/2 p-6 flex flex-col justify-center">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center">
              تحقق من الكاميرا
              <FontAwesomeIcon icon={faCamera} className="mr-2 text-blue-500" />
            </h1>
            <p className="text-gray-600 mb-4">
              يرجى التحقق من الكاميرا الخاصة بك وتفعيل الخيار للسماح لها بالوصول. انقر على زر التحقق. بمجرد أن يتضح أن الكاميرا تعمل بشكل جيد، يمكنك المتابعة.
            </p>

            {cameraError && (
              <p className="text-red-500 mb-4">{cameraError}</p>
            )}

            <div className="flex space-x-4">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  disabled={isCameraLoading}  
                  className={`md:px-28 md:py-1 mt-6 md:mt-36 px-24 py-1 ${isCameraLoading ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center`}
                >
                  {isCameraLoading ? "جار التحميل..." : "تحقق"}
                </button>
              ) : (
                <button
                  onClick={continueToNextPage}
                  className="md:px-28 md:py-1 mt-6 md:mt-36 px-24 py-1 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center"
                >
                  المتابعة
                </button>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center items-center">
            {!isRecording ? (
              <Image 
                src={cam}
                alt="الكاميرا غير مفعلة"
                width={500}
                height={300}
                className="w-full h-auto"
              />
            ) : (
              <canvas ref={canvasRef} className="w-full h-50 mb-4 border border-gray-300 shadow-md"></canvas>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CameraCheck;
