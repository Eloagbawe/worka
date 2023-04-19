import React, {useState} from 'react';
import { ImageCarousel } from '@/components/ImageCarousel';
import { FaEye, FaEyeSlash} from 'react-icons/fa';
import { useRouter } from 'next/router';


const login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <div className='px-4 sm:px-12 py-4 lg:grid grid-cols-2 gap-4 items-center justify-center text-text-color'>
      <div className='p-4 sm:p-6 xl:p-12'>
        <h2 className='font-bold  text-[2rem]'>Login to your account</h2>
        <div className='my-10'>
          <form className='w-full sm:w-2/3'>
            <div className='my-5 rounded border p-1'>
              <input type='email' className='p-2 w-full focus:outline-0 bg-transparent' placeholder='email'/>
            </div>
            <div className='my-5 relative rounded border p-1'>
              <input type={`${showPassword ? 'text' : 'password'}`} className='p-2 pr-12 sm:pr-16 w-full focus:outline-0 bg-transparent' placeholder='password'/>
              {!showPassword && <FaEye className='absolute top-[35%] right-[10%]' onClick={() => setShowPassword(true)}/>}
              {showPassword && <FaEyeSlash className='absolute top-[35%] right-[10%]' onClick={() => setShowPassword(false)}/>}
            </div>

            <div className='mt-10 my-5'>
              <button className='px-12 py-2 text-xl rounded-xl bg-btn-bg text-white'>Log In</button>
            </div>
          </form>
        </div>

        <div className='flex flex-wrap'>
          <p className='mr-3 text-gray-400 mt-2'>Don't have an account?</p>
          <button className='font-bold mt-2' onClick={() => router.push('/create_account')}>Sign Up</button>
        </div>

      </div>

      <div className='hidden lg:block'>
        <ImageCarousel/>
      </div>
    </div>
  )
}

export default login
