import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Star, Tag, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

const SpecialOffersBanner = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('http://localhost:3000/packages');
      const data = await response.json();
      // Take first 3 packages for the banner
      setPackages(data.slice(0, 3));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching packages:', error);
      setLoading(false);
    }
  };

  const calculateDiscountedPrice = (originalPrice) => {
    return Math.floor(originalPrice * 0.7); // 30% discount
  };

  const offers = [
    {
      title: "Summer Special",
      discount: "30%",
      badge: "Limited Time",
      color: "from-orange-500 to-red-600"
    },
    {
      title: "Early Bird",
      discount: "25%",
      badge: "Book Now",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Group Deal",
      discount: "35%",
      badge: "4+ People",
      color: "from-green-500 to-teal-600"
    }
  ];

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <div className="animate-pulse">Loading amazing offers...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-300 py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-yellow-400 text-black px-6 py-2 rounded-full font-bold mb-4">
            <Tag className="w-5 h-5 mr-2" />
            SPECIAL OFFERS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Unbeatable Travel Deals
          </h2>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Don't miss out on these incredible savings! Limited time offers on amazing destinations.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const offer = offers[index] || offers[0];
            const originalPrice = pkg.price;
            const discountedPrice = calculateDiscountedPrice(originalPrice);
            const savings = originalPrice - discountedPrice;

            return (
              <div key={pkg._id} className="group">
                {/* Offer Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform group-hover:scale-105 transition-all duration-300">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={pkg.images[0]} 
                      alt={pkg.packageName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute top-4 left-4 bg-gradient-to-r ${offer.color} text-white px-4 py-2 rounded-full flex items-center`}>
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span className="font-bold">{offer.discount} OFF</span>
                    </div>
                    <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                      {offer.badge}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      {pkg.packageName}
                    </h3>
                    
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-sm">{pkg.location}</span>
                    </div>

                    <div className="flex items-center text-gray-600 mb-4">
                      <Clock className="w-4 h-4 mr-2 text-green-600" />
                      <span className="text-sm">{pkg.tourPlan.length} Days Tour</span>
                    </div>

                    {/* Pricing */}
                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-sm text-gray-500 line-through">
                            ৳{originalPrice.toLocaleString()}
                          </span>
                          <div className="text-2xl font-bold text-green-600">
                            ৳{discountedPrice.toLocaleString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">You Save</div>
                          <div className="text-lg font-bold text-red-500">
                            ৳{savings.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <Link 
                        to={`/all-trips/${pkg._id}?discountedPrice=${discountedPrice}&discount=${offer.discount}&isSpecialOffer=true`}
                        className={`w-full bg-gradient-to-r ${offer.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 block text-center`}
                      >
                        Book Now & Save {offer.discount}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-yellow-400 mr-2" />
              <span className="text-white font-semibold">Limited Time Offer</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Hurry! Offers End Soon
            </h3>
            <p className="text-emerald-100 mb-6">
              Book your dream vacation today and save big on these exclusive packages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-300 transition-colors">
                View All Packages
              </button>
              {/* <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-emerald-600 transition-colors">
                Contact Us
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffersBanner;