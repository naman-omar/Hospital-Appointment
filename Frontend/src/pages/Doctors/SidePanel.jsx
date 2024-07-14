import React from "react";

const SidePanel = () => {
    return (
        <div className="shadow-panelShadow p-6 lg:p-10 rounded-md h-[22rem] lg:h-[35%]">
            <div className="flex items-center justify-between">
                <p className="text_para mt-0 font-[700] text-headingColor">Consultation Fee</p>
                <span className="text-[16xp] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-[700]">500 INR</span>
            </div>
            <div className="mt-[30px]">
                <p className="text_para mt-0 font-[600] text-headingColor">Available Time Slots:</p>
                <ul className="mt-3">
                    <li className="flex item-center justify-between mb-2">
                        <p className="flex items-center justify-between mb-2">Sunday</p>
                        <p className="text-[15px] leading-6 text-textColor font-[600]">
                            4:00 PM - 9:30 PM
                        </p>
                    </li>
                    <li className="flex item-center justify-between mb-2">
                        <p className="flex items-center justify-between mb-2">Tuesday</p>
                        <p className="text-[15px] leading-6 text-textColor font-[600]">
                            4:00 PM - 9:30 PM
                        </p>
                    </li>
                    <li className="flex item-center justify-between mb-2">
                        <p className="flex items-center justify-between mb-2">Wednesday</p>
                        <p className="text-[15px] leading-6 text-textColor font-[600]">
                            4:00 PM - 9:30 PM
                        </p>
                    </li>
                </ul>
            </div>
            <button className="btn px-2 w-full rounded-md">Book Appointment</button>
        </div>
    )
};

export default SidePanel;