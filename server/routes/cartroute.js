import express from 'express'
import { addtocart , updatecart , getcartdata } from '../controllers/cartcontroller.js'

const route = express.Router();

route.post('/add' , addtocart);
route.post('/update' , updatecart);
route.post('/get' , getcartdata);

export default route;