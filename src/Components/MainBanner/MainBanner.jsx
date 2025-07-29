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

// const videoList = [
//   "../../../public/clip-2.mp4",
//   "../../../public/clip-4.mp4",
//   "../../../public/clip-1.mp4",
//   "../../../public/clip-3.mp4",
//   "../../../public/clip-5.mp4",
//   "../../../public/clip-6.mp4",
// ];

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
    <div className="relative h-[90vh] w-full overflow-hidden">
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

        <div className="mt-40 text-center text-white drop-shadow-lg">
          <div style={{ transform: "rotate(-10deg)" }}>
            <h2
              className={`text-5xl text-yellow-300 font-[cursive] mb-4 absolute -top-15 left-120 font-high-empathy ${
                isAnimating ? "spring-enter" : "spring-exit"
              }`}
              style={{
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                filter: "drop-shadow(0 0 10px rgba(255, 222, 99, 0.3))",
              }}
            >
              {rotatingPhrases[textIndex]}
            </h2>
          </div>

          <h1 className="text-6xl font-extrabold font-antor hover:text-[#FFDE63]">
            Explore the Beauty of <br />
            <span className="text-green-700">
              Ban<span className="text-red-700">gla</span>desh
            </span>
          </h1>
          <p className="mt-4 text-lg hover:text-[#FFDE63] font-lg">
            Discover Bangladesh like never before — from iconic landmarks to
            hidden gems. <br />
            Plan, explore and experience the culture, cuisine, and beauty with
            The Tourist Guide.
          </p>
        </div>
      </div>
    </div>
  );
}
