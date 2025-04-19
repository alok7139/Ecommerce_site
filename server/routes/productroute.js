import express from 'express';
import { addproduct , listproduct , removeproduct ,singleproduct } from '../controllers/productcontroller.js';


const route = express.Router();

route.post('/add' , addproduct);
route.post('/remove' , removeproduct);
route.post('/single' , singleproduct);
route.get('/list' , listproduct);

export default route;