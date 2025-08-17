import React from 'react';
import { MapPin, Compass, Home, Search, Plane } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function ErrorPage() {

    const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleSearchDestinations = () => {
    navigate('/all-trips');
  };

  const handleContactSupport = () => {
    console.log('Opening contact support');

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Floating Elements */}
        <div className="relative mb-8">
          <div className="absolute -top-4 -left-4 animate-bounce delay-100">
            <Plane className="w-8 h-8 text-blue-400 transform rotate-12" />
          </div>
          <div className="absolute -top-2 -right-8 animate-bounce delay-300">
            <Compass className="w-6 h-6 text-teal-400" />
          </div>
          <div className="absolute top-8 -left-8 animate-bounce delay-500">
            <MapPin className="w-5 h-5 text-cyan-400" />
          </div>
        </div>

        {/* Main 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 mb-4 animate-pulse">
            404
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Oops! Destination Not Found
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Looks like you've wandered off the beaten path! The page you're looking for 
            seems to be on a different adventure. Let's get you back on track to discover 
            amazing destinations.
          </p>
        </div>

        {/* Illustration Area */}
        <div className="mb-8 relative">
          <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 to-teal-200/30 animate-pulse"></div>
            <div className="relative z-10">
              <MapPin className="w-24 h-24 text-blue-500 mb-4 animate-bounce" />
              <div className="flex space-x-2 justify-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping delay-100"></div>
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-ping delay-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
          <button
            onClick={handleGoHome}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </button>
          
          <button
            onClick={handleSearchDestinations}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 text-white font-semibold rounded-lg hover:from-teal-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Search className="w-5 h-5 mr-2" />
            Explore Destinations
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-300 rounded-full opacity-50 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-300 rounded-full opacity-60 animate-pulse delay-300"></div>
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-teal-300 rounded-full opacity-40 animate-pulse delay-700"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-blue-300 rounded-full opacity-50 animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  );
}