import React from "react";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
// import Logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-white m-0 p-0 border-none font-antor">
      <div className="bg-gradient-to-b from-[#1a1a18] to-[#161614] -mt-1">
        <div className="w-10/12 mx-auto pt-12 pb-6">
          {/* Header Section with Logo */}
          <div className="flex justify-start items-center border-b border-gray-600 pb-6 mb-8">
            {/* <img src={Logo} alt="Adventor Logo" className="w-12 h-12 brightness-0 invert mr-3" /> */}
            <div className="flex items-center text-white">
              <svg
                className="w-8 h-8 text-current"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                <path d="M12 13l-2-2h1V9h2v2h1l-2 2z" opacity="0.6" />
              </svg>
              <h1 className="text-2xl text-white font-bold tracking-wide">
                Adventor.
              </h1>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 text-white">
            {/* About Us Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">
                About Us
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/mission"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Our Mission
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/help"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    FAQs & Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Explore Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">
                Explore
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/features"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="/enterprise"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link
                    to="/marketing"
                    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    Marketing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Media Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">
                Connect With Us
              </h3>
              <div className="flex space-x-4">
                <Link
                  to="https://www.facebook.com/nasif.wasek/"
                  className="text-gray-300 hover:text-blue-500 transition-colors duration-300"
                  aria-label="Follow us on Facebook"
                >
                  <FaFacebook className="text-2xl hover:scale-110 transition-transform duration-300" />
                </Link>
                <Link
                  to="https://www.linkedin.com/in/nasif-wasek/"
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  aria-label="Connect on LinkedIn"
                >
                  <FaLinkedin className="text-2xl hover:scale-110 transition-transform duration-300" />
                </Link>
                <Link
                  to="https://x.com/WasekFahim"
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  aria-label="Follow us on X (Twitter)"
                >
                  <FaSquareXTwitter className="text-2xl hover:scale-110 transition-transform duration-300" />
                </Link>
                <Link
                  to="https://www.instagram.com/nasif_wasek/"
                  className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <FaInstagramSquare className="text-2xl hover:scale-110 transition-transform duration-300" />
                </Link>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-6">
                <p className="text-sm text-gray-400 mb-2">
                  Stay updated with our latest adventures
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="bg-gray-800 text-white px-3 py-2 rounded-l-md text-sm flex-1 border border-gray-700 focus:outline-none focus:border-blue-500"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-md text-sm font-medium transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Section */}
          <div className="border-t border-gray-700 pt-6 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 Adventor. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
