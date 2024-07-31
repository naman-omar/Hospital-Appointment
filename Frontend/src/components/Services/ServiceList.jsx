/* eslint-disable react/jsx-key */

import { services } from "../../assets/data/services";
import ServiceCard from "./ServiceCard";

const ServiceList = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 mt-[30px] lg:mt-[55px]">
      {services.map((item, idx) => {
        return <ServiceCard item={item} idx={idx} />;
      })}
    </div>
  );
};

export default ServiceList;
