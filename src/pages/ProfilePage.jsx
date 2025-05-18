import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return <div className="flex justify-center items-center min-h-screen text-blue-600 text-lg">Loading...</div>;
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="min-h-screen bg-blue-50">
            <AccountNav />
            {subpage === 'profile' && (
                <div className="flex flex-col items-center justify-center mt-10 p-6 bg-white shadow-lg rounded-xl max-w-lg mx-auto border border-blue-200">
                    <h2 className="text-xl font-semibold text-blue-600">Welcome, {user.name}!</h2>
                    <p className="text-gray-600">Email: {user.email}</p>
                    <button onClick={logout} className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Logout</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}
