import User from "../models/UserSchema.js"
import Doctor from "../models/DoctorSchema.js"
import Booking from "../models/BookingSchema.js"
import Stripe from 'stripe'

export const getCheckOutSession = async (req,res) => {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

    try{
        const doctor = await Doctor.findById(req.params.doctorId)
        const user = await User.findById(req.userId);

        const booking = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.ticketPrice,
        })
        await booking.save();

        //create stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.CLIENT_SITE_URL}/verify?success=true&bookingId=${booking._id}`,
            cancel_url: `${process.env.CLIENT_SITE_URL}/verify?success=false&bookingId=${booking._id}`,
            customer_email: user.email,
            client_reference_id: req.params.doctorId,
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        unit_amount: doctor.ticketPrice * 100,
                        product_data: {
                            name: doctor.name,
                            description: doctor.specialization,
                            images: [doctor.photo]
                        }
                    },
                    quantity: 1
                }
            ]
        })
        res.status(200).json({success: true, message: "Successfully paid", session_url: session.url})
    }catch(err){
        res.status(500).json({success: false, message: "Payment failed, try again"})
    }
};

export const verifyBooking = async (req,res) => {
    const {bookingId, success} = req.body;
    try{
        if(success === "true"){
            await Booking.findByIdAndUpdate(bookingId, {isPaid: true});
            res.status(200).json({success: true, message:"Paid"})
        }
        else{
            await Booking.findByIdAndDelete(bookingId);
            res.status(200).json({success: false, message: "Not paid"})
        }
    }catch(error){
        res.status(500).json({success:false, message: err.message})
    }
}

export const getAllAppointments = async (req, res) => {
    try {
      const appointments = await Booking.find({});
      res.status(200).json({
        success: true,
        data: appointments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
};

export const updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (!['pending', 'approved', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }
  
      const appointment = await Booking.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      res.status(200).json(appointment);
    } catch (error) {
      console.error('Error updating status:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  