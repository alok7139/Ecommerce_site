import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

function Latestcollection() {

    const {products} = useContext(ShopContext)

    console.log(products);

  return (
    <div>
       
    </div>
  )
}

export default Latestcollection
