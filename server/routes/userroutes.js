import express from 'express'
import { adminlogin, loginuser , registeruser } from '../controllers/usercontroller.js'

const route = express.Router();

route.post('/register' , registeruser)
route.post('/login' , loginuser)
route.post('/admin' , adminlogin)

export default route;