import React from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";

const ServiceCard = ({ item, idx }) => {
    const {name,desc,bgColor,textColor} = item;
    return (
        <div className="py-[30px] px-3 lg:px-5">
            <h2 className="text-[26px] leading-9 text-headingColor font-[700]">{name}</h2>
            <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">{desc}</p>
            <div className="flex items-center justify-between mt-[30px] mr-10">
                <Link to="/home" className="flex w-9 h-9 items-center justify-center rounded-full hover:bg-primaryColor hover:text-white">
                    <BsArrowRightCircle className="w-8 h-8"/>
                </Link>
                <span className="flex justify-center items-center w-[44px] h-[44px] text-[18px] leading-[30px] font-[600]}" style={{background:`${bgColor}`,color:`${textColor}`,borderRadius:"6px"}}>{idx+1}</span>
            </div>
        </div>
    );
}

export default ServiceCard;
