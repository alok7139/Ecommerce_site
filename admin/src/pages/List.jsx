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


   useEffect(() => {
    fetchlist();
   } , [])

  return (
    <div>
      List
    </div>
  )
}

export default List
