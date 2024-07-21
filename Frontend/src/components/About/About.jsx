import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div className="flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row">
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1">
            <img src={aboutImg} alt="aboutImg" />
            <div className="absolute z-5 bottom-0 w-[200px] md:w-[300px] right-[-40%] md:right-[5%] lg:right-[10%]">
              <img src={aboutCardImg} alt="aboutCardImg" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <h2 className="heading">Proud to be one of the nations best</h2>
            <p className="text_para">
            We are honored to be recognized as one of the nation's top healthcare providers. Our commitment to excellence in patient care, advanced medical treatments, and compassionate service sets us apart. We strive to deliver the highest standard of healthcare.
            </p>
            <p className="text_para mt-[30px]">
              Our best is something we strive for each day, caring for our
              patients-not looking back at what we accomplished but towards what
              we can do tomorrow.
            </p>
            <Link to="/">
              <button className="btn">Learn more</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
