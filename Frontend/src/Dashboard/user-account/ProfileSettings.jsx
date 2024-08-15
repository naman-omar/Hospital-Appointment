/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";
import { BASE_URL, token } from "../../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import Loading from "../../components/Loader/Loading.jsx";

const ProfileSettings = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    role: "",
    bloodGroup: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      name: user.name,
      email: user.email,
      photo: user.photo,
      bloodGroup: user.bloodGroup,
    });
  }, [user]);

  const handleInputData = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    console.log(data); //debugging
    setSelectedFile(data.url);
    setFormData((prevState) => ({ ...prevState, photo: data.url }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("Form data:", formData); // Debugging log

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();
      console.log(resData); //Debugging

      if (!res.ok) {
        throw new Error(resData.message || "Registration failed");
      }

      setLoading(false);
      toast.success(resData.message || "Registration successful");

      navigate("/users/profile/me");
    } catch (err) {
      console.error("Error:", err); // Debugging log
      toast.error(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      {loading && <Loading />}
      {!loading && (
        <form onSubmit={handleFormSubmit} className="mt-4">
          <div className="mb-5">
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              value={formData.name}
              onChange={handleInputData}
              className="w-full px-4 py-3 border-b border-solid border-[#00000070]  focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              required
            />
          </div>
          <div className="mb-5">
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleInputData}
              className="w-full px-4 py-3 border-b border-solid border-[#00000070]  focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              aria-readonly
              readOnly
            />
          </div>
          {/* <div className="mb-5">
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleInputData}
              className="w-full px-4 py-3 border-b border-solid border-[#00000070]  focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            />
          </div> */}
          <div className="mb-5">
            <input
              type="text"
              placeholder="Blood Group"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputData}
              className="w-full px-4 py-3 border-b border-solid border-[#00000070]  focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
            />
          </div>
          <div className="mb-5 flex gap-4 ">
            {formData.photo && (
              <figure className="w-[50px] h-[50px] rounded-full flex items-center justify-center overflow-hidden">
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
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-[600] rounded-lg cursor-pointer"
              >
              Upload Photo
              </label>
            </div>
          </div>
          <div className="mt-7">
            <button
              disabled={loading && true}
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
            >
              {loading ? <HashLoader size={25} color="#fff" /> : "Update"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileSettings;
