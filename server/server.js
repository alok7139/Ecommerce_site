import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectdb } from './config/mongodb.js';
import { connectcloudinary } from './config/cloudinary.js';
import userroutes from './routes/userroutes.js'
import productroute from './routes/productroute.js'
// import cartroute from './routes/cartroute.js'
import { availableParallelism } from 'node:os';
import process from 'node:process';

// app config

const numCPUs = availableParallelism();

console.log(numCPUs);

const app = express();
const port = process.env.PORT ;
connectcloudinary();

// middleware
app.use(cors({
    origin: [process.env.FRONTEND_URI],
    methods: ["GET" , "POST" , "PUT" , "DELETE"],
    credentials:true,
}))
app.use(express.json());

app.use(express.urlencoded({extended:true}))


// api endpoint
app.use('/api/user' , userroutes);
app.use('/api/product' , productroute );
// app.use('/api/cart' , cartroute);
app.get('/' , (req,res) => {
    res.send('API WORKING');
})

if(cluster.isPrimary){
    console.log(`Primary ${process.pid} is running`);
    for(let i=0;i<numCPUs;i++){
        cluster.fork();
    }
}
else{
    
    app.get("/" , (req,res) => {
        return res.json({
            message: `server is running on process id ${process.pid}`
            
        })
        // console.log(process.pid);
    })

    app.listen((process.env.PORT) , () => {
        console.log(`server is running on ${process.env.PORT}`)
    })
console.log(`Worker ${process.pid} started`);
}

connectdb();

