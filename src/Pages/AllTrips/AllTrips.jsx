import React from "react";
import { Link, useLoaderData } from "react-router"; // fixed import path
import Navbar from "../../Components/Navbar/Navbar";

export default function AllTrips() {
  const data = useLoaderData();
  console.log("packages", data);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="backdrop-blur-md bg-black/20 shadow-lg">
        <div className="w-10/12 mx-auto mb-8">
          <Navbar />
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 bg-clip-text text-transparent mb-4">
            All Tour Packages
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing destinations and create unforgettable memories with
            our curated travel experiences
          </p>
          <div className="mt-8 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((trip, index) => (
            <div
              key={trip._id}
              className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-500 border border-gray-100 relative backdrop-blur-sm"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
                background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
              }}
            >
              {/* Card Image */}
              <div className="relative h-56 w-full overflow-hidden">
                <img
                  src={trip.images?.[0]}
                  alt={trip.packageName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/20 to-transparent"></div>

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-xl border border-white/20">
                  <div className="flex items-center text-white">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                      />
                    </svg>
                    <span className="font-bold text-sm">{trip.price}</span>
                  </div>
                  <div className="text-xs text-emerald-100 text-center">
                    per person
                  </div>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 backdrop-blur-sm rounded-xl px-3 py-1 shadow-lg">
                  <div className="flex items-center text-white text-xs font-semibold">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    Available
                  </div>
                </div>

                {/* Favorite Icon */}
                <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-50 cursor-pointer">
                  <svg
                    className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Package Name with Icon */}
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h4M9 7h6m-6 4h6m-7 4h7"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1 block">
                      Package
                    </label>
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {trip.packageName}
                    </h3>
                  </div>
                </div>

                {/* Location with Icon */}
                <div className="flex items-center mb-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-100">
                  <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-red-100 to-pink-100 rounded-lg flex items-center justify-center mr-3">
                    <svg
                      className="w-4 h-4 text-red-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1 block">
                      Destination
                    </label>
                    <p className="text-sm font-semibold text-gray-700">
                      {trip.location}
                    </p>
                  </div>
                </div>

                {/* Additional Info Section */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {/* Duration (placeholder - you can add real data) */}
                  <div className="flex items-center p-2 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-100">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2">
                      <svg
                        className="w-3 h-3 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-medium">
                        Duration
                      </label>
                      <p className="text-xs font-semibold text-gray-700">
                        {trip.duration || "3-5 Days"}
                      </p>
                    </div>
                  </div>

                  {/* Rating (placeholder - you can add real data) */}
                  <div className="flex items-center p-2 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-100">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-2">
                      <svg
                        className="w-3 h-3 text-yellow-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-medium">
                        Rating
                      </label>
                      <p className="text-xs font-semibold text-gray-700">
                        {trip.rating || "4.8"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Link to={`/all-trips/${trip._id}`} className="block">
                  <button className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 text-white py-4 rounded-2xl hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-400 transition-all duration-300 font-bold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 group-hover:scale-105 relative overflow-hidden">
                    <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View Package Details
                      <svg
                        className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No packages available
            </h3>
            <p className="text-gray-500">
              Check back later for exciting travel packages!
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
