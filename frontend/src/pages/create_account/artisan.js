import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUpload} from 'react-icons/fa';


const create_artisan = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isProfilePicPicked, setProfilePicPicked] = useState(false);
  const [isWorkImg1Picked, setWorkImg1Picked] = useState(false);
  const [isWorkImg2Picked, setWorkImg2Picked] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit create artisan form');
  }

  return (
    <div className='flex px-3 justify-center text-text-color'>
    <div className='sm:w-1/2 xl:w-2/5'>
      <h2 className='text-center font-bold text-[2rem] mb-5'>Create an Artisan account</h2>
      <form className='w-full' id="createArtisanForm" onSubmit={handleSubmit}>
        <h3 className='font-bold my-2'>Personal Details</h3>
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

        <div className='flex items-center my-10'>
          <label htmlFor="profile_picture" className={`${isProfilePicPicked ? 'hidden' : '' } mr-2`}><FaUpload /></label>
          <label htmlFor="profile_picture" className={`${isProfilePicPicked ? 'hidden' : '' }`}>Upload Profile Picture</label>
          <input type="file" id="profile_picture" className={`${isProfilePicPicked ? '' : 'hidden'} file-type`} accept=".jpg, .jpeg, .png, .svg" onChange={() => setProfilePicPicked(true)} />
        </div>

        
        <h3 className='font-bold my-2'>Business Details</h3>


        <div className='border rounded p-1 my-5'>
          <input type="text" placeholder='Business Name' className='p-2 w-full focus:outline-0 bg-transparent'/>
        </div>

        <div className='border rounded p-1 my-5'>
          <input type="text" placeholder='Business Address' className='p-2 w-full focus:outline-0 bg-transparent'/>
        </div>

        <div>

        <label htmlFor="craft" className='mr-3'>Craft:</label>
        <select id="craft" name="craftList" defaultValue="none" form="createArtisanForm" 
        className='border rounded focus:outline-0 bg-transparent p-2 my-5 w-3/4 sm:w-2/4'>
          <option value="none" disabled></option>
          <option value="carpentry">carpentry</option>
          <option value="tailoring">tailoring</option>
        </select>
        </div>

        <div>

        <label htmlFor="location" className='mr-3'>Location:</label>
        <select id="location" name="locationList" defaultValue="none" form="createArtisanForm" 
        className='border rounded focus:outline-0 bg-transparent p-2 my-5 w-3/4 sm:w-2/4'>
          <option value="none" disabled></option>
          <option value="wuye">apo</option>
          <option value="apo">wuye</option>
        </select>
        </div>

        <div className='my-10'>
          <p className='font-bold'>Upload two images of your work. <span className='font-light text-sm'>Nb: Image size must be less than 1mb</span></p>
          <div className='flex items-center my-5'>
            <label htmlFor="work_image_1" className={`${isWorkImg1Picked ? 'hidden' : '' } mr-2`}><FaUpload /></label>
            <label htmlFor="work_image_1" className={`${isWorkImg1Picked ? 'hidden' : '' }`}>Upload Image 1</label>
            <input type="file" id="work_image_1" className={`${isWorkImg1Picked ? '' : 'hidden'} file-type`} accept=".jpg, .jpeg, .png, .svg" 
            onChange={() => setWorkImg1Picked(true)} />
          </div>

          <div className='flex items-center my-5'>
            <label htmlFor="work_image_2" className={`${isWorkImg2Picked ? 'hidden' : '' } mr-2`}><FaUpload /></label>
            <label htmlFor="work_image_2" className={`${isWorkImg2Picked ? 'hidden' : '' }`}>Upload Image 2</label>
            <input type="file" id="work_image_2" className={`${isWorkImg2Picked ? '' : 'hidden'} file-type`} accept=".jpg, .jpeg, .png, .svg" 
            onChange={() => setWorkImg2Picked(true)} />
          </div>
        </div>

        <div className='my-10'>
          <button type="submit" className='px-12 py-2 text-lg rounded-lg bg-btn-bg text-white'>Create Account</button>
        </div>

        

      </form>
    </div>
    </div>
  )
}

export default create_artisan
