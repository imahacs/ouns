"use client"; // Add this line to make it a Client Component

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router for navigation
import Image from "next/image"; // Import Next.js Image component

const CameraCheck = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [isCameraGood, setIsCameraGood] = useState(false); // New state for camera check
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const router = useRouter(); // Use Next.js router for page navigation

  useEffect(() => {
    if (isRecording && videoStream) {
      const canvas = canvasRef.current;

      // Ensure the canvas is available
      if (!canvas) {
        console.error("Canvas reference is null");
        return;
      }

      const ctx = canvas.getContext("2d");
      const video = document.createElement("video");
      video.srcObject = videoStream;
      video.play();

      // Set the canvas dimensions based on the video stream
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        draw(); // Start drawing only after metadata is loaded
      };

      const draw = () => {
        // Check if the context is available
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing
          
          // Flip the canvas horizontally
          ctx.save(); // Save the current state
          ctx.scale(-1, 1); // Flip horizontally
          ctx.translate(-canvas.width, 0); // Translate to the correct position

          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          ctx.restore(); // Restore the original state

          // Check if the video is good (e.g., if the image is clear)
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          let totalBrightness = 0;
          
          for (let i = 0; i < data.length; i += 4) {
            const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3; // Calculate average brightness
            totalBrightness += brightness;
          }

          const averageBrightness = totalBrightness / (data.length / 4);
          setIsCameraGood(averageBrightness > 100); // Camera is good if brightness is above threshold

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
      router.push("/waywork"); // Navigate to the next page
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-white">
      <div className="w-3/4 flex rounded-xl shadow-lg overflow-hidden bg-white">
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4"> تحقق من الكاميرا</h1>
          <p className="text-gray-600 mb-8">
            يرجى التحقق من الكاميرا الخاصة بك وتفعيل الخيار للسماح لها بالوصول. انقر على زر التحقق. بمجرد أن يتضح أن الكاميرا تعمل بشكل جيد، يمكنك المتابعة.
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
                className="px-36 py-3 mt-36 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
              >
                المتابعة
              </button>
            )}
          </div>
        </div>
        <div className="w-1/2 p-12 flex flex-col justify-center items-center">
          {!isRecording ? (
            // Show image when not recording
            <Image 
              src="/images/cam.png" // Use relative path for Image component
              alt="Camera not active"
              width={500} // Set appropriate width
              height={300} // Set appropriate height
              className="w-full h-auto"
            />
          ) : (
            <canvas ref={canvasRef} className="w-full h-50 mb-4"></canvas>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraCheck;
