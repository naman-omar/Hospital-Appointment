/* eslint-disable react/prop-types */
import { formatDate } from "../../utils/formatDate";

const Appointments = ({appointments}) => {
    return (
        <>
        <table className="w-full text-left text-sm text-gray-500 overflow-hidden">
            <thead className="opacity-0 absolute sm:opacity-100 sm:relative text-sm text-gray-700 uppercasse bg-gray-100">
                <tr>
                    <th scope="col" className="sm:px-6 sm:py-3">Name</th>
                    <th scope="col" className="sm:px-6 sm:py-3">Gender</th>
                    <th scope="col" className="sm:px-6 sm:py-3">Payment</th>
                    <th scope="col" className="sm:px-6 sm:py-3">Price</th>
                    <th scope="col" className="sm:px-6 sm:py-3">Booked on</th>
                </tr>
            </thead>
            <tbody>
                {appointments.length > 0 && appointments.map((item) => (
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
                            {item.isPaid && (
                                <div className="flex items-center gap-2">
                                    <div>Paid</div>
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                                </div> 
                            )}
                            {!item.isPaid && (
                                <div className="flex items-center">
                                    <div>Unpaid</div>
                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                                </div> 
                            )}
                        </td>
                        <td className="sm:px-6 sm:py-4">{item.ticketPrice}</td>
                        <td className="sm:px-6 sm:py-4">{formatDate(item.createdAt)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="text-primaryColor mt-8 font-[600] text-[18px] ml-2">{!appointments.length && 'No appointment scheduled yet'}</div>
    </>
    )
}

export default Appointments;