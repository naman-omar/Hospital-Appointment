/* eslint-disable react/jsx-key */
import { services } from "../assets/data/services";
import ServiceCard from "../components/Services/ServiceCard";

const Services = () => {
  return (
    <section className="pt-[30px] lg:pt-[60px]">
      <div className="container">
        <h2 className="text-headingColor font-bold text-center text-[36px] mb-8 ">
          Our Services
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
          {services.map((item, idx) => {
            return <ServiceCard item={item} idx={idx} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
