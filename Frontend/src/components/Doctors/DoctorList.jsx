
import DoctorCard from "./DoctorCard";
import {BASE_URL} from "../../config.js"
import Error from "../../components/Error/Error.jsx"
import Loader from "../../components/Loader/Loading.jsx"
import useFetchData from '../../hooks/useFetchData.js'

const DoctorList = () => {
  const {data: doctors, loading, error} = useFetchData(`${BASE_URL}/doctors`)
  return (
    <div>
        {loading && <Loader/>}
        {error && <Error errMsg={error}/>}
        {!error && !loading && (
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-8 mt-[30px]">
              {doctors.map((doctor,index ) => (
                 index < 3 && (<DoctorCard doctor={doctor} key={doctor._id} />)
              ))}
          </div>
        )}
    </div>
  );
};

export default DoctorList;
