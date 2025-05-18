import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/user-places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-blue-50">
      <AccountNav />
      <h1 className="text-3xl font-semibold mb-6 text-blue-600 text-center mt-10">Your Places</h1>
      <div className="container mx-auto p-4">
        <div className="text-center mb-6">
          <Link className="inline-flex items-center gap-2 bg-blue-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-700 transition" to={'/account/places/new'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
            </svg>
            Add new place
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {places.map(place => (
            <Link to={`/account/places/${place._id}`} key={place._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition border border-blue-200">
              <div className="w-full h-40 bg-gray-300 rounded-lg overflow-hidden">
                <PlaceImg place={place} />
              </div>
              <div className="mt-3">
                <h2 className="text-lg font-semibold text-blue-600">{place.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{place.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
