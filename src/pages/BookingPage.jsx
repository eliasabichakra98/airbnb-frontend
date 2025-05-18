import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return <p className="text-center text-blue-600">Loading booking details...</p>;
  }

  return (
    <div className="my-8 container mx-auto p-4">
      {/* Title and Address */}
      <h1 className="text-4xl font-bold text-blue-600 mb-4">{booking.place.title}</h1>
      <AddressLink className="my-2 block text-blue-500 underline">{booking.place.address}</AddressLink>

      {/* Booking Information */}
      <div className="bg-blue-100 p-6 my-6 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-lg">
        <div>
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Your Booking Information:</h2>
          <BookingDates booking={booking} className="text-blue-600" />
        </div>
        <div className="bg-blue-600 p-6 text-white rounded-2xl text-center shadow-md">
          <div className="text-lg font-medium">Total Price</div>
          <div className="text-4xl font-bold">${booking.price}</div>
        </div>
      </div>

      {/* Place Gallery */}
      <PlaceGallery place={booking.place} />

      {/* Extra Information */}
      <div className="bg-white p-8 rounded-lg shadow-md border-t mt-8">
        <h2 className="font-semibold text-2xl text-blue-600 mb-4">Extra Information</h2>
        <p className="text-sm text-gray-700 leading-6">{booking.place.extraInfo}</p>
      </div>

      {/* Rental Agreement PDF */}
      {booking.place.rentalAgreementPDF && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md border-t">
          <h3 className="text-xl font-semibold text-blue-600 mb-4">Rental Agreement</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-blue-600 text-lg">Rental Agreement (PDF)</span>
            </div>
            <a
              href={`${BASE_URL}/uploads/${booking.place.rentalAgreementPDF}`}
              target="_blank"
              rel="noreferrer"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              View PDF
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
