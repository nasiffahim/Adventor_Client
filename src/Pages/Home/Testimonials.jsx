import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Emily R.",
    country: "Canada",
    text: "The Sundarbans tour was breathtaking! Every moment felt like stepping into a nature documentary. The mangrove forests, wildlife spotting, and sunset views were absolutely magical.",
    photo: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
    destination: "Sundarbans"
  },
  {
    name: "Zayed M.",
    country: "Bangladesh",
    text: "Exploring Cox's Bazar with this agency was a dream come true! The pristine beaches, local culture experiences, and professional guidance made it unforgettable.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    destination: "Cox's Bazar"
  },
  {
    name: "Sophia L.",
    country: "UK",
    text: "The service was outstanding and very professional. From booking to the final goodbye, everything was seamlessly organized. Highly recommend for authentic Bangladesh experiences!",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    destination: "Cultural Tour"
  },
  {
    name: "Marcus K.",
    country: "Germany",
    text: "The Sylhet tea gardens tour exceeded all expectations! The rolling hills, fresh mountain air, and authentic local hospitality created memories that will last a lifetime. Absolutely incredible!",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    destination: "Sylhet Tea Gardens"
  },
  {
    name: "Priya S.",
    country: "India",
    text: "The Dhaka heritage walk was fascinating! Learning about the rich history while exploring Old Dhaka's narrow streets, vibrant markets, and ancient architecture was truly enlightening.",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    destination: "Dhaka Heritage"
  },
];

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 px-4 overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-200/30 to-emerald-200/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-teal-100/20 to-emerald-100/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Quote className="w-4 h-4" />
            Testimonials
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent mb-4">
            What Travelers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover why thousands of adventurers choose us for their Bangladesh journey
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="relative">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50 overflow-hidden">
            {/* Decorative Quote */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-xl">
              <Quote className="w-10 h-10 text-white" />
            </div>

            <div className="relative">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    index === currentSlide
                      ? 'opacity-100 transform translate-x-0'
                      : 'opacity-0 transform translate-x-8 absolute inset-0'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-1 shadow-xl">
                          <img
                            src={testimonial.photo}
                            alt={testimonial.name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                          <div className="flex">
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <blockquote className="text-2xl md:text-3xl font-light text-gray-800 leading-relaxed mb-6 italic">
                        "{testimonial.text}"
                      </blockquote>
                      
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {testimonial.name}
                          </h3>
                          <p className="text-emerald-600 font-medium">
                            {testimonial.country}
                          </p>
                        </div>
                        
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                          {testimonial.destination}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 group"
          >
            <ChevronLeft className="w-6 h-6 text-emerald-600 group-hover:text-emerald-700" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-xl rounded-full p-3 transition-all duration-300 hover:scale-110 group"
          >
            <ChevronRight className="w-6 h-6 text-emerald-600 group-hover:text-emerald-700" />
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentSlide
                  ? 'w-12 h-3 bg-gradient-to-r from-emerald-500 to-teal-500'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { number: "4,200+", label: "Happy Travelers" },
            { number: "4.9/5", label: "Average Rating" },
            { number: "20+", label: "Destinations" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50 transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}