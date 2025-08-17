import axios from "axios";
import { useEffect, useState, use } from "react";
import {
  useLoaderData,
  useParams,
  useNavigate,
  useLocation,
} from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../../Components/Navbar/Navbar";
import { AuthContext } from "../../Provider/AuthContext";
import BookingModal from "./BookingModal";
import { ArrowRightIcon } from "lucide-react";

// Import icons (you can replace these with your preferred icon library)
import {
  CalendarIcon,
  UserIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  PhotoIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export default function TripDetails() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const allUsers = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  // Parse URL parameters
  const urlParams = new URLSearchParams(location.search);
  const discountedPrice = urlParams.get("discountedPrice");
  const discount = urlParams.get("discount");
  const isSpecialOffer = urlParams.get("isSpecialOffer");

  // Get current user from Firebase Auth Context
  const { user } = use(AuthContext);

  // Booking form state
  const [bookingData, setBookingData] = useState({
    packageName: "",
    touristName: user?.displayName || "",
    touristEmail: user?.email || "",
    touristImage: user?.photoURL || "",
    price: "",
    tourDate: null,
    selectedGuide: null,
  });

  // Filter tour guides from all users
  const tourGuides =
    allUsers?.filter((user) => user.role === "tour-guide") || [];

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(location.search);
    const discountedPrice = urlParams.get("discountedPrice");
    const isSpecialOffer = urlParams.get("isSpecialOffer");

    axios
      .get(
        `https://tourism-management-system-server-dusky.vercel.app/packages/${id}`
      )
      .then((response) => {
        setTrip(response.data);
        setLoading(false);

        // Set package name and price in booking form
        setBookingData((prev) => ({
          ...prev,
          packageName: response.data.location,
          // Use discounted price if coming from special offer, otherwise original price
          price:
            isSpecialOffer === "true"
              ? discountedPrice
              : response.data.price || "",
        }));
      })
      .catch((error) => {
        console.error("Error fetching package:", error);
        setLoading(false);
      });
  }, [id, location.search]); // Add location.search to dependencies

  // Update booking data when user data changes
  useEffect(() => {
    if (user) {
      setBookingData((prev) => ({
        ...prev,
        touristName: user.displayName || "",
        touristEmail: user.email || "",
        touristImage: user.photoURL || "",
      }));
    }
  }, [user]);

  const handleGuideClick = (guideId) => {
    navigate(`/guide/${guideId}`);
  };

  const handleLogin = () => {
    navigate("/auth/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "selectedGuide") {
      // Find the selected guide object
      const selectedGuide = tourGuides.find((guide) => guide._id === value);
      setBookingData((prev) => ({
        ...prev,
        selectedGuide: selectedGuide || null,
      }));
    } else {
      setBookingData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date) => {
    setBookingData((prev) => ({
      ...prev,
      tourDate: date,
    }));
  };

  const handleBookNow = (e) => {
    e.preventDefault();

    // Validation
    if (!bookingData.tourDate) {
      alert("Please select a tour date");
      return;
    }

    if (!bookingData.selectedGuide) {
      alert("Please select a tour guide");
      return;
    }

    if (!bookingData.price) {
      alert("Please enter the price");
      return;
    }

    // Check if user is authenticated
    if (!user) {
      alert("Please log in to make a booking");
      return;
    }

    // Show confirmation modal
    setShowConfirmModal(true);
  };

  const handleConfirmBooking = (savedBookingData) => {
    // Hide confirm modal and show success modal
    setShowConfirmModal(false);
    setConfirmedBooking(savedBookingData);
    setShowSuccessModal(true);

    // Reset form
    setBookingData((prev) => ({
      ...prev,
      tourDate: null,
      selectedGuide: null,
    }));
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setConfirmedBooking(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            Loading amazing destinations...
          </p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 relative overflow-hidden">
  {/* Background effects */}
  {/* <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div> */}
  <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
  
  <div className="text-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl">
    <div className="bg-red-500/20 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
      <MapPinIcon className="h-10 w-10 text-red-400" />
    </div>
    <h1 className="text-2xl font-bold text-white mb-2">Package Not Found</h1>
    <p className="text-gray-300 mb-6">The package you're looking for could not be located.</p>
    <button 
      onClick={() => window.location.href = '/'}
      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto"
    >
      <HomeIcon className="h-4 w-4" />
      Go Home
    </button>
  </div>
</div>
    );
  }

  const aboutSections = trip.about.split("\r\n\r\n");
  const images = trip.images || [];

  return (
    <div className="text-gray-800 font-anton bg-gray-50">
      <div className="backdrop-blur-md bg-black/20 shadow-lg">
        <div className="w-10/12 mx-auto">
          <Navbar />
        </div>
      </div>

      {/* Enhanced Hero Section */}
      <div className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ backgroundImage: `url(${images[0] || ""})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
        <div className="relative z-10 text-white text-center px-4">
          <div className="mb-4">
            <MapPinIcon className="h-12 w-12 mx-auto mb-2 text-white/80" />
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-wide">
            {trip.location.toUpperCase()}
          </h2>
          <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Enhanced Short Intro Description */}
      {aboutSections[0] && (
        <div className="bg-white shadow-sm">
          <div className="py-20 max-w-5xl mx-auto px-6">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
                Discover {trip.location}
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-8 rounded-full"></div>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-center text-gray-700 font-light">
              {aboutSections[0]}
            </p>
          </div>
        </div>
      )}

      {/* Enhanced Alternating Sections */}
      <div className="bg-white">
        {aboutSections.slice(1).map((text, index) => {
          const imageIndex = index + 1;
          const isReversed = index % 2 !== 0;

          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row ${
                isReversed ? "md:flex-row-reverse" : ""
              } items-center shadow-sm`}
            >
              {images[imageIndex] && (
                <div className="w-full md:w-1/2 relative overflow-hidden">
                  <img
                    src={images[imageIndex]}
                    alt={`Tour Section Image ${imageIndex}`}
                    className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}
              <div className="w-full md:w-1/2 text-lg leading-relaxed text-justify px-8 md:px-16 py-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 font-light leading-8">{text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Additional Gallery */}
      {images.length > 4 && (
        <div className="py-16 px-6 md:px-20 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Gallery Highlights
              </h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.slice(4).map((img, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={img}
                    alt={`Extra Tour Image ${idx + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Tour Plan Section */}
      <div className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <ClockIcon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Tour Itinerary
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4">
            {trip.tourPlan?.map((day, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 border-l-4 border-blue-600 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                      {day.day}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{day.plan}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Guide Selection Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 py-16">
        <div className="max-w-6xl mx-auto text-center px-6">
          <UserIcon className="h-12 w-12 mx-auto mb-4 text-white" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Choose Your Expert Guide
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Select from our experienced local guides to make your journey
            unforgettable
          </p>
        </div>
      </div>

      {/* Enhanced Interactive Marquee Section */}
      <div className="bg-white py-16">
        <div className="marquee-container overflow-hidden px-6 md:px-20">
          <div
            className={`marquee-wrapper ${isPaused ? "paused" : ""}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {[...tourGuides, ...tourGuides].map((guide, index) => (
              <div
                key={`${guide._id}-${index}`}
                className="flex flex-col items-center flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 mx-8"
                onClick={() => handleGuideClick(guide._id)}
              >
                <div className="w-[220px] h-[220px] rounded-full border-4 border-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 shadow-xl overflow-hidden relative group">
                  <img
                    src={guide.photo}
                    alt={guide.name}
                    className="w-full h-full object-cover object-center transition-all duration-500 group-hover:brightness-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
                    <div className="text-center">
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="text-white font-medium text-sm">
                        View Profile
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                    {guide.name}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">Expert Guide</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <>
        {user ? (
          <>
            {/* Enhanced Booking Form Section */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-6 md:px-20">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <CheckCircleIcon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Book Your Adventure
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Complete the form below to secure your spot on this
                    incredible journey
                  </p>
                  <div className="w-16 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
                </div>

                {isSpecialOffer === "true" && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
                    🎉 Special Offer Applied! You're saving {discount} on this
                    package!
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                  <form onSubmit={handleBookNow} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Package Name */}
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <MapPinIcon className="h-5 w-5 mr-2 text-blue-600" />
                          Package Name
                        </label>
                        <input
                          type="text"
                          name="packageName"
                          value={bookingData.packageName}
                          readOnly
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed font-medium"
                        />
                      </div>

                      {/* Tourist Name */}
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <UserIcon className="h-5 w-5 mr-2 text-blue-600" />
                          Tourist Name
                        </label>
                        <input
                          type="text"
                          name="touristName"
                          value={bookingData.touristName}
                          readOnly
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed font-medium"
                        />
                      </div>

                      {/* Tourist Email */}
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-600" />
                          Tourist Email
                        </label>
                        <input
                          type="email"
                          name="touristEmail"
                          value={bookingData.touristEmail}
                          readOnly
                          className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-600 cursor-not-allowed font-medium"
                        />
                      </div>

                      {/* Price */}
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <CurrencyDollarIcon className="h-5 w-5 mr-2 text-blue-600" />
                          Price
                        </label>
                        <input
                          type="text"
                          name="price"
                          value={bookingData.price}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
                          placeholder="Enter price"
                          required
                        />
                      </div>

                      {/* Tour Date */}
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <CalendarIcon className="h-5 w-5 mr-2 text-blue-600" />
                          Tour Date
                        </label>
                        <DatePicker
                          selected={bookingData.tourDate}
                          onChange={handleDateChange}
                          minDate={new Date()}
                          dateFormat="MMMM d, yyyy"
                          className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
                          placeholderText="Select tour date"
                          required
                        />
                      </div>

                      {/* Tour Guide Selection */}
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <UserIcon className="h-5 w-5 mr-2 text-blue-600" />
                          Tour Guide
                        </label>
                        <select
                          name="selectedGuide"
                          value={bookingData.selectedGuide?._id || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
                          required
                        >
                          <option value="">Select a tour guide</option>
                          {tourGuides.map((guide) => (
                            <option key={guide._id} value={guide._id}>
                              {guide.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Tourist Image */}
                      <div className="md:col-span-2 space-y-2">
                        <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                          <PhotoIcon className="h-5 w-5 mr-2 text-blue-600" />
                          Tourist Image
                        </label>
                        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                          <input
                            type="text"
                            name="touristImage"
                            value={bookingData.touristImage}
                            readOnly
                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-600 cursor-not-allowed font-medium"
                          />
                          {bookingData.touristImage && (
                            <div className="flex-shrink-0">
                              <img
                                src={bookingData.touristImage}
                                alt="Tourist"
                                className="w-16 h-16 rounded-full object-cover border-4 border-blue-200 shadow-md"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Book Now Button */}
                    <div className="text-center pt-8">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-400 text-white font-bold py-5 px-16 rounded-xl text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1"
                      >
                        <span className="flex items-center justify-center">
                          <CheckCircleIcon className="h-6 w-6 mr-3" />
                          Book Now
                        </span>
                      </button>
                      <p className="text-sm text-gray-500 mt-4">
                        Secure booking • Instant confirmation • 24/7 support
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20 px-6 md:px-20 min-h-screen flex items-center justify-center">
              <div className="max-w-md mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
                  {/* Heading */}
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Authentication Required
                  </h2>

                  {/* Message */}
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Please login to book this amazing trip and start your
                    adventure!
                  </p>

                  {/* Decorative Line */}
                  <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 mx-auto mb-8 rounded-full"></div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8 text-left">
                    <div className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-sm">Secure booking process</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-sm">Instant confirmation</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                      <span className="text-sm">24/7 customer support</span>
                    </div>
                  </div>

                  {/* Login Button */}
                  <button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-300 hover:from-emerald-700 hover:via-teal-700 hover:to-emerald-400 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 group"
                  >
                    <span className="flex items-center justify-center">
                      <UserIcon className="h-6 w-6 mr-3 group-hover:animate-pulse" />
                      Login to Continue
                      <ArrowRightIcon className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </>

      {/* Booking Confirmation Modal */}
      <BookingModal
        isOpen={showConfirmModal}
        onClose={handleCloseConfirmModal}
        bookingData={bookingData}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Add required CSS for marquee animation */}
      <style jsx>{`
        .marquee-wrapper {
          display: flex;
          animation: marquee 30s linear infinite;
        }

        .marquee-wrapper.paused {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-container {
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
