import React from "react"
import heroImg01 from '../assets/images/hero-img01.png'
import heroImg02 from '../assets/images/hero-img02.png'
import heroImg03 from '../assets/images/hero-img03.png'
import icon01 from '../assets/images/icon01.png'
import icon02 from '../assets/images/icon02.png'
import icon03 from '../assets/images/icon03.png'
import { BsArrowRightCircle } from "react-icons/bs"
import { Link } from "react-router-dom"
import About from "../components/About/About"
import ServiceList from "../components/Services/ServiceList"

const Home = () => {
    return (
        <div>
            <section className="hero_section pt-[60px] lg:h-[750px]">
                <div className="container">
                    <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
                        <div>
                            <div className="lg:w-[570px]">
                                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">We help patients live a healthy, longer life.</h1>
                                <p className="text_para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores itaque animi, voluptatum ipsa aperiam odit consequuntur ut, hic ullam nesciunt corporis, sapiente alias autem accusantium aliquid repellendus. Numquam, itaque magni.</p>
                                <button className="btn">Request an Appointment</button>
                            </div>
                            <div className="mt-[30px] lg:mt-[55px] flex flex-col sm:flex-row lg:items-center gap-4 lg:gap-[30px]">
                                <div>
                                    <h2 className="text-[36px] leading-[56px] lg-text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                                        30+
                                    </h2>
                                    <span className="w-[80px] h-2 bg-yellowColor rounded-full block mt-[-16px]"></span>
                                    <p className="text_para mt-2 text-[1rem]">Years of Experience</p>
                                </div>
                                <div>
                                    <h2 className="text-[36px] leading-[56px] lg-text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                                        15+
                                    </h2>
                                    <span className="w-[80px] h-2 bg-purpleColor rounded-full block mt-[-16px]"></span>
                                    <p className="text_para mt-2 text-[1rem]">Clinic Location</p>
                                </div>
                                <div>
                                    <h2 className="text-[36px] leading-[56px] lg-text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                                        100%
                                    </h2>
                                    <span className="w-[80px] h-2 bg-irisBlueColor rounded-full block mt-[-16px]"></span>
                                    <p className="text_para mt-2 text-[1rem]">Patient Satisfaction</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center gap-[30px]">
                            <div>
                                <img className="w-full" src={heroImg01} alt="heroImage1" />
                            </div>
                            <div className="mt-[30px]">
                                <img className="w-full mb-[30px]" src={heroImg02} alt="heroImage2" />
                                <img className="w-full" src={heroImg03} alt="heroImage3"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="lg:w-[470px] flex items-center flex-col mx-auto">
                        <h2 className="heading text-center">Providing the best medical services</h2>
                        <p className="text_para text-center max-w-[470px]">World-class care for everyone. Our health System offers unmatched, expert healthcare.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[80px] lg:gap-[30px] mt-[30px] lg:mt-[55px]">
                        <div className="flex flex-col items-center justify-center">
                            <img src={icon01} alt="icon01"/>
                            <div className="text-[26px] leading-9 text-headingColor font-[700] text-center mt-[2rem]">Find a Doctor</div>
                            <p className="text-[16px] leading-7 text-textColor font-[400] mt-1 text-center max-w-[470px]">World-class care for everyone. Our health System offers unmatched, expert healthcare.</p>
                            <Link to="/doctors">
                                <div className="w-9 h-9 mt-4 rounded-full flex items-center justify-center hover:bg-primaryColor hover:text-white">
                                    <BsArrowRightCircle className="w-8 h-8"/>
                                </div>
                            </Link>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img src={icon02} alt="icon01"/>
                            <div className="text-[26px] leading-9 text-headingColor font-[700] text-center mt-[2rem]">Find a Location</div>
                            <p className="text-[16px] leading-7 text-textColor font-[400] mt-1 text-center max-w-[470px]">World-class care for everyone. Our health System offers unmatched, expert healthcare.</p>
                            <Link to="/doctors">
                                <div className="w-9 h-9 mt-4 rounded-full flex items-center justify-center hover:bg-primaryColor hover:text-white">
                                    <BsArrowRightCircle className="w-8 h-8"/>
                                </div>
                            </Link>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <img src={icon03} alt="icon01"/>
                            <div className="text-[26px] leading-9 text-headingColor font-[700] text-center mt-[2rem]">Book Appointment</div>
                            <p className="text-[16px] leading-7 text-textColor font-[400] mt-1 text-center max-w-[470px]">World-class care for everyone. Our health System offers unmatched, expert healthcare.</p>
                            <Link to="/doctors">
                                <div className="w-9 h-9 mt-4 rounded-full flex items-center justify-center hover:bg-primaryColor hover:text-white">
                                    <BsArrowRightCircle className="w-8 h-8"/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <About/>
            <section>
                <div className="container">
                    <div className="max-w-[470px] mx-auto">
                        <h2 className="heading text-center">Our medical services</h2>
                        <p className="text_para text-center">World-class care for everyone. Our health System offers unmatched, expert healthcare.</p>
                    </div>
                    <ServiceList/>
                </div>
            </section>
        </div>
    );
};

export default Home;

