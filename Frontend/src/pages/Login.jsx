import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config.js";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import { authContext } from "../context/AuthContext.jsx";

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
    //console.log('Form data:', formData); // Debugging log

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
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
      toast.success(resData.message || "Registration successful");
      navigate("/home");
      setTimeout(()=>{
        window.location.reload();
      }, 3000);
      
    } catch (err) {
      //console.error('Error:', err); // Debugging log
      toast.error(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <section className="px-4 md:pt-[80px] pb-[30px]">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-xl p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back 🎉
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
          <p className="mt-5 text-textColor text-center">
            Don&apos;t have an account?{" "}
            <Link className="text-primaryColor ml-1" to="/signup">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
