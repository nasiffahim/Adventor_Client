import React, { useState, useContext } from "react";
import { useNavigate, useParams, useLoaderData } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext";
import { 
  Edit3, 
  Type, 
  FileText, 
  Image, 
  Upload, 
  X, 
  Save, 
  Loader2,
  Plus,
  Trash2,
  Eye
} from "lucide-react";

export default function EditStories() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const stories = useLoaderData();
  const navigate = useNavigate();

  const story = stories.find((story) => story._id === id);

  const [title, setTitle] = useState(story?.title || "");
  const [text, setText] = useState(story?.text || "");
  const [imagesToAdd, setImagesToAdd] = useState([]);
  const [imagesToRemove, setImagesToRemove] = useState([]);
  const [existingImages, setExistingImages] = useState(story?.images || []);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    setImagesToAdd(Array.from(e.target.files));
  };

  const handleRemoveExistingImage = (url) => {
    setImagesToRemove((prev) => [...prev, url]);
    setExistingImages((prev) => prev.filter((img) => img !== url));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("email", user?.email);

    // Add new images to form data
    imagesToAdd.forEach((img) => {
      formData.append("images", img);
    });

    // Add images to remove to form data
    imagesToRemove.forEach((url) => {
      formData.append("removeImages", url);
    });

    // Debug logs
    console.log("Images to add:", imagesToAdd);
    console.log("Images to remove:", imagesToRemove);
    console.log("Existing images:", existingImages);

    try {
      const response = await axios.patch(`https://tourism-management-system-server-dusky.vercel.app/stories/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Update response:", response.data); // For debugging

      Swal.fire("Success", "Story updated successfully!", "success");
      navigate("/dashboard/my-stories");
    } catch (err) {
      console.error("Update error:", err);
      console.error("Error details:", err.response?.data);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setUploading(false);
    }
  };

  // Clear file input after adding images (optional improvement)
  const handleImageChangeWithClear = (e) => {
    setImagesToAdd(Array.from(e.target.files));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
            <Edit3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Edit Your Story</h1>
          <p className="text-gray-600">Update your story details and manage images</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 space-y-8"
            onSubmit={handleUpdate}>
            
            {/* Title Section */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                <Type className="w-5 h-5 text-blue-500" />
                Story Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter your story title..."
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
              />
            </div>

            {/* Story Text Section */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-3">
                <FileText className="w-5 h-5 text-green-500" />
                Story Content
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows="8"
                required
                placeholder="Write your story here..."
                className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
              />
            </div>

            {/* Existing Images Section */}
            {existingImages.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-purple-500" />
                  <h3 className="text-lg font-semibold text-gray-700">Existing Images</h3>
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-full text-sm font-medium">
                    {existingImages.length} image{existingImages.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {existingImages.map((img, i) => (
                    <div key={i} className="relative group">
                      <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all duration-200">
                        <img
                          src={img}
                          alt="Existing"
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        <div className="absolute inset-0 bg-black/10 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200" />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveExistingImage(img)}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-200"
                        title="Remove Image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload New Images Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="w-5 h-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-700">Add New Images</h3>
              </div>
              
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChangeWithClear}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="image-upload"
                />
                <label 
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-orange-300 rounded-xl cursor-pointer bg-orange-50 hover:bg-orange-100 transition-colors duration-200"
                >
                  <Plus className="w-8 h-8 text-orange-500 mb-2" />
                  <span className="text-orange-600 font-medium">Click to upload images</span>
                  <span className="text-orange-500 text-sm">PNG, JPG, JPEG supported</span>
                </label>
              </div>

              {/* Preview New Images */}
              {imagesToAdd.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-600">
                      New images to be added ({imagesToAdd.length})
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {imagesToAdd.map((file, i) => (
                      <div key={i} className="relative">
                        <div className="relative overflow-hidden rounded-xl border-2 border-green-200">
                          <img
                            src={URL.createObjectURL(file)}
                            alt="New Preview"
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-green-500 text-white rounded-full px-2 py-1 text-xs font-semibold flex items-center gap-1">
                            <Plus className="w-3 h-3" />
                            New
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/dashboard/my-stories")}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              
              <button
                type="button"
                onClick={handleUpdate}
                disabled={uploading}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg cursor-pointer"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Updating Story...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Update Story
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tips Card */}
        <div className="mt-8 bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Image className="w-4 h-4 text-blue-500" />
            Image Management Tips
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• You can upload multiple images at once</li>
            <li>• Click the × button on existing images to remove them</li>
            <li>• Supported formats: PNG, JPG, JPEG</li>
            <li>• Images will be processed when you update the story</li>
          </ul>
        </div>
      </div>
    </div>
  );
}