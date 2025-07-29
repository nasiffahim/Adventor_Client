// import React from "react";
// import { useParams, useLoaderData, useNavigate } from "react-router";

// export default function AllStoryDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const stories = useLoaderData();
//   const story = stories.find((story) => story._id === id);

//   if (!story)
//     return (
//       <div className="flex justify-center items-center h-[60vh]">
//         <p className="text-xl text-red-500 font-semibold">Story not found.</p>
//       </div>
//     );

//   return (
//     <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-white rounded-xl shadow-lg relative">
//       {/* Go Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-1.5 px-4 rounded-md text-sm transition"
//       >
//         ← Go Back
//       </button>

//       {/* Image Gallery */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 mt-8">
//         {story.images.map((img, index) => (
//           <img
//             key={index}
//             src={img}
//             alt={`Story Image ${index + 1}`}
//             className="w-full h-56 sm:h-48 object-cover rounded-lg shadow-md border"
//           />
//         ))}
//       </div>

//       {/* Story Content */}
//       <div className="space-y-4">
//         <h1 className="text-4xl font-extrabold text-gray-800">{story.title}</h1>
//         <p className="text-sm text-gray-500">
//           Posted by <span className="font-semibold">{story.email}</span> on{" "}
//           <span className="italic">
//             {new Date(story.createdAt).toLocaleString()}
//           </span>
//         </p>
//         <p className="text-lg text-gray-700 leading-relaxed">{story.text}</p>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useParams, useLoaderData, useNavigate } from "react-router";
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  User, 
  Image as ImageIcon, 
  Eye,
  Heart,
  Share2,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function AllStoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const stories = useLoaderData();
  const story = stories.find((story) => story._id === id);
  console.log(story)

const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openImageModal = (imageUrl, index) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentImageIndex + 1) % story.images.length
      : (currentImageIndex - 1 + story.images.length) % story.images.length;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(story.images[newIndex]);
  };

  const handleGoBack = () => {
    navigate("/stories")
  };

  if (!story) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex justify-center items-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Story Not Found</h2>
          <p className="text-gray-600">The story you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Stories
            </button>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Like</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-200">
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Story Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="p-8">
            {/* Title Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-6 h-6 text-blue-500" />
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">Story</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
                {story.title}
              </h1>
            </div>

            {/* Author & Date Info */}
            <div className="flex flex-wrap items-center gap-6 mb-8 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Author</p>
                  <p className="font-semibold text-gray-800">{story.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Published</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(story.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Images</p>
                  <p className="font-semibold text-gray-800">{story.images.length} photos</p>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="prose prose-lg max-w-none">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">Story Content</span>
              </div>
              <div className="text-gray-700 leading-relaxed text-lg">
                {story.text.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        {story.images.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-bold text-gray-800">Photo Gallery</h2>
                </div>
                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                  {story.images.length} {story.images.length === 1 ? 'photo' : 'photos'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {story.images.map((img, index) => (
                  <div 
                    key={index}
                    className="relative group cursor-pointer overflow-hidden rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all duration-300"
                    onClick={() => openImageModal(img, index)}
                  >
                    <img
                      src={img}
                      alt={`Story Image ${index + 1}`}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/10 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute top-2 left-2 bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                      {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/10 bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 bg-white/10 bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {story.images.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all duration-200"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 bg-opacity-20 hover:bg-opacity-30 text-white rounded-full p-2 transition-all duration-200"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-medium">
              {currentImageIndex + 1} of {story.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}