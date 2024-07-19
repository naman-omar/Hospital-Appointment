import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import patientAvatar from "../../assets/images/patient-avatar.png";
import { HiStar } from "react-icons/hi";

const Testimonials = () => {
  return (
    <div className="container">
      <div className="mt-[30px] lg:mt-[100px] pb-0">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          <SwiperSlide>
            <div className="py-[30px] px-5 max-w-[400px] rounded-3">
              <div className="flex items-center flex-wrap gap-3">
                <img src={patientAvatar} alt="patientAvatar" />
                <div>
                  <h4 className="text-[18px] leading-[30px] font-[600] text-headingColor">
                    Muhibur Rahman
                  </h4>
                  <div className="flex">
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                  </div>
                </div>
                <p className="text-[14px] leading-4 mt-4 text-textColor font-[400]">
                  "I have taken medical from them. They treat so well and they
                  are providing the best medical services."
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="py-[30px] px-5 max-w-[400px] rounded-3">
              <div className="flex items-center flex-wrap gap-3">
                <img src={patientAvatar} alt="patientAvatar" />
                <div>
                  <h4 className="text-[18px] leading-[30px] font-[600] text-headingColor">
                    Muhibur Rahman
                  </h4>
                  <div className="flex">
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                  </div>
                </div>
                <p className="text-[14px] leading-4 mt-4 text-textColor font-[400]">
                  "I have taken medical from them. They treat so well and they
                  are providing the best medical services."
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="py-[30px] px-5 max-w-[400px] rounded-3">
              <div className="flex items-center flex-wrap gap-3">
                <img src={patientAvatar} alt="patientAvatar" />
                <div>
                  <h4 className="text-[18px] leading-[30px] font-[600] text-headingColor">
                    Muhibur Rahman
                  </h4>
                  <div className="flex">
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                  </div>
                </div>
                <p className="text-[14px] leading-4 mt-4 text-textColor font-[400]">
                  "I have taken medical from them. They treat so well and they
                  are providing the best medical services."
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="py-[30px] px-5 max-w-[400px] rounded-3">
              <div className="flex items-center flex-wrap gap-3">
                <img src={patientAvatar} alt="patientAvatar" />
                <div>
                  <h4 className="text-[18px] leading-[30px] font-[600] text-headingColor">
                    Muhibur Rahman
                  </h4>
                  <div className="flex">
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                  </div>
                </div>
                <p className="text-[14px] leading-4 mt-4 text-textColor font-[400]">
                  "I have taken medical from them. They treat so well and they
                  are providing the best medical services."
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="py-[30px] px-5 max-w-[400px] rounded-3">
              <div className="flex items-center flex-wrap gap-3">
                <img src={patientAvatar} alt="patientAvatar" />
                <div>
                  <h4 className="text-[18px] leading-[30px] font-[600] text-headingColor">
                    Muhibur Rahman
                  </h4>
                  <div className="flex">
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                    <HiStar className="text-yellowColor w-5 h-5"></HiStar>
                  </div>
                </div>
                <p className="text-[14px] leading-4 mt-4 text-textColor font-[400]">
                  "I have taken medical from them. They treat so well and they
                  are providing the best medical services."
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
