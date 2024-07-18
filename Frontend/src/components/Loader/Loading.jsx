import HashLoader from "react-spinners/HashLoader"

const Loading = () => {
    return (
        <div className="flex items-center justify-center absolute top-[50%] left-[50%]">
            <HashLoader size={30} color="#0067ff"/> 
        </div>
    );
};

export default Loading;