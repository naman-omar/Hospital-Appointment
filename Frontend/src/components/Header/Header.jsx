import React from "react";
import { useEffect,useRef } from "react";
import userImg from '../../assets/images/avatar-icon.png';
import logo from '../../assets/images/logo.png';
import { NavLink,Link} from "react-router-dom";
import {BiMenu} from 'react-icons/bi';

const navLinks = [
    {
        path: "/home",
        display: "Home"
    },
    {
        path: "/doctors",
        display: "Find a Doctor"
    },
    {
        path: "/services",
        display: "Services"
    },
    {
        path: "/contact",
        display: "Contact"
    },
];

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);

    const handleStickyHeader = () => {
        window.addEventListener("scroll", () => {
            if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
                headerRef.current.classList.add("sticky_header");
            }
            else{
                headerRef.current.classList.remove("sticky_header");
            }
        });
    };

    useEffect(() => {
        handleStickyHeader()
        return () => window.removeEventListener('scroll',handleStickyHeader)
    });

    const toggleMenu = () => {
        menuRef.current.classList.toggle("show_menu");
    }

    return(
        <header className="header flex items-center" ref={headerRef}>
            <div className="container">
                <div className="flex justify-between items-center"> 
                    <div>
                        <img src={logo} className="h-[35px] w-[140px]" alt="logo"/>
                    </div>
                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <ul className="menu flex gap-[2.7rem] items-center" onClick={toggleMenu}>
                        {
                            navLinks.map((link,idx) =>                    
                                <li key={idx}><NavLink to={link.path} className={navClass=> navClass.isActive ? ' text-primaryColor text-[16px] leading-7 font-[600]': 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'}>{link.display}</NavLink></li>
                            )
                        }
                        </ul>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden">
                            <Link to="/">
                                <figure className="w-[35px] h-[35px] rounded-full">
                                    <img src={userImg} alt="userImg" className="w-full rounded-full" />
                                </figure>
                            </Link> 
                        </div>
                        <div>
                            <Link to="/login">
                                <button className="bg-primaryColor text-white py-2 px-6 font-600 h-9 flex items-center rounded-[50px]">Login</button>
                            </Link>
                        </div>
                        <span className="bar" onClick={toggleMenu}>
                            <BiMenu className="w-6 h-6 cursor-pointer" />
                        </span>
                    </div>
                </div>
            </div> 
        </header>
    );
};

export default Header;