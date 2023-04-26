import React from 'react';
import {FaTwitter, FaLinkedinIn, FaRegEnvelope, FaGithub} from 'react-icons/fa'


export const ContactUs = () => {
  return (
    <div className=' text-text-color min-h-[50vh] py-10'>
    <div className='flex justify-center'>
      <h2 className='text-2xl my-5 font-bold'>Contact Us</h2>
      
      </div>
      <div className='sm:text-lg flex flex-wrap justify-center items-center'>
        <p className='mr-3'>Elo Agbawe Idiodi</p>
        <a className='mr-3' href="https://github.com/Eloagbawe" target="_blank" rel="noreferrer"><FaGithub/></a>
        <a className='mr-3' href="https://twitter.com/Typical_elo" target="_blank" rel="noreferrer"><FaTwitter/></a>
        <a className='mr-3' href="https://www.linkedin.com/in/elo-agbawe-idiodi-77a231156/" target="_blank" rel="noreferrer"><FaLinkedinIn/></a>
        <a className='mr-3' href="mailto:eloagbawe@gmail.com" target="_blank" rel="noreferrer"><FaRegEnvelope/></a>
      </div>
  </div>
  )
}
