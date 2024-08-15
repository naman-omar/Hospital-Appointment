import { useState, useContext } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../Frontend/src/config.js";
import { authContext } from "../context/authContext.jsx"; 

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { user } = useContext(authContext); 
  const { role } = useContext(authContext);

  const { dispatch } = useContext(authContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/admin");
    toast.success("You have successfully logged out");
  };
  
  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/admin/Dashboard");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigateTo("admin/doctors");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("admin/messages");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };

  // Check if the user is logged in and has the admin role
  if (!user || role !== "admin") {
    return null;  
  }

  return (
    <section>
      <nav className={show ? "show sidebar" : "sidebar"}>
        <div className="links">
          <TiHome onClick={gotoHomePage} />
          <FaUserDoctor onClick={gotoDoctorsPage} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
      <div className="wrapper">
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
    </section> 
  );
};

export default Sidebar;
