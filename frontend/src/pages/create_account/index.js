import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ImageCarousel } from '@/components/ImageCarousel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const index = () => {
  const [selected, setSelected] = useState('user');
  const router = useRouter();


  const handleChange = (e) => {
    setSelected(e.target.value);
  }

  const handleSubmit = () => {
    if (selected === 'user')
      router.push('/create_account/user');
    if (selected === 'artisan')
      router.push('/create_account/artisan');
  }

  return (
    <div className='px-4 sm:px-12 py-4 md:grid grid-cols-2 gap-4 items-center justify-center text-text-color'>

      <div className='p-4 sm:p-6 xl:p-12 '>

        <h2 className='font-bold text-[2rem] mb-3' >Create an account</h2>
        <p className='my-2 text-gray-400'>Are you a user or an artisan?</p>

        <div className='my-10'>
          <FormControl>
            <RadioGroup
              aria-labelledby="radio-buttons-group-label"
              value={selected}
              name="radio-buttons-group"
              onChange={handleChange}
            >
              <FormControlLabel value="user" control={<Radio sx={{ color: "#398AB9", "&.Mui-checked": {color: "#398AB9"} }}/>} 
              label="Create a user account" />
              <FormControlLabel value="artisan" control={<Radio sx={{ color: "#398AB9", "&.Mui-checked": {color: "#398AB9"}}}/>} 
              label="Create an artisan account" />
            </RadioGroup>
            <button type="submit" onClick={handleSubmit}
            className=' py-2 text-lg rounded-xl bg-btn-bg text-white w-2/4 my-5'>Continue</button>
          </FormControl>
        </div>

        <div className='flex flex-wrap'>
          <p className='mr-3 text-gray-400 mt-2'>Already have an account?</p>
          <button className='font-bold mt-2' onClick={() => router.push('/login')}>Log in</button>
        </div>

      </div>

      <div className='hidden md:block'>
        <ImageCarousel/>
      </div>

    </div>
  )
}

export default index
