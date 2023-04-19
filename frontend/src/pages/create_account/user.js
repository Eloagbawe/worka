import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUpload} from 'react-icons/fa';


const create_user = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit create user form');
  }

  return (
    <div className='flex px-3 justify-center text-text-color'>
    <div className='sm:w-1/2 xl:w-2/5'>
      <h2 className='text-center font-bold text-[2rem] mb-5'>Create an account</h2>
      <form className='w-full' onSubmit={handleSubmit}>
        <div className='border rounded p-1 my-5'>
          <input type="text" placeholder='First Name' className='p-2 w-full focus:outline-0 bg-transparent'/>
        </div>

        <div className='border rounded p-1 my-5'>
          <input type="text" placeholder='Last Name' className='p-2 w-full focus:outline-0 bg-transparent'/>
        </div>

        <div className='border rounded p-1 my-5'>
          <input type="email" placeholder='Email' className='p-2 w-full focus:outline-0 bg-transparent'/>
        </div>

        <div className='border rounded p-1 my-5'>
          <input type="text" placeholder='Phone' className='p-2 w-full focus:outline-0 bg-transparent'/>
        </div>

        <div className='border rounded p-1 my-5 relative'>
          <input type={`${showPassword ? 'text' : 'password'}`} placeholder='Password' className='p-2 w-full pr-12 sm:pr-16 focus:outline-0 bg-transparent'/>
          {!showPassword && <FaEye className='absolute top-[35%] right-[5%]' onClick={() => setShowPassword(true)}/>}
          {showPassword && <FaEyeSlash className='absolute top-[35%] right-[5%]' onClick={() => setShowPassword(false)}/>}
        </div>

        <div className='border rounded p-1 my-5 relative'>
          <input type={`${showConfirmPassword ? 'text' : 'password'}`} placeholder='Confirm Password' className='p-2 pr-12 sm:pr-16 w-full focus:outline-0 bg-transparent'/>
          {!showConfirmPassword && <FaEye className='absolute top-[35%] right-[5%]' onClick={() => setShowConfirmPassword(true)}/>}
          {showConfirmPassword && <FaEyeSlash className='absolute top-[35%] right-[5%]' onClick={() => setShowConfirmPassword(false)}/>}
        </div>

        <div className='flex items-center my-5'>
          <label htmlFor="profile_picture" className={`${isFilePicked ? 'hidden' : '' } mr-2`}><FaUpload /></label>
          <label htmlFor="profile_picture" className={`${isFilePicked ? 'hidden' : '' }`}>Upload Profile Picture</label>
          <input type="file" id="profile_picture" className={`${isFilePicked ? '' : 'hidden'} file-type`} accept=".jpg, .jpeg, .png, .svg" onChange={() => setIsFilePicked(true)} />
        </div>

        <div className='my-10'>
          <button type="submit" className='px-12 py-2 text-lg rounded-lg bg-btn-bg text-white'>Create Account</button>
        </div>

        

      </form>
    </div>
    </div>
  )
}

export default create_user
