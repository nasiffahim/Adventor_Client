import React from "react";
import { useLoaderData, useParams } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";

export default function GuideDetails() {
  const guides = useLoaderData(); // All guides data
  const { id } = useParams(); // Get id from URL params (not guideId)

  // Find the specific guide by matching the ID
  const guideInfo = guides.find((guide) => guide._id === id);

  console.log("Guide ID from params:", id);
  console.log("All guides:", guides);
  console.log("Found guide:", guideInfo);

  // Handle case where guide is not found
  if (!guideInfo) {
    return <div>Guide not found</div>;
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto override-navbar">
        <Navbar />
      </div>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Guide Details
        </h1>

        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
          {/* Profile Photo */}
          <div className="flex justify-center mb-6 w-[200px] h-[200px] border-4 border-blue-500 mx-auto rounded-full shadow overflow-hidden object-cover">
            <img
              src={guideInfo.photo}
              alt={guideInfo.name}
              className="w-full h-full"
            />
          </div>

          {/* Guide Information */}
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {guideInfo.name}
            </h2>

            <div className="space-y-3">
              <p className="text-gray-600 flex items-center justify-center gap-2">
                <span className="font-medium">Email:</span>
                <span className="text-blue-600">{guideInfo.email}</span>
              </p>

              <p className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-200">
                <span className="font-medium text-gray-600">Role:</span>
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {guideInfo.role}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
