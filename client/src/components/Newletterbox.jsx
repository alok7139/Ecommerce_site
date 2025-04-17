import React from 'react'

function Newletterbox() {
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
        Subscribe now and unlock exclusive offers and special discounts only on ShopEasy!
        </p>
        <form className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input type='email' placeholder='Enter Your Email' className='w-full sm:flex-1 outline-none' required/>
            <button type='submit' className= 'cursor-pointer bg-black text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}
 
export default Newletterbox
