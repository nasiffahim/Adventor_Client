import React from "react";

export default function OverviewSection() {
  return (
    <div className="h-[100vh]" style={{
             backgroundImage: "url('/map.jpg')",
             backgroundSize: 'cover',
             backgroundPosition: 'center',
           }}>
      <div
        className="w-full max-w-4xl mx-auto pt-10 px-4"
        
      >
        <div className="">
          <div className="">
            <h2 className="card-title text-3xl font-bold mb-6 text-center justify-center items-center">
              <span className="text-5xl">🌍</span>
              <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent h-full">
                Discover Bangladesh
              </span>
            </h2>
            <p className="text-base-content/70 text-center my-6 text-base">
              Experience the beauty and culture of Bangladesh through this
              immersive journey
            </p>

            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-base-300 hover:shadow-3xl transition-shadow duration-300">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/JLjvEYMBGzQ?autoplay=1&mute=1&cc_load_policy=0&rel=0&modestbranding=1&controls=1"
                title="Discover Bangladesh"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>

              {/* Decorative overlay for better integration */}
              <div className="absolute inset-0 ring-1 ring-base-300 rounded-xl pointer-events-none"></div>
            </div>

            {/* Optional subtitle or description */}
            
          </div>
        </div>
      </div>
    </div>
  );
}
