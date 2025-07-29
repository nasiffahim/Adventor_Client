import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Package,
  MapPin,
  DollarSign,
  Camera,
  FileText,
  Calendar,
  Plus,
  Upload,
  Info,
  Clock,
  Users,
  Star,
} from "lucide-react";

export default function AddPackageForm() {
  const [images, setImages] = useState([]);
  const [tourPlan, setTourPlan] = useState([{ day: "", plan: "" }]);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleTourPlanChange = (index, field, value) => {
    const updated = [...tourPlan];
    updated[index][field] = value;
    setTourPlan(updated);
  };

  const addDayPlan = () => {
    setTourPlan([...tourPlan, { day: "", plan: "" }]);
  };

  const removeDayPlan = (index) => {
    const updated = [...tourPlan];
    updated.splice(index, 1);
    setTourPlan(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const form = e.target;
    const formData = new FormData();

    formData.append("packageName", form.packageName.value);
    formData.append("location", form.location.value);
    formData.append("price", form.price.value);
    formData.append("about", form.about.value);
    formData.append("tourPlan", JSON.stringify(tourPlan));

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const response = await axios.post("https://tourism-management-system-server-dusky.vercel.app/add-package", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Package Added Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        form.reset();
        setImages([]);
        setTourPlan([{ day: "", plan: "" }]);
      }
    } catch (error) {
      console.error("Error adding package:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add the package. Try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Create New Tour Package
          </h1>
          <p className="text-gray-600 text-lg">Design amazing travel experiences for your customers</p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <FileText className="w-6 h-6" />
              Package Details
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="p-8 space-y-8">
              {/* Package Name */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Package className="w-4 h-4 text-blue-600" />
                  Package Name<span className="text-red-500">*</span>
                </label>
                <input
                  name="packageName"
                  type="text"
                  required
                  placeholder="e.g., Magical Sajek Valley Adventure"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {/* Location */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <MapPin className="w-4 h-4 text-green-600" />
                  Destination Location<span className="text-red-500">*</span>
                </label>
                <input
                  name="location"
                  type="text"
                  required
                  placeholder="e.g., Sajek Valley, Chittagong, Bangladesh"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
                />
              </div>

              {/* Price */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  Package Price (per person)<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input
                    name="price"
                    type="number"
                    required
                    placeholder="10000"
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                  />
                </div>
              </div>

              {/* Gallery Images */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <Camera className="w-4 h-4 text-purple-600" />
                  Gallery Images<span className="text-red-500">*</span>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Min 4 photos</span>
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700"
                  >
                    <Camera className="w-4 h-4" />
                    Choose Images
                  </label>
                  <p className="text-gray-500 text-sm mt-2">Upload high-quality images (JPG, PNG)</p>
                </div>

                {images.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">
                        {images.length} image{images.length > 1 ? "s" : ""} selected
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {images.map((file, i) => (
                        <div key={i} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${i + 1}`}
                            className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* About the Tour */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                  <FileText className="w-4 h-4 text-orange-600" />
                  About the Tour Package<span className="text-red-500">*</span>
                </label>
                <textarea
                  name="about"
                  required
                  rows={6}
                  placeholder="Write compelling paragraphs describing your tour package..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 resize-none"
                />
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Write detailed descriptions matching your uploaded images
                </p>
              </div>

              {/* Tour Plan */}
              <div className="group">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-4">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  Day-wise Tour Itinerary<span className="text-red-500">*</span>
                </label>

                <div className="space-y-4">
                  {tourPlan.map((item, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <input
                          type="text"
                          placeholder={`Day ${index + 1} - Morning`}
                          value={item.day}
                          onChange={(e) =>
                            handleTourPlanChange(index, "day", e.target.value)
                          }
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                        {tourPlan.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDayPlan(index)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            ×
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Describe activities, destinations, meals, and experiences for this day..."
                        value={item.plan}
                        onChange={(e) =>
                          handleTourPlanChange(index, "plan", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addDayPlan}
                  className="mt-4 inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-4 py-2 rounded-lg font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Another Day
                </button>
              </div>
            </div>

            {/* Submit Button */}
            {/* <div className="p-8 pt-6 border-t border-gray-200 bg-gray-50">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <Package className="w-5 h-5" />
              Create Tour Package
            </button>
          </div> */}

            <div className="p-8 pt-6 border-t border-gray-200 bg-gray-50">
              <button
                type="submit"
                disabled={uploading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                {uploading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Package...
                  </>
                ) : (
                  <>
                    <Package className="w-5 h-5" />
                    Create Tour Package
                  </>
                )}
              </button>
            </div>


          </form>
        </div>

        {/* Admin Tips */}
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-amber-800">Admin Tips for Best Results</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-4 border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <Camera className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-800">Photography Tips</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Upload at least 4 high-quality images</li>
                <li>• Include landscape, activity, food & accommodation photos</li>
                <li>• Use bright, clear images (min 1200px width)</li>
                <li>• Show diverse aspects of the destination</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4 border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-800">Content Writing</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Write 4 engaging paragraphs in "About" section</li>
                <li>• Match content with your uploaded images</li>
                <li>• Include unique selling points</li>
                <li>• Mention included services & amenities</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4 border border-amber-100">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <h4 className="font-semibold text-gray-800">Duration & Planning</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Clearly mention trip duration (e.g., "3 Days 2 Nights")</li>
                <li>• Plan realistic daily itineraries</li>
                <li>• Include buffer time for travel & rest</li>
                <li>• Balance activities with relaxation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
