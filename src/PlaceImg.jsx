const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place || !place.photos || place.photos.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <img
      className={className}
      src={`${BASE_URL}/uploads/${place.photos[index].replace(/^.*[\\/]/, '')}`}
      alt="err"
    />
  );
}