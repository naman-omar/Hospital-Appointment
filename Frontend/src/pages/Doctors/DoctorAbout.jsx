/* eslint-disable react/prop-types */
import { formatDate } from "../../utils/formatDate";

const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-[600] flex items-center gap-2">
          About
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {name}
          </span>
        </h3>
        <p className="text_para">{about}</p>
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-[600]">
          Education
        </h3>
        {qualifications && qualifications.length > 0 && (
          <ul className="pt-4 md:p-5">
            {qualifications.map((item, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
              >
                <div>
                  <span className="text-irisBlueColor text-[15px] leading-6 font-[600]">
                    {formatDate(item.startingDate)} -{" "}
                    {formatDate(item.endingDate)}
                  </span>
                  <p className="text-[14px] leading-6 font-[400] text-textColor">
                    {item.degree}
                  </p>
                </div>
                <p className="text-[14px] leading-5 font-[400] text-textColor">
                  {item.university}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-[600]">
          Experience
        </h3>
        <div className="grid md: grid-cols-2 gap-[1rem]">

        </div>
        {experiences?.length > 0 && (
          <ul className=" grid md:grid-cols-2 pt-4 md:p-5 gap-4">
            {experiences.map((item, index) => (
              <li key={index} className="p-4 rounded bg-[#fff9ea]">
                <span className="text-yellowColor text-[15px] leading-6 font-[600]">
                  {formatDate(item.startingDate)} -{" "}
                  {formatDate(item.endingDate)}
                </span>
                <p className="text-textColor text-[14px] leading-6 font-[400]">
                  {item.position}
                </p>
                <p className="text-textColor text-[12px] leading-6 font-[400]">
                  {item.hospital}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DoctorAbout;
