/* eslint-disable react/prop-types */
import convertTime from "../../utils/convertTime";
import {BASE_URL, token} from '../../config.js'
import {toast} from "react-toastify"

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {

  const bookingHandler = async () => {
    try{
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
        method: "post",
        header: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()

      if(!res.ok){
         throw new Error(data.message + 'Please try again')
      }

      if(data.session.url){
        window.location.href = data.session.url
      }
    }catch(err){
      toast.error(err.message)
    }
  }

  return (
    <div className="shadow-panelShadow p-6 lg:p-10 rounded-md h-[22rem] lg:h-[24rem]">
      <div className="flex items-center justify-between">
        <p className="text_para mt-0 font-[700] text-headingColor">
          Consultation Fee
        </p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-[700]">
          {ticketPrice} INR
        </span>
      </div>
      <div className="mt-[30px]">
        <p className="text_para mt-0 font-[600] text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3 mb-0">
          {timeSlots?.map((time, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="flex items-center justify-between mb-2">{time.day}</p>
              <p className="text-[15px] leading-6 text-textColor font-[600]">
                {convertTime(time.startingTime)} - {convertTime(time.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={bookingHandler} className="btn px-2 w-full rounded-md mt-4">Book Appointment</button>
    </div>
  );
};

export default SidePanel;
