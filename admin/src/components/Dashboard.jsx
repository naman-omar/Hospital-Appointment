import { useEffect, useContext, useState } from "react";
import { authContext } from "../context/authContext.jsx";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import useFetchData from "../hooks/useFetchData.js";
import Error from "./Error.jsx";
import Loader from "./Loading.jsx";

const Dashboard = () => {
  const { user, role } = useContext(authContext);

  const [doctor, setDoctor] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);

  const { data: appointmentsData, loading, error } = useFetchData(`${BASE_URL}/bookings/allAppointments`);

  useEffect(() => {
    if (appointmentsData) {
      setAppointments(appointmentsData);
      setTotalAppointments(appointmentsData.length);
    }
  }, [appointmentsData]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${BASE_URL}/doctors`);
        const data = await response.json();
        if (response.ok) {
          setDoctor(data.data);
          setDoctorCount(data.data.length);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Failed to fetch doctors:", error.message);
      }
    };

    if (user && role === "admin") {
      fetchDoctors();
    }
  }, [user, role]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const response = await fetch(`${BASE_URL}/bookings/updateStatus/${appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, status: newStatus }
              : appointment
          )
        );
        toast.success(`Status updated to ${newStatus}`);
      } else {
        console.error("Failed to update status:", data.message);
      }
    } catch (error) {
      console.error("An error occurred while updating status:", error);
    }
  };

  if (!user || role !== "admin") {
    return null;
  }

  return (
    <div className="md:bg-blue-600 min-h-screen">
      <section className="page bg-gray-200 md:rounded-tl-[50px] md:rounded-bl-[50px] p-10 min-h-screen">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:items-center bg-[#b5b5ff] rounded-[20px] p-5 w-[100%] lg:w-[50%]">
            <figure className="w-60 h-40 rounded-sm">
              <img src={user.photo} alt="docImg" className="w-full h-full  rounded-md" />
            </figure>
            <div className="content ml-5">
              <p className="text-[30px] font-semibold text-gray-800">Hello, {user.name.charAt(0).toUpperCase() + user.name.slice(1)}</p>
              <p className="text-[14px] text-gray-600">
                Welcome to the Admin Dashboard! Your centralized hub for managing users, content, and system settings efficiently.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-5 w-full lg:w-1/2">
            <div className="flex justify-center flex-col bg-blue-600 text-white rounded-[20px] px-[20px] py-[40px] w-full sm:w-1/2">
              <p className="text-2xl font-semibold">Total Appointments</p>
              <h3 className="text-3xl font-bold">{totalAppointments}</h3>
            </div>
            <div className="bg-white flex justify-center flex-col text-pink-500 rounded-[20px] px-[20px] py-[40px] w-full sm:w-1/2">
              <p className="text-2xl font-semibold">Registered Doctors</p>
              <h3 className="text-3xl font-bold">{doctorCount}</h3>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h5 className="text-xl font-bold text-gray-800 mb-5">Appointments</h5>
          <div className="overflow-x-auto bg-white rounded-lg p-5 shadow-lg">
            {loading && <Loader />}
            {error && <Error />}
            {!loading && !error && appointments.length > 0 ? ( 
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-gray-600">Patient</th>
                    <th className="px-4 py-2 text-gray-600">Date</th>
                    <th className="px-4 py-2 text-gray-600">Doctor</th>
                    <th className="px-4 py-2 text-gray-600">Payment</th>
                    <th className="px-4 py-2 text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment._id} className="border-b">
                      <td className="px-4 py-2">{appointment.user.name}</td>
                      <td className="px-4 py-2">{appointment.createdAt.substring(0, 10)}</td>
                      <td className="px-4 py-2">{appointment.doctor.name}</td>
                      <td className="px-4 py-2">
                        {appointment.isPaid ? (
                          <div className="flex gap-2 items-center">
                            <div>Paid</div>
                            <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                          </div>
                        ) : (
                          <div className="flex gap-2 items-center">
                            <div>Not Paid</div>
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <select
                          className={`${
                            appointment.status === "pending"
                              ? "bg-yellow-200 text-yellow-700"
                              : appointment.status === "approved"
                              ? "bg-green-200 text-green-700"
                              : "bg-red-200 text-red-700"
                          } block px-2 py-1 text-sm rounded`}
                          value={appointment.status}
                          onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                        >
                          <option value="pending" className="bg-yellow-200 text-yellow-700">
                            Pending
                          </option>
                          <option value="approved" className="bg-green-200 text-green-700">
                            Approved
                          </option>
                          <option value="cancelled" className="bg-red-200 text-red-700">
                            Cancelled
                          </option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>) : (<h2 className="text-black text-2xl">No Appointments yet!</h2>)
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
