"use client"; // Add this line to make it a Client Component

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router for navigation
import Image from "next/image"; // Import Image component for optimized images

const AudioCheck = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioStream, setAudioStream] = useState(null);
  const [isAudioGood, setIsAudioGood] = useState(false); // State for audio check
  const [audioWasGoodOnce, setAudioWasGoodOnce] = useState(false); // Flag to keep button enabled
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const router = useRouter(); // Use Next.js router for page navigation

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

          // Change the color for a gradient effect
          const alpha = Math.min(1, barHeight / 255);
          const color = `rgba(0, 128, 255, ${alpha})`;

          canvasCtx.fillStyle = color;
          canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);

          // Small rectangles for sound wave look
          if (i % 2 === 0) {
            canvasCtx.fillRect(x + barWidth / 2 - 1, canvas.height - barHeight / 2, 2, barHeight);
          }

          x += barWidth + 2;
          totalVolume += dataArray[i];
        }

        // Set audio as good if volume is above a threshold and keep it enabled
        if (totalVolume > 5000) {
          setIsAudioGood(true);
          setAudioWasGoodOnce(true); // Keep the button enabled forever after audio is good
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
      stopRecording(); // Stop recording when user clicks "متابعه"
      router.push("/cameracheck"); // Navigate to the next page
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-white">
      <div className="w-3/4 flex rounded-xl shadow-lg overflow-hidden bg-white">
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4"> تحقق من الصوت</h1>
          <p className="text-gray-600 mb-8">
            يرجى التحقق من الميكروفون الخاص بك وتفعيل الخيار للسماح له بالوصول. انقر على زر التحقق. بمجرد أن يتضح أن الصوت بشكل جيد، يمكنك المتابعة.
          </p>
          <div className="flex space-x-4">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="px-36 py-3 mt-36 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
              >
                تحقق 
              </button>
            ) : (
              <button
                onClick={continueToNextPage}
                className={`px-36 py-3 mt-36 ${
                  audioWasGoodOnce ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"
                } text-white rounded-full shadow-lg`}
              >
                المتابعه
              </button>
            )}
          </div>
        </div>
        <div className="w-1/2 p-12 flex flex-col justify-center items-center">
          {!isRecording ? (
            <Image
              src="/images/audio.png"
              alt="Audio not active"
              width={500}
              height={300}
              className="w-full h-auto"
            />
          ) : (
            <canvas ref={canvasRef} className="w-full h-40 mb-4"></canvas>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioCheck;
