import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem';

function Latestcollection() {

    const [latestproduct, setlatestproduct] = useState([]);

    const {products} = useContext(ShopContext)

    useEffect(() => {
      setlatestproduct(products.slice(0,10));
    } , [])

    // console.log(products);

  return (
    <div className='my-10 '>
       <div className='text-center py-8 text-3xl'>
          <Title text1={'LATEST'}  text2={'COLLECTIONS'}/>
          <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
          ShopEasy brings you the latest and trendiest collections for a seamless and stylish shopping experience.
          </p>
       </div>
        
       {/* rendering product */}

       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
         {
            latestproduct.map((item,index) => {
                return(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                )
            })
         }
       </div>

    </div>
  )
}

export default Latestcollection
