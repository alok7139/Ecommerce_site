import express from 'express'
import { loginuser , registeruser } from '../controllers/usercontroller.js'

const route = express.Router();

route.post('/register' , registeruser)
route.post('/login' , loginuser)

export default route;