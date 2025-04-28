import productModel from "../models/Productmodel.js";
import User from "../models/Usermodel.js";


// add products to user cart
export const addtocart = async(req,res) => {
  try {
    const {userid , itemid , size} = req.body;
    const userdata = await User.findById(userid)

    const cartdata = await userdata.cartdata

    if(cartdata[itemid]){
        if(cartdata[itemid][size]){
            cartdata[itemid][size] +=1;
        }
        else{
            cartdata[itemid][size]=1;
        }
    }
    else{
        cartdata[itemid] = {}
        cartdata[itemid][size]=1;
    }

    await User.findByIdAndUpdate(userid, {cartdata})
    res.json({
        success:true,
        message: "Added To Cart"
    })
  } catch (error) {
    console.log(error)
    res.json({
        success:false,
        message: error.message
    })
  }
}


// update user cart
export const updatecart = async(req,res) => {
  try {
    const {userid , itemid, size ,quantity} = req.body;
    const userData = await User.findById(userid);
    let cartdata =  await userData.cartdata;
    cartdata[itemid][size] = quantity;
    await User.findByIdAndUpdate(userid, {cartdata})
    res.json({
        success:true,
        message: "Cart Updated"
    })
  } catch (error) {
    console.log(error)
    res.json({
        success:false,
        message: error.message
    })
  }
}


// get user cart data
export const getcartdata = async(req,res) => {
  try {
    const {userid} = req.body;
    const userData = await User.findById(userid);
    let cartdata =  await userData.cartdata;

    res.json({
        success:true,
        cartdata
    })

  } catch (error) {
    console.log(error)
    res.json({
        success:false,
        message: error.message
    })
  }
}