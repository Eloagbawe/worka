import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaUpload} from 'react-icons/fa';
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register, reset } from '../features/auth/authSlice';

import { Spinner } from '../components/Spinner';


export const CreateUserAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'user',
    profile_picture: null
  })

  const { first_name, last_name, email, password,
    confirmPassword, phone, role, profile_picture } = formData;

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success('Sign Up Successful!')
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

  const handleFileChange = (e) => {
    setIsFilePicked(true);
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: file
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!first_name || !last_name || !email || !password
      || !phone || !role || !profile_picture) {
        toast.error('Please fill in all details');
        return;
      }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (profile_picture.size > (1024 * 1024)) {
      toast.error('Image size is too large');
      return;
    } else {

      const userData = {first_name, last_name, email, password,
        phone, role, profile_picture}
  
      const form = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        form.append(key, value);
      });
  
      dispatch(register(form));
      


      // setFormData({
      //   first_name: '',
      //   last_name: '',
      //   email: '',
      //   password: '',
      //   confirmPassword: '',
      //   phone: '',
      //   role: 'user',
      //   profile_picture: null
      // })

    }

  }

  if (isLoading) {
    return (<Spinner/>)
  }

  return (
    <div className='flex px-3 justify-center text-text-color'>
    <div className='sm:w-1/2 xl:w-2/5'>
      <h2 className='text-center font-bold text-[2rem] mb-5'>Create an account</h2>
      <form className='w-full' onSubmit={handleSubmit}>
        <div className='border rounded p-1 my-5'>
          <input required name="first_name"  value={first_name} onChange={onChange}
          type="text" placeholder='First Name' className='p-2 w-full focus:outline-0 bg-transparent'/>
        </div>

        <div className='border rounded p-1 my-5'>
          <input required type="text" name="last_name" value={last_name} onChange={onChange}
          placeholder='Last Name' className='p-2 w-full focus:outline-0 bg-transparent'/>
        </div>

        <div className='border rounded p-1 my-5'>
          <input required type="email" placeholder='Email' name="email" value={email} onChange={onChange}
          className='p-2 w-full focus:outline-0 bg-transparent'/>
        </div>

        <div className='border rounded p-1 my-5'>
          <input required type="text" placeholder='Phone' name="phone" value={phone} onChange={onChange}
          className='p-2 w-full focus:outline-0 bg-transparent'/>
        </div>

        <div className='border rounded p-1 my-5 relative'>
          <input required type={`${showPassword ? 'text' : 'password'}`} placeholder='Password' onChange={onChange}
          name="password" value={password} className='p-2 w-full pr-12 sm:pr-16 focus:outline-0 bg-transparent'/>
          {!showPassword && <FaEye className='absolute top-[35%] right-[5%]' onClick={() => setShowPassword(true)}/>}
          {showPassword && <FaEyeSlash className='absolute top-[35%] right-[5%]' onClick={() => setShowPassword(false)}/>}
        </div>

        <div className='border rounded p-1 my-5 relative'>
          <input required type={`${showConfirmPassword ? 'text' : 'password'}`} placeholder='Confirm Password' onChange={onChange}
          name="confirmPassword" value={confirmPassword} className='p-2 pr-12 sm:pr-16 w-full focus:outline-0 bg-transparent'/>
          {!showConfirmPassword && <FaEye className='absolute top-[35%] right-[5%]' onClick={() => setShowConfirmPassword(true)}/>}
          {showConfirmPassword && <FaEyeSlash className='absolute top-[35%] right-[5%]' onClick={() => setShowConfirmPassword(false)}/>}
        </div>

        <div className='flex items-center my-5'>
          <label htmlFor="profile_picture" className={`${isFilePicked ? 'hidden' : '' } mr-2`}><FaUpload /></label>
          <label htmlFor="profile_picture" className={`${isFilePicked ? 'hidden' : '' }`}>
            Upload Profile Picture <span className='font-light text-sm ml-2'>Nb: Image size must be less than 1mb</span></label>
          <input type="file" id="profile_picture" name="profile_picture" className={`${isFilePicked ? '' : 'hidden'} file-type`}
          accept=".jpg, .jpeg, .png, .svg, .webp" 
          onChange={handleFileChange} />
        </div>

        <div className='my-10'>
          <button type="submit" className='px-12 py-2 text-lg rounded-lg bg-btn-bg text-white'>Create Account</button>
        </div>

      </form>

    </div>
    </div>
  )
}
