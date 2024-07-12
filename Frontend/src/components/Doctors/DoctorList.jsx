import React from "react";
import {doctors} from "../../assets/data/docters"
import DoctorCard from "./DoctorCard";


const DoctorList = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 mt-[30px] lg:mt-[55px]">
            {doctors.map((doctor) => {
                return <DoctorCard doctor={doctor} key={doctor.id}/>
            })}
        </div>
    );
}

export default DoctorList;