

const Error = ({errMsg}) => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="flex text-headingColor text-[20px] leading-[30px] font-[600]">
                {errMsg}
            </div>
        </div>
    )
}

export default Error;