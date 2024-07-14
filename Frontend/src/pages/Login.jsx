import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputData = async (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <section className="px-4 md:pt-[80px] pb-[30px]">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-xl p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Hello! <span className="text-primaryColor">Welcome</span> Back 🎉
        </h3>
        <form className="py-4 md:py-0">
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
              name="email"
              value={formData.password}
              onChange={handleInputData}
              className="w-full px-4 py-3 border-b border-solid border-[#00000070]    focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
              required
            />
          </div>
          <div className="mt-7">
            <button className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
              Login
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
