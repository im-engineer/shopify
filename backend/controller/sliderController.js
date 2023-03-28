import mongoose from "mongoose";
import slider from "../model/sliderModel"

//-------------------------->>>>>> Upload Slider <<<<<<--------------------------
export const sliderUpload = async(req,res) => {
    try{
        const addImage = new slider({
            sliderimage:req.file.filename
        })
        const imageData = await addImage.save();
        console.log(imageData)
        res.send({
            status:200,
            message:"Buddy your slider image added successfully",
            result:imageData
        })
    }catch(e){
        res.send({status:true,message:"Go and find your bug error there",result:e})

    }
}

//-------------------------->>>>>> Slider List <<<<<<--------------------------
export const sliderList = async(req,res) => {
    try{
        const list = await slider.find({});
        res.send({
            status:true,
            message:"Your slider image here",
            result:list
        })
    }catch(e){
        res.send({status:true,message:"Go and find your bug error there",result:e})
    }
}