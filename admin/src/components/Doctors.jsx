/* eslint-disable react/jsx-key */

import { useContext } from "react";
import {authContext} from "../context/authContext.jsx"
import { Navigate } from "react-router-dom";
import { BASE_URL } from "../config.js";
import DoctorCard from "./DoctorCard.jsx";
import Error from "./Error.jsx";
import Loader from "./Loading.jsx";
import useFetchData from "../hooks/useFetchData.js";

const Doctors = () => {

  const { user } = useContext(authContext); 
  const { role } = useContext(authContext);

  if (!user || role !== "admin") {
   return <Navigate to="/admin" />  
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data: doctors = [], loading, error} = useFetchData(`${BASE_URL}/doctors/all`)
  
  return (
    <div className="bg-[#0067FF]">
        <section className="page doctors">
          <h1 className="text-[#3939d9f2] mb-[30px] text-[2.3rem] mt-4 ">DOCTORS</h1>
          <div className="md:px-[100px] sm:px-[30px] px-[10px]">
          {loading && !error && <Loader/>}
          {error && !loading && <Error/>}
            {!error && !loading && (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  xl:grid-cols-3 gap-8 mt-[30px] lg:mt-[55px]">
              {(doctors.length > 0) ? (
                  doctors.map((doctor) => (
                    <div key={doctor._id} className="bg-[#EEEEEE] rounded-lg shadow-lg">
                        <DoctorCard doctor={doctor} />
                    </div>
                  ))
                ) : (
                  <p className="sm:col-span-2 md:col-span-3 lg:col-span-4 text-center font-[600] text-[26px] text-red-600">No doctors found</p> // Show a message if no doctors match the query
              )}
            </div>)}
        </div>
        </section>
    </div>
  );
};

export default Doctors;