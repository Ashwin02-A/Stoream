const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to connect

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Order Endpoint
app.post("/api/create-order", async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert to paise (₹1 = 100 paise)
      currency: currency || "INR",
    });
    res.json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});