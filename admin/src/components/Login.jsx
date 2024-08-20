
import { useNavigate } from "react-router-dom";
import {HashLoader} from "react-spinners";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import logo from "../assets/images/logo.png";
import { BASE_URL } from "../config.js";
import {authContext} from "../context/authContext.jsx"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { dispatch } = useContext(authContext);

  const handleInputData = async (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // console.log('Form data:', formData); // Debugging log

    try {
      const res = await fetch(`${BASE_URL}/auth/admin`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "Registration failed");
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: resData.data,
          token: resData.token,
          role: resData.role,
        },
      });

      console.log(resData, "login data");

      setLoading(false);
      toast.success(resData.message);
      navigate("/admin/Dashboard");
      setTimeout(()=>{
        window.location.reload();
      }, 3000);
      
    } catch (err) {
      //console.error('Error:', err); // Debugging log
      toast.error(err.message || "Something went wrong");
      setLoading(false);
    }
  }
    return (
      <section className="h-[100vh] px-4 md:pt-[80px] pb-[30px] bg-white">
        <img src={logo} alt="logo" className="m-auto mb-14 text-[40px] w-40 h-15 mt-10 md-mt-0"/>
        <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-xl p-10">
          <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
            Login as <span className="text-primaryColor">Admin</span>
          </h3>
          <form onSubmit={handleFormSubmit} className="py-4 md:py-0">
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
                className="w-full px-4 py-3 border-b border-solid border-[#00000070]    focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
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
    );
};

export default Login;
