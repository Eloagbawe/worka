import React from 'react'
import logo from '../../public/images/logo-dup.png';
import Image from 'next/image';

export const Footer = () => {
  return (
    <div className="footer mt-20 mb-10 sticky top-[100vh] w-full text-gray-500">
       <hr className='bg-gray-500 border-0  h-[0.05px]'/>
       <div className='min-[475px]:flex px-4 sm:px-12 my-5'>

        <div className='w-1/4'>
            <Image src={logo} alt="logo" priority className='w-32 max-[475px]:w-20 max-[475px]:h-6 max-[320px]:h-5 h-9'/>
        </div>
        <div className='flex max-[475px]:mt-5 max-[475px]:justify-between min-[475px]:justify-around min-[475px]:w-3/4'>
        <div className=''>

            <h5 className='text-lg font-bold'>Useful Links</h5>
            <a className='block'>FAQs</a>
            <a className='block'>Support</a>
            <a className='block'>Pricing</a>

        </div>

        <div className=''>
            <h5 className='text-lg font-bold'>Social Links</h5>
            <a className='block'>Twitter</a>
            <a className='block'>Facebook</a>
            <a className='block'>Instagram</a>
        </div>
        </div>

       </div>
        <p className='text-center mt-16 mb-5'>All rights reserved. Worka &copy; { new Date().getFullYear()}</p>
    </div>
  )
}
