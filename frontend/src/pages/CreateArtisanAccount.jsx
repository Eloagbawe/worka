import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaUpload} from 'react-icons/fa';
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register, reset } from '../features/auth/authSlice';
import { resetCrafts, getCrafts } from '../features/crafts/craftSlice';
import { resetLocations, getLocations } from '../features/locations/locationSlice';
import { resetProfile } from '../features/profile/profileSlice';
import { resetBooking } from '../features/booking/bookingSlice';
import { resetReview } from '../features/review/reviewSlice';

import { Spinner } from '../components/Spinner';


export const CreateArtisanAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isProfilePicPicked, setProfilePicPicked] = useState(false);
  const [isWorkImg1Picked, setWorkImg1Picked] = useState(false);
  const [isWorkImg2Picked, setWorkImg2Picked] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'artisan',
    profile_picture: null,
    craftId: 'none',
    locationId: 'none',
    business_name: '',
    business_address: '',
    work_image_1: null,
    work_image_2: null
  })

  const { first_name, last_name, email, password, confirmPassword,
    phone, role, profile_picture, craftId, locationId, business_name,
    business_address, work_image_1, work_image_2 } = formData;

  const { crafts, craftsError, craftsLoading, craftsMessage } = useSelector((state) => state.craft);
  const { locations, locationsError,
    locationsLoading, locationsMessage } = useSelector((state) => state.location);

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

  useEffect(() => {
    if (craftsError) {
      craftsMessage.status === 500 ? 
      toast.error('A Network Error has occurred') :
      toast.error(craftsMessage.message)
      return;
    }
    else if (locationsError) {
      locationsMessage.status === 500 ? 
      toast.error('A Network Error has occurred') :
      toast.error(locationsMessage.message)
      return;
    } else {
      dispatch(getCrafts());
      dispatch(getLocations());
    }  
  }, [dispatch, craftsError, locationsError, craftsMessage, locationsMessage])

  useEffect(() => {
    if (isError) {
      if (message.status === 500) {
        toast.error('A Network Error has occurred');
        return;
      }
      toast.error(message.message)
    }

    if (isSuccess) {
      toast.success('Sign Up Successful!')
    }

    if (user) {
      navigate('/dashboard');

    }
  }, [dispatch, user, isError, isSuccess, message, navigate])

  useEffect(() => {
      return () => {
        if (isSuccess) {
          dispatch(resetCrafts());
          dispatch(resetLocations());
        }
        dispatch(reset());
        dispatch(resetProfile());
        dispatch(resetReview());
        dispatch(resetBooking());
      }
  }, [dispatch, user, isSuccess])
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleFileChange = (e) => {
    if (e.target.name === 'profile_picture') {
      setProfilePicPicked(true);
    }
    if (e.target.name === 'work_image_1') {
      setWorkImg1Picked(true);
    }
    if (e.target.name === 'work_image_2') {
      setWorkImg2Picked(true);
    }
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: file
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!first_name || !last_name || !email || !password
      || !phone || !role || !profile_picture) {
        toast.error('Please fill in all personal details');
        return;
      }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!business_name || !business_address || !work_image_1 
      || !work_image_2) {
        toast.error('Please fill in all business details');
        return;
      }

    if (craftId === 'none' || locationId === 'none') {
      toast.error('Please fill in all details');
      return;
    }


    const limit = 1024 * 1024;
    if (profile_picture.size > limit) {
      toast.error('Profile Picture size is too large');
      return;
    }
    if ((work_image_1.size > limit) || (work_image_2.size > limit)) {
      toast.error('Work Image size is too large');
      return;
    } else {

      const userData = {first_name, last_name, email, password,
        phone, role, profile_picture, craftId, locationId, business_name,
        business_address, work_image_1, work_image_2 }

      const form = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        form.append(key, value);
      });

      dispatch(register(form));

    }
  }

  if (isLoading || craftsLoading || locationsLoading) {
    return (<Spinner/>)
  }

  return (
    <div className='flex px-3 justify-center text-text-color'>
    <div className='sm:w-1/2 xl:w-2/5'>
      <h2 className='text-center font-bold text-[2rem] mb-5'>Create an Artisan account</h2>
      <form className='w-full' id="createArtisanForm" onSubmit={handleSubmit}>
        <h3 className='font-bold my-2'>Personal Details</h3>
        <div className='border rounded p-1 my-5'>
          <input name="first_name" value={first_name} type="text" placeholder='First Name' 
          className='p-2 w-full focus:outline-0 bg-transparent' onChange={onChange} required/>
        </div>

        <div className='border rounded p-1 my-5'>
          <input name="last_name" value={last_name} type="text" placeholder='Last Name'
          className='p-2 w-full focus:outline-0 bg-transparent' onChange={onChange} required/>
        </div>

        <div className='border rounded p-1 my-5'>
          <input name="email" value={email} type="email" placeholder='Email'
          className='p-2 w-full focus:outline-0 bg-transparent' onChange={onChange} required/>
        </div>

        <div className='border rounded p-1 my-5'>
          <input name="phone" value={phone} type="text" placeholder='Phone'
          className='p-2 w-full focus:outline-0 bg-transparent' onChange={onChange} required/>
        </div>

        <div className='border rounded p-1 my-5 relative'>
          <input required type={`${showPassword ? 'text' : 'password'}`} placeholder='Password' name="password" 
          value={password} className='p-2 w-full pr-12 sm:pr-16 focus:outline-0 bg-transparent' onChange={onChange}/>
          {!showPassword && <FaEye className='absolute top-[35%] right-[5%]' onClick={() => setShowPassword(true)}/>}
          {showPassword && <FaEyeSlash className='absolute top-[35%] right-[5%]' onClick={() => setShowPassword(false)}/>}
        </div>

        <div className='border rounded p-1 my-5 relative'>
          <input required type={`${showConfirmPassword ? 'text' : 'password'}`} placeholder='Confirm Password' name="confirmPassword"
          value={confirmPassword} className='p-2 pr-12 sm:pr-16 w-full focus:outline-0 bg-transparent' onChange={onChange}/>
          {!showConfirmPassword && <FaEye className='absolute top-[35%] right-[5%]' onClick={() => setShowConfirmPassword(true)}/>}
          {showConfirmPassword && <FaEyeSlash className='absolute top-[35%] right-[5%]' onClick={() => setShowConfirmPassword(false)}/>}
        </div>

        <div className='flex items-center my-10'>
          <label htmlFor="profile_picture" className={`${isProfilePicPicked ? 'hidden' : '' } mr-2`}><FaUpload /></label>
          <label htmlFor="profile_picture" className={`${isProfilePicPicked ? 'hidden' : '' }`}>Upload Profile Picture</label>
          <input type="file" id="profile_picture" name="profile_picture" className={`${isProfilePicPicked ? '' : 'hidden'} file-type`}
          accept=".jpg, .jpeg, .png, .svg, .webp" 
          onChange={handleFileChange} />
        </div>

        
        <h3 className='font-bold my-2'>Business Details</h3>


        <div className='border rounded p-1 my-5'>
          <input required type="text" placeholder='Business Name' onChange={onChange} name="business_name" 
          value={business_name} className='p-2 w-full focus:outline-0 bg-transparent'/>
        </div>

        <div className='border rounded p-1 my-5'>
          <input required type="text" placeholder='Business Address' onChange={onChange} name="business_address"
          value={business_address} className='p-2 w-full focus:outline-0 bg-transparent'/>
        </div>

        <div>

        <label htmlFor="craft" className='mr-3'>Craft:</label>
        <select id="craft" name="craftId" value={craftId} form="createArtisanForm" 
        className='border rounded focus:outline-0 bg-transparent p-2 my-5 w-3/4 sm:w-2/4' onChange={onChange}>
          <option value="none" disabled></option>
          {crafts?.map((craft, key) => (
            <option key={key} value={craft?._id}>{craft.name}</option>
          ))}
        </select>
        </div>

        <div>

        <label htmlFor="location" className='mr-3'>Location:</label>
        <select id="location" name="locationId" value={locationId} form="createArtisanForm" 
        className='border rounded focus:outline-0 bg-transparent p-2 my-5 w-3/4 sm:w-2/4' onChange={onChange}>
          <option value="none" disabled></option>
          {locations?.map((location, key) => (
            <option key={key} value={location?._id}>{location.name}</option>
          ))}
        </select>
        </div>

        <div className='my-10'>
          <p className='font-bold'>Upload two images of your work. <span className='font-light text-sm'>Nb: Image size must be less than 1mb</span></p>
          <div className='flex items-center my-5'>
            <label htmlFor="work_image_1" className={`${isWorkImg1Picked ? 'hidden' : '' } mr-2`}><FaUpload /></label>
            <label htmlFor="work_image_1" className={`${isWorkImg1Picked ? 'hidden' : '' }`}>Upload Image 1</label>
            <input type="file" id="work_image_1" name="work_image_1" className={`${isWorkImg1Picked ? '' : 'hidden'} file-type`}
            accept=".jpg, .jpeg, .png, .svg, .webp" 
            onChange={handleFileChange} />
          </div>

          <div className='flex items-center my-5'>
            <label htmlFor="work_image_2" className={`${isWorkImg2Picked ? 'hidden' : '' } mr-2`}><FaUpload /></label>
            <label htmlFor="work_image_2" className={`${isWorkImg2Picked ? 'hidden' : '' }`}>Upload Image 2</label>
            <input type="file" id="work_image_2" name="work_image_2" className={`${isWorkImg2Picked ? '' : 'hidden'} file-type`}
            accept=".jpg, .jpeg, .png, .svg, .webp" 
            onChange={handleFileChange} />
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
