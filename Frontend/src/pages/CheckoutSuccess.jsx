import {Link} from 'react-router-dom'
import { FcApproval } from "react-icons/fc";


const CheckoutSuccess = () => {
    return (
        <div className=' flex items-center bg-grey-100 md:h-[350px]'>
            <div className='bg-white p-6 md: mx-auto'>
                <div className='text-center'>
                    <h3 className='text-2xl text-grey-900 font-[600] text-center'>
                        <span className='flex justify-center mb-4'><FcApproval size={50}/></span>Payment Done!
                    </h3>
                    <p className='text-grey-600 my-2'>
                        Thankyou for completing your secure online payment.
                    </p>
                    <p>Have a great day!</p>
                    <div className='py-10 text-center'>
                        <Link to="/home" className='px-12 bg-buttonBgColor text-white font-[600] py-3'>Go back to Home</Link>
                    </div>
                </div>
            </div> 
        </div>
    )
};

export default CheckoutSuccess;