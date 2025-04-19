import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { config } from 'dotenv'

// app config
const app = express();
const port = process.env.PORT;
