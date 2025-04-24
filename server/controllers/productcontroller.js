import productModel from "../models/Productmodel.js";
import {v2 as cloudinary} from 'cloudinary'



// function for add product
export const addproduct = async(req,res) =>{
    try {
        const {name,description,price,category , subcategory ,sizes, bestseller} = req.body;

        const image1=req.files.image1 &&  req.files.image1[0];
        const image2=req.files.image2 &&  req.files.image2[0];
        const image3=req.files.image3 &&  req.files.image3[0];
        const image4=req.files.image4 &&  req.files.image4[0];

        const images = [image1,image2,image3,image4].filter((item) => item !== undefined)

        const image_url = await Promise.all(
            images.map(async(item) => {
                let res = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return res.secure_url
            })
        )

        const productdata = {
            name,description , category , subcategory  ,price: Number(price) ,
            bestseller : bestseller === 'true' ? true : false,  
            sizes: JSON.parse(sizes), image: image_url , 
            date : Date.now()
        }


        // console.log(productdata);
        const product = new productModel(productdata);

        await product.save();



        res.json({
            success:true,
            message: "Prouct Added"
        });



    } catch (error) {
        console.log(error.message)
        res.json({
            success:false,
            message: error.message
        })
    }
}

// function for list product
export const listproduct = async(req,res) =>{
    try {
        
       const products = await productModel.find({});
       res.json({
        success:true,
        products
       })

    } catch (error) {
        console.log(error.message)
        res.json({
            success:false,
            message: error.message
        })
    }
}


// function for remove product
export const removeproduct = async(req,res) =>{
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({
            success:true,
            message: "Product removed"
        })
        
    } catch (error) {
        console.log(error.message)
        res.json({
            success:false,
            message: error.message
        })
    }
}


//function for single product info
export const singleproduct = async(req,res) =>{
    try {
          
        const {productid} = req.body;
        const product = await productModel.findById(productid)

        res.json({
            success:true,
            product
        })

    } catch (error) {
        console.log(error.message)
        res.json({
            success:false,
            message: error.message
        })
    }
}

