import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../config.js";
import {HashLoader} from "react-spinners";
import logo from "../assets/images/logo.png";

const AddNewAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputData = async (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const res = await fetch(`${BASE_URL}/auth/addAdmin`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const resData = await res.json();
  
      if (!res.ok) {
        throw new Error(resData.message);
      }
  
      setLoading(false);
      toast.success(resData.message || "User role updated to admin");
      navigate("/admin/Dashboard");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0067FF] min-h-screen">
      <section className="page">
        <section className="h-full px-4 md:pt-[80px] pb-[30px]">
          <img src={logo} alt="logo" className="m-auto mb-14 text-[40px] w-40 h-15 mt-6 md:mt-0"/>
          <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-xl p-10 bg-[#ffffff]">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
              Add new <span className="text-primaryColor">Admin</span>
            </h3>
            <form onSubmit={handleFormSubmit} className="py-4 md:py-0">
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="name"
                  value={formData.name}
                  onChange={handleInputData}
                  className="w-full px-4 py-3 border-b border-solid border-[#00000070] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputData}
                  className="w-full px-4 py-3 border-b border-solid border-[#00000070] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                  required
                />
              </div>
              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                  disabled={loading && true}
                >
                  {loading ? <HashLoader size={25} color="#fff" /> : "Login"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </section>
    </div>
  );
} 

export default AddNewAdmin;