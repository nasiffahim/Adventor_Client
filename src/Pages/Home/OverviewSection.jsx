import React from "react";

export default function OverviewSection() {
  return (
    <div className="h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[100vh] overflow-hidden" style={{
             backgroundImage: "url('/map.jpg')",
             backgroundSize: 'cover',
             backgroundPosition: 'center',
           }}>
      <div
        className="w-full max-w-4xl mx-auto pt-4 md:pt-8 lg:pt-10 px-4 sm:px-6 h-full flex flex-col justify-center"
        
      >
        <div className="">
          <div className="">
            <h2 className="card-title text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center justify-center items-center">
              <span className="text-3xl sm:text-4xl lg:text-5xl">🌍</span>
              <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent h-full">
                Discover Bangladesh
              </span>
            </h2>
            <p className="text-base-content/70 text-center my-4 sm:my-6 text-sm sm:text-base px-2 sm:px-0">
              Experience the beauty and culture of Bangladesh through this
              immersive journey
            </p>

            <div className="relative aspect-video rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl border border-base-300 hover:shadow-3xl transition-shadow duration-300 mx-2 sm:mx-0">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/JLjvEYMBGzQ?autoplay=1&mute=1&cc_load_policy=0&rel=0&modestbranding=1&controls=1"
                title="Discover Bangladesh"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>

              {/* Decorative overlay for better integration */}
              <div className="absolute inset-0 ring-1 ring-base-300 rounded-lg sm:rounded-xl pointer-events-none"></div>
            </div>

            {/* Optional subtitle or description */}
            
          </div>
        </div>
      </div>
    </div>
  );
}