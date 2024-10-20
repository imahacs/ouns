"use client"; // Add this line to make it a Client Component

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "./../components/Footer";
// Import icons from Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCheck } from '@fortawesome/free-solid-svg-icons';
import { cam } from "../../public/assets/assets";

const CameraCheck = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [isCameraGood, setIsCameraGood] = useState(false);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isRecording && videoStream) {
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error("Canvas reference is null");
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
          setIsCameraGood(averageBrightness > 100);

          animationRef.current = requestAnimationFrame(draw);
        } else {
          console.error("Canvas context is null");
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
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing camera: ", err);
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
    }
  };

  return (
    <>
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
            <div className="flex space-x-4">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="md:px-28 md:py-1 mt-6 md:mt-36 px-24 py-1 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center"
                >
                  تحقق
                </button>
              ) : (
                <button
                  onClick={continueToNextPage}
                  className="md:px-28 md:py-1 mt-6 md:mt-36 px-24 py-1 bg-blue-500 text-white rounded-full shadow-lg hover:bg-green-600 transition duration-200 flex items-center justify-center"
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
                alt="Camera not active"
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
