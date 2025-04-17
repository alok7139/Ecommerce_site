import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import Shopcontextprovider from './context/ShopContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Shopcontextprovider>
    <App />
    </Shopcontextprovider>
    
    </BrowserRouter>
  </StrictMode>,
)
