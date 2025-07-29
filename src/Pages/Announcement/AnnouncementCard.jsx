import React, { useState, useEffect } from "react";
import { Gift, MapPin, Percent } from "lucide-react";
import Navbar from "../../Components/Navbar/Navbar";

const AnnouncementPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const destinations = [
    { name: "Cox's Bazar", emoji: "🏖️" },
    { name: "Sundarbans", emoji: "🌿" },
    { name: "Sylhet", emoji: "🍃" },
    { name: "Old Dhaka", emoji: "🏛️" },
    { name: "Bandarban", emoji: "⛰️" },
    { name: "Paharpur", emoji: "🏰" },
  ];

  const announcements = [
    {
      icon: Gift,
      title: "Special Tour Packages",
      description:
        "Get ready for incredible discounts on guided tours to Cox's Bazar, Sundarbans, and Sylhet tea gardens. Our expert local guides will make your journey unforgettable!",
      badge: "Launching Soon",
      delay: 0,
    },
    {
      icon: MapPin,
      title: "Exclusive Guide Services",
      description:
        "Connect with certified local guides who know the hidden gems of Bangladesh. From historical sites in Dhaka to the mangrove forests of Sundarbans - authentic experiences await!",
      badge: "Coming Soon",
      delay: 200,
    },
    {
      icon: Percent,
      title: "Early Bird Offers",
      description:
        "Be the first to access our limited-time promotions on group tours, family packages, and adventure trips. Save up to 40% on your next Bangladesh adventure!",
      badge: "Stay Tuned",
      delay: 400,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-800">
      <div className="w-10/12 mx-auto mb-10">
        <Navbar />
      </div>
      <div className="max-w-6xl mx-auto px-5 py-5">
        {/* Header */}
        <div
          className={`text-center mb-16 p-10 bg-white/10 bg-opacity-10 backdrop-blur-lg rounded-3xl border border-white border-opacity-20 shadow-2xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🇧🇩 Exciting Updates Coming Soon!
          </h1>
          <p className="text-xl text-white text-opacity-90 max-w-2xl mx-auto leading-relaxed">
            Stay tuned for amazing offers, exclusive deals, and unforgettable
            experiences across Bangladesh's most beautiful destinations
          </p>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {announcements.map((announcement, index) => (
            <AnnouncementCard
              key={index}
              {...announcement}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bangladesh Highlight */}
        <div
          className={`bg-white/10 bg-opacity-10 backdrop-blur-lg rounded-3xl p-10 text-center border border-white border-opacity-20 transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
            Discover Bangladesh with Expert Guides
          </h2>
          <p className="text-lg text-white text-opacity-90 max-w-4xl mx-auto leading-relaxed mb-8">
            From the world's longest sea beach at Cox's Bazar to the mystical
            Sundarbans mangrove forest, from the rolling hills of Bandarban to
            the spiritual serenity of Paharpur - Bangladesh offers incredible
            diversity. Our local guides bring decades of experience and
            authentic storytelling to make your journey truly special.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {destinations.map((destination, index) => (
              <DestinationTag
                key={index}
                destination={destination}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AnnouncementCard = ({
  icon: Icon,
  title,
  description,
  badge,
  delay,
  isVisible,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white/10 bg-opacity-95 rounded-3xl p-8 shadow-2xl border border-white border-opacity-30 transition-all duration-500 hover:shadow-3xl relative overflow-hidden group cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated top border */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-teal-400 to-blue-400 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Notification dot */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-red-400 rounded-full animate-pulse" />

      {/* Icon */}
      <div
        className={`w-16 h-16 mx-auto mb-6 p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center transition-transform duration-300 ${
          isHovered ? "scale-110 rotate-6" : "scale-100 rotate-0"
        }`}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        {title}
      </h3>
      <p className="text-gray-600 text-center mb-6 leading-relaxed">
        {description}
      </p>

      {/* Badge */}
      <div className="bg-gradient-to-r from-red-400 to-red-500 text-white px-5 py-2 rounded-full text-sm font-semibold text-center shadow-lg animate-pulse">
        {badge}
      </div>
    </div>
  );
};

const DestinationTag = ({ destination, delay }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white/10 bg-opacity-20 text-white px-6 py-3 rounded-full font-medium border border-white border-opacity-30 transition-all duration-300 cursor-pointer ${
        isHovered ? "bg-opacity-30 -translate-y-1 scale-105" : "bg-opacity-20"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {destination.emoji} {destination.name}
    </div>
  );
};

export default AnnouncementPage;
