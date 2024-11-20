/* eslint-disable react/prop-types */
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { AiFillStar } from "react-icons/ai";
import FeedbackForm from "./FeedbackForm";

const Feedback = ({reviews, totalRating}) => {
  const [showFeedback, setShowFeedback] = useState(false);
  return (
    <div className="container pl-0">
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px]  font-bold text-headingColor mb-[30px]">
          All reviews ({totalRating})
        </h4>
        {reviews?.map((review, index) => {
            return <div key={index} className="sm:flex justify-between gap-10 mb-[30px]">
              <div className="flex gap-4">
                <img className="w-10 h-10 rounded-full" src={review?.user?.photo} alt="" />
                <div>
                  <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                    {review?.user?.name}
                  </h5>
                  <p className="text-[12px] sm:text-[14px] leading-6 text-textColor">
                    {formatDate(review?.createdAt)}
                  </p>
                  <div className="flex sm:hidden mt-2">
                    {[...Array(review?.rating).keys()].map((_,index) => (
                      <AiFillStar key={index} color="#0067FF"/>
                    ))}
                  </div>
                  <p className="text-[15px] text-textColor mt-1 font-[400]">
                    {review?.reviewText}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex sm:gap-1">
                {[...Array(review?.rating).keys()].map((_,index) => (
                  <AiFillStar key={index} color="#0067FF"/>
                ))}
              </div>
            </div>
        })}
    
        {!showFeedback && (
          <div className="pl-1 mb-8">
            <button className="btn" onClick={() => setShowFeedback(true)}>
              Give Feedback
            </button>
          </div>
        )}
        {showFeedback && <FeedbackForm />}
      </div>
    </div>
  );
};

export default Feedback;
