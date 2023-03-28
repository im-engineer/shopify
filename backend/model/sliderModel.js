import mongoose from "mongoose";
const sliderSchema = new mongoose.Schema(
    {
        sliderimage :{
            type : String
        }
     
    }
)
export default mongoose.model("slider",sliderSchema);