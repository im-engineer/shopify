import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
  username: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  address: {
    type: String,
  },
  image: {
    type: String,
  },
  created: {
    type: String,
    default: new Date().toISOString(),
  },
  otp: {
    type: Number,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});
const usersdata = mongoose.model("shopping", usersSchema);
export default usersdata;
