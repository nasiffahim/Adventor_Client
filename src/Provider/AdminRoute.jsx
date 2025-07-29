import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";
import { Shield, ShieldX, Loader2, AlertTriangle } from "lucide-react";

export default function AdminRoute({ children }) {
  const { user, loading: authLoading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  const loading = authLoading || roleLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center items-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md mx-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
              <Shield className="h-6 w-6 text-blue-400 absolute top-3 left-3" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Verifying Access
          </h2>
          <p className="text-gray-600 mb-4">
            Please wait while we verify your permissions...
          </p>
          <div className="flex justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !user.email) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex flex-col justify-center items-center px-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-lg mx-4 border-t-4 border-red-500">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="bg-red-100 rounded-full p-4">
                <ShieldX className="h-12 w-12 text-red-600" />
              </div>
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
                <AlertTriangle className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-red-600 mb-3">
            Access Denied
          </h2>
          
          <div className="bg-red-50 rounded-lg p-4 mb-6">
            <p className="text-lg text-red-800 font-medium mb-2">
              Administrator Access Required
            </p>
            <p className="text-red-700">
              You don't have the necessary permissions to view this page. 
              Only administrators can access this area.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Go Back
            </button>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Return Home
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              If you believe this is an error, please contact your system administrator.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return children;
}