import express from 'express';
import { addproduct , listproduct , removeproduct ,singleproduct } from '../controllers/productcontroller.js';
import upload from '../middleware/multer.js';


const route = express.Router();

route.post('/add' ,upload.fields([{name:'image1', maxCount:1} , {name:'image2', maxCount:1} , {name:'image3', maxCount:1} , {name:'image4', maxCount:1}]), addproduct);
route.post('/remove' , removeproduct);
route.post('/single' , singleproduct);
route.get('/list' , listproduct);

export default route;