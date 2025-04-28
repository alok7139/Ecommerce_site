import express from 'express'
import { addtocart , updatecart , getcartdata } from '../controllers/cartcontroller.js'
import { authuser } from '../middleware/auth.js';

const route = express.Router();

route.post('/add' ,authuser, addtocart);
route.post('/update' ,authuser, updatecart);
route.post('/get' , authuser, getcartdata);

export default route;