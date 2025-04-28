import orderModel from "../models/orderModel.js";
import User from "../models/Usermodel.js";


// placing cod method
export const placeorder = async(req,res) => {
       
   try {
    const {userid , items,amount ,address} = req.body;
    const orderdata = {
        userid , items , amount , payemntmethod: "COD",
        payment: false, date: Date.now(),address
    }

    const neworder = new orderModel(orderdata)
    await neworder.save();

    await  User.findByIdAndUpdate(userid , {cartdata: {}});

    res.json({
        success:true,
        message:"Order Placed"
    })

   } catch (error) {
       res.json({
        success:false,
        message: error.message
       })
   }

}

// place order with stripe
export const placeorderstripe = async(req,res) => {
    
}


// place order with raxorpay
export const placeorderrazorpay = async(req,res) => {
    
}

export const allorders= async(req,res) => {
   
}


export const userorders= async(req,res) => {
   try {
     const {userid} = req.body;
     const orders = await orderModel.find({userid})
     res.json({
        success:true,
        orders
     })

   } catch (error) {
       res.json({
        success:false,
        messgae:error.message
       })
   } 
}

export const updatestatus= async(req,res) => {
   
}


// 