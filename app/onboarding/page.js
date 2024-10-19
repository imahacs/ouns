"use client";
import React from 'react';

const GetStarted = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-gray-100">
      <div className="bg-white rounded-3xl shadow-xl p-8 flex max-w-4xl">
        {/* Left Side: Image */}
        <div className="w-1/2 rounded-l-3xl bg-gradient-to-b from-blue-200 to-blue-400">
          {/* You can replace this div with an <img> tag if you have a specific image */}
          <img
            src="path-to-image"
            alt="Mental Health"
            className="h-full w-full object-cover rounded-l-3xl"
          />
        </div>

        {/* Right Side: Content */}
        <div className="w-1/2 p-8 flex flex-col justify-between">
          {/* Header Text */}
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            AI Detecting Tool <br /> For Mental Health
          </h1>

          {/* Description */}
          <p className="mt-4 text-gray-600">
            AI-powered video assessments, offering a dynamic and comprehensive
            approach to talent assessment and development.
          </p>

          {/* Button */}
          <div className="mt-8">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300">
              Start the Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
