import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectdb } from './config/mongodb.js';
import { connectcloudinary } from './config/cloudinary.js';
import userroutes from './routes/userroutes.js'
import productroute from './routes/productroute.js'

// app config
const app = express();
const port = process.env.PORT || 4000;
connectcloudinary();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
       origin: [process.env.FRONTEND_URI],
       methods: ["GET" , "POST" , "PUT" , "DELETE"],
       credentials:true,
}))

// api endpoint
app.use('/api/user' , userroutes);
app.use('/api/product' , productroute );
app.get('/' , (req,res) => {
    res.send('API WORKING');
})

app.listen(port , () => {
    console.log(`server is listen on ${port}`)
})

connectdb();

