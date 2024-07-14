import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const FeedbackForm = () => {
    const [rating,setRating] = useState(0);
    const [hover,setHover] = useState(0);
    const [reviewText,setReviewText] = useState("");

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
    }

    return (
        <div className="pt-30">
            <form action="">
                <div>
                    <h2 className="text-[22px] text-headingColor font-bold mb-4">Feedback Form</h2>
                    <h3 className="text-headingColor text-[16px] leading-6 font-[600] mb-4">
                        How would you rate the overall experience?
                    </h3>
                    <div>
                        {[...Array(5).keys()].map((_,index) => {
                            index = index + 1;
                            return (
                                <button type="button" key={index}
                                className={`${index <= ((rating && hover) || hover) ? "text-yellowColor":"text-grey-400"} bg-transparent border-none outline-none text-[18px] cursor-pointer`}
                                onClick={() => setRating(index)} onMouseEnter={()=>setHover(index)} onMouseLeave={() => setHover(rating)}
                                onDoubleClick={()=>{
                                    setHover(0);
                                    setRating(0);
                                }}>
                                    <span>
                                        <FaStar className="mr-[2px]"/>
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </div>
                <div className="mt-[30px]">
                    <h3 className="text-headingColor text-[16px] leading-6 font-[600] mb-4">
                        Share you feedback or suggestions*
                    </h3>
                    <textarea className="border border-solid border-[#0066ff30] focus:outline outline-primaryColor w-full py-3 px-4 rounded-md" rows="5" placeholder="Write your experience" onChange={(e) => setReviewText(e.target.value)}></textarea>
                </div>
                <button type="submit" onSubmit={handleReviewSubmit} className="btn">Submit Feedback</button>
            </form>
        </div>
    )
}

export default FeedbackForm;