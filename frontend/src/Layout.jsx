import { Outlet } from "react-router-dom";
import Footer from "./LandingPage/Footer";
import Navbar from "./LandingPage/Navbar";

function Layout() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}
export default Layout;
