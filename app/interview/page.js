"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const Interview = () => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(60); // 1 minute timer
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const videoRef = useRef(null);
  const chunks = useRef([]);
  const router = useRouter();

  const questions = [
    "كيف كانت حالتك المزاجية ومستوى طاقتك مؤخرًا؟",
    "هل لاحظت أي تغييرات في نمط نومك، شهيتك، أو تركيزك؟",
    "هل كنت تشعر بأي شكوك في النفس، توتر أو قلق، أو إحساس باليأس؟",
  ];

  // Request camera permissions and set up the stream
  const setupCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream; // Show live feed
    } catch (error) {
      console.error("Permission denied or no camera available", error);
    }
  };

  // Start video recording
  const startRecording = () => {
    setupCamera(); // Set up camera when starting the recording

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
        setVideoUrl(url); // Set the URL for the recorded video
        chunks.current = [];
        setRecording(false);
        // Stop the stream after recording is complete
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null; // Close the camera stream
      };

      // Timer logic
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

  // Stop recording manually or after timer
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setTimer(60); // Reset timer
    }
  };

  // Move to the next question or navigate to the Thank You page
  const handleSubmit = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setVideoUrl(""); // Reset video URL for the next question
      setTimer(60); // Reset timer for the next question
    } else {
      router.push("/thank-you"); // Redirect to the Thank You page after the last question
    }
  };

  // Retake video (reset state)
  const retakeVideo = () => {
    setVideoUrl("");
    setTimer(60);
    setupCamera(); // Set up camera again for retake
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-white">
      <div className="w-3/4 flex flex-col rounded-xl shadow-lg overflow-hidden bg-white p-6 space-y-4">
        <h1 className="text-center text-xl font-bold">التشخيص الافتراضي </h1>
        <p className="text-center">يرجى الإجابة على السؤال التالي:</p>
        <div className="p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-lg">{questions[currentQuestionIndex]}</p>
        </div>

        {/* Display Recorded Video or Live Camera Feed */}
        {videoUrl ? (
          // Show recorded video if available
          <video
            src={videoUrl}
            controls
            className="w-full h-64 bg-black rounded-lg mt-4"
          />
        ) : (
          // Show live camera feed when not recorded, with a flip effect
          <video
            ref={videoRef}
            className="w-full h-64 bg-black rounded-lg transform scale-x-[-1]"
            autoPlay
            muted
          />
        )}

        {/* Timer and recording controls */}
        <div className="text-center text-lg font-semibold">
          {recording ? `جاري التسجيل... ${timer}ث` : "ليس في وضع التسجيل"}
        </div>

        <div className="flex justify-center space-x-4">
          {!recording && !videoUrl && (
            <button
              onClick={startRecording}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              ابدأ التسجيل
            </button>
          )}
          {recording && (
            <button
              onClick={stopRecording}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              أوقف التسجيل
            </button>
          )}
        </div>

        {/* Retake and Submit buttons */}
        {videoUrl && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={retakeVideo}
              className="text-blue-500 m-5 hover:underline"
            >
              إعادة التصوير
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              تقديم
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Interview;
