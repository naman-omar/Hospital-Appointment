/* eslint-disable react/prop-types */

import { BsArrowRightCircle } from "react-icons/bs";

const ServiceCard = ({ item, idx }) => {
  return (
    <div key={idx} className="py-[30px] px-3 lg:px-5">
      <h2 className="text-[26px] leading-9 text-headingColor font-[700]">
        {item.name}
      </h2>
      <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
        {item.desc}
      </p>
      <div className="flex items-center justify-between mt-[30px] mr-10 md:mr-0 xl:mr-10">
        <div
          className="flex w-9 h-9 items-center justify-center rounded-full hover:bg-primaryColor hover:text-white"
        >
        <BsArrowRightCircle className="w-8 h-8" />
        </div>
        <span
          className="flex justify-center items-center w-[44px] h-[44px] text-[18px] leading-[30px] font-[600]}"
          style={{
            background: `${item.bgColor}`,
            color: `${item.textColor}`,
            borderRadius: "6px",
          }}
        >
          {idx+ 1}
        </span>
      </div>
    </div>
  );
};

export default ServiceCard;
