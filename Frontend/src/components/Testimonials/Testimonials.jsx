
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { HiStar } from "react-icons/hi";
import {testimonials} from "../../assets/data/testimonials";

const Testimonials = () => {
  return (
    <div className="container">
      <div className="mt-[30px] lg:mt-[100px] pb-0">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
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
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="py-[30px] px-5 max-w-[400px] rounded-3">
                <div className="flex items-center flex-wrap gap-3">
                  <figure className="h-12 w-12 rounded-lg overflow-hidden">
                    <img src={item.photo} alt="" className="w-full h-full rounded-lg"/>
                  </figure>
                  <div>
                    <h4 className="text-[18px] leading-[30px] font-[600] text-headingColor">
                      {item.name}
                    </h4>
                    <div className="flex">
                      {[...Array(item.rating)].map((_, i) => (
                        <HiStar key={i} className="text-yellowColor w-5 h-5" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[14px] leading-4 mt-4 text-textColor font-[400]">
                  {item.content}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
