import React from "react";
import useUserRole from "../../hooks/useUserRole";
import Lottie from "lottie-react";
import WelcomeAnimation from "../../../public/Welcome.json";
import CelebrateAnimation from "../../../public/confetti.json"

export default function DashboardHome() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Lottie
          animationData={CelebrateAnimation}
          loop={true}
          style={{ width: 200, height: 200, transform: "scaleX(-1)"  }}
        ></Lottie>
      </div>

      <div>
        <Lottie
          animationData={WelcomeAnimation}
          loop={true}
          style={{ width: 500, height: 500 }}
        ></Lottie>
      </div>

      <div>
        <Lottie
          animationData={CelebrateAnimation}
          loop={true}
          style={{ width: 200, height: 200 }}
        ></Lottie>
      </div>
    </div>
  );
}
