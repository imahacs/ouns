"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Footer from "./../components/Footer";
import { FaVideo, FaStopCircle } from "react-icons/fa";
import Header from "../components/HeaderTwo";


const Interview = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(60); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const videoRef = useRef(null);
  const chunks = useRef([]);
  const router = useRouter();

  const questions = [
    "1. كيف كانت حالتك المزاجية ومستوى طاقتك مؤخرًا؟",
    "2. هل لاحظت أي تغييرات في نمط نومك، شهيتك، أو تركيزك؟",
    "3. هل كنت تشعر بأي شكوك في النفس، توتر أو قلق، أو إحساس باليأس؟",
];

  const setupCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream; 
    } catch (error) {
      console.error("Permission denied or no camera available", error);
    }
  };

  const startRecording = () => {
    setupCamera(); 

    if (stream) {
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.start();
      setRecording(true);

      recorder.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url); 
        chunks.current = [];
        setRecording(false);
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null; 
      };

      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            stopRecording();
            clearInterval(interval);
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setTimer(60); 
    }
  };

  const handleSubmit = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setVideoUrl(""); 
      setTimer(60); 
    } else {
      router.push("/thank-you");
    }
  };
  
  const retakeVideo = () => {
    setVideoUrl("");
    setTimer(60);
    setupCamera(); 
  };

  return (
      <>
      <Header />
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-white">
          <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 flex flex-col rounded-xl shadow-lg overflow-hidden bg-white p-4 sm:p-6 md:p-8 lg:p-10 space-y-4 m-4 sm:m-6">
            <h1 className="text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
              التشخيص الافتراضي
            </h1>
            <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl">
              يرجى الإجابة على السؤال التالي:
            </p>
            <div className="p-3 sm:p-4 bg-gray-100 rounded-lg text-center">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                {questions[currentQuestionIndex]}
              </p>
            </div>
            {videoUrl ? (
              <video
                src={videoUrl}
                controls
                className="w-full h-48 sm:h-64 bg-black rounded-lg mt-4"
              />
            ) : (
              <video
                ref={videoRef}
                className="w-full h-48 sm:h-64 bg-black rounded-lg transform scale-x-[-1]"
                autoPlay
                muted
              />
            )}
            <div className="text-center text-sm sm:text-base md:text-lg font-semibold">
              {recording ? `جاري التسجيل... ${timer}ث` : "ليس في وضع التسجيل"}
            </div>
  
            <div className="flex justify-center space-x-6">
              {!recording && !videoUrl && (
                <button
                  onClick={startRecording}
                  className="md:px-28 md:py-1 mt-6 px-6 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 flex items-center justify-center"
                >
                  ابدأ التسجيل
                  <FaVideo className="mr-2" />
                </button>
              )}
              {recording && (
                <button
                  onClick={stopRecording}
                  className="md:px-28 md:py-1 mt-6 px-6 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center"
                >
                  أوقف التسجيل
                  <FaStopCircle className="mr-2" />
                </button>
              )}
            </div>
  
            {videoUrl && (
              <div className="flex justify-center space-x-6">
                <button
                  onClick={retakeVideo}
                  className="md:px-28 md:py-1 mt-6 px-6 text-sm py-1 text-blue-500 hover:underline"
                >
                  إعادة التصوير
                </button>
                <button
                  onClick={handleSubmit}
                  className="md:px-28 md:py-1 mt-6 px-6 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                  تقديم
                </button>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </>
  );
};

export default Interview;
