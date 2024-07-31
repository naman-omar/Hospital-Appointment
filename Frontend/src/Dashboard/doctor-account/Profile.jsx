/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";
import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";

const Profile = ({ doctorData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    bio: "",
    gender: "",
    specialization: "",
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    timeSlots: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
    if (doctorData) {
      setFormData({
        name: doctorData.name || "",
        email: doctorData.email || "",
        phone: doctorData.phone || "",
        bio: doctorData.bio || "",
        gender: doctorData.gender || "",
        specialization: doctorData.specialization || "",
        ticketPrice: doctorData.ticketPrice || "",
        qualifications: doctorData.qualifications || [],
        experiences: doctorData.experiences || [],
        timeSlots: doctorData.timeSlots || [],
        about: doctorData.about || "",
        photo: doctorData.photo || "",
      });
    }
  }, [doctorData]);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    setFormData({ ...formData, photo: data?.url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw Error(result.message);
      }
      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleInputChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleInputChangeGeneral = (key, index, e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedItems = [...prevFormData[key]];
      updatedItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updatedItems,
      };
    });
  };

  const addItem = (key, item) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: [...prevState[key], item],
    }));
  };

  const deleteItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const handleQualificationChange = (event, index) => {
    handleInputChangeGeneral("qualifications", index, event);
  };

  const deleteQualifications = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const addQualifications = (event) => {
    event.preventDefault();
    addItem("qualifications", {
      startingDate: "",
      endingDate: "",
      degree: "",
      university: "",
    });
  };

  const handleExperienceChange = (event, index) => {
    handleInputChangeGeneral("experiences", index, event);
  };

  const deleteExperiences = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  const addExperience = (event) => {
    event.preventDefault();
    addItem("experiences", {
      startingDate: "",
      endingDate: "",
      position: "",
      hospital: "",
    });
  };

  const handleTimeSlotsChange = (event, index) => {
    handleInputChangeGeneral("timeSlots", index, event);
  };

  const deleteTimeSlots = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };

  const addTimeSlots = (event) => {
    event.preventDefault();
    addItem("timeSlots", {
      day: "Mon-Fri",
      startingTime: "09:00",
      endingTime: "17:00",
    });
  };

  return (
    <div>
      <h2 className="text-[24px] leading-9 mb-6 font-bold text-headingColor">
        Profile Information
      </h2>
      <form>
        <div className="mb-5">
          <label htmlFor="name" className="form_label">
            Name*
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            id="name"
            placeholder="Full Name"
            className="form_input"
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="form_label">
            Email*
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            id="email"
            onChange={handleInputChange}
            placeholder="Email Id"
            className="form_input"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="phone" className="form_label">
            Phone*
          </label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            id="phone"
            placeholder="Phone number"
            className="form_input"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="bio" className="form_label">
            Bio*
          </label>
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            id="bio"
            placeholder="Your Bio"
            className="form_input"
            maxLength={200}
          />
        </div>
        <div>
          <div className="grid sm:grid-cols-3 gap-5 mb-[30px]">
            <div>
              <label htmlFor="gender" className="form_label">
                Gender*
              </label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form_input"
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="specialization" className="form_label">
                Specialization*
              </label>
              <select
                name="specialization"
                id="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form_input py-3"
                required
              >
                <option value="">Select</option>
                <option value="Surgeon">Surgeon</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Physician">Physician</option>
              </select>
            </div>
            <div>
              <label htmlFor="price" className="form_label">
                Ticket Price*
              </label>
              <input
                type="number"
                placeholder="100"
                name="ticketPrice"
                id="price"
                value={formData.ticketPrice}
                className="form_input h-12"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-[20px] leading-9 mb-6 font-bold text-headingColor">
            Qualifications
          </h2>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5 mb-[20px]">
                  <div>
                    <p className="form_label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <label htmlFor="degree" className="form_label">
                      Degree*
                    </label>
                    <input
                      type="text"
                      name="degree"
                      id="degree"
                      value={item.degree}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div>
                    <label htmlFor="university" className="form_label">
                      University
                    </label>
                    <input
                      type="text"
                      name="university"
                      id="university"
                      value={item.university}
                      className="form_input"
                      onChange={(e) => handleQualificationChange(e, index)}
                    />
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => deleteQualifications(e, index)}
                      className="bg-red-500 p-2 rounded-full text-white text-[18px] mt-2 cursor-pointer"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addQualifications}
            className="bg-black py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Qualification
          </button>
        </div>
        <div className="mb-8">
          <h2 className="text-[20px] leading-9 mb-6 font-bold text-headingColor">
            Experiences
          </h2>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5 mb-[20px]">
                  <div>
                    <p className="form_label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <label htmlFor="position" className="form_label">
                      Position*
                    </label>
                    <input
                      type="text"
                      name="position"
                      id="position"
                      value={item.position}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                  <div>
                    <label htmlFor="hospital" className="form_label">
                      Hospital
                    </label>
                    <input
                      type="text"
                      name="hospital"
                      id="hospital"
                      value={item.hospital}
                      className="form_input"
                      onChange={(e) => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <button
                  onClick={(e) => deleteExperiences(e, index)}
                  className="bg-red-500 p-2 rounded-full text-white text-[18px] mt-2 mb-[25px] cursor-pointer"
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addExperience}
            className="bg-black py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Experience
          </button>
        </div>
        <div className="mb-8">
          <h2 className="text-[20px] leading-9 mb-6 font-bold text-headingColor">
            Time Slots
          </h2>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid sm:grid-cols-4 mb-[20px] gap-5">
                  <div>
                    <p className="form_label">Day*</p>
                    <select
                      name="day"
                      value={item.day}
                      className="form_input py-3 h-14"
                      onChange={(e) => handleTimeSlotsChange(e, index)}
                    >
                      <option value="Monday">Monday</option>
                      <option value="Tuesday">Tuesday</option>
                      <option value="Wednesday">Wednesday</option>
                      <option value="Thrusday">Thrusday</option>
                      <option value="Friday">Friday</option>
                      <option value="Saturday">Saturday</option>
                      <option value="Sunday">Sunday</option>
                      <option value="Mon-Fri">Mon-Fri</option>
                      <option value="Sat-Sun">Sat-Sun</option>
                    </select>
                  </div>
                  <div>
                    <p className="form_label">Starting Time*</p>
                    <input
                      type="time"
                      name="startingTime"
                      value={item.startingTime}
                      className="form_input"
                      onChange={(e) => handleTimeSlotsChange(e, index)}
                    />
                  </div>
                  <div>
                    <p className="form_label">Ending Time*</p>
                    <input
                      type="time"
                      name="endingTime"
                      value={item.endingTime}
                      className="form_input"
                      onChange={(e) => handleTimeSlotsChange(e, index)}
                    />
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => deleteTimeSlots(e, index)}
                      className="bg-red-500 p-2 rounded-full text-white text-[18px] mt-2 sm:mt-12 sm:ml-4 mb-[25px] cursor-pointer"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={addTimeSlots}
            className="bg-[rgba(0,0,0)] py-2 px-5 rounded text-white h-fit cursor-pointer"
          >
            Add Time Slot
          </button>
        </div>
        <div className="mb-5">
          <label htmlFor="about" className="form_label">
            About*
          </label>
          <textarea
            name="about"
            id="about"
            rows={4}
            value={formData.about}
            placeholder="Write about yourself"
            onChange={handleInputChange}
            className="form_input"
          ></textarea>
        </div>
        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[50px] h-[50px] rounded-full flex items-center justify-center">
              <img
                src={formData.photo}
                alt="patient"
                className="w-full rounded-full border-2 border-[#0066ff61] border-solid"
              />
            </figure>
          )}
          <div className="relative w-[160px] h-[50px]">
            <input
              type="file"
              name="photo"
              id="customFile"
              onChange={handleFileInputChange}
              accept=".jpg, .png, .jpeg"
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              htmlFor="customFile"
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hodden bg-[#0066ff46] text-headingColor font-[600] rounded-lg cursor-pointer"
            >
              Upload Photo
            </label>
          </div>
        </div>
        <div className="mt-5">
          <button
            type="submit"
            onClick={updateProfileHandler}
            className="bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
