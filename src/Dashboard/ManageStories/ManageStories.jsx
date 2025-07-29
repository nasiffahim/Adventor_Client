import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext";
import { 
  Eye, 
  Edit3, 
  Trash2, 
  BookOpen, 
  Calendar,
  User,
  Plus,
  Image
} from "lucide-react";

export default function ManageStories() {
  const { user } = useContext(AuthContext);
  const stories = useLoaderData();
  const navigate = useNavigate();

  const userStories = stories.filter((story) => story?.email === user?.email);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This story will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      confirmButtonRadius: "8px",
      cancelButtonRadius: "8px",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(
          `https://tourism-management-system-server-dusky.vercel.app/stories/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();

        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your story has been deleted.",
            icon: "success",
            confirmButtonColor: "#10b981",
            confirmButtonRadius: "8px",
          });
          window.location.reload();
        }
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: "Something went wrong!",
          icon: "error",
          confirmButtonColor: "#ef4444",
          confirmButtonRadius: "8px",
        });
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            My Stories
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and organize your creative stories
          </p>
          
          {/* Stats Bar */}
          <div className="mt-6 inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md">
            <User className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-gray-700 font-medium">
              {userStories.length} {userStories.length === 1 ? 'Story' : 'Stories'}
            </span>
          </div>
        </div>

        {userStories.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Stories Yet
              </h3>
              <p className="text-gray-500 mb-6">
                You haven't added any stories yet. Start creating your first story!
              </p>
              <button
                onClick={() => navigate('/dashboard/add-stories')}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Story
              </button>
            </div>
          </div>
        ) : (
          /* Stories Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userStories.map((story) => (
              <div
                key={story._id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col border border-gray-100"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  {story.images?.length > 0 ? (
                    <img
                      src={story.images[0]}
                      alt="Story Cover"
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <Image className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                      {story.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {story.text}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center text-xs text-gray-500 mb-4 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>
                        {story.createdAt 
                          ? new Date(story.createdAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric' 
                            })
                          : 'Recently'
                        }
                      </span>
                    </div>
                    {story.images?.length > 0 && (
                      <div className="flex items-center">
                        <Image className="w-3 h-3 mr-1" />
                        <span>{story.images.length} image{story.images.length !== 1 ? 's' : ''}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => navigate(`/dashboard/story-details/${story._id}`)}
                      className="flex items-center justify-center px-3 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md group/btn"
                      title="View Story"
                    >
                      <Eye className="w-4 h-4 mr-1 group-hover/btn:scale-110 transition-transform" />
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/dashboard/edit-story/${story._id}`)}
                      className="flex items-center justify-center px-3 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md group/btn"
                      title="Edit Story"
                    >
                      <Edit3 className="w-4 h-4 mr-1 group-hover/btn:scale-110 transition-transform" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(story._id)}
                      className="flex items-center justify-center px-3 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md group/btn"
                      title="Delete Story"
                    >
                      <Trash2 className="w-4 h-4 mr-1 group-hover/btn:scale-110 transition-transform" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Story Button (Fixed Position) */}
        {/* {userStories.length > 0 && (
          <button
            onClick={() => navigate('/dashboard/add-story')}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1 z-50"
            title="Add New Story"
          >
            <Plus className="w-6 h-6" />
          </button>
        )} */}
      </div>
    </div>
  );
}