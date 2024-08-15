import { useState } from "react";
import signupImg from "../assets/images/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../utils/uploadCloudinary.js";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "patient",
  });

  const navigate = useNavigate();

  const handleInputData = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);
    //console.log(data); //debugging
    setPreviewUrl(data.url);
    setSelectedFile(data.url);
    setFormData((prevState) => ({ ...prevState, photo: data.url }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    //console.log("Form data:", formData); // Debugging log

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
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

      navigate("/login");
    } catch (err) {
      console.error("Error:", err); // Debugging log
      toast.error(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <section className="px-5 xl:px-0 pt-[15px] lg:pt-[25px] pb-[30px]">
      <div className="max-w-[570px] lg:max-w-[1170px] mx-auto shadow-xl lg:shadow-none px-4 md:px-12 lg:p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block bg-primaryColor rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={signupImg}
                alt="signupImg"
                className="w-full rounded-l-lg"
              />
            </figure>
          </div>
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Create an <span className="text-primaryColor">account</span>
            </h3>
            <form onSubmit={handleFormSubmit}>
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
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputData}
                  className="w-full px-4 py-3 border-b border-solid border-[#00000070]  focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5 flex flex-col sm:flex-row justify-between">
                <label
                  htmlFor="role"
                  className="text-headingColor font-bold text-[16px] leading-7"
                >
                  Are you a:
                  <select
                    name="role"
                    id="role"
                    className="text-textColor font-bold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                    onChange={handleInputData}
                    value={formData.role}
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </label>
                <label
                  htmlFor="gender"
                  className="text-headingColor font-bold text-[16px] leading-7"
                >
                  Select Gender:
                  <select
                    name="gender"
                    id="gender"
                    className="text-textColor font-bold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                    onChange={handleInputData}
                    value={formData.gender}
                  >
                    <option>Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div className="mb-5 flex gap-4 ">
                {selectedFile && (
                  <figure className="w-[50px] h-[50px] rounded-full flex items-center justify-center">
                    <img
                      src={previewUrl}
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
              <div className="mt-7">
                <button
                  disabled={loading && true}
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  {loading ? <HashLoader size={25} color="#fff" /> : "Signup"}
                </button>
              </div>
              <p className="mt-5 text-textColor text-center">
                Already have an account?{" "}
                <Link className="text-primaryColor ml-1" to="/login">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
