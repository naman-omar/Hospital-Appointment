import { HashLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <HashLoader size={30} color="#0067ff" />
    </div>
  );
};

export default Loading;
