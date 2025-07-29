import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";

export default function AuthLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
