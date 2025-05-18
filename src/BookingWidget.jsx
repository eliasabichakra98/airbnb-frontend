import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    const response = await axios.post('/bookings', {
      checkIn, checkOut, numberOfGuests, name, phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="bg-white shadow-lg p-6 rounded-2xl">
      <div className="text-2xl text-center font-semibold text-blue-700">
        Price: ${place.price} / per night
      </div>
      <div className="border-t mt-4 pt-4">
        <div className="flex">
          <div className="py-3 px-4 w-full">
            <label className="block text-sm font-medium">Check in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={ev => setCheckIn(ev.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md"
            />
          </div>
          <div className="py-3 px-4 w-full border-l">
            <label className="block text-sm font-medium">Check out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={ev => setCheckOut(ev.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md"
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label className="block text-sm font-medium">Number of guests:</label>
          <input
            type="number"
            value={numberOfGuests}
            onChange={ev => setNumberOfGuests(ev.target.value)}
            className="w-full mt-1 px-4 py-2 border rounded-md"
          />
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label className="block text-sm font-medium">Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={ev => setName(ev.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md"
            />
            <label className="block text-sm font-medium mt-2">Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={ev => setPhone(ev.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-md"
            />
          </div>
        )}
      </div>
      <button
        onClick={bookThisPlace}
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-full mt-4 hover:bg-blue-700 transition-colors"
      >
        Book this place
        {numberOfNights > 0 && (
          <span className="ml-2">${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
}
