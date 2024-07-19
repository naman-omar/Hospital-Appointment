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
    setQuery(query.trim())
    console.log("handle search")
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceQuery(query);
    },700);
    return () => clearTimeout(timeOut)
  })

  const {data: doctors, loading, error} = useFetchData(`${BASE_URL}/doctors?query=${query}`)

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#97aac82c] rounded-md flex items-center justify-betweeen">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-[70%] sm:w-[80%] focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Doctor by name or specification"
              value = {query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="btn mt-0 w-[30%] flex justify-center items-center sm:w-[20%] rounded-[0px] rounded-r-md py-4">
              Search
            </button>
          </div>
        </div>
      </section>
      <section className="pt-[30px]">
        <div className="container">
          {error && <Error/>}
          {loading && <Loader/>}
          {!error && !loading && (<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-8 mt-[30px] lg:mt-[55px]">
            {doctors.map((doctor) => {
              return <DoctorCard doctor={doctor} key={doctor._id} />;
            })}
          </div>)}
        </div>
        <div className="container mt-16 md:mt-24">
          <div className="max-w-[470px] mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text_para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert healthcare.
            </p>
          </div>
        </div>
        <Testimonials />
      </section>
    </>
  );
};

export default Doctors;
