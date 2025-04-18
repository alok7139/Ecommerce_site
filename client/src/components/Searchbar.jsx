import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';

function Searchbar() {

  const {seach , setsearch , setshowsearch , showsearch} = useContext(ShopContext);

  return showsearch ?  (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
          <input value={seach} onChange={(e) => setsearch(e.target.value)} type='text' placeholder='Search' className='flex-1 outline-none bg-inherit text-sm' />
          <img src={assets.search_icon} className='w-4' />
      </div>

      <img src={assets.cross_icon} className='inline w-3 cursor-pointer' onClick={() =>setshowsearch(false) }/>
      
    </div>
  ) : null
}

export default Searchbar
