import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import UserAccount from "../Dashboard/user-account/MyAccount.jsx";
import DashBoard from "../Dashboard/doctor-account/Dashboard.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop.jsx";
import CheckoutSuccess from "../pages/CheckoutSuccess.jsx";

import { Routes, Route } from "react-router-dom";

const Routers = () => {
  return (
    <>
    <ScrollToTop/>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/services" element={<Services />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/doctors" element={<Doctors />}></Route>
      <Route path="/doctors/:id" element={<DoctorDetails />}></Route>
      <Route path="/verify" element={<CheckoutSuccess/>}></Route>
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient", "admin"]}>
            <UserAccount />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <DashBoard />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
    </>
  );
};

export default Routers;
