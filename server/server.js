import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { config } from 'dotenv'

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
       origin: [process.env.FRONTEND_URI],
       methods: ["GET" , "POST" , "PUT" , "DELETE"],
       credentials:true,
}))

// api endpoint
app.get('/' , (req,res) => {
    res.send('API WORKING');
})

app.listen(port , () => {
    console.log(`server is listen on ${port}`)
})

