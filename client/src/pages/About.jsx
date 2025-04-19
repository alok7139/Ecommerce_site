import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newletterbox from '../components/Newletterbox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'About'} text2={'US'} />

      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img src={assets.about_img} className='w-full md:max-w-[450px]' />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
            <p>At Shop Easy, we believe that shopping should be simple, fast, and enjoyable. We offer a wide range of high-quality products at competitive prices — all from the comfort of your home. Whether you're browsing for the latest trends or everyday essentials, our goal is to make your shopping experience effortless and reliable.</p>
            <h1 className='font-bold'>✅ Why Shop Easy?</h1>
            <p>Curated collections to suit your lifestyle</p>
            <p>Fast delivery and secure checkout</p>
            <p>Friendly customer support</p>
            <p>Great deals every day</p>

            <h3 className='font-semibold'>Join thousands of happy customers who shop the easy way — with Shop Easy.</h3>
          </div>
      </div>

      <Newletterbox/>
      
    </div>
  )
}

export default About
