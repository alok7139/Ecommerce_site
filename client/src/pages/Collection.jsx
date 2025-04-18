import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

function Collection() {
    const {products , search , showsearch} = useContext(ShopContext);

    const [showfilter, setshowfilter] = useState(false)

    const [filterproduct, setfilterproduct] = useState([]);
    const [category, setcategory] = useState([])
    const [subcategory, setsubcategory] = useState([])
    const [sortType, setsortType] = useState('relavent')

    const togglecategory = (e) => {
        if(category.includes(e.target.value)){
           setcategory(prev=> prev.filter(item => item !== e.target.value))
        }
        else{
            setcategory(prev => [...prev , e.target.value]);
        }
    }

    const togglesubcategory = (e) => {
        if(subcategory.includes(e.target.value)){
            setsubcategory(prev=> prev.filter(item => item !== e.target.value))
         }
         else{
            setsubcategory(prev => [...prev , e.target.value]);
         }
    }

    const applyfilter = () => {
        let productcopy = products.slice();
        if(showsearch && search){
            productcopy = productcopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if(category.length > 0){
            productcopy = productcopy.filter(item => category.includes(item.category))
        }
        if(subcategory.length > 0){
            productcopy = productcopy.filter(item => subcategory.includes(item.subCategory));
        }

        setfilterproduct(productcopy);

    }

    const sortproduct = () =>{
        let filtercopy = filterproduct.slice();
        switch (sortType){
            case 'low-high':
                setfilterproduct(filtercopy.sort((a,b) => (a.price - b.price) ));
                break;

            case 'high-low':
                setfilterproduct(filtercopy.sort((a,b) => (b.price-a.price)));   
                break;
                
                
            default:
                applyfilter();
                break;
        }   
    }

    

    useEffect(() => {
       applyfilter();
    }, [category , subcategory ,search , showsearch])

    useEffect(() => {
        sortproduct();
    } , [sortType])
   

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
       {/* filter option */}

       <div className='min-w-60'>
        <p onClick={()=> setshowfilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
            <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showfilter ? 'rotate-90' : ''}` }/>
        </p>
          {/* categoru filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' : 'hidden'} sm:block`}>
              <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                    <input type='checkbox' className='w-3' value={"Men"} onChange={togglecategory}/>MEN

                </p>

                <p className='flex gap-2'>
                    <input type='checkbox' className='w-3' value={"Women"} onChange={togglecategory}/>WOMEN

                </p>

                <p className='flex gap-2'>
                    <input type='checkbox' className='w-3' value={"Kids"} onChange={togglecategory}/>KIDS

                </p>

              </div>
          </div>
          {/* subcategory filter */}
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showfilter ? '' : 'hidden'} sm:block`}>
              <p className='mb-3 text-sm font-medium'>TYPE</p>
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                    <input type='checkbox' className='w-3' value={"Topwear"} onChange={togglesubcategory}/>Topwear

                </p>

                <p className='flex gap-2'>
                    <input type='checkbox' className='w-3' value={"Bottomwear"} onChange={togglesubcategory}/>Bottomwear

                </p>

                <p className='flex gap-2'>
                    <input type='checkbox' className='w-3' value={"Winterwear"} onChange={togglesubcategory}/>Winterwear

                </p>

              </div>
          </div>
       </div>


       {/* right side */}
       <div className='flex-1'>
          
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
               <Title text1={'ALL'} text2={'COLLECTIONS'} />
               {/* product sort */}
               <select onChange={(e) => setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                <option value="relavent" >Sort by: Relavent</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
               </select>
          </div>

          {/* map products */}

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'> 
             {
                filterproduct.map((item,index) => {
                    return (
                        <ProductItem key={index} id={item._id} name={item.name} image={item.image}  price={item.price}/>
                    )
                })
             }
          </div>

       </div>
    </div>
  )
}

export default Collection
