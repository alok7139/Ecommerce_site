import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backenedurl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

function Orders({token}) {
  const [orders, setorders] = useState([])

  const fetchallorder = async() => {
    if(!token){
      return null;
    }

    try {
      const res = await axios.post( 'https://ecommerce-site-chl3.onrender.com/api/order/list'  ,{},  {withCredentials:true, headers:{token}})
      console.log(res)
      if(res.data.success){
        setorders(res.data.orders)
      }
     
      else{
        toast.error(res.data.message)
      }
    } catch (error) {
        toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchallorder();
  } , [token])
  return (
    <div>
      <h1>Order Page</h1>
      <div>
        {
          orders.map((order,index) => {
             <div key={index}>
                <img src={assets.parcel_icon} className='' />
                <div>
                   {
                    order.items.map((item,index) => {
                      if(index===order.items.length){
                         return <p key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                      }
                      else{

                      }
                    })
                   }
                  </div>
             </div>
          })
        }
      </div>
    </div>
  )
}

export default Orders
