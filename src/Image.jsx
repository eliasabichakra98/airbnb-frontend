const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Image({ src, ...rest }) {
  src = src && src.includes('https://')
    ? src
    : `${BASE_URL}/uploads/${src}`;
  return (
    <img {...rest} src={src} alt="" />
  );
}
