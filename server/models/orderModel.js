import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userid : {type:String , required:true},
    items:{type:Array , required:true},
    amount:{
      type:Number,required:true,
    },
    address:{
        type:Object,
        required:true,
    },
    paymentmethod:{
        type:String,
        required:true,
    },
    status:{
        type:Object,
        required:true,
        default:'order placed'
    },
    payment:{
        type:Boolean,
        required:true,
        default:false
    },
    date:{
        type:Number,
        required:true
    }
})

const orderModel = mongoose.models.order || mongoose.model('order' , orderSchema);
export default orderModel;