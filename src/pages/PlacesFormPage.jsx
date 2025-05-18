import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  const [rentalAgreementPDF, setRentalAgreementPDF] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/places/' + id).then(response => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return (
      <h2 className="text-2xl mt-4 text-blue-600">{text}</h2>
    );
  }
  function inputDescription(text) {
    return (
      <p className="text-blue-500 text-sm">{text}</p>
    );
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title, address, addedPhotos,
      description, perks, extraInfo,
      checkIn, checkOut, maxGuests, price, rentalAgreementPDF,
    };
    if (id) {
      await axios.put('/places', {
        id, ...placeData
      });
      setRedirect(true);
    } else {
      await axios.post('/places', placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/account/places'} />
  }

  async function handlePDFUpload(ev) {
    const files = ev.target.files;
    if (files.length > 0) {
      try {
        const data = new FormData();
        data.append('pdf', files[0]);
        const response = await axios.post('/upload-pdf', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setRentalAgreementPDF(response.data);
      } catch (error) {
        console.error('PDF upload failed:', error);
        alert('PDF upload failed. Please try again.');
      }
    }
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace} className="bg-blue-50 p-6 rounded-lg shadow-lg">
        {preInput('Title', 'Title for your place. should be short and catchy as in advertisement')}
        <input
          type="text"
          value={title}
          onChange={ev => setTitle(ev.target.value)}
          placeholder="title, for example: My lovely apt"
          className="w-full p-2 mt-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {preInput('Address', 'Address to this place')}
        <input
          type="text"
          value={address}
          onChange={ev => setAddress(ev.target.value)}
          placeholder="address"
          className="w-full p-2 mt-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {preInput('Photos', 'more = better')}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput('Description', 'description of the place')}
        <textarea
          value={description}
          onChange={ev => setDescription(ev.target.value)}
          className="w-full p-2 mt-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {preInput('Perks', 'select all the perks of your place')}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput('Extra info', 'house rules, etc')}
        <textarea
          value={extraInfo}
          onChange={ev => setExtraInfo(ev.target.value)}
          className="w-full p-2 mt-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {preInput('Check in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1 text-blue-600">Check in time</h3>
            <input
              type="text"
              value={checkIn}
              onChange={ev => setCheckIn(ev.target.value)}
              placeholder="14"
              className="w-full p-2 mt-1 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 text-blue-600">Check out time</h3>
            <input
              type="text"
              value={checkOut}
              onChange={ev => setCheckOut(ev.target.value)}
              placeholder="11"
              className="w-full p-2 mt-1 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 text-blue-600">Max number of guests</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={ev => setMaxGuests(ev.target.value)}
              className="w-full p-2 mt-1 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1 text-blue-600">Price per night</h3>
            <input
              type="number"
              value={price}
              onChange={ev => setPrice(ev.target.value)}
              className="w-full p-2 mt-1 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {preInput('Rental Agreement', 'Upload PDF rental agreement')}
        <div className="mb-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePDFUpload}
            className="block w-full text-sm text-blue-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-100 hover:file:bg-blue-200"
          />
          {rentalAgreementPDF && (
            <div className="mt-2 text-sm text-green-600">
              PDF uploaded successfully!
            </div>
          )}
        </div>

        <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Save
        </button>
      </form>
    </div>
  );
}
