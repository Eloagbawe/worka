import React from 'react'

export const About = () => {
  return (
    <div className='min-h-[50vh] text-text-color mt-10'>
        <div className='flex justify-center'>
            <h2 className='text-2xl my-5 font-bold'>About</h2>
        </div>

        <div className='flex justify-center my-5 sm:text-lg'>
            <p className=' w-3/4 md:w-2/4'>
            Worka connects skills and needs. It is a web app where you can find artisans based on their craft and/or location. You 
            can view their profile, schedule an appointment and leave a review after using their service.</p>
        </div>

        <div className='flex justify-center my-5 sm:text-lg'>
            <p className=' w-3/4 md:w-2/4'> More features will be announced soon.</p>

        </div>

    </div>
  )
}
