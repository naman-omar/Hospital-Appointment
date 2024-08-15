import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData.js";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Testimonials from "../../components/Testimonials/Testimonials";
import Error from "../../components/Error/Error.jsx";
import Loader from "../../components/Loader/Loading.jsx";
import { useEffect, useState } from "react";

const Doctors = () => {
  const [query,setQuery] = useState('')
  const [debounceQuery, setDebounceQuery] = useState("");

  const handleSearch = () => {
    setDebounceQuery(query.trim())
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceQuery(query.trim());
      console.log("Debounced query updated:", query);
    },700);
    return () => clearTimeout(timeOut)
  }, [query]);

  const {data: doctors = [], loading, error} = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`)

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#97aac82c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 sm:pr-2 bg-transparent w-[70%] sm:w-[80%] focus:outline-none cursor-pointer placeholder:text-textColor sm:placeholder:text-[16px] pr-[0] placeholder:text-[11px]"
              placeholder="Search Doctor by name or specification"
              value = {query}
              onChange={(e) => {setQuery(e.target.value)}}
            />
            <button onClick={handleSearch} className="btn mt-0 md:w-[30%] flex justify-center items-center sm:w-[20%] rounded-[0px] rounded-r-md py-4">
              <span className="font-[600] text-[12px] sm:text-[16px]">Search</span>
              {/* <span className="inline-block md:hidden"><IoSearch/></span> */}
            </button>
          </div>
        </div>
      </section>
      <section className="pt-[30px]">
        <div className="container">
          {loading && !error && <Loader/>}
          {error && !loading && <Error/>}
          {!error && !loading && (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-8 mt-[30px] ">
            {(doctors.length > 0) ? ( // Check if there are any doctors to display
                doctors.map((doctor) => (
                  <DoctorCard doctor={doctor} key={doctor._id} />
                ))
              ) : (
                <p className="sm:col-span-2 md:col-span-3 lg:col-span-4 text-center font-[600] text-[26px] text-red-600">No doctors found</p> // Show a message if no doctors match the query
            )}
          </div>)}
        </div>
        <div className="container mt-16 md:mt-24">
          <div className="max-w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text_para text-center">
              Discover what our patients are saying about their experiences with us through testimonials
            </p>
          </div>
        </div>
        <Testimonials />
      </section>
    </>
  );
};

export default Doctors;
