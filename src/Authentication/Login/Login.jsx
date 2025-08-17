import React, { use, useState } from "react";
import LoginImaege from "../../../public/login.jpg";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import Navbar from "../../Components/Navbar/Navbar";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

export default function Login() {
  const { logIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged In Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginImaege})` }}
    >
      {/* Mobile-friendly container with responsive padding */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:w-10/12 xl:mx-auto">
        <Navbar />
        
        {/* Responsive flex container */}
        <div className="flex justify-center items-center py-8 sm:py-10 md:py-16">
          <div className="w-full max-w-md sm:max-w-lg">
            {/* Responsive card with mobile-first approach */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 font-antor">
              
              {/* Header with icon */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <FaUser className="text-2xl text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                  Login your account
                </h2>
              </div>

              <form onSubmit={handleLogIn} className="space-y-6">
                {/* Email field with icon */}
                <div className="space-y-2">
                  <label 
                    htmlFor="email" 
                    className="block text-base sm:text-lg font-semibold text-white"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400 text-sm sm:text-base" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full pl-10 pr-4 py-3 sm:py-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black text-sm sm:text-base transition-all duration-200"
                      placeholder="Enter your email"
                      required
                      aria-label="Email address"
                    />
                  </div>
                </div>

                {/* Password field with icon and toggle */}
                <div className="space-y-2">
                  <label 
                    htmlFor="password" 
                    className="block text-base sm:text-lg font-semibold text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400 text-sm sm:text-base" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-10 pr-12 py-3 sm:py-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black text-sm sm:text-base transition-all duration-200"
                      placeholder="Enter your password"
                      required
                      aria-label="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setshowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="text-lg sm:text-xl" />
                      ) : (
                        <FaEye className="text-lg sm:text-xl" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot password link */}
                <div className="text-left">
                  <NavLink
                    to="/auth/reset-password"
                    className="text-white/90 hover:text-white text-sm sm:text-base font-medium underline hover:no-underline transition-all duration-200"
                  >
                    Forgot password?
                  </NavLink>
                </div>

                {/* Login button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-400 text-white font-extrabold py-3 sm:py-4 px-6 rounded-lg text-sm sm:text-base lg:text-lg border-2 border-none transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Login to Account
                </button>

                {/* Error message */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm sm:text-base" role="alert">
                    <strong className="font-bold">Error: </strong>
                    <span className="block sm:inline">{error}</span>
                  </div>
                )}

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm sm:text-base">
                    <span className="px-4 bg-transparent text-white/90 font-medium">
                      or continue with
                    </span>
                  </div>
                </div>

                {/* Google login button */}
                <button 
                  type="button"
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 sm:py-4 px-6 rounded-lg text-sm sm:text-base border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <FcGoogle className="text-xl sm:text-2xl" />
                  <span>Login with Google</span>
                </button>

                {/* Register link */}
                <div className="text-center pt-4">
                  <p className="text-white/90 text-sm sm:text-base font-medium">
                    Don't have an account?{" "}
                    <Link 
                      className="text-blue-300 hover:text-blue-200 font-extrabold underline hover:no-underline transition-all duration-200" 
                      to="/auth/register"
                    >
                      Register here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}