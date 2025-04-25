import React from 'react'
import { assets } from '../assets/assets'

function Navbar() {
  return (
    <div>
      <img src={assets.shopeasy} alt='' />
      <button>Logout</button>
    </div>
  )
}

export default Navbar
