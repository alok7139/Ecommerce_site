import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import assests from './assets/assets'
import Navbar from './components/Navbar'


function App() {
  return (
    <div className='bg-red-500'>
      <Navbar/>
      {/* <Routes>
       <Route element={<Add/>} />

      </Routes> */}
    </div>
  )
}

export default App
