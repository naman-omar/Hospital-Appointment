import Booking from '../models/BookingSchema.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const { userId, doctorId, ticketPrice } = session.metadata;

      const booking = new Booking({
        doctor: doctorId,
        user: userId,
        ticketPrice: ticketPrice,
        session: session.id,
      });

      await booking.save();

      res.status(200).json({ success: true, message: 'Booking created successfully' });
    } catch (err) {
      console.error('Error creating booking:', err);
      res.status(500).json({ success: false, message: 'Failed to create booking' });
    }
  } else {
    res.status(200).json({ received: true });
  }
};
