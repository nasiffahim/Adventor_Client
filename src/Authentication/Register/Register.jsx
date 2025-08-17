import React, { use, useState } from "react";
import RegisterImaege from "../../../public/register.jpg";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaImage, FaUserPlus } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import Navbar from "../../Components/Navbar/Navbar";
import { AuthContext } from "../../Provider/AuthContext";

export default function Register() {
  const { createUser, setUser, updateUser } = use(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const validatePassword = (pass) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const isLengthValid = pass.length >= 6;

    if (!hasUpperCase) {
      return "Password must include at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must include at least one lowercase letter.";
    }
    if (!isLengthValid) {
      return "Password must be at least 6 characters long.";
    }

    return "";
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    setPasswordError("");

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            const savedUser = {
              name,
              email,
              photo,
              role: "tourist",
            };

            fetch("https://tourism-management-system-server-dusky.vercel.app/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(savedUser),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("User saved to DB", data);
                setUser({ ...user, displayName: name, photoURL: photo });
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Registered Successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              });
          })
          .catch((error) => {
            console.error("Error updating user:", error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Something went wrong!",
              showConfirmButton: false,
              timer: 1500,
            });
            setUser(user);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${RegisterImaege})` }}
    >
      {/* Mobile-friendly container with responsive padding */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:w-10/12 xl:mx-auto">
        <Navbar />
        
        {/* Responsive flex container */}
        <div className="flex justify-center items-center py-8 sm:py-10 md:py-16">
          <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
            {/* Responsive card with mobile-first approach */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl p-6 sm:p-8 md:p-10 font-antor">
              
              {/* Header with icon */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                  <FaUserPlus className="text-2xl text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                  Register your account
                </h2>
                <p className="text-white/80 text-sm sm:text-base mt-2">
                  Create your account to get started
                </p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4 sm:space-y-6">
                {/* Name field with icon */}
                <div className="space-y-2">
                  <label 
                    htmlFor="name" 
                    className="block text-sm sm:text-base font-semibold text-white"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400 text-sm" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="w-full pl-10 pr-4 py-3 sm:py-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black text-sm sm:text-base transition-all duration-200"
                      placeholder="Enter your full name"
                      required
                      aria-label="Full name"
                    />
                  </div>
                </div>

                {/* Photo URL field with icon */}
                <div className="space-y-2">
                  <label 
                    htmlFor="photo" 
                    className="block text-sm sm:text-base font-semibold text-white"
                  >
                    Photo URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaImage className="text-gray-400 text-sm" />
                    </div>
                    <input
                      id="photo"
                      name="photo"
                      type="url"
                      className="w-full pl-10 pr-4 py-3 sm:py-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black text-sm sm:text-base transition-all duration-200"
                      placeholder="https://example.com/photo.jpg"
                      required
                      aria-label="Profile photo URL"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-white/70">
                    Enter a valid URL for your profile picture
                  </p>
                </div>

                {/* Email field with icon */}
                <div className="space-y-2">
                  <label 
                    htmlFor="email" 
                    className="block text-sm sm:text-base font-semibold text-white"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400 text-sm" />
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
                    className="block text-sm sm:text-base font-semibold text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400 text-sm" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-10 pr-12 py-3 sm:py-4 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-black text-sm sm:text-base transition-all duration-200"
                      placeholder="Create a strong password"
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
                  
                  {/* Password requirements */}
                  <div className="text-xs sm:text-sm text-white/70 space-y-1">
                    <p>Password must contain:</p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>At least 6 characters</li>
                      <li>One uppercase letter</li>
                      <li>One lowercase letter</li>
                    </ul>
                  </div>
                  
                  {/* Password error */}
                  {passwordError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg text-xs sm:text-sm" role="alert">
                      <strong className="font-bold">Error: </strong>
                      <span>{passwordError}</span>
                    </div>
                  )}
                </div>

                {/* Register button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-400 text-white font-extrabold py-3 sm:py-4 px-6 rounded-lg text-sm sm:text-base lg:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Create Account
                </button>

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

                {/* Google register button */}
                <button 
                  type="button"
                  className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 sm:py-4 px-6 rounded-lg text-sm sm:text-base border-2 border-gray-300 hover:border-gray-400 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <FcGoogle className="text-xl sm:text-2xl" />
                  <span>Register with Google</span>
                </button>

                {/* Login link */}
                <div className="text-center pt-4">
                  <p className="text-white/90 text-sm sm:text-base font-medium">
                    Already have an account?{" "}
                    <Link 
                      className="text-blue-300 hover:text-blue-200 font-extrabold underline hover:no-underline transition-all duration-200" 
                      to="/auth/login"
                    >
                      Login here
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