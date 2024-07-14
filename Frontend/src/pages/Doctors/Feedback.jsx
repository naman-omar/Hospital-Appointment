import React, {useState}from "react";
import avatar from '../../assets/images/avatar-icon.png'
import { formatDate } from "../../utils/formatDate";
import { FaStar } from "react-icons/fa";
import FeedbackForm from "./FeedbackForm";

const Feedback = () => {
    const [showFeedback,setShowFeedback] = useState(false);
    return (
        <div className="container">
            <div className="mb-[50px]">
                <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">
                    All reviews (272)
                </h4>
                <div className="flex justify-between gap-10 mb-[30px]">
                    <div className="flex gap-4">
                        <img className="w-10 h-10 rounded-full" src={avatar} alt="avatar" />
                        <div>
                            <h5 className="text-[16px] leading-6 text-primaryColor font-bold">Ali Ahmed</h5>
                            <p className="text-[14px] leading-6 text-textColor">{formatDate("02-04-2023")}</p>
                            <div className="flex mt-4 mb-0">
                                <FaStar className="text-yellowColor" />
                                <FaStar className="text-yellowColor" />
                                <FaStar className="text-yellowColor" />
                                <FaStar className="text-yellowColor" />
                                <FaStar className="text-yellowColor" />
                            </div>
                            <p className="text-[15px] text-textColor mt-1 font-[400]">Good services, Highly recommended👍</p>
                        </div>
                    </div>
                </div>
                {!showFeedback && <div className="pl-1 mb-8">
                    <button className="btn" onClick={() => setShowFeedback(true)}>Give Feedback</button>
                </div>}
                {showFeedback && <FeedbackForm/>}
            </div>
        </div>
    )
}

export default Feedback;