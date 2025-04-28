import express from 'express'
import { placeorder , placeorderstripe , placeorderrazorpay , allorders , userorders , updatestatus } from '../controllers/ordercontroller.js';
import {adminauth} from '../middleware/adminauth.js'
import { authuser } from '../middleware/auth.js';

const route = express.Router();

// admin
route.post('/list' ,adminauth, allorders);
route.post('/status' ,adminauth, updatestatus);

// payment features
route.post('/place' , authuser,placeorder)
route.post('/stripe' ,authuser, placeorderstripe)
route.post('/razorpay' ,authuser, placeorderrazorpay)

// user feature
route.post('/userorder' , authuser , userorders)


export default route;