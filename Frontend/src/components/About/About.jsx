import React from "react";
import aboutImg from '../../assets/images/about.png'
import aboutCardImg from '../../assets/images/about-card.png'
import { Link } from "react-router-dom";

const About = () => {
    return (
        <section>
            <div className="container">
                <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
                    <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
                        <img src={aboutImg} alt="aboutImg"/>
                        <div className="absolute z-5 bottom-[-1rem] w-[200px] md:w-[300px] right-[-40%] md:right-[5%] lg:right-[10%]">
                            <img src={aboutCardImg} alt="aboutCardImg" />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <h2 className="heading">Proud to be one of the nations best</h2>
                        <p className="text_para">For 30 years in a row, U.S. News & World Report has recoginzed us Texas. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab optio dolores atque ad magni sequi quam.</p>
                        <p className="text_para mt-[30px]">Our best is something we strive for each day, caring for our patients-not looking back at what we accomplished but towards what we can do tomorrow. Providing the best. Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe dolores architecto vitae aspernatur? </p>
                        <Link to="/"><button className="btn">Learn more</button></Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;