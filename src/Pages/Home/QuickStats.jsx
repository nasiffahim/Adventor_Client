import React, { useState, useEffect } from 'react';
import { Users, MapPin, Clock, Headphones } from 'lucide-react';

const QuickStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  const stats = [
    {
      icon: Users,
      number: 500,
      suffix: "+",
      label: "Happy Customers",
      description: "Satisfied travelers worldwide"
    },
    {
      icon: MapPin,
      number: 50,
      suffix: "+",
      label: "Destinations",
      description: "Amazing places to explore"
    },
    {
      icon: Clock,
      number: 10,
      suffix: "+",
      label: "Years Experience",
      description: "Trusted travel expertise"
    },
    {
      icon: Headphones,
      number: 247,
      suffix: "",
      label: "24/7 Support",
      description: "Always here to help you"
    }
  ];

  // Counter animation effect
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      stats.forEach((stat, index) => {
        const increment = stat.number / 40;
        let current = 0;
        const counter = setInterval(() => {
          current += increment;
          if (current >= stat.number) {
            current = stat.number;
            clearInterval(counter);
          }
          setCounters(prev => {
            const newCounters = [...prev];
            newCounters[index] = Math.floor(current);
            return newCounters;
          });
        }, 40);
      });
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative py-16 px-4 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-300 overflow-hidden">
      
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0">
        {/* Large floating orbs */}
        <div className="absolute top-10 left-10 w-60 h-60 bg-white/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-emerald-300/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-teal-400/12 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-white/4 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-emerald-200/8 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/25 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${1 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Enhanced Header */}
        <div className={`text-center mb-14 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}>
          <div className="inline-block mb-4 relative">
            <div className="absolute inset-0 bg-white/15 rounded-full blur-xl"></div>
            <span className="relative bg-white/80 backdrop-blur-sm text-emerald-800 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full border border-white/30">
              ✨ Our Success Story ✨
            </span>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
            Numbers That
            <br />
            <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
              Speak Volumes
            </span>
          </h2>
          
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
            Join thousands of adventurers who've discovered the world with us
          </p>
        </div>

        {/* Redesigned Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className={`group relative transform transition-all duration-700 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                
                {/* Main Card */}
                <div className="relative overflow-hidden rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 p-6 hover:bg-white/25 transition-all duration-500 group-hover:border-white/40 group-hover:shadow-2xl group-hover:shadow-white/20">
                  
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-emerald-200/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/8 rounded-full blur-lg group-hover:scale-150 group-hover:bg-white/15 transition-all duration-700"></div>
                  <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-emerald-200/15 rounded-full blur-md group-hover:scale-125 transition-transform duration-700"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    
                    {/* Icon Container */}
                    <div className="mb-5 transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-white/25 rounded-xl blur-lg group-hover:blur-xl group-hover:scale-110 transition-all duration-500"></div>
                        <div className="relative w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-500">
                          <IconComponent size={28} className="text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Counter Display */}
                    <div className="mb-3">
                      <span className="text-4xl font-black text-white block leading-none drop-shadow-xl group-hover:scale-105 transition-transform duration-300">
                        {index === 3 ? "24/7" : `${counters[index]}${stat.suffix}`}
                      </span>
                    </div>
                    
                    {/* Label */}
                    <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg group-hover:text-emerald-100 transition-colors duration-300">
                      {stat.label}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/80 text-sm leading-relaxed font-medium group-hover:text-white transition-colors duration-300">
                      {stat.description}
                    </p>
                  </div>

                  {/* Hover glow lines */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                  </div>
                </div>

                {/* External glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-white/15 opacity-0 group-hover:opacity-50 blur-2xl transition-all duration-700 -z-10 group-hover:scale-105"></div>
              </div>
            );
          })}
        </div>

        {/* Redesigned Call to Action */}
        <div className={`text-center transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
          
          <div className="relative inline-block group mb-6">
            {/* Main Button */}
            <button 
              onClick={() => window.location.href = '/all-trips'}
              className="relative overflow-hidden bg-white text-emerald-700 px-10 py-4 rounded-full font-bold text-lg transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-white/30 group border-2 border-white/50 hover:border-white cursor-pointer"
            >
              
              {/* Animated background wave */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              
              {/* Ripple effect */}
              <div className="absolute inset-0 rounded-full bg-emerald-200 opacity-0 group-hover:opacity-20 animate-ping"></div>
              
              {/* Button text */}
              <span className="relative z-10 text-sm lg:text-base tracking-wide group-hover:text-emerald-800 transition-colors duration-300">
                🚀 Begin Your Adventure 🚀
              </span>
            </button>

            {/* Button glow */}
            <div className="absolute inset-0 rounded-full bg-white/30 opacity-60 blur-xl group-hover:opacity-90 group-hover:scale-110 transition-all duration-500 -z-10"></div>
          </div>

          {/* Enhanced subtitle */}
          <div className="relative">
            <div className="absolute inset-0 bg-white/8 rounded-xl blur-xl"></div>
            <p className="relative text-white/90 text-base font-medium bg-white/5 backdrop-blur-sm px-6 py-3 rounded-xl border border-white/20 inline-block">
              ✈️ Create memories that last a lifetime with our expert travel team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;