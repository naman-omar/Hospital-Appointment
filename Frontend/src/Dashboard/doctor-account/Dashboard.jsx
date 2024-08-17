import { useState } from "react";
import { MdError } from "react-icons/md";
import Loader from "../../components/Loader/Loading.jsx";
import Error from "../../components/Error/Error.jsx";
import useGetProfile from "../../hooks/useFetchData.js";
import { BASE_URL } from "../../config.js";
import Tabs from "./Tabs.jsx";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "../../pages/Doctors/DoctorAbout.jsx";
import Profile from "./Profile.jsx";
import Appointments from "./Appointments.jsx";

const Dashboard = () => {
  const { data, loading, error } = useGetProfile(
    `${BASE_URL}/doctors/profile/me`
  );
  const [tab, setTab] = useState("overview");

  return (
    <section className="pt-[45px]">
      <div className="max-w-[1170px] px-5 mx-auto">
        {loading && !error && <Loader />}
        {error && !loading && <Error errMsg={error}/>}
        {!loading && !error && (
          <div className="grid lg:grid-cols-3 gap-[50px] lg:gap-[100px] ">
            <Tabs tab={tab} setTab={setTab} />
            <div className="lg:col-span-2">
              {data.isApproved === "pending" && (
                <div className="flex p-4 mb-4 text-yellow-500 bg-yellow-50 rounded-lg">
                  <span>
                    <MdError className="text-yellow-500 size-5" />
                  </span>
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    To get approval please complete your profile. We&apos;ll
                    review manually and approve within 3 days.
                  </div>
                </div>
              )}
              {data.isApproved === "rejected" && (
                <div className="flex p-4 mb-4 text-red-500 bg-red-50 rounded-lg">
                  <span>
                    <MdError className="text-red-500 size-5" />
                  </span>
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                   Your profile get rejected!
                  </div>
                </div>
              )}
              <div className="mt-8">
                {tab === "overview" && (
                  <div>
                    <div className="flex items-center gap-4 mb-10 flex-col sm:flex-row">
                      <figure className="self-start sm:self-center max-w-[200px] max-h-[200px]">
                        <img src={data.photo} alt="" className="w-full" />
                      </figure>
                      <div>
                        <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-[600]">
                          {data.specialization}
                        </span>
                        <h3 className="text-[22px] leading-9 font-bold text-headingColor mt-4">
                          {data.name}
                        </h3>
                        <div className="flex items-center gap-[6px]">
                          <span className="flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-[600]">
                            <img src={starIcon} alt="starIcon" />
                            {data.averageRating}
                          </span>
                          <span className="text-textColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-[400]">
                            ({data.totalRating})
                          </span>
                        </div>
                        <p className="text-[15px] lg:maxw-[390px] leading-6 mt-4">
                          {data.bio}
                        </p>
                      </div>
                    </div>
                    <DoctorAbout
                      name={data.name}
                      about={data.about}
                      qualifications={data.qualifications}
                      experiences={data.experiences}
                    />
                  </div>
                )}
                {tab === "appointments" && <Appointments appointments={data.appointments}/>}
                {tab === "profile" && <Profile doctorData={data} /> }
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
