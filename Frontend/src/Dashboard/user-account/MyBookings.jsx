import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from "../../components/Doctors/DoctorCard.jsx";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error.jsx";

const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error errMsg={error} />}
      {!loading && !error && appointments.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      )}
      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-8 leading-7 text-[16px]  md:text-[18px] font-[600] text-primaryColor">
          You did not have any appointments yet!
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
