import express from 'express';
import Stripe from 'stripe';
import { verifyToken } from '../middleware/verifyToken.js'; // Assuming you have an auth middleware

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
router.post('/create-payment-intent', verifyToken, async (req, res) => {
  try {
    const { amount, userId } = req.body;

    // Validate input
    if (!amount || !userId) {
      return res.status(400).json({ error: 'Amount and userId are required' });
    }

    // Verify userId matches authenticated user
    if (userId !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized user' });
    }

    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert GBP to pence
      currency: 'gbp',
      metadata: { userId }, // Store userId for reference
    });

    // Return the client secret
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

export default router;