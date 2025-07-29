import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

export default function Navbar() {
  const { user, logOut } = use(AuthContext);

  const Links = (
    <>
      <NavLink to="/">
        <li className="mr-10 hover:text-[#FFDE63]">Home</li>
      </NavLink>
      <NavLink to="/stories">
        <li className="mr-10 hover:text-[#FFDE63]">Community</li>
      </NavLink>
      <NavLink to="/all-trips">
        <li className="mr-10 hover:text-[#FFDE63]">Trips</li>
      </NavLink>
      <NavLink to="/about-us">
        <li className="mr-10 hover:text-[#FFDE63]">About Us</li>
      </NavLink>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-special font-bold"
          >
            {Links}
          </ul>
        </div>
        <Link
          to="/"
          className="flex justify-center items-center gap-1 text-3xl font-extrabold font-antor hover:text-[#FFDE63]"
        >
          <svg
            className="w-8 h-8 text-current"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            <path d="M12 13l-2-2h1V9h2v2h1l-2 2z" opacity="0.6" />
          </svg>
          Adventor.
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end gap-4">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{Links}</ul>
        </div>
        <div>
          {user ? (
            <div className="flex justify-center items-center gap-6">
              <div className="dropdown dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className=" rounded-full overflow-hidden">
                    <img
                      alt=""
                      src={user ? user.photoURL : ""}
                      className="object-cover w-12 h-12"
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content bg-white/10 backdrop-blur-xs z-0 rounded-box mt-3 p-4 shadow left-1/2 transform -translate-x-1/2 min-w-max rounded-lg text-center"
                >
                  <li className="whitespace-nowrap">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-white hover:text-black"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="whitespace-nowrap">
                    <Link
                      to="/announcements"
                      className="block px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-white hover:text-black"
                    >
                      Announcements
                    </Link>
                  </li>
                  <li className="whitespace-nowrap">
                    <Link
                      onClick={handleLogOut}
                      className="block px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-white hover:text-black"
                    >
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
                className="px-2.5 py-1.5 border-2 border-white rounded font-extrabold hover:text-[#FFDE63] hover:border-[#FFDE63]"
              >
                Log In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
