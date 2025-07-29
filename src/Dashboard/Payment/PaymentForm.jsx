import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios"; // or use your useAxiosSecure hook
import Swal from "sweetalert2";

// Card element styling
const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
      iconColor: "#9e2146",
    },
  },
  hidePostalCode: false,
};

const PaymentForm = ({ amount, bookingId, bookingData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [loading, setLoading] = useState(true);

  // Create payment intent when component mounts
  // useEffect(() => {
  //     const createPaymentIntent = async () => {
  //         try {
  //             console.log('Creating payment intent for:', { amount, bookingId });

  //             // Match your backend endpoint exactly
  //             const response = await axios.post('https://tourism-management-system-server-dusky.vercel.app/payment/create-payment-intent', {
  //                 amount: amount, // Your backend expects the actual amount, not cents
  //                 bookingId: bookingId,
  //                 currency: 'usd'
  //             });

  //             console.log('Payment intent response:', response.data);

  //             if (response.data.success && response.data.clientSecret) {
  //                 setClientSecret(response.data.clientSecret);
  //             } else {
  //                 setError('Failed to initialize payment - no client secret received');
  //             }
  //         } catch (err) {
  //             console.error('Error creating payment intent:', err);
  //             console.error('Error details:', err.response?.data);
  //             setError(err.response?.data?.message || err.message || 'Failed to initialize payment');
  //         }
  //     };

  //     if (amount && bookingId) {
  //         createPaymentIntent();
  //     }
  // }, [amount, bookingId]);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setLoading(true);

        console.log("=== FRONTEND PAYMENT INTENT DEBUG ===");
        console.log("Creating payment intent for:", { amount, bookingId });
        console.log("Stripe instance:", stripe ? "Loaded" : "Not loaded");

        const response = await axios.post(
          "https://tourism-management-system-server-dusky.vercel.app/payment/create-payment-intent",
          {
            amount: amount,
            bookingId: bookingId,
            currency: "usd",
          }
        );

        console.log("✅ Backend response:", response.data);
        console.log(
          "Client secret received:",
          response.data.clientSecret ? "YES" : "NO"
        );

        if (response.data.success && response.data.clientSecret) {
          setClientSecret(response.data.clientSecret);
          console.log("✅ Client secret set successfully");
        } else {
          console.log("❌ No client secret in response");
          setError("Failed to initialize payment - no client secret received");
        }
      } catch (err) {
        console.error("❌ Error creating payment intent:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);

        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to initialize payment"
        );
      } finally {
        setLoading(false);
        console.log("=== END FRONTEND DEBUG ===");
      }
    };

    if (amount && bookingId) {
      createPaymentIntent();
    }
  }, [amount, bookingId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret || processing || succeeded) {
      return;
    }

    setProcessing(true);
    setError("");

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card element not found");
      setProcessing(false);
      return;
    }

    // Step 1: Create payment method
    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: bookingData?.touristName || "Customer",
          email: bookingData?.touristEmail || "",
        },
      });

    if (paymentMethodError) {
      setError(paymentMethodError.message);
      setProcessing(false);
      return;
    }

    console.log("Payment method created:", paymentMethod);

    // Step 2: Confirm payment with Stripe
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: bookingData?.touristName || "Customer",
            email: bookingData?.touristEmail || "",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment succeeded!", paymentIntent);

      try {
        // Step 3: Confirm payment on backend and update booking status
        const confirmResponse = await axios.post(
          "https://tourism-management-system-server-dusky.vercel.app/payment/confirm-payment",
          {
            paymentIntentId: paymentIntent.id,
            bookingId: bookingId,
          }
        );

        console.log("Confirm payment response:", confirmResponse.data);

        if (confirmResponse.data.success) {
          setSucceeded(true);
          setProcessing(false);

          // Show success message with transaction ID
          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `
                            <p>Your tour booking payment has been processed successfully!</p>
                            <p><strong>Transaction ID:</strong> <code>${paymentIntent.id}</code></p>
                        `,
            confirmButtonText: "View My Bookings",
          });

          // Redirect to bookings page
          navigate("/dashboard/my-bookings", {
            state: {
              message: "Payment successful! Your booking is now confirmed.",
              type: "success",
            },
          });
        } else {
          setError(
            "Payment succeeded but failed to update booking. Please contact support."
          );
          setProcessing(false);
        }
      } catch (err) {
        console.error("Error confirming payment:", err);
        setError(
          "Payment succeeded but failed to update booking. Please contact support."
        );
        setProcessing(false);
      }
    }
  };

  // Success state
  if (succeeded) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          Payment Successful!
        </h3>
        <p className="text-green-600 mb-4">
          Your tour booking payment has been processed successfully. Your
          booking is now confirmed!
        </p>
        <p className="text-sm text-green-500">
          Redirecting to your bookings...
        </p>
      </div>
    );
  }

  if (loading || !clientSecret) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-sm text-gray-500">
            Preparing secure payment form...
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <svg
            className="w-5 h-5 mr-2 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          Payment Details
        </h3>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Information
          </label>
          <div className="border border-gray-300 rounded-md p-4 bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <CardElement options={cardElementOptions} />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Your payment information is secure and encrypted.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <svg
                className="w-5 h-5 text-red-400 mr-2 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || processing || !clientSecret || succeeded}
          className={`w-full py-3 px-4 rounded-md font-medium text-white transition-colors duration-200 ${
            processing || !stripe || !clientSecret || succeeded
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          }`}
        >
          {processing ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing Payment...
            </div>
          ) : (
            `Pay $${amount}`
          )}
        </button>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Secured by <span className="font-semibold">Stripe</span> • Your card
            details are never stored
          </p>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
