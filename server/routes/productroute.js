import express from 'express';
import { addproduct , listproduct , removeproduct ,singleproduct } from '../controllers/productcontroller.js';
import upload from '../middleware/multer.js';
import { adminauth } from '../middleware/adminauth.js';


const route = express.Router();

route.post('/add' , adminauth,upload.fields([{name:'image1', maxCount:1} , {name:'image2', maxCount:1} , {name:'image3', maxCount:1} , {name:'image4', maxCount:1}]), addproduct);
route.delete('/remove' ,adminauth, removeproduct);
route.post('/single' ,adminauth, singleproduct);
route.get('/list' ,adminauth, listproduct);

export default route;