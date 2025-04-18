import React, { useContext , useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { NavLink  , Link} from 'react-router-dom';

function RelatedProducts({category, subcategory}) {

    const {products} = useContext(ShopContext);
    const [related, setrelated] = useState([]);

    useEffect(() => {
      if(products.length > 0){
        let productcopy = products.slice();

        productcopy = productcopy.filter((item) => category === item.category);
        productcopy = productcopy.filter((item) => subcategory === item.subcategory);

       setrelated(productcopy.slice(0,5));

      }
    },[products])

  return (
    <div className='my-24 '>
       <div className='text-center text-3xl py-2'>
           <Title text1={'RELATED'} text2={'PRODUCTS'} />
       </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            related.map((item,index) => {
                return (
                   <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
                )
            })
        }

      </div>

    </div>
  )
}

export default RelatedProducts
