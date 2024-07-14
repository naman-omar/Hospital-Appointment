import React, { useState } from "react"
import doctorImg from "../../assets/images/doctor-img02.png"
import starIcon from '../../assets/images/Star.png'
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";

const DoctorDetails = () => {
    const [tab, setTab] = useState("about")
    return (
        <section>
            <div className="max-w-[1170px] px-5 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[50px]">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-5">
                            <figure className="lg:max-w-[200px] lg:max-h-[200px]">
                                <img src={doctorImg} alt="doctorImg" className="w-full"/>
                            </figure>
                            <div className="flex flex-col w-[98%]">
                                <span className="bg-[#CCF0F3] max-w-[40%] md:max-w-[30%] flex justify-center text-irisBlueColor py-1 px-4 text-[12px] leading-4 lg:text-[14px] lg:leading-7 font-[600] rounded">Surgeon</span>
                                <h3 className="text-headingColor text-[16px] md:text-[22px] mt-3 font-bold">Muhibur Rahman</h3>
                                <div className="flex items-center gap-[6px]">
                                    <span className="flex items-center gap-[6px] text-[14px] lg:text-[16px] leading-5 lg:leading-7 font-[600] text-headingColor">
                                        <img src={starIcon} alt="starIcon" /> 4.8
                                    </span>
                                    <span className="text-[13px] lg:text-[15px] leading-5 lg:leading-7 font-[400] text-textColor">(272)</span>
                                </div>
                                <p className="text-[12px] leading-5 md:text-[14px] lg:max-w-[390px]">
                                Dedicated to the art and science of healing through precise and compassionate surgical care with extensive training and experience.
                                </p>
                            </div>
                        </div>
                        <div className="mt-[50px] border-b border-solid border-[#0066ff30]">
                            <button className={`${tab === "about" && 'border-b border-solid border-primaryColor !important'}py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-[500]`} onClick={() => setTab("about")}>About</button>
                            <button className={`${tab === "feedback" && 'border-b border-solid border-primaryColor !important'}py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-[500]`} onClick={() => setTab("feedback")}>Feedback</button>
                        </div>
                        <div className="mt-[50px]">
                            { tab === "about" && <DoctorAbout/>}
                            { tab === "feedback" && <Feedback/>}
                        </div>
                    </div>
                    <SidePanel/>
                </div>
            </div>
        </section>
    );
};

export default DoctorDetails;