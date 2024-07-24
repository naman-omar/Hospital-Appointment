import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Stripe from 'stripe';

export const getCheckOutSession = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
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
              images: [doctor.photo],
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: req.userId,
        doctorId: doctor._id.toString(),
        ticketPrice: doctor.ticketPrice,
      },
    });

    res.status(200).json({ success: true, session });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message});
  }
};
