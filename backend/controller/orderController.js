import order from '../model/orderModel';

//-------------------------->>>>>> Plzz Add Your Order <<<<<<--------------------------
export const addOrder = async (req, res) => {
    try {
        const addorderr = new order({
            userid: req.body.userid,
            productid: req.body.productid,
            title: req.body.title,
            price:req.body.price,
            pay: req.body.pay,
            mode:req.body.mode
        })
        const orderdata = await addorderr.save();
        if (orderdata) {  
            res.send({ status: true, message: "Ordered Data", result: orderdata })
        }
    }
    catch (e) {
        res.send({ status: false, messgae: "No Results Found", Result: e });
    }
}


//-------------------------->>>>>> Get Your Order Through Id <<<<<<--------------------------
export const orderDetailById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await order.findById({ _id: id });
        if (result) {
            res.send({ status: true, message: "Success", result: result });
        }
    }
    catch (e) {
        res.send({ status: false, messgae: "No Results Found", Result: e });
    }
};

//-------------------------->>>>>> Update Your Order <<<<<<--------------------------
export const UpdateOrder = async (req,res) => {
    try {
        console.log("Hurreh",req.body.id)    
        order.updateOne({ _id: req.body.id },
            { $set: {pay : "Paid"} },
            { new: true },
            (err, updatedlist) => {
                if (err) {
                    res.send({ status: 404, message: "Failed", result: err })
                } else {
                    res.send({ status: 200, message: "Updated Successfully", result: updatedlist })
                }
            })
    }
    catch (e) {
        res.send({ status: false, messgae: "No Results Found", Result: e });
    }
  }
  
//-------------------------->>>>>> Order History <<<<<<--------------------------
export const orderHistory = async(req,res) => {
    try{
        const list = await order.find({});
        res.send({
            status:true,
            message:"Your orderd history is here",
            result:list
        })
    }catch(e){
        res.send({ status: false, messgae: "First check ur bug", Result: e });

    }
}