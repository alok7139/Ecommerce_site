import express from 'express'
import { placeorder , placeorderstripe , placeorderrazorpay , allorders , userorders , updatestatus } from '../controllers/ordercontroller';
import adminauth from '../middleware/adminauth'

const route = express.Router();

// admin
route.post('/list' ,adminauth, allorders);
route.post('/status' ,adminauth, updatestatus);

// user



export default route;