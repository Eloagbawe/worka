import React from 'react'
import { FaSearch, FaRegCalendarAlt, FaPen, FaListUl } from 'react-icons/fa';

export const Features = () => {
  return (
    <div className='px-3 sm:px-12 py-3 lg:py-5'>
        <h2 className='font-bold text-[1.8rem] text-text-color max-[780px]:text-center'>Features</h2>

        <div className='flex flex-wrap my-3 lg:my-5 text-[#2E3840] max-[780px]:justify-center'>

            <div className='p-5 rounded-lg bg-[#A0C3D2] w-[20rem] mt-5 mr-2 md:mr-5 2xl:mr-7'>
                <div className='flex font-bold items-center'>
                    <FaSearch className='mr-4'/>
                    <p>Find Artisans</p>
                </div>
                <p className='mt-4'>Search for a wide range of artisans based on location and craft</p>
            </div>

            <div className='p-5 rounded-lg bg-[#B7B7B7] w-[20rem] mt-5 mr-2 md:mr-5 2xl:mr-7'>
                <div className='flex font-bold items-center'>
                    <FaRegCalendarAlt className='mr-3'/>
                    <p>Book Appointments</p>
                </div>
                <p className='mt-4'>Schedule consultation appointments with artisans seamlessly</p>
            </div>

            <div className='p-5 rounded-lg bg-[#AEC2B6] w-[20rem] mt-5 mr-2 md:mr-5  2xl:mr-7'>
                <div className='flex font-bold items-center'>
                    <FaPen className='mr-3'/>
                    <p>Review Artisans</p>
                </div>
                <p className='mt-4'>Review and rate artisans you have worked with to help others make informed decisions.</p>
                
            </div>

            <div className='p-5 rounded-lg bg-[#D5B4B4]  w-[20rem] mt-5 mr-2 md:mr-5 2xl:mr-7'>
                <div className='flex font-bold items-center'>
                    <FaListUl className='mr-3'/>
                    <p>Explore the blog</p>
                </div>

                <p className='mt-4'>Explore our lifestyle blog - coming soon</p>
               
            </div>

        </div>
    </div>
  )
}
