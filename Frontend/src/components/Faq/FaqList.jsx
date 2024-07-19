import { faqs } from "../../assets/data/faqs";
import FaqItem from "./FaqItem";

const FaqList = () => {
  return (
    <div className="mt-[38px]">
      {faqs.map((item, idx) => {
        return <FaqItem item={item} key={idx} />;
      })}
    </div>
  );
};

export default FaqList;
