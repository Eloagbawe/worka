import React, {useEffect} from 'react';
import { reset } from '../features/auth/authSlice';
import { useSelector, useDispatch } from "react-redux";

import { useNavigate, Link } from "react-router-dom";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);


  useEffect(() => {
    if (!user) {
      navigate('/');
    }

    return () => {
      dispatch(reset());
    }
  }, [user, dispatch, navigate]);

  return (
    <div className='min-[992px]:grid grid-cols-2 min-[992px]:max-[1200px]:gap-6 gap-12 xl:px-12 px-5 my-10 justify-center'>

        <div className='w-full text-text-color px-3 py-5'>

            <div className='min-[575px]:flex items-center'>

                <div className='sm:px-3'>
                    <img className='min-[992px]:max-[1200px]:w-[10rem] min-[992px]:max-[1200px]:h-[9rem] w-[14rem] h-[14rem] rounded-[50%]'
                    alt="" src="https://res.cloudinary.com/eloagbawe/image/upload/v1681552514/worka_staging/joybello%40gmail.com_profile_picture.webp"/>
                </div>

                <div className='sm:px-3'>
                    <p className='text-[1.2rem] min-[360px]:text-[1.5rem] md:text-[2rem] font-bold my-2'>Kennedy James Hilton</p>
                    <p className='my-2'>081278081897</p>
                    <p className='my-2'>Male</p>
                    <p className='my-2 text-[#7393A7] font-bold text-xl'>3.5 stars</p>
                </div>

            </div>

            <div className='min-[575px]:p-10'>

                <div className=''>
                    <p className='my-5 text-[1.1rem]'>I do very good furniture for office,
                    family home and restaurants. I am very reliable and I have 5 years work experience</p>

                    <p className='my-2 font-bold text-[1.1rem]'>Kenny's Wood Works</p>
                    <p className='my-2 font-bold text-[1.1rem]'>58, Kolombo Street</p>
                    <p className='my-2 font-bold text-[1.1rem]'>Wuse, Abuja, F.C.T, Nigeria</p>
                </div>
            </div>

            <div className='min-[575px]:p-6 p-2 max-[575px]:mt-10 gap-4 md:gap-2 flex w-full flex-wrap justify-between'>

                <img className='rounded-lg w-[15rem] h-[15rem] min-[992px]:max-[1200px]:w-[12rem] min-[992px]:max-[1200px]:h-[12rem]'
                alt="" src="https://res.cloudinary.com/eloagbawe/image/upload/v1681558777/worka_staging/kennedybenson%40gmail.com_work_image_1.jpg"/>

                <img className='rounded-lg w-[15rem] h-[15rem] min-[992px]:max-[1200px]:w-[12rem] min-[992px]:max-[1200px]:h-[12rem]'
                alt="" src="https://res.cloudinary.com/eloagbawe/image/upload/v1681558779/worka_staging/kennedybenson%40gmail.com_work_image_2.jpg"/>

            </div>

            <div className='min-[575px]:p-10 p-3 max-[575px]:mt-10 '>
                <button className='px-5 py-2 bg-btn-bg text-white rounded'>Edit Profile</button>
            </div>

        </div>

        <div className='w-full text-text-color flex justify-center'>

            <div className='w-full'>

            <div className='px-3 h-[25rem] overflow-scroll rounded-lg
            w-full min-[992px]:w-11/12 shadow-[0px_10px_15px_5px_rgba(0,0,0,0.1)]'>
                <p className='font-bold text-[1.1rem] min-[360px]:text-[1.5rem] py-5 ml-3 '>Bookings</p>

                <div className='px-3'>

                <div className='flex overflow-scroll w-full justify-between items-center my-5 no-scrollbar'>
                    <p className='shrink-0 mr-5'>Jolayemi Folashade Oluwakemigakiu</p>
                    <p className='shrink-0 mr-5'>4th June 2023 3pm</p>
                    <button className='px-3 py-1 bg-[#2A528A] text-white rounded shrink-0'>View Profile</button>
                </div>

                <div className='flex overflow-scroll w-full justify-between items-center my-5 no-scrollbar'>
                    <p className='shrink-0 mr-5'>Kate Momoh</p>
                    <p className='shrink-0 mr-5'>6th July 2023 2pm</p>
                    <button className='px-3 py-1 bg-[#2A528A] text-white rounded shrink-0'>View Profile</button>
                </div>

                </div>
            </div>

            <div className='px-3 h-[25rem] overflow-scroll rounded-lg
            w-full min-[992px]:w-11/12 shadow-[0px_10px_15px_5px_rgba(0,0,0,0.1)] my-10'>
                <p className='font-bold text-[1.1rem] min-[360px]:text-[1.5rem] py-5 ml-3 '>Reviews</p>

                <div className='px-3'>

                <div className='my-10'>
                    <p className='mb-2 text-md'>I really loved the job</p>

                    <div className='flex overflow-scroll w-full
                     items-center no-scrollbar text-sm'>
                        <p className='shrink-0 mr-3'>3 stars</p>

                        <p className='shrink-0 mr-3 font-bold'><Link to="#">Jolayemi Folashade Oluwakemigakiu</Link></p>
                    </div>

                </div>

                <div className='my-10'>
                    <p className='mb-2 text-md'>Not Happy at all</p>

                    <div className='flex overflow-scroll w-full
                   items-center no-scrollbar text-sm'>
                        <p className='shrink-0 mr-3'>3 stars</p>

                        <p className='shrink-0 mr-3 font-bold'><Link to="#">Kate Momoh</Link></p>
                    </div>

                </div>

                </div>
            </div>

            </div>

        </div>
        
    </div>
  )
}
