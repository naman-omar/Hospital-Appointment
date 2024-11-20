/* eslint-disable react/prop-types */
import { formatDate } from "../../utils/formatDate";

const Appointments = ({ appointments }) => {
    // Filter only the paid appointments
    const paidAppointments = appointments.filter(item => item.status == "approved");

    return (
        <>
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-500">
                    <thead className="text-sm text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="sm:px-6 sm:py-3">Name</th>
                            <th className="sm:px-6 sm:py-3">Gender</th>
                            <th className="sm:px-6 sm:py-3">Payment</th>
                            <th className="sm:px-6 sm:py-3">Price</th>
                            <th className="sm:px-6 sm:py-3">Booked on</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paidAppointments.length > 0 ? (
                            paidAppointments.map(item => (
                                <tr key={item._id} className="border-b">
                                    <th className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                                        <img src={item.user.photo} alt="photo" className="w-10 h-10 rounded-full"/>
                                        <div className="pl-3">
                                            <div className="text-base font-[600]">{item.user.name}</div>
                                            <div className="text-normal text-gray-500">
                                                {item.user.email}
                                            </div>
                                        </div>
                                    </th>
                                    <td className="sm:px-6 sm:py-4">{item.user.gender}</td>
                                    <td className="sm:px-6 sm:pt-4">
                                        <div className="flex gap-2 mb-4">
                                            <div>Paid</div>
                                            <div className="h-2.5 w-2.5 mt-1 rounded-full bg-green-500 mr-2"></div>
                                        </div>
                                    </td>
                                    <td className="sm:px-6 sm:py-4">{item.ticketPrice}</td>
                                    <td className="sm:px-6 sm:py-4">{formatDate(item.createdAt)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">No appointments scheduled yet</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Column View for Small Screens */}
            <div className="block sm:hidden">
                {paidAppointments.length > 0 ? (
                    paidAppointments.map(item => (
                        <div key={item._id} className="border-b border-[#00000050] mb-4 p-4 mt-[-2rem]">
                            <div className="flex items-center mb-4">
                                <img src={item.user.photo} alt="photo" className="w-10 h-10 rounded-full"/>
                                <div className="pl-3">
                                    <div className="text-base font-[600]">{item.user.name}</div>
                                    <div className="text-normal text-gray-500">
                                        {item.user.email}
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm mb-2"><strong>Gender:</strong> {item.user.gender}</div>
                            <div className="flex items-center gap-2 text-sm mb-2">
                                <div className="mt-1"><strong>Status:</strong> {item.isPaid ? 'Paid' : 'Unpaid'}</div>
                                <div className={`h-2.5 w-2.5 mt-1 rounded-full ${item.isPaid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            </div>
                            <div className="text-sm mb-2"><strong>Price:</strong> {item.ticketPrice}</div>
                            <div className="text-sm"><strong>Booked on:</strong> {formatDate(item.createdAt)}</div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No appointments found</div>
                )}
            </div>
        </>
    );
}

export default Appointments;
