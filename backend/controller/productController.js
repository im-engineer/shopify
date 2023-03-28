import mongoose from "mongoose";
import product from '../model/productModel';
import jwt from 'jsonwebtoken'
import {SendEmail} from '../middleware/sendMail'
const stripe = require('stripe')('sk_test_51Ll5ZbSCqalvMnwCXihsO0j1rHvl6yd64R05UEz3DijoB3NEayO2FL8xy0quIlBxEWR2qw8zGoToeHgRy2dEUpUV00WZgRCpZH')


//-------------------------->>>>>> Add Your Product <<<<<<--------------------------
export const addProduct = async(req,res) => {
    try{
        const productData = new product (
            {
                title : req.body.title,
                price : req.body.price,
                rating : req.body.rating,
                description : req.body.description,
                image : req.file.filename
            }
        );
        const productDetail = await productData.save();
        res.send({status:true,message:"successfull",result:productDetail})
    }catch(e){
        res.send({status:true,message:"Hahaha...Bro I'm Error",result:productDetail})

    }
}

//-------------------------->>>>>> Product List <<<<<<--------------------------
export const productList = async(req,res) =>{
    try{
        const list = await product.find()
        // console.log("list",list)
        res.send({
            status:true,
            message:"store add",
            result:list
        })
    }catch(e){
        res.send({ status: false, messgae: "List Not Found", Result: e });
    }
}

//-------------------------->>>>>> Get Product Through Id <<<<<<--------------------------
export const getProductThroughId = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await product.findById({ _id: id }).populate("userid")
        if (result) {
            res.send({ status: true, message: "Success", result: result });
        }
    }
    catch (e) {
        res.send({ status: false, messgae: "Plzz check your id", Result: e });
    }
};

//-------------------------->>>>>> Search Product <<<<<<--------------------------
export const searchProduct = async (req, res) => {
    try {
      const result = await product.find(
                  {  title:{$regex:req.body.input}}       
    );
    console.log(result,"result")
    res.send({
      status:true,
      message:"product find",
      result:result
    })
    }
    catch (e) {
        res.send({ status: false, messgae: "There is glitch", Result: e });
    }
}


//-------------------------->>>>>> Payment <<<<<<--------------------------
export const payment = async (req, res) => {
    try{
        const { title, price,order_id } = req.body;
        const session = await stripe.checkout.sessions.create({
            line_items:
                [
                    {
                        price_data:
                        {
                            currency: 'usd',
                            product_data: {
                                name: title,
                            }, unit_amount: price,
                        }, quantity: 1,
                    },],
            mode: 'payment',
            success_url: `http://localhost:3000/success/${order_id}`,
            cancel_url: 'http://localhost:3000/cancel',
        });
        res.send({ status: true, message: "Success", result: session });
        await addProduct;
    }catch(e){
        res.send({ status: false, messgae: "What are you doing man check your data...I'm error", Result: e });
    }
}


