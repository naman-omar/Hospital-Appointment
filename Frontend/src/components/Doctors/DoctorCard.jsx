/* eslint-disable react/prop-types */

import starIcon from "../../assets/images/Star.png";
import { Link } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="p-3 lg:p-5">
      <div>
        <img src={doctor.photo} className="w-full" alt="photo" />
      </div>
      <h2 className="text-[18px] leading-[30px] lg:text-[22px] lg:leading-9 text-headingColor font-[700] mt-2 lg:mt-5">
        {doctor.name}
      </h2>
      <div className="flex items-center justify-between mt-1">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2  lg:px-4 text-[12px] leading-4 rounded lg:text-[14px] lg:leading-7 font-[600]">
          {doctor.specialization}
        </span>
        <div className="flex items-center gap-[6px] mb-4">
          <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] font-[600] text-headingColor ">
            <img src={starIcon} alt="starIcon" />
            {doctor.averageRating}
          </span>
          <span className="text-[14px] leading-6 lg:text-[16px] font-[400] text-textColor">
            ({doctor.totalRating})
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="text-[14px] leading-6 font-[400] text-textColor mt-2">
            At {doctor.experiences.length > 0 && doctor.experiences[doctor.experiences.length - 1].hospital}
          </p>
        </div>
        <Link 
          to={`/doctors/${doctor._id}`}
          className="w-9 h-9 mb-4 rounded-full flex items-center justify-center hover:bg-primaryColor hover:text-white">
          <BsArrowRightCircle className="w-8 h-8" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
