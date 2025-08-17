import React, { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setIsSubscribed(true);
        setEmail('');
        // Reset after 3 seconds
        setTimeout(() => setIsSubscribed(false), 3000);
      }, 1500);
    }
  };

  return (
    <div className="relative py-16 px-4 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-300 overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-20 w-40 h-40 bg-emerald-300/8 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        
        {/* Compact Content Container */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/15 p-8 lg:p-10">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className="bg-white/15 backdrop-blur-sm rounded-full p-3 border border-white/20">
                <Mail size={20} className="text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
              Stay Updated
            </h2>
            
            <p className="text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
              Get exclusive travel deals and destination guides in your inbox
            </p>
          </div>

          {/* Newsletter Form */}
          <div className="max-w-lg mx-auto">
            {!isSubscribed ? (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  
                  {/* Email Input */}
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
                      disabled={isLoading}
                    />
                  </div>
                  
                  {/* Subscribe Button */}
                  <button
                    onClick={handleSubscribe}
                    disabled={isLoading || !email.trim()}
                    className="bg-white text-emerald-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send size={16} />
                        <span>Subscribe</span>
                      </div>
                    )}
                  </button>
                </div>
                
                {/* Privacy Notice */}
                <p className="text-white/70 text-xs text-center">
                  No spam, unsubscribe anytime
                </p>
              </div>
            ) : (
              /* Success State */
              <div className="text-center py-4">
                <div className="inline-block mb-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
                    <CheckCircle size={24} className="text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  Welcome aboard! 🎉
                </h3>
                <p className="text-white/85">
                  Check your inbox for exclusive deals
                </p>
              </div>
            )}
          </div>

          {/* Simple Stats */}
          <div className="flex items-center justify-center gap-8 mt-8 pt-6 border-t border-white/15">
            <div className="text-center">
              <div className="text-lg font-bold text-white">50K+</div>
              <div className="text-white/70 text-xs">Subscribers</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">Weekly</div>
              <div className="text-white/70 text-xs">Updates</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;