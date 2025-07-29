import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import axios from "axios";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { Link, useNavigate } from "react-router";

export default function TouristStorySection() {
  const { user } = useContext(AuthContext);
  const [touristStories, setTouristStories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://tourism-management-system-server-dusky.vercel.app/stories")
      .then((res) => {
        const allStories = res.data;
        const shuffled = allStories.sort(() => 0.5 - Math.random());
        setTouristStories(shuffled.slice(0, 4));
      })
      .catch((err) => console.error(err));
  }, []);

  const handleShareRedirect = () => {
    navigate("auth/login");
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16 ">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Tourist Stories
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Discover amazing adventures and experiences shared by fellow
            travelers from around the world
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {touristStories.map((story, index) => (
            <div
              key={story._id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: "fadeInUp 0.8s ease-out forwards",
              }}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={story.images?.[0]}
                  alt={story.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Floating Date Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 shadow-md">
                  {new Date(story.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col min-h-[220px]">
                <h3
                  className="text-lg font-bold text-gray-800 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-300"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "2.5rem",
                  }}
                >
                  {story.title}
                </h3>

                <p
                  className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "3.75rem",
                  }}
                >
                  {story.text.slice(0, 120)}...
                </p>

                {/* Share Section */}
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  {user ? (
                    <div className="flex items-center space-x-2">
                      <FacebookShareButton
                        url={`http://localhost:5173/story-details/${story._id}`}
                        quote={story.title}
                        hashtag="#TouristStories"
                      >
                        <div className="w-9 h-9 bg-gradient-to-r from-white-500 to-white-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 shadow-md hover:shadow-lg">
                          <FacebookIcon size={28} round />
                        </div>
                      </FacebookShareButton>

                      <span className="text-xs text-gray-500 font-medium">
                        Share Story
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={handleShareRedirect}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200 group/btn"
                    >
                      <svg
                        className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm font-medium">
                        Login to Share
                      </span>
                    </button>
                  )}

                  {/* Read More Indicator */}
                  <Link to={`/story-details/${story._id}`}>
                    <div className="flex items-center text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
                      <span className="text-xs font-medium mr-1">
                        Read More
                      </span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
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
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/stories")}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <span className="relative z-10 flex items-center">
              Explore All Stories
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
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
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
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
    </div>
  );
}
