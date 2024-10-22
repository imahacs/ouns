"use client"; 

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image"; 
import Footer from "./../components/Footer";
import { FaMicrophone } from 'react-icons/fa'; 
import { audio } from "../../public/assets/assets";
import Header from "../components/HeaderTwo";


const AudioCheck = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [isAudioGood, setIsAudioGood] = useState(false); 
  const [audioWasGoodOnce, setAudioWasGoodOnce] = useState(false); 
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const router = useRouter(); 

  useEffect(() => {
    if (isRecording && audioStream) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(audioStream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      source.connect(analyserRef.current);

      const drawBars = () => {
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext("2d");
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

        analyserRef.current.getByteFrequencyData(dataArray);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        let totalVolume = 0;

        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i] / 2;
          const alpha = Math.min(1, barHeight / 255);
          const color = `rgba(0, 128, 255, ${alpha})`;

          canvasCtx.fillStyle = color;
          canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);
          if (i % 2 === 0) {
            canvasCtx.fillRect(x + barWidth / 2 - 1, canvas.height - barHeight / 2, 2, barHeight);
          }

          x += barWidth + 2;
          totalVolume += dataArray[i];
        }
        if (totalVolume > 5000) {
          setIsAudioGood(true);
          setAudioWasGoodOnce(true); 
        }

        animationRef.current = requestAnimationFrame(drawBars);
      };

      drawBars();
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      cancelAnimationFrame(animationRef.current);
    };
  }, [isRecording, audioStream]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone: ", err);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
      setAudioStream(null);
    }
  };

  const continueToNextPage = () => {
    if (audioWasGoodOnce) {
      stopRecording(); 
      router.push("/cameracheck");
    }
  };

  return (
    <>
    <Header />
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-white p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row rounded-xl shadow-lg overflow-hidden bg-white p-7">
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
            تحقق من الصوت  <FaMicrophone className="text-blue-500 mr-2" />
          </h1>
          <p className="text-gray-600 mb-8">
            يرجى التحقق من الميكروفون الخاص بك وتفعيل الخيار للسماح له بالوصول. انقر على زر التحقق. بمجرد أن يتضح أن الصوت بشكل جيد، يمكنك المتابعة.
          </p>
          <div className="flex space-x-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="md:px-28 md:py-1 mt-6 md:mt-36 px-24 py-1 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-200"
              >
                تحقق 
              </button>
            ) : (
              <button
                onClick={continueToNextPage}
                className={`md:px-28 md:py-1 mt-6 md:mt-36 px-24 py-1 ${
                  audioWasGoodOnce ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"
                } text-white rounded-full shadow-lg transition duration-200`}
              >
                المتابعه
              </button>
            )}
          </div>
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-center items-center">
          {!isRecording ? (
            <Image
              src={audio}
              alt="Audio not active"
              width={500}
              height={300}
              className="rounded-lg"
            />
          ) : (
            <div className="flex justify-center items-center w-full">
              <canvas
                ref={canvasRef}
                width={500}
                height={300}
                className="rounded-lg"
                style={{ padding: '12px', margin: '0 auto' }} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default AudioCheck;
