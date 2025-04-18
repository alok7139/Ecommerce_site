import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

function Product() {
  const {id} = useParams();
  
  const {products , currency , addtocart} = useContext(ShopContext);

  const [productdata, setproductdata] = useState(false);
  const [image, setimage] = useState('');
  const [size, setsize] = useState('')

  const fetchproductdata = async() => {
       products.map((item) => {
           if(item._id === id){
              setproductdata(item);
              setimage(item.image[0]);
              // console.log(item)
              return null;
           }
       })
  }

  useEffect(() => {
      fetchproductdata();
  } , [id])

  // console.log(id);
  return productdata ?  (
    <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
       <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* product image */}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-norma sm:w-[18.7%] w-full'>
               {
                productdata.image.map((item,index) => {
                  return (
                     <img onClick={() => setimage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
                  )
                })
               }

            </div>
            
            <div className='w-full sm:w-[80%]'>
              <img src={image} className='w-full h-auto' />

            </div>

          </div>

          {/* product information */}

          <div className='flex-1 '>
             <h1 className='font-medium text-2xl mt-2'>{productdata.name}</h1>
             <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className='pl-2'>{122}</p>
             </div>
             <p className='mt-5 text-3xl font-medium'>{currency} {productdata.price}</p>
             <p className='mt-5 text-gray-500 md:w-4/5'>{productdata.description}</p>
             <div className='flex flex-col gap-4 my-8'>
                <p>Select Size</p>
                <div className='flex gap-2'>
                   {productdata.sizes.map((item,index) => {
                    return (
                      <button onClick={()=> setsize(item)} className={`border py-2 bg-gray-100 px-4 cursor-pointer ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                    )
                   })}
                </div>
             </div>

             <button onClick={() => addtocart(productdata._id ,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer'>ADD TO CART</button>
             <hr className='mt-8 sm:w-4/5'/>
             <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
               <p>100% Original Product</p>
               <p>Cash on delivery is available on this product</p>
               <p>Easy return and exchange policy within 7 days</p>

             </div>
          </div>

        </div>

           {/* description review section  */}
           <div className='mt-20'>
            <div className='flex '>
              <p className='border px-5 py-3 text-sm'>Description</p>
              <p className='border px-5 py-3 text-sm'>Reviews (122)</p>

            </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>ShopEasy brings you the latest and trendiest collections all in one place. Whether you're looking for fashion, gadgets, or lifestyle products, ShopEasy makes shopping easier, faster, and smarter.</p>
               <p>Discover exclusive deals, curated collections, and a seamless shopping experience—all just a tap away. Shop easy, live stylishly with ShopEasy.</p>
            </div>
           </div>

           {/* display related product */}
           <RelatedProducts category={productdata.category} subcategory={productdata.subcategory} />

    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
