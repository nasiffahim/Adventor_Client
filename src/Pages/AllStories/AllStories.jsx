import React, { useState } from "react";
import { Link, useLoaderData } from "react-router";
import { User, Calendar, Clock, BookOpen, Image } from "lucide-react";
import Navbar from "../../Components/Navbar/Navbar";

export default function AllStories() {
  const stories = useLoaderData();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="backdrop-blur-md bg-black/20 shadow-lg">
        <div className="w-10/12 mx-auto mb-8">
          <Navbar />
        </div>
      </div>

      <div className="container w-10/12 mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 rounded-full mb-6 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 bg-clip-text text-transparent mb-4">
            All Stories
          </h1>
          <div className="flex items-center justify-center gap-2 text-lg text-gray-600">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="font-medium">{stories.length} stories found</span>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
          {stories.map((story) => (
            <div
              key={story._id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 hover:scale-[1.02] hover:bg-white/90"
            >
              {/* Image Section */}
              {story.images && story.images.length > 0 && (
                <div className="relative h-52 overflow-hidden rounded-t-2xl">
                  <img
                    src={story.images[0]}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                  {/* Image Count Badge */}
                  {story.images.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 shadow-lg">
                      <Image className="w-3.5 h-3.5" />+
                      {story.images.length - 1} more
                    </div>
                  )}
                </div>
              )}

              {/* Card Content */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 line-clamp-2 group-hover:text-blue-700 transition-colors duration-300">
                  {story.title}
                </h3>

                {/* Story Text */}
                <p className="text-gray-600 leading-relaxed text-sm">
                  {truncateText(story.text)}
                </p>

                {/* Author Section */}
                <div className="flex items-center gap-3 py-3 px-4 bg-gray-50/80 rounded-xl">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      Author
                    </p>
                    <p className="text-xs text-blue-600 font-medium truncate">
                      {story.email}
                    </p>
                  </div>
                </div>

                {/* Date Section */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="flex items-center justify-center w-7 h-7 bg-green-100 rounded-full">
                      <Calendar className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-600">Created</p>
                      <p>{formatDate(story.createdAt)}</p>
                    </div>
                  </div>

                  {/* Updated Badge */}
                  {story.updatedAt && story.updatedAt !== story.createdAt && (
                    <div className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-3 py-1.5 rounded-full font-medium shadow-sm">
                      <Clock className="w-3 h-3" />
                      Updated
                    </div>
                  )}
                </div>

                {/* Read More Button */}
                <Link to={`/story-details/${story._id}`} className="block mt-6">
                  <button className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-400 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {stories.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full mb-6 shadow-lg">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              No stories found
            </h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto">
              There are no stories to display at the moment. Check back later
              for new content!
            </p>
            <div className="mt-8">
              <div className="inline-flex items-center gap-2 text-gray-400">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
