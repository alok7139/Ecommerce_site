import jwt from 'jsonwebtoken'

export const authuser = async(req,res , next) =>{
      
    const {token} = req.headers;

    if(!token){
        return res.json({
            success:false,
            message: "Not Authorized Please Login"
        })
    }

    try {
        
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);

        req.body.userid = token_decode.id;
        next()

    } catch (error) {
        console.log(error.message);
        res.json({
            success:false,
            message: error.message
        })
    }

}