// BookingModal.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const BookingModal = ({ isOpen, onClose, bookingData, onConfirmBooking }) => {
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isOpen || !bookingData) return null;

  const handleConfirmBooking = async () => {
    setIsConfirming(true);
    try {
      // Save the booking data
      const response = await axios.post('https://tourism-management-system-server-dusky.vercel.app/bookings', {
        packageName: bookingData.packageName,
        touristName: bookingData.touristName,
        touristEmail: bookingData.touristEmail,
        touristImage: bookingData.touristImage,
        price: bookingData.price,
        tourDate: bookingData.tourDate,
        selectedGuide: bookingData.selectedGuide
      });

      if (response.data.success) {
        // Call the parent callback with the saved booking data
        onConfirmBooking(response.data.data);
        
        // Close the modal first
        onClose();
        
        // Redirect to my bookings page
        navigate('/dashboard/my-bookings');
      } else {
        throw new Error(response.data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert(error.response?.data?.message || 'Failed to create booking. Please try again.');
    } finally {
      setIsConfirming(false);
    }
  };

  const handleMyBookings = () => {
    onClose();
    navigate('/dashboard/my-bookings');
  };

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl relative">
        {/* Booking Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-blue-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
              />
            </svg>
          </div>
        </div>

        {/* Modal Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Confirm your Booking
          </h2>
          
          <p className="text-gray-600 mb-6">
            Please review your booking details and confirm to proceed.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Package:</strong> {bookingData.packageName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Tourist:</strong> {bookingData.touristName}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Price:</strong> ${bookingData.price}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Tour Date:</strong> {new Date(bookingData.tourDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Tour Guide:</strong> {bookingData.selectedGuide?.name || 'Not selected'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={handleConfirmBooking}
              disabled={isConfirming}
              className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors duration-200 ${
                isConfirming
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isConfirming ? 'Confirming...' : 'Confirm Booking'}
            </button>
            
            <button
              onClick={onClose}
              disabled={isConfirming}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isConfirming}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BookingModal;