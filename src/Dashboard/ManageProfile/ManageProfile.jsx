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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12 border border-gray-100">
          {/* Cover Photo with Gradient */}
          <div className="relative h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
            <div className="absolute inset-0 bg-black/10 bg-opacity-20"></div>
            <div className="absolute bottom-6 left-6 z-10">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg flex items-center gap-3 ml-45">
                <User className="h-8 w-8" />
                {localUser?.displayName}
              </h1>
            </div>
          </div>

          {/* Profile Content */}
          <div className="relative px-8 pb-8">
            {/* Profile Image */}
            <div className="absolute -top-20 left-8">
              <div className="relative">
                <img
                  src={localUser?.photoURL}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover border-6 border-white shadow-2xl ring-4 ring-blue-100"
                />
              </div>
            </div>

            <div className="pt-24 flex justify-between items-start">
              {/* User Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-lg font-medium">Email:</span>
                  <span className="text-lg">{localUser?.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Crown className="h-5 w-5 text-purple-600" />
                  <span className="text-lg font-medium">Role:</span>
                  <span className="text-lg">
                    {roleLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        Loading...
                      </span>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
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
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 font-semibold"
              >
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/10 bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl relative transform">
              <div className="p-8">
                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="text-center mb-8">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <Edit3 className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800">Edit Your Profile</h2>
                  <p className="text-gray-600 mt-2">Update your information below</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center gap-2 mb-3 text-lg font-semibold text-gray-700">
                      <User className="h-5 w-5 text-blue-600" />
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter your full name"
                      required
                      defaultValue={localUser?.displayName}
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 mb-3 text-lg font-semibold text-gray-700">
                      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iMyIgcng9IjIiIHJ5PSIyIi8+PGNpcmNsZSBjeD0iOSIgY3k9IjkiIHI9IjIiLz48cGF0aCBkPSJtMjEgMTUtMy01TDcgMTMiLz48L3N2Zz4=" alt="Image" className="h-5 w-5" />
                      Profile Photo URL
                    </label>
                    <input
                      name="photo"
                      type="text"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                      placeholder="Enter photo URL"
                      required
                      defaultValue={localUser?.photoURL}
                    />
                  </div>

                  <div className="text-center pt-4">
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
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
                    >
                      <Save className="h-5 w-5" />
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Animation Section */}
        <div className="flex justify-center items-center mb-16">
          <div className="flex items-center justify-center bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div>
              <Lottie
                animationData={CelebrateAnimation}
                loop={true}
                style={{ width: 100, height: 100, transform: "scaleX(-1)" }}
              />
            </div>

            <div>
              <Lottie
                animationData={WelcomeAnimation}
                loop={true}
                style={{ width: 400, height: 200 }}
              />
            </div>

            <div>
              <Lottie
                animationData={CelebrateAnimation}
                loop={true}
                style={{ width: 100, height: 100 }}
              />
            </div>
          </div>
        </div>

        {/* Dashboard Section */}
        {role === "admin" && (
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Crown className="h-6 w-6 text-white" />
                </div>
                Admin Dashboard
              </h2>
              <p className="text-gray-600 mt-2">Overview of platform statistics</p>
            </div>

            {adminStats.loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                <p className="mt-4 text-xl text-gray-600 font-medium">Loading statistics...</p>
              </div>
            ) : adminStats.error ? (
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="h-8 w-8 text-red-600" />
                </div>
                <p className="text-red-600 text-lg font-semibold mb-4">{adminStats.error}</p>
                <button
                  onClick={fetchAdminStats}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Payment */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-5 w-5" />
                        <p className="text-green-100 text-sm font-semibold uppercase tracking-wide">
                          Total Revenue
                        </p>
                      </div>
                      <p className="text-3xl font-bold">
                        {adminStats.totalPayment.toLocaleString()} ৳
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-white/10 bg-opacity-20 rounded-full flex items-center justify-center">
                      <DollarSign className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                {/* Total Tour Guides */}
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="h-5 w-5" />
                        <p className="text-blue-100 text-sm font-semibold uppercase tracking-wide">
                          Tour Guides
                        </p>
                      </div>
                      <p className="text-3xl font-bold">
                        {adminStats.totalTourGuides}
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-white/10 bg-opacity-20 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                {/* Total Packages */}
                <div className="bg-gradient-to-br from-purple-500 to-violet-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="h-5 w-5" />
                        <p className="text-purple-100 text-sm font-semibold uppercase tracking-wide">
                          Packages
                        </p>
                      </div>
                      <p className="text-3xl font-bold">
                        {adminStats.totalPackages}
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-white/10 bg-opacity-20 rounded-full flex items-center justify-center">
                      <Package className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                {/* Total Clients */}
                <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MessageCircle className="h-5 w-5" />
                        <p className="text-orange-100 text-sm font-semibold uppercase tracking-wide">
                          Total Clients
                        </p>
                      </div>
                      <p className="text-3xl font-bold">
                        {adminStats.totalClients}
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-white/10 bg-opacity-20 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                {/* Total Stories */}
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-5 w-5" />
                        <p className="text-pink-100 text-sm font-semibold uppercase tracking-wide">
                          Stories
                        </p>
                      </div>
                      <p className="text-3xl font-bold">
                        {adminStats.totalStories}
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-white/10 bg-opacity-20 rounded-full flex items-center justify-center">
                      <BookOpen className="h-8 w-8" />
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