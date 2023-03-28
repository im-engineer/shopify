import mongoose from "mongoose";
const contactSchema = new mongoose.Schema(
    {
        email:{
            type:String
        },
        textarea:{
            type:String
        }
     
    }
)
export default mongoose.model("contact",contactSchema);