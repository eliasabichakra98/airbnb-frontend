import './App.css'
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from './Layout.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PlacesPage from './pages/PlacesPage.jsx';
import BookingsPage from './pages/BookingsPage.jsx';
import PlacesFormPage from './pages/PlacesFormPage.jsx';
import PlacePage from './pages/PlacePage.jsx';
import BookingPage from './pages/BookingPage.jsx';
import { ToastContainer } from 'react-toastify';
import PopularPlacesPage from './pages/PopularPlacesPage.jsx';


import axios from 'axios';
import { UserContextProvider } from './UserContext.jsx';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;


function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account' element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
          <Route path='/popular-places' element={<PopularPlacesPage />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </UserContextProvider>
  )
}

export default App
