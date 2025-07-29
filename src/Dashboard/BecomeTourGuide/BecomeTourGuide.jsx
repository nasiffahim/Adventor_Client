import React, { use, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext";
import { MapPin, FileText, ExternalLink, Send, User } from "lucide-react";

export default function BecomeTourGuide() {
  const { user } = use(AuthContext);
  console.log("user info", user);
  const [formData, setFormData] = useState({
    title: "",
    reason: "",
    cvLink: "",
  });

  const userData = {
    name: user?.displayName || "Anonymous",
    email: user?.email || "",
    photo: user?.photoURL || "",
  };

  const fullFormData = { ...formData, ...userData };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://tourism-management-system-server-dusky.vercel.app/tour-guide-applications",
        fullFormData
      );

      // Show success modal
      Swal.fire({
        title: "Application Submitted!",
        text: "Thank you! We've received your application.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form
      setFormData({ title: "", reason: "", cvLink: "" });
    } catch (error) {
      console.error("Application failed:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while submitting your application.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full mb-4 shadow-lg">
            <MapPin className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Become a Tour Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Share your passion for travel and help others explore amazing destinations
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4">
            {userData.photo ? (
              <img 
                src={userData.photo} 
                alt="Profile" 
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            )}
            <div>
              <p className="text-lg font-semibold text-gray-900">{userData.name}</p>
              <p className="text-sm text-gray-500">{userData.email}</p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Form</h2>
            <p className="text-gray-600">Please fill out all fields to submit your application</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Application Title */}
            <div className="space-y-3">
              <label 
                htmlFor="title" 
                className="flex items-center text-sm font-semibold text-gray-700 mb-2"
              >
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <FileText className="w-3 h-3 text-blue-600" />
                </div>
                Application Title *
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900 bg-gray-50 focus:bg-white"
                placeholder="e.g. Experienced Cultural Heritage Tour Guide"
              />
              <p className="text-xs text-gray-500">
                Give your application a compelling title that highlights your strengths
              </p>
            </div>

            {/* Reason */}
            <div className="space-y-3">
              <label 
                htmlFor="reason" 
                className="flex items-center text-sm font-semibold text-gray-700 mb-2"
              >
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <MapPin className="w-3 h-3 text-blue-600" />
                </div>
                Why do you want to be a Tour Guide? *
              </label>
              <textarea
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 resize-none text-gray-900 bg-gray-50 focus:bg-white"
                placeholder="Share your passion for travel, local knowledge, and what makes you a great guide. Tell us about your experience, languages you speak, areas of expertise, and what motivates you to help others explore new places..."
              />
              <p className="text-xs text-gray-500">
                Minimum 100 characters. Be specific about your experience and motivation.
              </p>
            </div>

            {/* CV Link */}
            <div className="space-y-3">
              <label 
                htmlFor="cvLink" 
                className="flex items-center text-sm font-semibold text-gray-700 mb-2"
              >
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <ExternalLink className="w-3 h-3 text-blue-600" />
                </div>
                CV Link (Google Drive, Dropbox, or Portfolio) *
              </label>
              <input
                id="cvLink"
                type="url"
                name="cvLink"
                value={formData.cvLink}
                onChange={handleChange}
                required
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 text-gray-900 bg-gray-50 focus:bg-white"
                placeholder="https://drive.google.com/file/d/your-cv-link"
              />
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                  <strong>Important:</strong> Please ensure your CV is publicly accessible via the link. 
                  We recommend using Google Drive with "Anyone with the link can view" permissions.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                <Send className="w-5 h-5" />
                <span className="text-lg">Submit Application</span>
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">
                By submitting, you agree to our terms and conditions
              </p>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
            <p className="text-sm text-gray-600 mb-4">
              We'll review your application and get back to you within 3-5 business days.
            </p>
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Application Review</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Interview Process</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Welcome Aboard</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}