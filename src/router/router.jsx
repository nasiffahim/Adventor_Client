import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../Layouts/Root/Root";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import DashboardLayout from "../Layouts/Dashboard/DashboardLayout";
import DashboardHome from "../Dashboard/DashboardHome/DashboardHome";
import AddPackages from "../Dashboard/AddPackages/AddPackages";
import AllTrips from "../Pages/AllTrips/AllTrips";
import TripDetails from "../Pages/TripDetails/TripDetails";
import ManageUsers from "../Dashboard/ManageUsers/ManageUsers";
import GuideDetails from "../Pages/GuideDetails/GuideDetails";
import BecomeTourGuide from "../Dashboard/BecomeTourGuide/BecomeTourGuide";
import ManageCandidates from "../Dashboard/ManageCandidates/ManageCandidates";
import ManageProfile from "../Dashboard/ManageProfile/ManageProfile";
import AddStories from "../Dashboard/AddStories/AddStories";
import ManageStories from "../Dashboard/ManageStories/ManageStories";
import EditStories from "../Dashboard/ManageStories/EditStories";
import StoryDetails from "../Dashboard/ManageStories/StoryDetails";
import MyBookings from "../Dashboard/MyBookings/MyBookings";
import Payment from "../Dashboard/Payment/Payment";
import AssignedTour from "../Dashboard/AssignedTour/AssignedTour";
import AllStories from "../Pages/AllStories/AllStories";
import AllStoryDetails from "../Pages/AllStoryDetails/AllStoryDetails";
import AboutDev from "../Pages/AboutDev/AboutDev";
import PrivateRoute from "../Provider/PrivateRoute";
import AdminRoute from "../Provider/AdminRoute";
import AnnouncementPage from "../Pages/Announcement/AnnouncementCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>Error: Page not found</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/all-trips",
        element: <AllTrips />,
        loader: () => fetch("https://tourism-management-system-server-dusky.vercel.app/packages"),
      },
      {
        path: "/all-trips/:id",
        element: <PrivateRoute><TripDetails /></PrivateRoute>,
        loader: () => fetch("https://tourism-management-system-server-dusky.vercel.app/all-users"),
      },
      {
        path: "/guide/:id",
        element: <PrivateRoute><GuideDetails /></PrivateRoute>,
        loader: () => fetch("https://tourism-management-system-server-dusky.vercel.app/all-users"),
      },
      {
        path: "stories",
        element: <AllStories />,
        loader: () => fetch("https://tourism-management-system-server-dusky.vercel.app/stories"),
      },
      {
        path: "story-details/:id",
        element: <PrivateRoute><AllStoryDetails /></PrivateRoute>,
        loader: () => fetch("https://tourism-management-system-server-dusky.vercel.app/stories"),
      },
      {
        path: "about-us",
        element: <AboutDev />
      },
      {
        path: "announcements",
        element: <AnnouncementPage />
      }
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <PrivateRoute><ManageProfile /></PrivateRoute>,
      },
      {
        index: true,
        path: "my-profile",
        element: <PrivateRoute><ManageProfile /></PrivateRoute>,
      },
      {
        path: "my-bookings",
        element: <PrivateRoute><MyBookings /></PrivateRoute>,
      },
      {
        path: "payment/:bookingId",
        element: <PrivateRoute><Payment /></PrivateRoute>,
      },
      {
        path: "add-stories",
        element: <PrivateRoute><AddStories /></PrivateRoute>,
      },
      {
        path: "my-assigned-tour",
        element: <PrivateRoute><AssignedTour /></PrivateRoute>,
      },
      {
        path: "my-stories",
        element: <PrivateRoute><ManageStories /></PrivateRoute>,
        loader: () => fetch("https://tourism-management-system-server-dusky.vercel.app/stories"),
      },
      {
        path: "story-details/:id",
        element: <PrivateRoute><StoryDetails /></PrivateRoute>,
        loader: () => fetch("https://tourism-management-system-server-dusky.vercel.app/stories"),
      },
      {
        path: "edit-story/:id",
        element: <PrivateRoute><EditStories /></PrivateRoute>,
        loader: () => fetch("https://tourism-management-system-server-dusky.vercel.app/stories"),
      },
      {
        path: "add-package",
        element: <AdminRoute><AddPackages /></AdminRoute>,
      },
      {
        path: "user-management",
        element: <AdminRoute><ManageUsers /></AdminRoute>,
        loader: () => fetch("https://tourism-management-system-server-dusky.vercel.app/all-users"),
      },
      {
        path: "manage-candidates",
        element: <AdminRoute><ManageCandidates /></AdminRoute>,
        loader: () => fetch("https://tourism-management-system-server-dusky.vercel.app/guide-applications"),
      },
      {
        path: "become-tour-guide",
        element: <PrivateRoute><BecomeTourGuide /></PrivateRoute>,
      },
    ],
  },
]);

export default router;
