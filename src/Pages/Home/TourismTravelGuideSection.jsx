import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useNavigate } from 'react-router';
import { MapPin, Star, Users, Camera, Clock, ArrowRight } from 'lucide-react';

export default function TourismTravelGuideSection() {
  const [packages, setPackages] = useState([]);
  const [guides, setGuides] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Get 3 random packages
    axios.get('https://tourism-management-system-server-dusky.vercel.app/packages/random')
      .then(res => setPackages(res.data))
      .catch(err => console.error(err));

    // Get all users, filter tour-guides and pick 6 random
    axios.get('https://tourism-management-system-server-dusky.vercel.app/all-users')
      .then(res => {
        const guideUsers = res.data.filter(user => user.role === 'tour-guide');
        const randomGuides = guideUsers.sort(() => 0.5 - Math.random()).slice(0, 6);
        setGuides(randomGuides);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
            Tourism & Travel Guide
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover amazing destinations and connect with expert local guides for unforgettable experiences
          </p>
        </div>
        <div className="absolute -bottom-1 left-0 right-0 h-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 transform skew-y-1"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Custom Tabs */}
        <div className="mb-8">
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab(0)}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform ${
                activeTab === 0
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white/80 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105 shadow-md'
              }`}
            >
              <Camera className="w-5 h-5" />
              Our Packages
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform ${
                activeTab === 1
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white/80 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105 shadow-md'
              }`}
            >
              <Users className="w-5 h-5" />
              Meet Our Tour Guides
            </button>
          </div>

          {/* Packages Panel */}
          {activeTab === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeInUp">
              {packages.map((pkg, index) => (
                <div 
                  key={pkg._id} 
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={pkg.images[0]}
                      alt={pkg.packageName}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-green-600 font-bold text-lg">৳{pkg.price}</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors truncate">
                      {pkg.packageName}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="text-sm">{pkg.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        <span className="text-sm">{pkg.tourType || "Standard Tour"}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/all-trips/${pkg._id}`)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group/btn"
                    >
                      View Package
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Guides Panel */}
          {activeTab === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeInUp">
              {guides.map((guide, index) => (
                <div 
                  key={guide._id} 
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={guide.photo}
                      alt={guide.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {guide.role.replace('-', ' ').toUpperCase()}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {guide.name}
                    </h3>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600 text-sm flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        {guide.email}
                      </p>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-blue-600 font-medium text-sm capitalize">
                          Professional {guide.role.replace('-', ' ')}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/guide/${guide._id}`)}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group/btn"
                    >
                      View Profile
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
