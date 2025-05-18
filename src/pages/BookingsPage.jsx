import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";
import AccountNav from "../AccountNav";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('/bookings').then(response => {
      setBookings(response.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-blue-50">
      <AccountNav />
      <h1 className="text-3xl font-semibold mb-6 text-blue-600 text-center mt-10">Your Bookings</h1>
      <div className="container mx-auto p-4">
        <div className="grid gap-6">
          {bookings?.length > 0 ? (
            bookings.map(booking => (
              <Link
                to={`/account/bookings/${booking._id}`}
                key={booking._id}
                className="flex flex-col md:flex-row items-center gap-4 bg-white shadow-md p-4 rounded-xl hover:shadow-lg transition border border-blue-600"
              >
                <div className="w-full md:w-48 flex-shrink-0">
                  <PlaceImg place={booking.place} className="rounded-lg border border-blue-600" />
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-blue-800">{booking.title}</h3>
                  <BookingDates booking={booking} className="text-blue-700 mt-2" />
                  <div className="flex items-center gap-2 mt-2 text-blue-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-blue-600"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                    <span className="text-lg font-medium">Total Price: ${booking.price}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-blue-600">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
