import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then(response => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return <div className="text-center text-blue-600">Loading place details...</div>;

  return (
    <div className="min-h-screen bg-blue-50 px-8 py-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">{place.title}</h1>
        <AddressLink className="text-blue-500 mb-4">{place.address}</AddressLink>

        {/* Gallery */}
        <PlaceGallery place={place} />

        <div className="mt-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          {/* Left Section - Description */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="font-semibold text-2xl text-blue-600 mb-4">Description</h2>
            <p className="text-gray-700 mb-4">{place.description}</p>
            <div className="text-gray-600">
              <p><strong>Check-in:</strong> {place.checkIn}</p>
              <p><strong>Check-out:</strong> {place.checkOut}</p>
              <p><strong>Max Guests:</strong> {place.maxGuests}</p>
            </div>
          </div>

          {/* Right Section - Booking Widget */}
          <div>
            <BookingWidget place={place} />
          </div>
        </div>

        {/* Extra Info Section */}
        <div className="bg-white p-8 rounded-lg shadow-md border-t mt-8">
          <h2 className="font-semibold text-2xl text-blue-600 mb-4">Extra Information</h2>
          <p className="text-sm text-gray-700 leading-6">{place.extraInfo}</p>
        </div>

        {/* Rental Agreement PDF Section */}
        {place.rentalAgreementPDF && (
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
                href={`${BASE_URL}/uploads/${place.rentalAgreementPDF}`}
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
    </div>
  );
}
