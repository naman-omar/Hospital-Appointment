/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FaqItem = ({item, key}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toogleOpen = () => {
    if (!isOpen) setIsOpen(true);
    else setIsOpen(false);
  };
  return (
    <div key={key} className="p-3 lg:p-5 rounded-[12px] border border-solid border-[#D9DCE2] mb-5">
      <div
        className="flex justify-between items-center gap-5"
        onClick={toogleOpen}
      >
        <h4 className="text-[14px] font-[500] leading-7 md:text-[18px] xl:text-[22px] lg:leading-8 text-headingColor">
          {item.question}
        </h4>
        <div className="w-7 h-7 border border-solid border-[black] rounded flex items-center justify-center">
          {isOpen ? (
            <AiOutlineMinus className="h-5 w-5" />
          ) : (
            <AiOutlinePlus className="h-5 w-5" />
          )}
        </div>
      </div>
      {isOpen && (
        <div className="mt-4">
          <p className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
            {item.content}
          </p>
        </div>
      )}
    </div>
  );
};

export default FaqItem;


