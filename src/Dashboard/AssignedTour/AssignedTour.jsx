import React, { useState, useEffect, use } from "react";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";

export default function AssignedTour() {
  const { user } = use(AuthContext);
  const [assignedTours, setAssignedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Fetch assigned tours on component mount
  useEffect(() => {
    if (user?.email) {
      fetchAssignedTours();
    }
  }, [user?.email]);

  const fetchAssignedTours = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://tourism-management-system-server-dusky.vercel.app/assigned-tours/${user.email}`
      );
      const data = await response.json();

      if (data.success) {
        setAssignedTours(data.data);
      } else {
        console.error("Failed to fetch assigned tours");
      }
    } catch (error) {
      console.error("Error fetching assigned tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (tour) => {
    try {
      setUpdating(true);
      const response = await fetch(
        `https://tourism-management-system-server-dusky.vercel.app/assigned-tours/${tour.bookingId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "accepted" }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Update local state
        setAssignedTours((prev) =>
          prev.map((t) =>
            t.bookingId === tour.bookingId ? { ...t, status: "accepted" } : t
          )
        );
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Tour accepted successfully!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to accept tour",
        });
      }
    } catch (error) {
      console.error("Error accepting tour:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to accept tour",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleReject = async () => {
    try {
      setUpdating(true);
      const response = await fetch(
        `https://tourism-management-system-server-dusky.vercel.app/assigned-tours/${selectedTour.bookingId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "rejected" }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Update local state
        setAssignedTours((prev) =>
          prev.map((t) =>
            t.bookingId === selectedTour.bookingId
              ? { ...t, status: "rejected" }
              : t
          )
        );
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Tour rejected successfully!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to reject tour",
        });
      }
    } catch (error) {
      console.error("Error rejecting tour:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to reject tour",
      });
    } finally {
      setUpdating(false);
      setShowConfirmModal(false);
      setSelectedTour(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatPrice = (price) => {
    return `$${price}`;
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      "in review": "bg-blue-100 text-blue-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold text-gray-800 mb-8">
        My Assigned Tours
      </h1>

      {assignedTours.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No tours assigned yet</div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Package Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tourist Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tour Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tour Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assignedTours.map((tour) => (
                  <tr key={tour.bookingId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {tour.packageName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-full mr-3"
                          src={tour.touristImage}
                          alt={tour.touristName}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {tour.touristName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {tour.touristEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(tour.tourDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatPrice(tour.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(tour.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAccept(tour)}
                          disabled={tour.status !== "in review" || updating}
                          className={`px-4 py-2 rounded-md text-sm font-medium ${
                            tour.status === "in review" && !updating
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {updating ? "Processing..." : "Accept"}
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTour(tour);
                            setShowConfirmModal(true);
                          }}
                          disabled={tour.status !== "in review" || updating}
                          className={`px-4 py-2 rounded-md text-sm font-medium ${
                            tour.status === "in review" && !updating
                              ? "bg-red-600 hover:bg-red-700 text-white"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          {updating ? "Processing..." : "Reject"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                Confirm Rejection
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to reject this tour for{" "}
                  {selectedTour?.touristName}? This action cannot be undone.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={handleReject}
                  disabled={updating}
                  className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 mr-2"
                >
                  {updating ? "Processing..." : "Confirm Reject"}
                </button>
                <button
                  onClick={() => {
                    setShowConfirmModal(false);
                    setSelectedTour(null);
                  }}
                  disabled={updating}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
