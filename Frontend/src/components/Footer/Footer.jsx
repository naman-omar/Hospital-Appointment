import React from "react";
import { Link } from "react-router-dom";
import Logo from '../../assets/images/logo.png'
import { FaLinkedin, FaGithub, FaInstagram, FaGit} from "react-icons/fa";

const socialLinks = [
    {
        path:"https://www.linkedin.com/in/naman-omar-a54877259/",
        icon: <FaLinkedin className="w-5 h-5 group-hover:text-white" />
    },
    {
        path:"https://www.instagram.com/naman._.omar/",
        icon: <FaInstagram className="w-5 h-5 group-hover:text-white" />
    },
    {
        path:"https://github.com/naman-omar",
        icon: <FaGithub className="w-5 h-5 group-hover:text-white" />
    },
]

const quickLinks1 = [
    {
        path: "/home",
        display: "Home"
    },
    {
        path: "/",
        display: "About us"
    },
    {
        path: "/services",
        display: "Services"
    },
    {
        path: "/",
        display: "Blog"
    },
]

const quickLinks2 = [
    {
        path: "/doctor",
        display: "Find a Doctor"
    },
    {
        path: "/",
        display: "Request an Appointment"
    },
    {
        path: "/",
        display: "Find a Location"
    },
    {
        path: "/",
        display: "Get a Opinion"
    },
]

const quickLinks3 = [
    {
        path: "/",
        display: "Donate"
    },
    {
        path: "/contact",
        display: "Contact"
    },
]

const Footer = () => {
    const year = new Date().getFullYear();

    return(
        <footer className="pb-16 pt-10 mt-8">
            <div className="container">
                <div className="flex justify-between flex-col md:flex-row flex-wrap gap-8">
                    <div>
                        <img src={Logo} alt="logo" />
                        <p className="text-[16px] text-textColor font-[400] leading-7 mt-2">Copyright &copy; {year} developed by Naman <span className="block lg:inline-block">all rights reserved</span> </p>
                        <div className="flex items-center gap-3 mt-4">
                            {socialLinks.map((link,idx) => {
                                return <Link to={link.path} key={idx} className="w-10 h-10 border border-black rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none">{link.icon}</Link>
                            })}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="flex flex-col items-start gap-4 text-[14px] font-[400] text-textColor">
                            <h2 className="text-[18px] leading-[30px] font-[700] mb-4 text-headingColor">Quick Links</h2>
                            {quickLinks1.map((link,idx) => {
                                return <Link className="hover:underline hover:text-primaryColor" to={link.path} key={idx}>{link.display}</Link>
                            })}
                        </div>
                        <div className="flex flex-col items-start gap-4 text-[14px] font-[400] text-textColor">
                            <h2 className="text-[18px] leading-[30px] font-[700] mb-4 text-headingColor">I want to</h2>
                            {quickLinks2.map((link,idx) => {
                                return <Link className="hover:underline hover:text-primaryColor" to={link.path} key={idx}>{link.display}</Link>
                            })}
                        </div>
                        <div className="flex flex-col items-start gap-4 text-[14px] font-[400] text-textColor">
                            <h2 className="text-[18px] leading-[30px] font-[700] mb-4 text-headingColor">Support</h2>
                            {quickLinks3.map((link,idx) => {
                                return <Link className="hover:underline hover:text-primaryColor" to={link.path} key={idx}>{link.display}</Link>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;