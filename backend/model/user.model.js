import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  avatar:{
      type: String,
      default: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG-Pic.png",
  },
  phoneNumber: {
    type: Number,
  },
  role:{
    type: String,
  },
  addressInfo:[
    {
      country: {
        type: String,
      },
      city:{
        type: String,
      },
      address1:{
        type: String,
      },
      address2:{
        type: String,
      },
      zipCode:{
        type: Number,
      },
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
},
 {timestamps: true}
);

const User = mongoose.model("User", userSchema);

export default User;