import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PlaceImg from "../PlaceImg";

export default function PopularPlacesPage() {
    const [popularPlaces, setPopularPlaces] = useState([]);
    const [averagePrice, setAveragePrice] = useState(0);
    const [mostBookedThisMonth, setMostBookedThisMonth] = useState([]);
    const [activeHosts, setActiveHosts] = useState([]);


    useEffect(() => {
        axios.get('/average-price').then(response => {
            setAveragePrice(response.data.toFixed(2));
        });

        axios.get('/popular-places').then(response => {
            console.log("Popular Places:", response.data); // 👈 Add this
            setPopularPlaces(response.data);
        });

        axios.get('/most-booked-this-month').then(response => {
            setMostBookedThisMonth(response.data);
        });

        axios.get('/most-active-hosts').then(response => {
            setActiveHosts(response.data);
        });

    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


                {/* Most Booked This Month Section */}
                {mostBookedThisMonth.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                            <h2 className="text-3xl font-bold text-blue-600 text-center">
                                Hot This Month
                            </h2>
                        </div>
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {mostBookedThisMonth.map(place => (
                                <div key={place._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <Link to={`/place/${place._id}`}>
                                        <PlaceImg place={place} className="aspect-square object-cover" />
                                    </Link>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-semibold">{place.title}</h3>
                                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                                                ${place.price}/night
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-blue-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                                                </svg>
                                                <span>{place.bookingsCount} bookings</span>
                                            </div>
                                            <span className="text-gray-600">Host: {place.owner?.name}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeHosts.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <h2 className="text-3xl font-bold text-blue-600 text-center">
                                Top Hosts
                            </h2>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {activeHosts.map((host, index) => (
                                <div key={host._id} className="bg-white rounded-xl shadow-lg p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                                            <span className="text-xl font-bold">#{index + 1}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">{host.name}</h3>
                                            <p className="text-sm text-gray-600">{host.email}</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div className="bg-blue-50 rounded-lg p-3">
                                            <div className="text-blue-600 font-bold text-xl">{host.listingsCount}</div>
                                            <div className="text-sm text-gray-600">Listings</div>
                                        </div>
                                        <div className="bg-blue-50 rounded-lg p-3">
                                            <div className="text-blue-600 font-bold text-xl">{host.bookingsCount}</div>
                                            <div className="text-sm text-gray-600">Bookings</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {/* Popular Places Section */}
                {popularPlaces.length > 0 && (
                    <div className="mb-12">
                        <div className="flex items-center justify-center mb-6">
                            <svg className="w-8 h-8 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            <h2 className="text-3xl font-bold text-blue-600 text-center">
                                All-Time Favorites
                            </h2>
                        </div>
                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {popularPlaces.map(place => (
                                <div key={place._id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <Link to={`/place/${place._id}`}>
                                        <PlaceImg place={place} className="aspect-square object-cover" />
                                    </Link>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-semibold">{place.title}</h3>
                                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                                                ${place.price}/night
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <div className="flex items-center">
                                                <svg className="w-5 h-5 text-blue-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span>{place.bookingsCount} bookings</span>
                                            </div>
                                            <span className="text-gray-600">Host: {place.owner?.name}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}