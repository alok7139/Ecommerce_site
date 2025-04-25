import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
// import assests from './assets/assets'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'


function App() {
  return (
    <div className='bg-gray-50 min-h-screen'>

      <>
      <Navbar/>
      <hr/>

       <div className='flex w-full'>
        <Sidebar/>

      </div>
      </>
      
    </div>
  )
}

export default App
