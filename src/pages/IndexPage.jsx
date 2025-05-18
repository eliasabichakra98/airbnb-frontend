import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    const [averagePrice, setAveragePrice] = useState(0);
    const [featuredPlaces, setFeaturedPlaces] = useState([]);
    const [popularPlaces, setPopularPlaces] = useState([]);

    useEffect(() => {
        axios.get('/places').then(response => setPlaces(response.data));
        axios.get('/average-price').then(response => setAveragePrice(response.data.toFixed(2)));
        axios.get('/places-with-perks').then(response => setFeaturedPlaces(response.data));
        axios.get('/popular-places').then(response => setPopularPlaces(response.data));
    }, []);

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-blue-800 mb-4">
                    Discover Amazing Places
                </h1>
                <div className="text-xl text-blue-600 mb-6">
                    Average price: ${averagePrice}/night
                </div>
                <Link
                    to="/popular-places"
                    className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full 
                    hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                    </svg>
                    View Popular Listings
                </Link>
            </div>

            {/* Places Grid */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {places.map(place => (
                    <Link
                        to={'/place/' + place._id}
                        key={place._id}
                        className="group bg-white rounded-2xl shadow-md hover:shadow-xl 
                        transition-shadow duration-300 overflow-hidden"
                    >
                        <div className="relative aspect-square">
                            {place.photos?.[0] && (
                                <img
                                    className="w-full h-full object-cover"
                                    src={`http://localhost:4000/uploads/${place.photos[0].replace(/^.*[\\/]/, '')}`}
                                    alt={place.title}
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent" />
                        </div>
                        <div className="p-4">
                            <h2 className="font-bold text-lg text-gray-800 truncate mb-1">
                                {place.title}
                            </h2>
                            <p className="text-sm text-gray-600 truncate mb-2">
                                {place.address}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-blue-600">
                                    ${place.price}
                                </span>
                                <span className="text-sm text-gray-500">
                                    per night
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}