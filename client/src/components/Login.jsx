import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from "framer-motion";
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Login')
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false) // Add loading state

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    
    try {
      if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
          toast.success("Login Successful")
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

        if (data.success) {
          setToken(data.token)
          setUser(data.user)
          localStorage.setItem('token', data.token)
          setShowLogin(false)
          toast.success("Sign Up Successful")
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred")
    } finally {
      setIsLoading(false); // Stop loading regardless of success/error
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [])

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-10 
    backdrop-blur-sm bg-black/30 flex justify-center items-center'>

      <motion.form 
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='relative bg-white p-10 rounded-xl text-slate-500'>

        <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
        <p className='text-sm'>Welcome back! Please sign in to continue</p>

        {state != 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
          <img width={30} src={assets.profile_icon} alt="" />
          <input
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            className='outline-none text-sm'
            placeholder='Full Name'
            required
            disabled={isLoading} // Disable during loading
          />
        </div>}

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img width={35} src={assets.email_icon} alt="" />
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            className='outline-none text-sm'
            placeholder='Email Id'
            required
            disabled={isLoading} // Disable during loading
          />
        </div>

        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
          <img width={20} src={assets.lock_icon} alt="" />
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            className='outline-none text-sm'
            placeholder='Password'
            required
            disabled={isLoading} // Disable during loading
          />
        </div>

        <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>
        
        <button 
          className={`bg-blue-600 w-full text-white py-2 rounded-full flex items-center justify-center ${isLoading ? 'opacity-75' : 'cursor-pointer'}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {state === 'Login' ? 'Logging in...' : 'Creating account...'}
            </>
          ) : (
            state === 'Login' ? 'Login' : 'Create account'
          )}
        </button>

        {state === 'Login' ? (
          <p className='mt-5 text-center'>
            Don't have an account? 
            <span 
              className='text-blue-600 cursor-pointer ml-1'
              onClick={() => !isLoading && setState('Sign Up')}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className='mt-5 text-center'>
            Already have an account? 
            <span 
              className='text-blue-600 cursor-pointer ml-1'
              onClick={() => !isLoading && setState('Login')}
            >
              Login
            </span>
          </p>
        )}

        <img 
          onClick={() => !isLoading && setShowLogin(false)}
          src={assets.cross_icon} 
          alt="" 
          className='absolute top-5 right-5 cursor-pointer'
        />
      </motion.form>
    </div>
  )
}

export default Login