import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash} from 'react-icons/fa';
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { ImageCarousel } from '../components/ImageCarousel';
import { Spinner } from '../components/Spinner';

import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from "react-router-dom"




export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
  const {email, password} = formData


  useEffect(() => {  
    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      toast.success('login sucessful!')
    }
    if (user) {
      navigate('/dashboard');
    }

    return () => {
      dispatch(reset());
    }
  }, [user, isError, isSuccess, message, dispatch, navigate])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (email.length === 0 || password.length === 0){
      toast.error('Please fill in all details')
    } else {
      const userData = {email, password}
      dispatch(login(userData))
      setFormData({
        email: '',
        password: ''
      })
    }
  }

  if (isLoading) {
    return (<Spinner/>)
  }

  return (
    <div className='px-4 sm:px-12 py-4 lg:grid grid-cols-2 gap-4 items-center justify-center text-text-color'>
      <div className='p-4 sm:p-6 xl:p-12'>
        <h2 className='font-bold  text-[2rem]'>Login to your account</h2>
        <div className='my-10'>
          <form className='w-full sm:w-2/3' onSubmit={onSubmit}>
            <div className='my-5 rounded border p-1'>
              <input type='email' className='p-2 w-full focus:outline-0 bg-transparent' placeholder='email'
              value={email} id="email" name="email" onChange={onChange}/>
            </div>
            <div className='my-5 relative rounded border p-1'>
              <input type={`${showPassword ? 'text' : 'password'}`} className='p-2 pr-12 sm:pr-16 w-full focus:outline-0 bg-transparent'
              placeholder='password' id="password" name="password" value={password} onChange={onChange}/>
              {!showPassword && <FaEye className='absolute top-[35%] right-[10%]' onClick={() => setShowPassword(true)}/>}
              {showPassword && <FaEyeSlash className='absolute top-[35%] right-[10%]' onClick={() => setShowPassword(false)}/>}
            </div>

            <div className='mt-10 my-5'>
              <button type="submit" className='px-12 py-2 text-xl rounded-xl bg-btn-bg text-white'>Log In</button>
            </div>
          </form>
        </div>

        <div className='flex flex-wrap'>
          <p className='mr-3 text-gray-400 mt-2'>Don't have an account?</p>
          <button className='font-bold mt-2' onClick={() => navigate('/create_account')}>Sign Up</button>
        </div>

      </div>

      <div className='hidden lg:block'>
        <ImageCarousel/>
      </div>
    </div>
  )
}
