import React from "react";
import {
  FaUmbrellaBeach,
  FaLanguage,
  FaMoneyBillWave,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { Link } from "react-router";

const tips = [
  {
    icon: (
      <FaMoneyBillWave className="text-5xl text-emerald-500 group-hover:text-emerald-400 transition-colors duration-300" />
    ),
    title: "Currency",
    text: "Use Bangladeshi Taka (৳). ATMs and currency exchange booths are widely available.",
    gradient: "from-emerald-50 to-teal-50",
    borderColor: "border-emerald-200",
    hoverGradient: "hover:from-emerald-100 hover:to-teal-100",
  },
  {
    icon: (
      <FaLanguage className="text-5xl text-blue-500 group-hover:text-blue-400 transition-colors duration-300" />
    ),
    title: "Language",
    text: "Bengali is the official language, but English is commonly spoken in tourist areas.",
    gradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    hoverGradient: "hover:from-blue-100 hover:to-indigo-100",
  },
  {
    icon: (
      <FaUmbrellaBeach className="text-5xl text-orange-500 group-hover:text-orange-400 transition-colors duration-300" />
    ),
    title: "Best Time to Visit",
    text: "November to February offers the best weather for travel across Bangladesh.",
    gradient: "from-orange-50 to-amber-50",
    borderColor: "border-orange-200",
    hoverGradient: "hover:from-orange-100 hover:to-amber-100",
  },
  {
    icon: (
      <FaMapMarkedAlt className="text-5xl text-purple-500 group-hover:text-purple-400 transition-colors duration-300" />
    ),
    title: "Transport",
    text: "Rickshaws, buses, trains, and apps like Pathao and Uber are reliable for travel.",
    gradient: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    hoverGradient: "hover:from-purple-100 hover:to-pink-100",
  },
];

export default function TravelTipsSection() {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-300 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-orange-300 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-emerald-100 text-emerald-700 rounded-full font-medium text-sm mb-4 border border-emerald-200">
            Essential Information
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Travel Tips for Bangladesh
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know for an amazing journey through the
            beauty of Bangladesh
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {tips.map((tip, index) => (
            <div
              key={index}
              className={`group relative p-8 bg-gradient-to-br ${tip.gradient} ${tip.hoverGradient} border ${tip.borderColor} rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] cursor-pointer backdrop-blur-sm`}
              style={{
                animationDelay: `${index * 150}ms`,
                animation: "fadeInUp 0.8s ease-out forwards",
              }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

              {/* Content */}
              <div className="relative z-10 flex items-start gap-6">
                <div className="flex-shrink-0 p-4 bg-white/70 rounded-2xl shadow-md group-hover:shadow-lg duration-300 group-hover:rotate-6 transform transition-transform">
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors">
                    {tip.text}
                  </p>
                </div>
              </div>

              {/* Decorative corner element */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-white/50 to-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <Link to="/all-trips">
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              <span>Ready to Explore Bangladesh?</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
          </div>
        </Link>
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
    </section>
  );
}
