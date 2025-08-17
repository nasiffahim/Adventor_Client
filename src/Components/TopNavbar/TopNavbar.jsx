import React, { use, useState } from "react";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaPhoneAlt,
  FaTwitterSquare,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

export default function TopNavbar() {
  const { user } = use(AuthContext);
  const [isExpanded, setIsExpanded] = useState(false);

  const welcomeMessages = [
    "Pack your bags — adventure awaits!",
    "Explore, Dream, Discover!",
    "Bangladesh is calling. Are you ready?",
    "Your travel guide is just a click away!!!",
  ];

  const message =
    welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-black text-white text-xs font-special font-bold">
      {/* Desktop Layout */}
      <div className="hidden md:flex justify-between items-center w-10/12 mx-auto py-2">
        <div className="flex justify-center items-center gap-20">
          <div className="flex justify-center items-center gap-1">
            <h1 className="font-extrabold">FOLLOW US:</h1>
            <div className="flex gap-2 text-xl">
              <Link 
                to="https://www.facebook.com/nasif.wasek/" 
                className="hover:text-blue-500 transition-colors duration-200"
              >
                <FaFacebookSquare />
              </Link>
              <Link 
                to="https://x.com/WasekFahim" 
                className="hover:text-blue-400 transition-colors duration-200"
              >
                <FaTwitterSquare />
              </Link>
              <Link 
                to="https://www.instagram.com/nasif_wasek/" 
                className="hover:text-pink-500 transition-colors duration-200"
              >
                <FaSquareInstagram />
              </Link>
              <Link 
                to="https://www.linkedin.com/in/nasif-wasek/" 
                className="hover:text-blue-600 transition-colors duration-200"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2 hover:text-gray-300 transition-colors duration-200">
            <FaPhoneAlt /> <span>+880-1234-012-034</span>
          </div>
        </div>

        {user ? (
          <h1 className="animate-pulse">
            {message}
          </h1>
        ) : (
          <div className="flex justify-between items-center gap-4">
            <h1>Don't Have an Account?</h1>
            <Link to="/auth/register">
              <span className="underline hover:text-gray-300 transition-colors duration-200">
                Register
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Compact Mobile Header */}
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex items-center gap-3">
            {/* Social Icons - Always Visible */}
            <div className="flex gap-2 text-lg">
              <Link 
                to="https://www.facebook.com/nasif.wasek/" 
                className="hover:text-blue-500 transition-colors duration-200"
              >
                <FaFacebookSquare />
              </Link>
              <Link 
                to="https://x.com/WasekFahim" 
                className="hover:text-blue-400 transition-colors duration-200"
              >
                <FaTwitterSquare />
              </Link>
              <Link 
                to="https://www.instagram.com/nasif_wasek/" 
                className="hover:text-pink-500 transition-colors duration-200"
              >
                <FaSquareInstagram />
              </Link>
            </div>
            
            {/* Phone Number - Compact */}
            <div className="flex items-center gap-1 text-xs">
              <FaPhoneAlt className="text-xs" />
              <span className="hidden sm:inline">+880-1234-012-034</span>
              <span className="sm:hidden">Call</span>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2">
                <h1 className="text-xs truncate max-w-32 sm:max-w-48">
                  {message}
                </h1>
                <button
                  onClick={toggleExpanded}
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                  aria-label="Toggle menu"
                >
                  {isExpanded ? <FaTimes /> : <FaBars />}
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/auth/register">
                  <span className="underline hover:text-gray-300 transition-colors duration-200 text-xs">
                    Register
                  </span>
                </Link>
                <button
                  onClick={toggleExpanded}
                  className="text-white hover:text-gray-300 transition-colors duration-200"
                  aria-label="Toggle menu"
                >
                  {isExpanded ? <FaTimes /> : <FaBars />}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Expandable Section */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pb-3 border-t border-gray-700">
            {/* Full Message for Logged In Users */}
            {user && (
              <div className="py-2">
                <h1 className="text-center text-sm animate-pulse">
                  {message}
                </h1>
              </div>
            )}
            
            {/* Full Social Links */}
            <div className="flex flex-col space-y-2">
              <div className="flex justify-center items-center gap-1">
                <h1 className="font-extrabold text-xs">FOLLOW US:</h1>
                <div className="flex gap-3 text-xl ml-2">
                  <Link 
                    to="https://www.facebook.com/nasif.wasek/" 
                    className="hover:text-blue-500 transition-colors duration-200"
                  >
                    <FaFacebookSquare />
                  </Link>
                  <Link 
                    to="https://x.com/WasekFahim" 
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    <FaTwitterSquare />
                  </Link>
                  <Link 
                    to="https://www.instagram.com/nasif_wasek/" 
                    className="hover:text-pink-500 transition-colors duration-200"
                  >
                    <FaSquareInstagram />
                  </Link>
                  <Link 
                    to="https://www.linkedin.com/in/nasif-wasek/" 
                    className="hover:text-blue-600 transition-colors duration-200"
                  >
                    <FaLinkedin />
                  </Link>
                </div>
              </div>
              
              {/* Full Phone Number */}
              <div className="flex justify-center items-center gap-2 text-sm hover:text-gray-300 transition-colors duration-200">
                <FaPhoneAlt /> 
                <span>+880-1234-012-034</span>
              </div>

              {/* Register Link for Non-Users */}
              {!user && (
                <div className="flex justify-center items-center gap-2 text-sm pt-1">
                  <h1>Don't Have an Account?</h1>
                  <Link to="/auth/register">
                    <span className="underline hover:text-gray-300 transition-colors duration-200">
                      Register
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}