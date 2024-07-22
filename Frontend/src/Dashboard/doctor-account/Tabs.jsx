/* eslint-disable react/prop-types */
import { useContext, useState, useRef } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { authContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {BASE_URL, token} from "../../config.js"

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/home");
    toast.success("You have successfully logged out");
  };

  const handleDeleteAccount = async () => {
    // Show a confirmation dialog
    const confirmed = window.confirm("Are you sure you want to delete your account?");
  
    if (confirmed) {
      try {
        const res = await fetch(`${BASE_URL}/doctors/deleteAccount`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
  
        const result = await res.json();
        console.log("Data", result);
  
        if (!res.ok) {
          throw new Error(result.message);
        }
  
        dispatch({ type: "LOGOUT" });
        navigate("/home");
        toast.success("Your account has been successfully deleted");
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      // Optionally handle the case where the user canceled the delete action
      toast.info("Account deletion canceled");
    }
  };
  
  const [menu, setmenu] = useState(false);

  const newRef = useRef(null);

  const toggle = () => {
    setmenu(!menu);
    newRef.current.classList.toggle("show_options");
  }

  return (
    <div>
      <span className="lg:hidden">
        {!menu ? <BiMenu onClick={toggle} className="w-6 h-6 cursor-pointer" /> : <BiX onClick={toggle} className="w-6 h-6 cursor-pointer" /> }
      </span>
      <div className="options max-w-[500px] lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md" ref={newRef}>
        <button
          onClick={() => setTab("overview")}
          className={`${
            tab === "overview"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("appointments")}
          className={`${
            tab === "appointments"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Appointments
        </button>
        <button
          onClick={() => setTab("profile")}
          className={`${
            tab === "profile"
              ? "bg-indigo-100 text-primaryColor"
              : "bg-transparent text-headingColor"
          } w-full btn mt-0 rounded-md`}
        >
          Profile
        </button>
        <div className="mt-[60px] text-center w-full">
          <button
            onClick={handleLogout}
            className="w-full bg-[#181A1E] p-3 text-[16px] text-white leading-7 rounded-md mb-4"
          >
            Logout
          </button>
          <button onClick={handleDeleteAccount} className="w-full bg-red-600 p-3 text-[16px] text-white leading-7 rounded-md">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
