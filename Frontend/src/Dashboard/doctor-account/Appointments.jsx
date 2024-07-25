/* eslint-disable react/prop-types */
import { formatDate } from "../../utils/formatDate";

const Appointments = ({ appointments }) => {
    // Filter only the paid appointments
    const paidAppointments = appointments.filter(item => item.isPaid);

    return (
        <>
            <table className="w-full text-left text-sm text-gray-500 overflow-hidden">
                <thead className="opacity-0 absolute sm:opacity-100 sm:relative text-sm text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th scope="col" className="sm:px-6 sm:py-3">Name</th>
                        <th scope="col" className="sm:px-6 sm:py-3">Gender</th>
                        <th scope="col" className="sm:px-6 sm:py-3">Payment</th>
                        <th scope="col" className="sm:px-6 sm:py-3">Price</th>
                        <th scope="col" className="sm:px-6 sm:py-3">Booked on</th>
                    </tr>
                </thead>
                <tbody>
                    {paidAppointments.length > 0 ? (
                        paidAppointments.map(item => (
                            <tr key={item._id}>
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
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
                    ) : null}
                </tbody>
            </table>
            <div className="text-primaryColor mt-8 font-[600] text-[18px] ml-2">{!paidAppointments.length && 'No appointment scheduled yet'}</div>
        </>
    );
}

export default Appointments;
