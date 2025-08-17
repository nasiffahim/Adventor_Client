import React, { useEffect, useState, useRef } from "react";
import Navbar from "../Navbar/Navbar";

const rotatingPhrases = [
  "thrilling",
  "refreshing",
  "unforgettable",
  "breathtaking",
  "authentic",
  "immersive",
];

const videoList = [
  "/clip-2.mp4",
  "/clip-4.mp4",
  "/clip-1.mp4",
  "/clip-3.mp4",
  "/clip-5.mp4",
  "/clip-6.mp4",
];

export default function MainBanner() {
  const [current, setCurrent] = useState(0);
  const [activeVideo, setActiveVideo] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (current + 1) % videoList.length;
      const nextVideo =
        activeVideo === 0 ? video2Ref.current : video1Ref.current;

      if (nextVideo) {
        nextVideo.src = videoList[nextIndex];
        nextVideo.currentTime = 0;

        const handleCanPlay = () => {
          nextVideo
            .play()
            .then(() => {
              setActiveVideo(activeVideo === 0 ? 1 : 0);
              setCurrent(nextIndex);
            })
            .catch(console.error);
          nextVideo.removeEventListener("canplay", handleCanPlay);
        };
        nextVideo.addEventListener("canplay", handleCanPlay);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [current, activeVideo]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(false);

      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % rotatingPhrases.length);
        setIsAnimating(true);
      }, 300);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (video1Ref.current) {
      video1Ref.current.src = videoList[0];
      video1Ref.current.play().catch(console.error);
    }
    setIsAnimating(true);
  }, []);

  return (
    <div className="relative h-[60vh] lg:h-[90vh] w-full overflow-hidden min-w-[350px]">
      <style jsx>{`
        @keyframes springEnter {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-20px);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1) translateY(5px);
          }
          70% {
            transform: scale(0.95) translateY(-2px);
          }
          85% {
            transform: scale(1.02) translateY(1px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0px);
          }
        }

        @keyframes springExit {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0px);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05) translateY(-5px);
          }
          100% {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
          }
        }

        .spring-enter {
          animation: springEnter 0.8s cubic-bezier(0.26, 0.53, 0.74, 1.48)
            forwards;
        }

        .spring-exit {
          animation: springExit 0.3s ease-in forwards;
        }

        .rotating-text {
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          filter: drop-shadow(0 0 10px rgba(255, 222, 99, 0.3));
        }
      `}</style>

      <video
        ref={video1Ref}
        autoPlay
        muted
        loop={false}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          activeVideo === 0 ? "opacity-100 z-5" : "opacity-0 z-0"
        }`}
      />
      <video
        ref={video2Ref}
        autoPlay
        muted
        loop={false}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          activeVideo === 1 ? "opacity-100 z-5" : "opacity-0 z-0"
        }`}
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-10" />

      <div className="relative z-20 w-10/12 mx-auto">
        <div className="py-4">
          <Navbar />
        </div>

        <div className="mt-10 lg:mt-20 text-center text-white drop-shadow-lg px-4 sm:px-0">
          {/* Rotating text - positioned responsively */}
          <div className="relative mb-4 sm:mb-0">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-yellow-300 font-[cursive] 
                         transform -rotate-12 sm:-rotate-6 lg:-rotate-12 
                         font-high-empathy rotating-text
                         ${isAnimating ? "spring-enter" : "spring-exit"}`}
              style={{
                position: "relative",
                top: "30px",
                right: "30px",
                display: "inline-block",
                marginBottom: "1rem",
              }}
            >
              {rotatingPhrases[textIndex]}
            </h2>
          </div>

          {/* Main title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-antor hover:text-[#FFDE63] 
                         leading-tight sm:leading-normal mb-4">
            Explore the Beauty of <br className="hidden sm:block" />
            <span className="sm:inline block">
              <span className="text-green-700">
                Ban<span className="text-red-700">gla</span>desh
              </span>
            </span>
          </h1>
          
          {/* Description */}
          <p className="mt-4 text-sm sm:text-base lg:text-lg hover:text-[#FFDE63] font-lg 
                        max-w-2xl mx-auto leading-relaxed px-2 sm:px-0">
            Discover Bangladesh like never before — from iconic landmarks to
            hidden gems. <br className="hidden sm:block" />
            Plan, explore and experience the culture, cuisine, and beauty with
            The Tourist Guide.
          </p>
        </div>
      </div>
    </div>
  );
}