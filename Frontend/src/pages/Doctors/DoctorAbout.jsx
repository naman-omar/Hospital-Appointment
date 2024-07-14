import React from "react";
import { formatDate } from "../../utils/formatDate"; 
const DoctorAbout = () => {
    return (
        <div>
            <div>
                <h3 className="text-[20px] leading-[30px] text-headingColor font-[600] flex items-center gap-2">About of
                <span className="text-irisBlueColor font-bold text-[24px] leading-9">Muhibur Rahman</span></h3>
                <p className="text_para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere earum fugiat illum dignissimos ipsam dolor. Sint blanditiis magnam totam, explicabo, unde, ut odit libero commodi beatae deserunt dolorem cum accusamus!
                Qui sed error facilis! Sequi eaque perferendis suscipit, sapiente labore laborum est sint aspernatur unde, dolores ratione nihil enim fugiat quam. Recusandae laudantium dolorum nemo doloremque provident quam sunt laborum?</p>
            </div>
            <div className="mt-12">
                <h3 className="text-[20px] leading-[30px] text-headingColor font-[600]">Education</h3>
                <ul className="pt-4 md:p-5">
                    <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                        <div>
                            <span className="text-irisBlueColor text-[15px] leading-6 font-[600]">{formatDate("05-15-2008")} - {formatDate("04-04-2010")}</span>
                            <p className="text-[14px] leading-6 font-[400] text-textColor">Diploma</p>
                        </div>
                        <p className="text-[14px] leading-5 font-[400] text-textColor">Swami Dayanand Medical College, Uttar Pradesh</p>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]">
                        <div>
                            <span className="text-irisBlueColor text-[15px] leading-6 font-[600]">{formatDate("12-06-2010")} - {formatDate("04-10-2016")}</span>
                            <p className="text-[14px] leading-6 font-[400] text-textColor">PHD in Surgeon</p>
                        </div>
                        <p className="text-[14px] leading-5 font-[400] text-textColor">AIIMS, Delhi</p>
                    </li>
                </ul>
            </div>
            <div className="mt-12">
                <h3 className="text-[20px] leading-[30px] text-headingColor font-[600]">Experience</h3>
                <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
                    <li className="p-4 rounded bg-[#fff9ea]">
                        <span className="text-yellowColor text-[15px] leading-6 font-[600] ">{formatDate("07-20-2016")} - {formatDate("09-4-2020")}</span>
                        <p className="text-textColor text-[14px] leading-6 font-[400]">Sr. Surgeon</p>
                        <p className="text-textColor text-[12px] leading-6 font-[400]">New Apollo Hospital, New York.</p>
                    </li>
                    <li className="p-4 rounded bg-[#fff9ea]">
                        <span className="text-yellowColor text-[15px] leading-6 font-[600] ">{formatDate("07-20-2016")} - {formatDate("09-4-2020")}</span>
                        <p className="text-textColor text-[14px] leading-6 font-[400]">Sr. Surgeon</p>
                        <p className="text-textColor text-[12px] leading-6 font-[400]">New Apollo Hospital, New York.</p>
                    </li>                
                </ul>
            </div>
        </div>
    )
}

export default DoctorAbout;