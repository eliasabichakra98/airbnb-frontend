
export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place || !place.photos || place.photos.length === 0) {
    return <p>No images available</p>;
  }

  return (
    <img
      className={className}
      src={`http://localhost:4000/uploads/${place.photos[index].replace(/^.*[\\/]/, '')}`}
      alt="err"
    />
  );
}