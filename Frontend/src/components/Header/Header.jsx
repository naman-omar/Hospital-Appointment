import { useState } from "react";
import { useRef, useContext } from "react";
import userImg from "../../assets/images/defaultUser.jpg";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu, BiX } from "react-icons/bi";
import { authContext } from "../../context/AuthContext.jsx";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Find a Doctor",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  let [menuStatus, setMenuStatus] = useState(false);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const toggleMenu = () => {
    setMenuStatus(!menuStatus);
    menuRef.current.classList.toggle("show_menu");
  };

  return (
    <header className="header flex items-center">
      <div className="container">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/Home">
              <img src={logo} className="h-[35px] w-[140px]" alt="logo" />
            </Link>
          </div>
          <div className="navigation" ref={menuRef}>
            <ul className="menu flex gap-[2.7rem] items-center">
              {navLinks.map((link, idx) => (
                <li key={idx}>
                  <NavLink
                    to={link.path}
                    className={(navClass) =>
                      navClass.isActive
                        ? " text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-4">
            {token && user ? (
              <div>
                <Link
                  className="flex items-center gap-2"
                  to={`${
                    role === "doctor"
                      ? "/doctors/profile/me"
                      : "/users/profile/me"
                  }`}
                >
                  <figure className="w-[35px] h-[35px] rounded-full overflow-hidden">
                    <img
                      src={user?.photo || userImg}
                      alt="userImg"
                      className="w-full rounded-full"
                    />
                  </figure>
                </Link>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <button className="bg-primaryColor text-white py-2 px-6 font-600 h-9 flex items-center rounded-[50px]">
                    Login
                  </button>
                </Link>
              </div>
            )}
            <span className="bar" onClick={toggleMenu}>
              {!menuStatus ? (
                <BiMenu className="w-8 h-8 cursor-pointer" />
              ) : (
                <BiX className="w-8 h-8 cursor-pointer" />
              )}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
