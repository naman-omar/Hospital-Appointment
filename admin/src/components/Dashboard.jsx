import { useEffect, useContext, useState } from "react";
import { authContext } from "../context/authContext.jsx";
import { BASE_URL } from "../../../Frontend/src/config.js";

const Dashboard = () => {
  const { user } = useContext(authContext);
  const { role } = useContext(authContext);

  const [doctor, setDoctor] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);

  if (!user || role !== "admin") {
    return null;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentsResponse = await fetch(`${BASE_URL}/bookings/allAppointments`);
        const appointmentsData = await appointmentsResponse.json();
        if (appointmentsResponse.ok) {
          setAppointments(appointmentsData.data);
          setTotalAppointments(appointmentsData.data.length);
        } else {
          console.error("Failed to fetch appointments:", appointmentsData.message);
        }

        const doctorsResponse = await fetch(`${BASE_URL}/doctors`);
        const doctorsData = await doctorsResponse.json();
        if (doctorsResponse.ok) {
          setDoctor(doctorsData.data);
          setDoctorCount(doctorsData.data.length);
        } else {
          console.error(doctorsData.message);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    if (user && role === "admin") {
      fetchData();
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
      } else {
        console.error("Failed to update status:", data.message);
      }
    } catch (error) {
      console.error("An error occurred while updating status:", error);
    }
  };

  return (
    <div className="bg-[#0067FF]">
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <figure className="w-[200px] h-[180px] rounded-sm">
              <img src={user.photo} alt="docImg" />
            </figure>
            <div className="content">
              <p className="text-lg font-semibold">Hello, {user.name.charAt(0).toUpperCase() + user.name.slice(1)}</p>
              <p className="text-sm">
                Welcome to the Admin Dashboard! Your centralized hub for managing users, content, and system settings efficiently.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p className="text-sm font-medium">Total Appointments</p>
            <h3 className="text-xl font-bold">{totalAppointments}</h3>
          </div>
          <div className="thirdBox">
            <p className="text-sm font-medium">Registered Doctors</p>
            <h3 className="text-xl font-bold">{doctorCount}</h3>
          </div>
        </div>
        <div className="banner">
          <h5 className="text-lg font-bold">Appointments</h5>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Patient</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Doctor</th>
                  <th className="px-4 py-2">Payment</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments && appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <tr key={appointment._id} className="border-b text-sm">
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
                          style={{ fontSize: '16px' }} // Apply inline style for font size
                          value={appointment.status}
                          onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                        >
                          <option value="pending" className="bg-yellow-200 text-yellow-700" style={{ fontSize: '16px' }}>
                            Pending
                          </option>
                          <option value="approved" className="bg-green-200 text-green-700" style={{ fontSize: '16px' }}>
                            Approved
                          </option>
                          <option value="cancelled" className="bg-red-200 text-red-700" style={{ fontSize: '16px' }}>
                            Cancelled
                          </option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-2 text-center">No Appointments Found!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
