import React from "react";
import { useLoaderData } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { Users, Eye, Check, X } from 'lucide-react';

export default function ManageCandidates() {
  const applications = useLoaderData();

  const handleAccept = async (application) => {
    try {
      // Step 1: Update user role
      await axios.patch(
        `https://tourism-management-system-server-dusky.vercel.app/users/role/${application.email}`,
        {
          role: "tour-guide",
        }
      );

      // Step 2: Delete application
      await axios.delete(
        `https://tourism-management-system-server-dusky.vercel.app/guide-applications/${application._id}`
      );

      Swal.fire({
        icon: "success",
        title: "Accepted",
        text: `${application.name} is now a tour guide.`,
      });

      // Optional: Refresh the table
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("Error accepting application:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to accept the application.",
      });
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`https://tourism-management-system-server-dusky.vercel.app/guide-applications/${id}`);

      Swal.fire({
        icon: "success",
        title: "Rejected",
        text: "Application has been removed.",
      });

      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("Error rejecting application:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to reject the application.",
      });
    }
  };

  return (
    // <div className="p-6">
    //   <h2 className="text-2xl font-bold mb-4">Manage Candidates</h2>
    //   <div className="overflow-x-auto">
    //     <table className="min-w-full bg-white border border-gray-300 text-left text-sm">
    //       <thead>
    //         <tr className="bg-gray-100">
    //           <th className="p-3 border">Photo</th>
    //           <th className="p-3 border">Name</th>
    //           <th className="p-3 border">Email</th>
    //           <th className="p-3 border">Current Role</th>
    //           <th className="p-3 border">Reason</th>
    //           <th className="p-3 border">CV</th>
    //           <th className="p-3 border">Actions</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {applications.map((app) => (
    //           <tr key={app._id} className="border-b">
    //             <td className="p-3 border">
    //               <img
    //                 src={app.photo}
    //                 alt={app.name}
    //                 className="w-12 h-12 rounded-full object-cover"
    //               />
    //             </td>
    //             <td className="p-3 border">{app.name}</td>
    //             <td className="p-3 border">{app.email}</td>
    //             <td className="p-3 border">User</td>
    //             <td className="p-3 border">{app.reason.slice(0, 100)}...</td>
    //             <td className="p-3 border">
    //               <a
    //                 href={app.cvLink}
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //                 className="text-blue-500 underline"
    //               >
    //                 View CV
    //               </a>
    //             </td>
    //             <td className="p-3 border space-x-2">
    //               <button
    //                 onClick={() => handleAccept(app)}
    //                 className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
    //               >
    //                 Accept
    //               </button>
    //               <button
    //                 onClick={() => handleReject(app._id)}
    //                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
    //               >
    //                 Reject
    //               </button>
    //             </td>
    //           </tr>
    //         ))}
    //         {applications.length === 0 && (
    //           <tr>
    //             <td colSpan="7" className="text-center p-4">
    //               No applications found.
    //             </td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>

    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Manage Candidates
              </h2>
              <p className="text-slate-600 mt-1">
                Review and approve tour guide applications
              </p>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-blue-50/50 border-b border-slate-200">
                  <th className="text-left p-6 font-semibold text-slate-700 uppercase tracking-wide">
                    Photo
                  </th>
                  <th className="text-left p-6 font-semibold text-slate-700 uppercase tracking-wide">
                    Name
                  </th>
                  <th className="text-left p-6 font-semibold text-slate-700 uppercase tracking-wide">
                    Email
                  </th>
                  <th className="text-left p-6 font-semibold text-slate-700 uppercase tracking-wide">
                    Current Role
                  </th>
                  <th className="text-left p-6 font-semibold text-slate-700 uppercase tracking-wide">
                    Reason
                  </th>
                  <th className="text-left p-6 font-semibold text-slate-700 uppercase tracking-wide">
                    CV
                  </th>
                  <th className="text-center p-6 font-semibold text-slate-700 uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {applications.map((app, index) => (
                  <tr
                    key={app._id}
                    className="hover:bg-slate-50/50 transition-colors duration-200"
                  >
                    <td className="p-6">
                      <div className="relative">
                        <img
                          src={app.photo}
                          alt={app.name}
                          className="w-14 h-14 rounded-xl object-cover shadow-md border-2 border-white"
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="font-semibold text-slate-800 text-base">
                        {app.name}
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="text-slate-600 font-medium">
                        {app.email}
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border">
                        Tourist
                      </span>
                    </td>
                    <td className="p-6 max-w-xs">
                      <div className="text-slate-600 leading-relaxed">
                        {app.reason.slice(0, 100)}...
                      </div>
                    </td>
                    <td className="p-6">
                      <a
                        href={app.cvLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
                      >
                        <Eye className="w-4 h-4" />
                        View CV
                      </a>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleAccept(app)}
                          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        >
                          <Check className="w-4 h-4" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(app._id)}
                          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center p-12">
                      <div className="flex flex-col items-center gap-3">
                        <Users className="w-12 h-12 text-slate-300" />
                        <div className="text-slate-500 font-medium">
                          No applications found.
                        </div>
                        <div className="text-slate-400 text-sm">
                          Check back later for new tour guide applications.
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
