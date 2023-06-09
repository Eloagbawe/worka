import React from 'react';
import { ImageCarousel } from './ImageCarousel';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";




export const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
    <div className='px-4 sm:px-12 py-4 md:grid grid-cols-2 gap-4 justify-center'>
        <div className='p-4 sm:p-6 xl:p-12'>

            <h2 className='text-text-color text-[3rem] max-[345px]:text-[2rem] min-[1090px]:text-[4rem] font-bold'>The right place to find Artisans near you!</h2>
            {!user && <Link to="/login"><button className='px-12 py-2 mt-8 text-xl rounded-xl bg-btn-bg text-white'>Login</button></Link>}
            {user && user.role === 'user' && <Link to="/search"><button className='px-12 py-2 mt-8 text-xl rounded-xl bg-btn-bg text-white'>Search</button></Link>}
            {user && user.role === 'artisan' && <Link to="/dashboard"><button className='px-12 py-2 mt-8 text-xl rounded-xl bg-btn-bg text-white'>Dashboard &rarr;</button></Link>}

        </div>

        <div className=' mt-5 md:mt-0 h-[30rem]'>
          <ImageCarousel/>
        </div>

    </div>
    </>
  )
}
