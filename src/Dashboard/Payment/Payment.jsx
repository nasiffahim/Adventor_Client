import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';
import PaymentForm from './PaymentForm';

// Debug the environment variable
console.log('Stripe Key:', import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
    const { bookingId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get booking data from location state (passed from previous page)
    const bookingData = location.state?.bookingData;
    const amount = location.state?.amount || bookingData?.cost;

    // Handle case where payment data is missing
    if (!bookingId || !amount) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Invalid Payment Request
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Missing payment information. Please try again from your bookings page.
                    </p>
                    <button
                        onClick={() => navigate('/my-bookings')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                        Back to Bookings
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="py-8">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Bookings
                        </button>
                        
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Complete Payment
                        </h1>
                        <p className="text-gray-600">
                            Secure payment processing powered by Stripe
                        </p>
                    </div>

                    {/* Payment Summary */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6 border">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Payment Summary
                        </h2>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-600">Booking ID:</span>
                                <span className="font-medium text-gray-900">#{bookingId.slice(-8)}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-600">Tour Package:</span>
                                <span className="font-medium text-gray-900">
                                    {bookingData?.tourName || 'Tour Booking'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center py-3 text-lg font-semibold">
                                <span className="text-gray-900">Total Amount:</span>
                                <span className="text-2xl text-blue-600">${amount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stripe Elements Provider */}
                    <Elements stripe={stripePromise}>
                        <PaymentForm 
                            amount={amount} 
                            bookingId={bookingId}
                            bookingData={bookingData}
                        />
                    </Elements>

                    {/* Security Notice */}
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex">
                            <svg className="w-5 h-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <div>
                                <h3 className="text-sm font-semibold text-blue-800">Secure Payment</h3>
                                <p className="text-sm text-blue-600">
                                    Your payment is protected by industry-standard encryption. We never store your card details.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;