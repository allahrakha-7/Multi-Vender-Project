import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    phoneNumber: { 
        type: String 
    },
    addressInfo: [
        {
            country: String,
            city: String,
            address1: String,
            address2: String,
            zipCode: String,
        }
    ],
    cart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, 
                ref: "Product" 
            },
            quantity: { 
                type: Number, 
                default: 1 
            }
        }
    ],
    status: { 
        type: String, 
        default: "Processing" 
    },
    paymentInfo: {
      id: { 
        type: String, 
        default: null 
    }, 
      status: { 
        type: String, 
        default: "Unpaid" 
    },
      type: { 
        type: String, 
        enum: ["COD", "Card", "UPI", "PayPal"], 
        },
    },
    paidAt: Date,
    deliveredAt: Date
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
