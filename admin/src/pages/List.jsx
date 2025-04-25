import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backenedurl } from '../App'
import { toast } from 'react-toastify'

function List({token}) {
    const [list, setlist] = useState([])

   const fetchlist = async() => {
       try {
        const res = await axios.get(backenedurl + '/api/product/list' , {withCredentials:true , headers:{token}})
        if(res.data.success){
            setlist(res.data.products);
        }
        else{
            toast.error(res.data.message);
        }
          
       } catch (error) {
          toast.error(error.message);
       }
   }

   const removeproduct = async(id) => {
        try {
            const res = await axios.delete(backenedurl + '/api/product/remove' , {data:{id} , withCredentials:true , headers:{token}})
            // console.log(res );
            if(res.data.success){
                toast.success(res.data.message);
                await fetchlist();
            }
            else{toast.error(res.data.message)}
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
   }


   useEffect(() => {
    fetchlist();
   } , [])

  return (
    <>
      <p className='mb-2'>All products</p>
      <div className='flex flex-col gap-2'>
         
        {/* list table title */}
        
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className='text-center'>Action</b>
        </div>


        {/* products list */}

        {
            list.map((item,index) => {
               return (
                 <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                    <img src={item.image[0]} className='w-12' />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>{item.price}</p>
                    <p onClick={() => removeproduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'> X</p>
                 </div>
               )
            })
        }

      </div>
    </>
  )
}

export default List
