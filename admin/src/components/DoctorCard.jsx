/* eslint-disable react/prop-types */
import { useState } from "react";
import { BASE_URL } from "../config.js";
import { Link } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import { toast } from "react-toastify";

const DoctorCard = ({ doctor }) => {
  // Local state to manage the doctor's status
  const [currentStatus, setCurrentStatus] = useState(doctor.isApproved);

  const handleStatusChange = async (doctorId, newStatus) => {
    try {
      const response = await fetch(`${BASE_URL}/doctors/updateStatus/${doctorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isApproved: newStatus }),
      });

      if (response.ok) {
        setCurrentStatus(newStatus); // Update local state on successful status change
        toast.success(`Status updated to ${newStatus}`);

      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("An error occurred while updating status:", error);
    }
  };

  return (
    <div className="p-4 rounded-lg mt-0">
      <div>
        <img src={doctor.photo} className="w-full rounded-t-lg" alt="photo" />
      </div>
      <h2 className="text-[18px] lg:text-[22px] text-headingColor font-bold mt-1">
        {doctor.name}
      </h2>
      <div className="flex items-center justify-between">
        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:px-4 text-[12px] leading-4 rounded lg:text-[14px] lg:leading-7 font-semibold">
          {doctor.specialization}
        </span>
        <Link 
          to={`/doctors/${doctor._id}`}
          className="w-9 h-9 mb-4 rounded-full flex items-center justify-center hover:bg-primaryColor hover:text-white">
          <BsArrowRightCircle className="w-8 h-8" />
        </Link>
      </div>
      <div className="flex justify-between gap-6">
        <label htmlFor="status" className="block text-[16px] leading-6 font-semibold text-headingColor">
          Status
        </label>
        <select
          id="status"
          name="status"
          className={`${
            currentStatus === "pending"
              ? "bg-yellow-200 text-yellow-700"
              : currentStatus === "approved"
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          } relative bottom-2 block pl-3 pt-3 pb-2 pr-2 text-base focus:outline-none focus:ring-primaryColor focus:border-primaryColor sm:text-sm`}
          value={currentStatus}
          onChange={(e) =>
            handleStatusChange(doctor._id, e.target.value)
          }
        >
          <option value="pending" className="bg-yellow-200 text-yellow-700">Pending</option>
          <option value="approved" className="bg-green-200 text-green-700">Approved</option>
          <option value="rejected" className="bg-red-200 text-red-700">Rejected</option>
        </select>
      </div>
    </div>
  );
};

export default DoctorCard;
