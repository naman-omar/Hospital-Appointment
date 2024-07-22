import { useState } from "react";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyBookings from "./MyBookings.jsx";
import ProfileSettings from "./ProfileSettings.jsx";
import useGetProfile from "../../hooks/useFetchData.js";
import { BASE_URL, token} from "../../config.js";
import Loading from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";
import user from "../../assets/images/defaultUser.jpg";

const UserAccount = () => {
  const [tab, setTab] = useState("settings");
  const { dispatch } = useContext(authContext);

  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);
  // console.log("userData",userData);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/home");
    toast.success("You have successfully logged out");
  };

  const handleDeleteAccount = async () => {
    // Show a confirmation dialog
    const confirmed = window.confirm("Are you sure you want to delete your account?");
  
    if (confirmed) {
      try {
        const res = await fetch(`${BASE_URL}/users/deleteUserAccount`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
  
        const result = await res.json();
        console.log("Data", result);
  
        if (!res.ok) {
          throw new Error(result.message);
        }
  
        dispatch({ type: "LOGOUT" });
        navigate("/home");
        toast.success("Your account has been successfully deleted");
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      // Optionally handle the case where the user canceled the delete action
      toast.info("Account deletion canceled");
    }
  };

  return (
    <section>
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loading />}
        {error && !loading && <Error errMsg={error} />}
        {!error && !loading && (
          <div className="grid md:grid-cols-3 gap-10">
            <div className="pb-[50px] px-[30px] rounded-md">
              <div className="flex itmes-center justify-center">
                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                  <img
                    src={userData.photo || user}
                    alt=""
                    className="w-full h-full rounded-full"
                  />
                </figure>
              </div>
              <div className="text-center mt-4">
                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                  {userData.name}
                </h3>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  {userData.email}
                </p>
                <p className="text-textColor text-[15px] leading-6 font-medium">
                  Blood Type:{" "}
                  <span className="ml-2 text-headingColor text-[22px] leading-8">
                    {userData.bloodGroup}
                  </span>
                </p>
              </div>
              <div className="mt-[50px] md:mt-[100px] text-center">
                <button
                  onClick={handleLogout}
                  className="min-w-[80%] bg-[#181A1E] p-3 text-[16px] text-white leading-7 rounded-md mb-4"
                >
                  Logout
                </button>
                <button onClick={handleDeleteAccount} className="min-w-[80%] bg-red-600 p-3 text-[16px] text-white leading-7 rounded-md">
                  Delete Account
                </button>
              </div>
            </div>
            <div className="md:col-span-2 md:px-[30px]">
              <div className="flex">
                <button
                  onClick={() => {
                    setTab("settings");
                  }}
                  className={`${
                    tab === "settings" && "bg-primaryColor text-white"
                  } p-2 px-3 md:px-5 mr-5 text-[14px] rounded-md text-headingColor font-[600] md:text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  Profile Settings
                </button>
                <button
                  onClick={() => {
                    setTab("bookings");
                  }}
                  className={`${
                    tab === "bookings" && "bg-primaryColor text-white"
                  } p-2 px-3 md:px-5 mr-5 text-[14px] rounded-md text-headingColor font-[600] md:text-[16px] leading-7 border border-solid border-primaryColor`}
                >
                  My Appointments
                </button>
              </div>
              {tab === "bookings" && <MyBookings />}
              {tab === "settings" && <ProfileSettings user={userData} />}
            </div>
          </div>
        )}
        ;
      </div>
    </section>
  );
};

export default UserAccount;
