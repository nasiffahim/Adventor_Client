import React, { use } from "react";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaPhoneAlt,
  FaTwitterSquare,
} from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

export default function TopNavbar() {
  const { user } = use(AuthContext);

  const welcomeMessages = [
    "Pack your bags — adventure awaits!",
    "Explore, Dream, Discover!",
    "Bangladesh is calling. Are you ready?",
    "Your travel guide is just a click away!!!",
  ];

  const message =
    welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  return (
    <div className=" bg-black text-white text-xs font-special font-bold">
      <div className="flex justify-between items-center w-10/12 mx-auto py-2">
        <div className="flex justify-center items-center gap-20">
          <div className="flex justify-center items-center gap-1">
            <h1 className="font-extrabold">FOLLOW US:</h1>
            <div className="flex gap-2 text-xl">
              <Link to="https://www.facebook.com/nasif.wasek/"><FaFacebookSquare /></Link>
              <Link to="https://x.com/WasekFahim"><FaTwitterSquare /></Link>
              <Link to="https://www.instagram.com/nasif_wasek/"><FaSquareInstagram /></Link>
              <Link to="https://www.linkedin.com/in/nasif-wasek/"><FaLinkedin /></Link>
            </div>
          </div>

          <div className="flex justify-between items-center gap-2">
            <FaPhoneAlt /> <span>+880-1234-012-034</span>
          </div>
        </div>

        {user ? (
          <h1>
            {message}
          </h1>
        ) : (
          <div className="flex justify-between items-center gap-4">
            <h1>Don't Have an Account?</h1>
            <Link to="/auth/register"><span className="underline">Register</span></Link>
          </div>
        )}
      </div>
    </div>
  );
}
