import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className=" flex flex-col min-h-screen max-w-4xl mx-auto bg-white text-blue-600">
      <Header />
      <Outlet />
    </div>
  );
}
