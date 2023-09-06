const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const calculateDiscount = require("../utils/calculateDiscount");
const {v4: uuidv4} = require('uuid')

router.post("/create-checkout-session", async (req, res) => {
  try {
    const cartItems = req.body.itemsToCheckout;
    const lineItems = [];

    for (let item of cartItems) {
      let amount = item.product.price * 100;

      if (item.product.discount) {
        const discounted = calculateDiscount(
          item.product.price,
          item.product.discount
        );
        if (discounted && discounted.newAmount) {
          amount = discounted.newAmount * 100;
        }
      }

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.title,
            images: [item.product.image.replace(/ /g,'%20')],
          },
          unit_amount: amount,
        },
        quantity: item.quantity,
      });
    }

    // Create the session for Stripe's Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.origin}/#/payment-success?session_id=${uuidv4()}`,
      cancel_url: `${req.headers.origin}/#/payment-failed?session_id=${uuidv4()}`
    });

    res.status(200).json({ session_id: session.id });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
