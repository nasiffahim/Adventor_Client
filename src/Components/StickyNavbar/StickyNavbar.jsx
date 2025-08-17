import React, { use, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import {
  Home,
  Users,
  MapPin,
  User,
  LogIn,
  LayoutDashboard,
  Bell,
  LogOut,
  Info,
} from "lucide-react";
import Swal from "sweetalert2";

export default function StickyNavbar() {
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar after scrolling past banner (adjust 400 to your banner height)
      setIsVisible(currentScrollY > 400);

      // Add background blur after scrolling a bit
      setScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const iconCls =
    "w-4 h-4 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:scale-110";
  const linkCls = ({ isActive }) =>
    `group inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-bold
     transition-all duration-200 hover:text-[#FFDE63] hover:bg-white/10 hover:scale-105 
     ${isActive ? "text-[#FFDE63]" : "text-white"}`;

  const Links = (
    <>
      <li>
        <NavLink to="/" className={linkCls}>
          <Home className={iconCls} />
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            Home
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/stories" className={linkCls}>
          <Users className={iconCls} />
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            Community
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/all-trips" className={linkCls}>
          <MapPin className={iconCls} />
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            Trips
          </span>
        </NavLink>
      </li>

      <li>
        <NavLink to="/about-us" className={linkCls}>
          <Info className={iconCls} />
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            About Us
          </span>
        </NavLink>
      </li>
    </>
  );

  const handleLogOut = async () => {
    try {
      await logOut();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logout Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className={`
      fixed top-0 left-0 right-0 z-50 
      transition-all duration-500 ease-out
      ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      ${scrolled ? "backdrop-blur-md bg-black/20 shadow-lg" : "bg-black/10"}
    `}
    >
      <div className="w-10/12 mx-auto">
        <div className="navbar text-white relative px-2 sm:px-4">
          <div className="navbar-start relative z-10 flex-1 min-w-0">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden hover:bg-white/20 transition-colors duration-300 btn-sm min-h-0 h-8 w-8 p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 hover:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-black/10 backdrop-blur-sm rounded-box z-10 mt-3 w-56 sm:w-64 p-3 sm:p-4 shadow-2xl border border-white/20 font-special font-bold left-0 rounded-lg"
              >
                {Links}
              </ul>
            </div>

            <Link
              to="/"
              className="group flex justify-center items-center gap-1 sm:gap-2 text-lg sm:text-2xl lg:text-3xl font-extrabold font-antor hover:text-[#FFDE63] transition-all duration-500 ml-1 sm:ml-2 min-w-0 flex-shrink"
            >
              <div className="relative overflow-hidden flex-shrink-0">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-current transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <div className="absolute inset-0 bg-[#FFDE63] opacity-0 blur-xl transition-opacity duration-500"></div>
              </div>
              <span className="relative overflow-hidden min-w-0">
                <span className="block transition-transform duration-500 group-hover:-translate-y-full truncate">
                  Adventor.
                </span>
                <span className="absolute top-full left-0 transition-transform duration-500 group-hover:-translate-y-full text-[#FFDE63] truncate w-full">
                  Adventor.
                </span>
              </span>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex relative z-10"></div>

          <div className="navbar-end gap-2 sm:gap-4 relative z-10 flex-shrink-0">
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{Links}</ul>
            </div>

            <div className="flex-shrink-0">
              {user ? (
                <div className="flex justify-center items-center gap-3 sm:gap-6">
                  <div className="dropdown dropdown-hover group">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar relative overflow-hidden transition-all duration-300 hover:scale-105 btn-sm sm:btn-md min-h-0 w-8 h-8 sm:w-12 sm:h-12 p-0"
                    >
                      <div className="rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#FFDE63] transition-colors duration-300 w-full h-full">
                        <img
                          alt="User Avatar"
                          src={user ? user.photoURL : ""}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      {/* Glowing ring effect */}
                      <div className="absolute inset-0 rounded-full bg-[#FFDE63] opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
                    </div>

                    <ul
                      tabIndex={0}
                      className="dropdown-content bg-black/20 backdrop-blur-lg z-20 rounded-xl mt-3 p-2 shadow-2xl border border-white/10 right-0 sm:left-1/2 sm:transform sm:-translate-x-1/2 min-w-max text-center w-48 sm:w-auto"
                    >
                      <li className="whitespace-nowrap">
                        <Link
                          to="/dashboard"
                          className="group flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-white/20 transition-all duration-200 text-white hover:text-[#FFDE63] hover:translate-x-1 text-sm sm:text-base"
                        >
                          <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
                          Dashboard
                        </Link>
                      </li>
                      <li className="whitespace-nowrap">
                        <Link
                          to="/announcements"
                          className="group flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-white/20 transition-all duration-200 text-white hover:text-[#FFDE63] hover:translate-x-1 text-sm sm:text-base"
                        >
                          <Bell className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
                          Announcements
                        </Link>
                      </li>
                      <li className="whitespace-nowrap">
                        <Link
                          onClick={handleLogOut}
                          className="group flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg hover:bg-red-500/20 transition-all duration-200 text-white hover:text-red-300 hover:translate-x-1 text-sm sm:text-base"
                        >
                          <LogOut className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:scale-110 flex-shrink-0" />
                          Log Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div>
                  <Link
                    to="/auth/login"
                    className="group flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 border-2 border-white rounded-lg font-extrabold hover:text-[#FFDE63] hover:border-[#FFDE63] transition-all duration-300 hover:scale-105 text-xs sm:text-sm lg:text-base"
                  >
                    <LogIn className="w-3 h-3 sm:w-4 sm:h-4 opacity-100 transition-all duration-300 transform group-hover:scale-110 flex-shrink-0" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300 whitespace-nowrap">
                      Log In
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
