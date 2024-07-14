import React from "react"
import { services } from '../assets/data/services'
import ServiceCard from "../components/Services/ServiceCard";

const Services = () => {
    return (
        <section className="pt-[60px]">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8">
                {services.map((item,idx) => {
                    return <ServiceCard item={item} idx={idx} />
                })}
        </div>
            </div>
        </section>
    );
};

export default Services;