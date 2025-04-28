import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

function Order() {

  const {backendurl ,token, currency , price} = useContext(ShopContext);

  // console.log(products)

  const [orderdata, setorderdata] = useState([])

  const loadorderdata = async() => {
    try {
      if(!token)return null;


      const res = await axios.post(  ' http://localhost:3000/api/order/userorder' , {} , {withCredentials:true, headers:{token}})
      console.log(res);
      if(res.data.success){
        let allorder = []
        res.data.orders.map((order) => {
          return (
            order.items.map((item) => {
              return (
                item['status'] = order.status,
                item['payment'] = order.payment,
                item['paymentmethod'] = order.paymentmethod,
                item['data'] = order.data,
                allorder.push(item)
              )
            })
          )
        })
        setorderdata(allorder);
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
     loadorderdata();
  } , [token])

  return (
    <div className='border-t pt-16'>
       <div className='text-2xl'>
         <Title text1={'MY'} text2={'ORDERS'} />
       </div>
      
       
  <div className=''>
    {
      orderdata.map((item, index) => (
        <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
          <div className='flex items-start gap-6 text-sm'>
            <img src={item.image[0]} className='w-16 sm:w-20' />
            <div >
                <p className='sm:text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-gray-700'>
                     <p className=''>{currency} {item.price}</p>
                     <p>Quantity : {item.quantity}</p>
                     <p>Size : {item.sizes}</p>
                   </div>
                   <p className='mt-2'>Date : <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                   <p className='mt-2'>Payment : <span className='text-gray-400'>{item.paymentmethod}</span></p>
              </div>

              
          </div>
          <div className='md:w-1/2 flex justify-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>{item.status}</p>
                </div>

                <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>
             </div>
        </div>
      ))
    }
  </div>



    </div>
  )
}

export default Order
