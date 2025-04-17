import React from 'react'
import Hero from '../components/Hero'
import Latestcollection from '../components/Latestcollection'
import BestSeller from '../components/BestSeller'
import Ourpolicy from '../components/Ourpolicy'
import Newletterbox from '../components/Newletterbox'

export default function Home() {
  return (
    <div>
      <Hero/>
      <Latestcollection/>
      <BestSeller/>
      <Ourpolicy/>
      <Newletterbox/>
    </div>
  )
}
