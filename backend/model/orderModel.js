import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userid: {
        type: String,
        ref: "shopping"
    },
    productid: {
        type:String,
        ref: "product"
    },
    title:{
        type:String
    },
    price:{
        type:String
    },
    pay:{
        type:String,
        default:"unpaid"
    },
    mode:{
        type:String,
        enum:["COD","Online"]
    },
    created: {
        type: String,
        default: new Date().toISOString(),
    }
});
const usersdata = mongoose.model("order", orderSchema);
export default usersdata;
