import { useState, useContext } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/authContext.jsx"; 

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const { user, role, dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/admin");
    toast.success("You have successfully logged out");
  };

  const gotoHomePage = () => {
    navigate("/admin/Dashboard");
    setShow(!show);
  };

  const gotoDoctorsPage = () => {
    navigate("admin/doctors");
    setShow(!show);
  };

  const gotoMessagesPage = () => {
    navigate("admin/messages");
    setShow(!show);
  };

  const gotoAddNewAdmin = () => {
    navigate("/admin/addnew");
    setShow(!show);
  };

  if (!user || role !== "admin") {
    return null;  
  }

  return (
    <section>
      <div className="wrapper">
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </div>
      <nav className={show ? "show sidebar" : "sidebar"}>
        <div className="links">
          <TiHome onClick={gotoHomePage} />
          <FaUserDoctor onClick={gotoDoctorsPage} />
          <MdAddModerator onClick={gotoAddNewAdmin} />
          <AiFillMessage onClick={gotoMessagesPage} />
          <RiLogoutBoxFill onClick={handleLogout} />
        </div>
      </nav>
    </section>
  );
};

export default Sidebar;
