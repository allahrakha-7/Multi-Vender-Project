import Stripe from "stripe";

export const createCheckOutSession = async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { product } = req.body;

  try {
    if (!product || !product.name || !product.price || !product.image) {
      return res.status(400).json({ error: "Invalid product data" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "pkr",
            product_data: {
              name: product.name,
              images: [product.image],
            },
            unit_amount: Math.round(product.price), 
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/success`,
      cancel_url: `http://localhost:5173/cancel`,
      metadata: { productId: product._id }, 
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
};