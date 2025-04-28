import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import Carttotal from '../components/Carttotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function PlaceOrder() {

  const [method, setmethod] = useState('cod')
  const [formdata, setformdata] = useState({
   firstname:'' , lastname: '' , 
   email: '' , street: '' , city: '' , state : '' , 
   zipcode: '' , country: '' , phone : ''
  })

  const onChangehandle = (e) => {
   const name = e.target.name;
   const value = e.target.value;

   setformdata(data => ({...data , [name] : value}))


  } 

  const {navigate , backendurl , token , cartitems, setcartitems, getcartamount,deliveryfees , products} = useContext(ShopContext);

  const onSubmithandle = async(e) => {

      e.preventDefault();
      try {
         
        let orderitems = [];

        for(const items in cartitems){
         for(const item in cartitems[items]){
            if(cartitems[items][item] > 0){
               const iteminfo = structuredClone(products.find(product => product._id === items))
               if(iteminfo){
                  iteminfo.size = item
                  iteminfo.quantity = cartitems[items][item]
                  orderitems.push(iteminfo)
               }
            }
         }
        }

        let orderdata = {
          address : formdata,
          items: orderitems,
          amount : getcartamount() + deliveryfees
        }

        switch(method){
         //    api calls for cod
           case 'cod':
           const res = await axios.post( backendurl +'/api/order/place' , orderdata , {withCredentials:true, headers: {token}})
            if(res.data.success){
               setcartitems({});
               navigate('/order')
            }
            else{
               toast.error(res.data.message);
            }
            break;

           default:
            break;
        }

      } catch (error) {
         toast.error(error.message);  
      }
   
  }




  return (
    <form onSubmit={onSubmithandle} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left side */}
       <div className='flex flex-col gap-4 w-ful sm:max-w-[480px]'>
            <div className='text-xl sm:text-2xl my-3'>
              <Title text1={'DELIVERY'} text2={'INFORMATION'} />
            </div>

            <div className='flex gap-3'>
                <input required onChange={onChangehandle} name='firstname' value={formdata.firstname} type='text' placeholder='First name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                <input required onChange={onChangehandle} name='lastname' value={formdata.lastname} type='text' placeholder='Last name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            </div>
            <input required onChange={onChangehandle} name='email' value={formdata.email} type='email' placeholder='Email ' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            <input required onChange={onChangehandle} name='street' value={formdata.street} type='text' placeholder='Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            <div className='flex gap-3'>
                <input required onChange={onChangehandle} name='city' value={formdata.city} type='text' placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                <input required onChange={onChangehandle} name='state' value={formdata.state} type='text' placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            </div>
            <div className='flex gap-3'>
                <input required onChange={onChangehandle} name='zipcode' value={formdata.zipcode} type='number' placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
                <input required onChange={onChangehandle} name='country' value={formdata.country} type='text' placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
            </div>
            <input required onChange={onChangehandle} name='phone' value={formdata.phone} type='number' placeholder='Phone' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
       </div>


       {/* right side */}
       <div className='mt-8'>

        <div className='mt-8 min-w-80'>
            <Carttotal/>
        </div>

        <div className='mt-12'>
           <Title  text1={'PAYMENT'} text2={'METHOD'}/>
           {/* payment method selection */}
           <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setmethod('stripe')}  className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''} `}></p>
               <img src={assets.stripe_logo} className='h-5 mx-4' />
            </div>   

            {/* <div onClick={() => setmethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
               <img src={assets.razorpay_logo} className='h-5 mx-4' />
            </div>   */}

            <div onClick={() => setmethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
               <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
               <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>  

           </div>
        </div>

        <div className='w-full text-end mt-8'>
           <button type='submit'  className='bg-black text-white px-10 py-3 text-sm'>
             PLACE ORDER
           </button>
        </div>

       </div>
    </form>
  )
}
