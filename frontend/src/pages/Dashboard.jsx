import React, {useEffect, useState} from 'react';
import { reset, logout } from '../features/auth/authSlice';
import { resetProfile, getMe, updateProfile } from '../features/profile/profileSlice';
import { useSelector, useDispatch } from "react-redux";
import { FaUpload} from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md'


import profilePlaceholder from '../images/profile_placeholder.png'

import { useNavigate, Link } from "react-router-dom";

import { Spinner } from '../components/Spinner';
import { Modal } from '../components/Modal';

import { toast } from "react-toastify";

import { resetCrafts } from '../features/crafts/craftSlice';
import { resetLocations } from '../features/locations/locationSlice';
import { resetBooking, getBookings, deleteBooking } from '../features/booking/bookingSlice';
import { resetReview, delete_review } from '../features/review/reviewSlice';

import { format } from 'date-fns';


export const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ editProfileModal, setEditProfileModal ] = useState(false);
  const [ viewProfileModal, setViewProfileModal ] = useState(false);
  const [ profileToView, setProfileToView ] = useState({
    profile_picture: '',
    first_name: '',
    last_name: '',
    phone: '',
    gender: ''
  })
  const [deleteBookingModal, setDeleteBookingModal] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);

  const [deleteReviewModal, setDeleteReviewModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null)


  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading, isSuccess, isError, message} = useSelector((state) => state.profile)
  const { bookings, bookingLoading, bookingSuccess, bookingError, bookingMessage } = useSelector((state) => state.booking);
  const { reviewSuccess, reviewLoading } = useSelector((state) => state.review)



  useEffect(() => {
    if (isError) {
      if (message.status === 500) {
        toast.error('A Network Error has occurred');
        return;
      }
      if (message.status === 401) {
        toast.error(message.message) 
        dispatch(logout());
        navigate('/login');
        return;
      } else {
        toast.error(message.message)
      }
    }
   
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getMe())
      dispatch(getBookings())
    }

  }, [user, dispatch, navigate, message, isError]);

  useEffect(() => {
    if (reviewSuccess) {
      toast.success('review successfully deleted');
      dispatch(getMe())
    }
    dispatch(resetReview())
  }, [reviewSuccess, dispatch])

  useEffect(() => {
    return () => {
      dispatch(reset());
      dispatch(resetProfile());
      dispatch(resetBooking());
      dispatch(resetReview());
      dispatch(resetLocations());
      dispatch(resetCrafts());
    }
  }, [dispatch])

  if (isLoading || bookingLoading || reviewLoading) {
    return (<Spinner/>)
  }

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  const closeEditProfile = () => {
    setEditProfileModal(false);
  }

  const EditProfileModal = ({open, handleClose}) => {

    const [ isProfilePicPicked, setProfilePicPicked ] = useState(false);
    const [ isWorkImg1Picked, setWorkImg1Picked ] = useState(false);
    const [ isWorkImg2Picked, setWorkImg2Picked ] = useState(false);

    const [ formData, setFormData]  = useState({
      profile_picture: null,
      phone: profile?.phone,
      gender: profile?.gender ? profile?.gender : '',
      bio: profile?.bio ? profile?.bio : '',
      work_image_1: null,
      work_image_2: null
    })


    const {profile_picture, phone, gender, bio, work_image_1, work_image_2} = formData;

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

      if (!phone) {
        toast.error('Phone number is compulsory');
        return;
      }

      const limit = 1024 * 1024;
      if (profile_picture && profile_picture.size > limit ) {
        toast.error('Profile Picture size is too large');
        return;
      }

      if (work_image_1 && work_image_1.size > limit) {
        toast.error('Work Image 1 size is too large');
        return;
      }

      if (work_image_2 && work_image_2.size > limit) {
        toast.error('Work Image 2 size is too large');
        return;
      }


      const form = new FormData()
      if (profile?.role === 'user') {
        const update_details = {profile_picture, phone, gender}
        Object.entries(update_details).forEach(([key, value]) => {
          if (value !== null && value !== '' && value !== undefined) {
            form.append(key, value);
          }
        });
      }

      if (profile?.role === 'artisan') {

        const update_details = {profile_picture, phone, gender, bio, work_image_1, work_image_2};
        Object.entries(update_details).forEach(([key, value]) => {
          if (value !== null && value !== '' && value !== undefined) {
            form.append(key, value);
          }
        });
      }

      dispatch(updateProfile(form)).then(() => {
        if (isSuccess) {
          toast.success('Profile Successfully Updated')
            dispatch(getMe())
        }
      })
      setEditProfileModal(false);
    }

    return (
      <Modal open={open} handleClose={handleClose} className={'sm:w-6/12 lg:w-4/12'}>
        <h3 className='text-center font-bold'>Edit Profile</h3>

        <form onSubmit={handleSubmit}>

          <div className='my-4'>
            <label htmlFor='gender' className='mb-2 inline-block'>Gender: </label>
            <div className='p-3 border'>
            <input type='text' id="gender" className='w-full bg-transparent focus:outline-0'
            name="gender" value={gender} onChange={onChange}/>
            </div>
          </div>

          <div className='my-4'>
            <label htmlFor='phone' className='mb-2 inline-block'>Phone: </label>
            <div className='p-3 border'>
            <input type='text' id="phone" className='w-full bg-transparent focus:outline-0'
            name="phone" value={phone} onChange={onChange} required/>
            </div>
          </div>

          {profile?.role === 'artisan' && <div className='my-4'>
            <label htmlFor='bio' className='mb-2 inline-block'>Bio: </label>
            <div className='p-3 border'>
            <input type='text' id="bio" className='w-full bg-transparent focus:outline-0'
            name="bio" value={bio} onChange={onChange}/>
            </div>
          </div>}

          <div className='my-5'>
            <label htmlFor="profile_picture" className='inline-block mb-2'>
              Profile Picture: <span className='font-light text-sm min-[290px]:ml-2'>Nb: Image size must be less than 1mb</span></label>
            <div className='flex items-center my-2'>
            <label htmlFor="profile_picture" className={`${isProfilePicPicked ? 'hidden' : '' } mr-2`}><FaUpload/></label>
            <label htmlFor="profile_picture" className={`${isProfilePicPicked ? 'hidden' : '' }`}>Update Profile Picture </label>
            <input type="file" id="profile_picture" name="profile_picture" className={`${isProfilePicPicked ? '' : 'hidden'} file-type`}
            accept=".jpg, .jpeg, .png, .svg, .webp" 
            onChange={handleFileChange} />
            </div>
          </div>
          {profile?.role === 'artisan' && <div className='my-5'>
            <label htmlFor="work_image_1" className='inline-block mb-2'>
              Work Image 1: <span className='font-light text-sm min-[290px]:ml-2'>Nb: Image size must be less than 1mb</span></label>
            <div className='flex items-center my-2'>
              <label htmlFor="work_image_1" className={`${isWorkImg1Picked ? 'hidden' : '' } mr-2`}><FaUpload/></label>
              <label htmlFor="work_image_1" className={`${isWorkImg1Picked ? 'hidden' : '' }`}>Update Work Image 1</label>
              <input type="file" id="work_image_1" name="work_image_1" className={`${isWorkImg1Picked ? '' : 'hidden'} file-type`}
              accept=".jpg, .jpeg, .png, .svg, .webp" 
              onChange={handleFileChange} />
            </div>
          </div>}

          {profile?.role === 'artisan' && <div className='my-5'>
            <label htmlFor="work_image_2" className='inline-block mb-2'>
              Work Image 2: <span className='font-light text-sm min-[290px]:ml-2'>Nb: Image size must be less than 1mb</span></label>
              <div className='flex items-center my-2'>
                <label htmlFor="work_image_2" className={`${isWorkImg2Picked ? 'hidden' : '' } mr-2`}><FaUpload/></label>
                <label htmlFor="work_image_2" className={`${isWorkImg2Picked ? 'hidden' : '' }`}>Update Work Image 2</label>
                <input type="file" id="work_image_2" name="work_image_2" className={`${isWorkImg2Picked ? '' : 'hidden'} file-type`}
                accept=".jpg, .jpeg, .png, .svg, .webp" 
                onChange={handleFileChange} />
              </div>
            </div>
            }

            <div className='flex flex-wrap'>
            <button type="submit" className='px-2 min-[290px]:px-5 py-2 bg-btn-bg text-white rounded mt-3 mr-5'>Edit Profile</button>
            <button type="button" onClick={() => closeEditProfile()} className='px-5 py-2 mt-3'>Cancel</button>

            </div>
        </form>
      </Modal>
    )
  }

  const openViewProfile = (user) => {
    setProfileToView(user);
    setViewProfileModal(true);
  }
  const closeViewProfile = () => {
    setViewProfileModal(false);
  }

  const ViewProfileModal = ({open, handleClose}) => {
    const {profile_picture, first_name, last_name, phone, gender } = profileToView

    return (
      <Modal open={open} handleClose={handleClose} className={'sm:w-6/12 lg:w-3/12'}>
        <div className='flex flex-wrap justify-center items-center'>
        <img src={profile_picture} alt="user profile pic" 
        className='rounded-[50%] h-[10rem] mx-3 w-[10rem] text-center my-3 max-[320px]:h-[8rem] max-[320px]:w-[8rem]'/>

        <div className='my-3 text-center mx-3'>
          <p className='font-bold'>{capitalize(first_name)} {capitalize(last_name)}</p>
          <p>{gender}</p>
          <p>{phone}</p>

        </div>

        </div>
        
      </Modal>
    )
  }

  const openDeleteBooking = (booking) => {
    setBookingToDelete(booking);
    setDeleteBookingModal(true);
  }
  const closeDeleteBooking = () => {
    setDeleteBookingModal(false);
  }

  const DeleteBookingModal = ({open, handleClose}) => {

    let _id, artisanId, first_name, last_name;

    if (bookingToDelete) {
      ({_id, artisanId } = bookingToDelete);
      ({first_name, last_name} = artisanId);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(deleteBooking(_id)).then(() => {
        if (bookingSuccess) {
          toast.success('Booking Successfully Canceled')
          dispatch(getBookings())
        }
       
      })

      setDeleteBookingModal(false);
    }
    


    return (
      <Modal open={open} handleClose={handleClose} className={'sm:w-6/12 lg:w-3/12'}>

      <div className='w-full'>
        <p className='font-bold text-center'>
          Are you Sure you want to cancel booking with 
          { bookingToDelete ? ` ${capitalize(first_name)}` : ''} 
          { bookingToDelete ? ` ${capitalize(last_name)}` : ''} ?</p>

        <div className='flex my-10 justify-center flex-wrap'>

          <button className='rounded-lg px-3 py-2 mr-3 bg-[#EA5354] text-[#fdfdfd]' onClick={handleSubmit}>Yes, Cancel</button>
          <button className='p-2' onClick={() => closeDeleteBooking()}>No</button>

        </div>

      </div>
        
        
      </Modal>
    )
  }

  const closeDeleteReview = () => {
    setDeleteReviewModal(false);
  }

  const openDeleteReview = (review) => {
    setReviewToDelete(review);
    setDeleteReviewModal(true);

  }
  const DeleteReviewModal = ({open, handleClose}) => {
    let _id, artisanId, first_name, last_name;

    if (reviewToDelete) {
      ({_id, artisanId } = reviewToDelete);
      ({first_name, last_name} = artisanId);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(delete_review(_id))
      // dispatch(delete_review(_id)).then(() => {
      //   if (reviewSuccess) {
      //     toast.success('Review Successfully Deleted')
      //     dispatch(getMe())
      //   }
       
      // })

      setDeleteReviewModal(false);
    }
    return (
      <Modal open={open} handleClose={handleClose} className={'sm:w-6/12 lg:w-3/12'}>

      <div className='w-full'>
        <p className='font-bold text-center'>
          Are you Sure you want to delete your review for
          { reviewToDelete ? ` ${capitalize(first_name)}` : ''} 
          { reviewToDelete ? ` ${capitalize(last_name)}` : ''} ?</p>

        <div className='flex my-10 justify-center flex-wrap'>

          <button className='rounded-lg px-3 py-2 mr-3 bg-[#EA5354] text-[#fdfdfd]' onClick={handleSubmit}>Yes, Delete</button>
          <button className='p-2' onClick={() => closeDeleteReview()}>No</button>

        </div>

      </div>
        
        
      </Modal>
    )
  }

  return (
    <>
    <div className='min-[992px]:grid grid-cols-2 min-[992px]:max-[1200px]:gap-6 gap-12 xl:px-12 px-5 my-10 justify-center'>

        <div className='w-full text-text-color px-3 py-5'>

            <div className='min-[575px]:flex items-center'>

                <div className='sm:px-3'>
                    <img className='min-[992px]:max-[1200px]:w-[10rem] min-[992px]:max-[1200px]:h-[9rem] w-[14rem] h-[14rem] rounded-[50%]'
                    alt="" src={profile ? profile?.profile_picture : profilePlaceholder}/>
                </div>

                <div className='sm:px-3'>
                    <p className='text-[1.2rem] min-[360px]:text-[1.5rem] md:text-[2rem] font-bold my-2'>{profile ? capitalize(profile?.first_name) : ''} {profile ? capitalize(profile?.last_name) : ''}</p>
                    <p className='my-2'>{profile ? profile?.phone : ''}</p>
                    <p className='my-2'>{profile ? profile?.gender : ''}</p>
                    {profile?.role === 'artisan' && <p className='my-2 text-[#7393A7] font-bold text-xl'>{profile ? profile.rating : ''} stars</p>}
                </div>

            </div>

            {profile?.role === 'artisan' ? (
              <>
                <div className='min-[575px]:p-10'>

                <div className=''>
                    <p className='my-5 text-[1.1rem]'>{profile?.bio ? profile.bio : ''}</p>

                    <p className='my-2 font-bold text-[1.1rem]'>{profile?.business_name ? capitalize(profile.business_name) : ''}</p>
                    <p className='my-2 font-bold text-[1.1rem]'>{profile?.business_address ? profile.business_address : ''}</p>
                    <p className='my-2 font-bold text-[1.1rem]'>{profile?.location?.name ? capitalize(profile.location.name) : ''}, Abuja, F.C.T, Nigeria</p>
                </div>
                </div>

                <div className='min-[575px]:p-6 p-2 max-[575px]:mt-10 gap-4 md:gap-2 flex w-full flex-wrap justify-between'>

                <img className='rounded-lg w-[15rem] h-[15rem] min-[992px]:max-[1200px]:w-[12rem] min-[992px]:max-[1200px]:h-[12rem]'
                alt="" src={profile ? profile?.work_pictures.work_image_1 : ''}/>

                <img className='rounded-lg w-[15rem] h-[15rem] min-[992px]:max-[1200px]:w-[12rem] min-[992px]:max-[1200px]:h-[12rem]'
                alt="" src={profile ? profile?.work_pictures.work_image_2 : ''}/>

                </div>
              </>
            ) : (
              ''
            )}
            <div className='min-[575px]:p-10 p-3 max-[575px]:mt-10 '>
                <button className='px-5 py-2 bg-btn-bg text-white rounded' 
                onClick={() => setEditProfileModal(true)}
                >Edit Profile</button>
            </div>
            </div>

            <div className='w-full text-text-color flex justify-center'>

            <div className='w-full'>

            <div className='px-3 h-[25rem] overflow-scroll rounded-lg
            w-full min-[992px]:w-11/12 shadow-[0px_10px_15px_5px_rgba(0,0,0,0.1)]'>
                <p className='font-bold text-[1.1rem] min-[360px]:text-[1.5rem] py-5 ml-3 '>Bookings</p>

                <div className='px-3'>

                {bookings && bookings?.currentBookings?.length > 0 ? (
                  bookings?.currentBookings?.map((booking, index) => (
                  <div key={index} className='flex overflow-scroll w-full justify-between items-center my-5 no-scrollbar'>
                      {profile?.role === 'artisan' && (
                      <>
                        <p className='shrink-0 mr-3 w-[11rem]'>{capitalize(booking?.userId?.first_name)} {capitalize(booking?.userId?.last_name)}</p>
                        <p className='shrink-0 mr-5'>{format(new Date(booking.date), 'do MMM yyyy h aaa')} </p>
                        <button onClick={() => openViewProfile(booking?.userId)}
                        className='px-2 py-1 bg-[#2A528A] text-white  text-sm rounded shrink-0'>View Details</button>
                      </>
                      )}
                      {profile?.role === 'user' && (
                        <>
                        <p className='shrink-0 mr-3 w-[11rem]'>{capitalize(booking?.artisanId?.first_name)} {capitalize(booking?.artisanId?.last_name)}</p>
                        <p className='shrink-0 mr-5'>{format(new Date(booking.date), 'do MMM yyyy h aaa')} </p>
                        <Link to={`/profile/${booking?.artisanId?._id}`}><button className='px-2 py-1 bg-[#2A528A] text-sm text-white rounded shrink-0'>View Profile</button></Link>
                        <button className='px-3 py-1 text-[#EA5354] rounded shrink-0 text-4xl' onClick={() => openDeleteBooking(booking)}><MdDeleteForever/></button>
                        </>
                      )}
                  </div>
                  ))
                 
                ):(
                  <p>No bookings</p>
                )}
                

                </div>
            </div>

            
            <div className='px-3 h-[25rem] overflow-scroll rounded-lg
            w-full min-[992px]:w-11/12 shadow-[0px_10px_15px_5px_rgba(0,0,0,0.1)] my-10'>
                <p className='font-bold text-[1.1rem] min-[360px]:text-[1.5rem] py-5 ml-3 '>Reviews</p>

                <div className='px-3'>

                {profile?.reviews.length > 0 ? (
                  profile?.reviews.map((review, index) => (
                    <div className='my-5' key={index}>
                      <p className='mb-2 text-md'>{review?.text}</p>

                      <div className='flex overflow-scroll w-full
                      items-center no-scrollbar text-sm'>
                          <p className='shrink-0 mr-3'>{review?.rating} stars</p>
                          {profile?.role === 'artisan' && <p className='shrink-0 mr-3 font-bold'><button onClick={() => openViewProfile(review?.userId)}>{capitalize(review?.userId?.first_name)} {capitalize(review?.userId?.last_name)}</button></p>}
                          {profile?.role === 'user' && <p className='shrink-0 mr-3 font-bold'><Link to={`/profile/${review?.artisanId?._id}`}>{capitalize(review?.artisanId?.first_name)} {capitalize(review?.artisanId?.last_name)}</Link></p>}
                          {profile?.role === 'user' && <button className='px-3 py-1 text-sm text-[#EA5354] rounded shrink-0 border border-[#EA5354]' onClick={() => openDeleteReview(review)}>Delete</button>}
                      </div>

                  </div>

                  ))
              ): (
                <p>No reviews yet</p>
              )}
                  
                </div>
            </div>

            </div>

        </div>
        <EditProfileModal open={editProfileModal} handleClose={closeEditProfile}/>
        <ViewProfileModal open={viewProfileModal} handleClose={closeViewProfile}/>
        <DeleteBookingModal open={deleteBookingModal} handleClose={closeDeleteBooking}/>
        <DeleteReviewModal open={deleteReviewModal} handleClose={closeDeleteReview}/>

    </div>

    </>
  )
}
