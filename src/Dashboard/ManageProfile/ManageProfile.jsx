import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import useUserRole from "../../hooks/useUserRole";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import WelcomeAnimation from "../../../public/Welcome.json";
import CelebrateAnimation from "../../../public/confetti.json"
import { User, Mail, Crown, Edit3, X, Save, DollarSign, Users, Package, MessageCircle, BookOpen, RefreshCw } from "lucide-react";


export default function ManageProfile() {
  const { role, roleLoading } = useUserRole();
  const { user, updateUser } = useContext(AuthContext);
  const [localUser, setLocalUser] = useState({
    displayName: "",
    email: "",
    photoURL: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Admin statistics state
  const [adminStats, setAdminStats] = useState({
    totalPayment: 0,
    totalTourGuides: 0,
    totalPackages: 0,
    totalClients: 0,
    totalStories: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (user) {
      setLocalUser({
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  // Fetch admin statistics
  useEffect(() => {
    if (role === "admin") {
      fetchAdminStats();
    }
  }, [role]);

  const fetchAdminStats = async () => {
    try {
      setAdminStats((prev) => ({ ...prev, loading: true, error: null }));

      // Fetch all statistics in parallel
      const [
        paymentsResponse,
        usersResponse,
        packagesResponse,
        storiesResponse,
      ] = await Promise.all([
        fetch("https://tourism-management-system-server-dusky.vercel.app/payments"), // Replace with your actual API endpoint
        fetch("https://tourism-management-system-server-dusky.vercel.app/all-users"), // Replace with your actual API endpoint
        fetch("https://tourism-management-system-server-dusky.vercel.app/packages"), // Replace with your actual API endpoint
        fetch("https://tourism-management-system-server-dusky.vercel.app/stories"), // Replace with your actual API endpoint
      ]);

      const payments = await paymentsResponse.json();
      const users = await usersResponse.json();
      const packages = await packagesResponse.json();
      const stories = await storiesResponse.json();

      // Calculate total payment amount
      const totalPayment = payments.reduce((sum, payment) => {
        if (payment.status === "succeeded") {
          console.log(
            `Adding payment: ${payment.amount}, Running total: ${
              sum + payment.amount
            }`
          );
          return sum + payment.amount;
        } else {
          console.log(`Skipping payment with status: ${payment.status}`);
          return sum;
        }
      }, 0);

      console.log(`Total successful payments: ${totalPayment}`);
      console.log(`Total payment records: ${payments.length}`);
      console.log(
        `Successful payments count: ${
          payments.filter((p) => p.status === "succeeded").length
        }`
      );

      // Count tour guides and tourists
      const tourGuides = users.filter((user) => user.role === "tour-guide");
      const tourists = users.filter((user) => user.role === "tourist");

      setAdminStats({
        totalPayment: totalPayment,
        totalTourGuides: tourGuides.length,
        totalPackages: packages.length,
        totalClients: tourists.length,
        totalStories: stories.length,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      setAdminStats((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load statistics",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;

    updateUser({ displayName: name, photoURL: photo })
      .then(() => {
        setLocalUser((prev) => ({
          ...prev,
          displayName: name,
          photoURL: photo,
        }));
        setIsModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been successfully updated!",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "An error occurred while updating your profile.",
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden mb-8 sm:mb-12 border border-gray-100">
          {/* Cover Photo with Gradient */}
          <div className="relative h-32 sm:h-48 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300">
            <div className="absolute inset-0 bg-black/10 bg-opacity-20"></div>
            <div className="absolute bottom-3 lg:bottom-6 left-30 lg:left-50">
              <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white drop-shadow-lg flex items-center gap-2 sm:gap-3">
                <User className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                <span className="truncate max-w-48 sm:max-w-none">{localUser?.displayName}</span>
              </h1>
            </div>
          </div>

          {/* Profile Content */}
          <div className="relative px-4 sm:px-8 pb-6 sm:pb-8">
            {/* Profile Image */}
            <div className="absolute -top-12 sm:-top-20 left-4 sm:left-8">
              <div className="relative">
                <img
                  src={localUser?.photoURL}
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full object-cover border-4 sm:border-6 border-white shadow-xl sm:shadow-2xl ring-2 sm:ring-4 ring-blue-100"
                />
              </div>
            </div>

            <div className="pt-16 sm:pt-24 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
              {/* User Info */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    <span className="text-base sm:text-lg font-medium">Email:</span>
                  </div>
                  <span className="text-sm sm:text-lg break-all">{localUser?.email}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-gray-700">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    <span className="text-base sm:text-lg font-medium">Role:</span>
                  </div>
                  <span className="text-sm sm:text-lg">
                    {roleLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        Loading...
                      </span>
                    ) : (
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                        role === 'admin' 
                          ? 'bg-red-100 text-red-800' 
                          : role === 'tour-guide' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {role || "Tourist"}
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 font-semibold text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-3 sm:px-4">
            <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-sm sm:max-w-xl shadow-2xl relative transform mx-4 my-8 max-h-[90vh] overflow-y-auto">
              <div className="p-6 sm:p-8">
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>

                <div className="text-center mb-6 sm:mb-8">
                  <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                    <Edit3 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Edit Your Profile</h2>
                  <p className="text-gray-600 mt-2 text-sm sm:text-base">Update your information below</p>
                </div>

                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <label className="flex items-center gap-2 mb-2 sm:mb-3 text-base sm:text-lg font-semibold text-gray-700">
                      <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      className="w-full border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base"
                      placeholder="Enter your full name"
                      required
                      defaultValue={localUser?.displayName}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 mb-2 sm:mb-3 text-base sm:text-lg font-semibold text-gray-700">
                      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiIHJ5PSIyIi8+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjIiLz48cGF0aCBkPSJtMjEgMTUtMy01TDcgMTMiLz48L3N2Zz4=" alt="Image" className="h-4 w-4 sm:h-5 sm:w-5" />
                      Profile Photo URL
                    </label>
                    <input
                      name="photo"
                      type="text"
                      className="w-full border-2 border-gray-200 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base"
                      placeholder="Enter photo URL"
                      required
                      defaultValue={localUser?.photoURL}
                    />
                  </div>

                  <div className="text-center pt-3 sm:pt-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const name = document.getElementsByName('name')[0].value;
                        const photo = document.getElementsByName('photo')[0].value;
                        
                        updateUser({ displayName: name, photoURL: photo })
                          .then(() => {
                            setLocalUser((prev) => ({
                              ...prev,
                              displayName: name,
                              photoURL: photo,
                            }));
                            setIsModalOpen(false);
                            Swal.fire({
                              icon: "success",
                              title: "Profile Updated",
                              text: "Your profile has been successfully updated!",
                            });
                          })
                          .catch((error) => {
                            Swal.fire({
                              icon: "error",
                              title: "Update Failed",
                              text: "An error occurred while updating your profile.",
                            });
                          });
                      }}
                      className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-400 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
                    >
                      <Save className="h-4 w-4 sm:h-5 sm:w-5" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Animation Section */}
        <div className="flex justify-center items-center mb-8 sm:mb-16">
          <div className="flex items-center justify-center bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-4 sm:p-8 border border-gray-100">
            <div className="hidden sm:block">
              <Lottie
                animationData={CelebrateAnimation}
                loop={true}
                style={{ width: 60, height: 60, transform: "scaleX(-1)" }}
              />
            </div>

            <div>
              <Lottie
                animationData={WelcomeAnimation}
                loop={true}
                style={{ 
                  width: window.innerWidth < 640 ? 250 : 400, 
                  height: window.innerWidth < 640 ? 125 : 200 
                }}
              />
            </div>

            <div className="hidden sm:block">
              <Lottie
                animationData={CelebrateAnimation}
                loop={true}
                style={{ width: 60, height: 60 }}
              />
            </div>
          </div>
        </div>

        {/* Dashboard Section */}
        {role === "admin" && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-100 p-4 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center justify-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Crown className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                Admin Dashboard
              </h2>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Overview of platform statistics</p>
            </div>

            {adminStats.loading ? (
              <div className="text-center py-12 sm:py-16">
                <div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-blue-600 border-t-transparent"></div>
                <p className="mt-4 text-lg sm:text-xl text-gray-600 font-medium">Loading statistics...</p>
              </div>
            ) : adminStats.error ? (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                </div>
                <p className="text-red-600 text-base sm:text-lg font-semibold mb-4">{adminStats.error}</p>
                <button
                  onClick={fetchAdminStats}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto text-sm sm:text-base"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Total Payment */}
                <div className="sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-green-500 to-emerald-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                        <p className="text-green-100 text-xs sm:text-sm font-semibold uppercase tracking-wide">
                          Total Revenue
                        </p>
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold truncate">
                        {adminStats.totalPayment.toLocaleString()} ৳
                      </p>
                    </div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center ml-2">
                      <DollarSign className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                  </div>
                </div>

                {/* Total Tour Guides */}
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                        <p className="text-blue-100 text-xs sm:text-sm font-semibold uppercase tracking-wide">
                          Tour Guides
                        </p>
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold">
                        {adminStats.totalTourGuides}
                      </p>
                    </div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                  </div>
                </div>

                {/* Total Packages */}
                <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="h-4 w-4 sm:h-5 sm:w-5" />
                        <p className="text-purple-100 text-xs sm:text-sm font-semibold uppercase tracking-wide">
                          Packages
                        </p>
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold">
                        {adminStats.totalPackages}
                      </p>
                    </div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <Package className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                  </div>
                </div>

                {/* Total Clients */}
                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                        <p className="text-orange-100 text-xs sm:text-sm font-semibold uppercase tracking-wide">
                          Total Clients
                        </p>
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold">
                        {adminStats.totalClients}
                      </p>
                    </div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                  </div>
                </div>

                {/* Total Stories */}
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                        <p className="text-pink-100 text-xs sm:text-sm font-semibold uppercase tracking-wide">
                          Stories
                        </p>
                      </div>
                      <p className="text-2xl sm:text-3xl font-bold">
                        {adminStats.totalStories}
                      </p>
                    </div>
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <BookOpen className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}