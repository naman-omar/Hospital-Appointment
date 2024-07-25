import { useEffect } from 'react';
import { BASE_URL } from '../config';
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { FcApproval } from "react-icons/fc";
import { toast } from 'react-toastify';


const CheckoutSuccess = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const success = query.get('success');
    const bookingId = query.get('bookingId');

    useEffect(() => {
        const verifyBooking = async () => {
            try {
                const res = await fetch(`${BASE_URL}/bookings/verify`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ bookingId, success })
                });

                await res.json();
            } catch (err) {
                console.log(err.message);
            }
        };

        verifyBooking();
    }, [success, bookingId]);
    return (
        <>
        {success === "true" && <div className=' flex items-center bg-grey-100 md:h-[350px]'>
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
        </div>}
        {success === "false" && <div className=' flex items-center bg-grey-100 md:h-[350px]'>
            <div className='bg-white p-6 md: mx-auto'>
                <div className='text-center'>
                <h3 className='text-2xl text-grey-900 font-[600] text-center mb-4'>
                        Payment Cancelled!
                    </h3>
                    <p>Have a great day!</p>
                    <div className='py-10 text-center'>
                        <Link to="/home" className='px-12 bg-buttonBgColor text-white font-[600] py-3'>Go back to Home</Link>
                    </div>
                </div>
            </div> 
        </div>}
        </>
    )
};

export default CheckoutSuccess;



