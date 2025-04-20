import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Login() {

  const { token,settoken, navigate , backendurl} = useContext(ShopContext)

  const [currentstate, setCurrentstate] = useState('Login')

  const [name, setname] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')

  const onsubmithandler = async(e) => {
      e.preventDefault();

      try {
         if(currentstate === 'Sign Up'){
            const res = await axios.post(backendurl + '/api/user/register' , {name,email,password} , { withCredentials: true, headers: { "Content-Type": "application/json" } } );
            if(res.data.success){
              settoken(res.data.token);
              localStorage.setItem('token' , res.data.token);
              toast.success(res.data.message);
            }
            else{
              toast.error(res.data.message);
            }
            
         }
         else{
            const res = await axios.post(backendurl + '/api/user/login' , {email,password} , { withCredentials: true, headers: { "Content-Type": "application/json" } });
            if(res.data.success){
              settoken(res.data.token);
              localStorage.setItem('token', res.data.token);
              toast.success(res.data.message);
            }
            else{
              toast.error(res.data.message);
            }

         }
      } catch (error) {
          toast.error(error.message);
      }
  }

  useEffect(() => {
     if(token){
      navigate('/');
     }
   } , [token])

  return (
    <form onSubmit={onsubmithandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
        <div className='inline-flex items-center gap-2mb-2 mt-10'>
           <p className='prata-regular text-3xl'>{currentstate}</p>
           <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>
        {currentstate === 'Login' ? '' : <input onChange={(e) => setname(e.target.value)} value={name} type='text' className='w-full px-3 py-2 border border-gray-800' placeholder='Name'   required/>}
        <input onChange={(e) => setemail(e.target.value)} value={email} type='email' className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
        <input onChange={(e) => setpassword(e.target.value)} value={password} type='password' className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />

        <div className='w-full flex justify-between text-sm mt-[-8px]'>
           <p className='cursor-pointer underline text-blue-400'>Forgot your password</p>
           {
            currentstate === 'Login' ? 
              <p onClick={() => setCurrentstate('Sign Up')} className='cursor-pointer underline text-blue-400'>Create Account</p>
            : <p onClick={() => setCurrentstate('Login')} className='cursor-pointer underline text-blue-400'>Login</p>
           }
        </div>
        <button className='bg-black text-white font-light px-8 py-2 mt-8 cursor-pointer'>
          {
            currentstate === 'Login' ? 'Sign In' : 'Sign Up'
          }
        </button>
    </form>
  )
}

export default Login
