
import User from "../models/Usermodel.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createtoken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET)
}

//route for user login
export const loginuser = async(req,res) => {
    try {
        const {email , password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.json({
                success:false,
                message: "User not register with us"
            })
        }

        const ismatch = await bcrypt.compare(password , user.password);

        if(!ismatch){
            return res.json({
                success:false,
                message: "Invalid credentials"
            })
        }
        else {
            const token = createtoken(user._id);
            return res.json({
                success:true,
                token
            })
        }

    } catch (error) {
        console.log(`${error}`)
        res.json({
            success:false,
            message:error.message
        })
    }
}

// route for user register
export const registeruser = async(req,res) => {
    try {
        const {name,email,password} = req.body;
        
        // check preexisting email
        const existuser = await User.findOne({email});
        if(existuser) return res.json({success:false, message: 'User already exists'});

        // validating email
        if(!validator.isEmail(email)){
            return res.json({
                success:false,
                message: "Email is not valid"
            })
        }

        if(password.length < 7){
            return res.json({
                success:false,
                message: "Please enter strong password"
            })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password,salt);

        const newuser = new User({
            name,email , password:hashedpass
        })

        const user = await newuser.save();

        const token = createtoken(user._id);
        res.json({
            success:true,
            token
        })



    } catch (error) {
        console.log(`${error}`)
        res.json({
            success:false,
            message:error.message
        })
    }
}

