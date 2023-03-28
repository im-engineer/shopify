import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true
        },
        price:{
            type:String,
            required:true
        },
        rating : {
            type : String,
            required : true
        },
        description:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        quantity:{
            type:String
        },
    }
)

const productData = mongoose.model("product",productSchema);
export default productData;