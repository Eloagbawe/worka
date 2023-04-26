import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, resetProfile } from '../features/profile/profileSlice';
import { Spinner} from '../components/Spinner';
import { Modal } from '../components/Modal';

import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import { setHours, setMinutes } from 'date-fns'


import { FaRegCalendarAlt} from 'react-icons/fa';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';


import { logout, reset } from '../features/auth/authSlice';

import { resetCrafts } from '../features/crafts/craftSlice';
import { resetLocations } from '../features/locations/locationSlice';
import { resetBooking, getBookedDates, addBooking } from '../features/booking/bookingSlice';
import { resetReview, add_review } from '../features/review/reviewSlice';

import profilePlaceholder from '../images/profile_placeholder.png'

export const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addBookingModal, setAddBookingModal] = useState(false);
  const [addReviewModal, setAddReviewModal] = useState(false);
  // const [editReviewModal, setEditReviewModal] = useState(false);




  const {userProfile, isLoading, isError, message} = useSelector((state) => state.profile)
  const {bookedDates,  addBookingSuccess, bookingLoading, addBookingError} = useSelector((state) => state.booking)
  const {user} = useSelector((state) => state.auth)
  const { reviewSuccess, reviewLoading, reviewError, reviewMessage } = useSelector((state) => state.review)

  
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
        navigate('*');
        return;
      }
    }


    if (!user && user?.role !== 'user') {
      navigate('/login');
    } else {
     dispatch(getUser(params.id));
     dispatch(getBookedDates(params.id));
    }

  },[user, dispatch, navigate, isError, message, params])

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

  useEffect(() => {
    if (reviewSuccess) {
      toast.success('Review submitted successfully');
      dispatch(getUser(params.id));
    }

    if (reviewError) {
      toast.error(reviewMessage.message);
    }

    if (addBookingSuccess) {
      toast.success('Booking was Successful');
      dispatch(getBookedDates(params.id));
    }

    if (addBookingError) {
      toast.error('There was a problem with your booking. Please try again');
    }

    
    dispatch(resetReview());
    dispatch(resetBooking())
  }, [reviewSuccess, dispatch, params,
  reviewError, reviewMessage, addBookingError,
  addBookingSuccess])

  const closeAddBooking = () => {
    setAddBookingModal(false);
  }

  const AddBookingModal = ({open, handleClose}) => {
    const booked_dates = bookedDates.map((booking) => new Date(booking.date).getTime());
    const [startDate, setStartDate] = useState(new Date());

    const isnotSunday = (date) => {
      const day = (date).getDay();
      return day !== 0;
    };

    const includeTimes = [
      setHours(setMinutes(new Date(), 0), 10),
      setHours(setMinutes(new Date(), 0), 11),
      setHours(setMinutes(new Date(), 0), 12),
      setHours(setMinutes(new Date(), 0), 13),
      setHours(setMinutes(new Date(), 0), 14),
      setHours(setMinutes(new Date(), 0), 15),
      setHours(setMinutes(new Date(), 0), 16),

    ]

    const filterTime = (time) => {
      const selectedDate = new Date(time);
      let currentDate = new Date();

      const isBooked = booked_dates.includes(selectedDate.getTime());
      const canBeBooked = selectedDate.getTime() > currentDate.getTime();
      return (!isBooked && canBeBooked)    
    };

    const onSubmit = (e) => {
      e.preventDefault();

      
      if ((startDate.getHours() < 10) || (startDate.getHours() > 16)) {
        toast.error('Booking times are from 10am to 4pm');
        return;
      }

      if (startDate.getDay() === 0) {
        toast.error('No booking on a sunday');
        return;
      }

      if (new Date().getTime() > startDate.getTime()) {
        toast.error('Please select a valid date and time');
        return;
      }

      startDate.setMinutes(0);
      startDate.setSeconds(0);
      startDate.setMilliseconds(0);
      const selectedDate = {date: startDate}

      
      const data = {
        id: params.id,
        data: selectedDate
      }

      dispatch(addBooking(data));
      setAddBookingModal(false);

    }
    return (
      <Modal  open={open} handleClose={handleClose} className={'w-[95%] h-[35rem] sm:w-7/12 lg:w-4/12 text-center'}>
        <div className='flex flex-wrap items-center justify-center'>
          <h3 className='font-bold text-lg mr-3'>Add Booking</h3>
          <FaRegCalendarAlt/>
        </div>

        <form onSubmit={onSubmit} className='my-5'>
          <div className='w-full'>
            <label htmlFor="date_picker"> Select Date and Time: </label>
            <DatePicker id="date_picker" wrapperClassName="w-full" selected={startDate} dateFormat="MMMM d, yyyy h:mm aa"
            onChange={(date) => setStartDate(date)} filterDate={isnotSunday} minDate={new Date()}
            showTimeSelect timeIntervals={60} includeTimes={includeTimes} filterTime={filterTime}
            className='text-text-color bg-transparent border rounded-lg p-2 focus:outline-0 my-5'/>
            
          </div>

          <button type="submit" className='text-[#fdfdfd] bg-btn-bg p-2 rounded-lg my-5'>Schedule Booking</button>

        </form>
        
      </Modal>
    )
  }
  

  const closeAddReview = () => {
    setAddReviewModal(false);
  }


  const AddReviewModal = ({open, handleClose}) => {
    const [ratingValue, setRatingValue] = useState(0);
    const [reviewText, setReviewText] = useState('')

    const StyledRating = styled(Rating)({
      '& .MuiRating-iconFilled': {
        color: '#ff6d75',
      },
      '& .MuiRating-iconHover': {
        color: '#ff3d47',
      },
    });

    const handleSubmit = (e) => {
      e.preventDefault();

      if (ratingValue === 0) {
        toast.error('Please add a rating');
        return;
      }

      if (reviewText === '') {
        toast.error('Please add a review text!');
        return;
      }

      const reviewData = {
        id: params.id,
        data: {
          text: reviewText,
          rating: ratingValue
        }
      }

      dispatch(add_review(reviewData));
      setAddReviewModal(false);
    }

    return(
      <Modal open={open} handleClose={handleClose}
      className={'w-[90%] sm:w-7/12 lg:w-4/12 text-center'}>

        <h3 className='text-center font-bold'>Add a review</h3>

        <form onSubmit={handleSubmit}>
        <div className='my-5'>
          <StyledRating
            name="simple-controlled"
            size="large"
            value={ratingValue}
            onChange={(event, newValue) => {
              setRatingValue(newValue);}}
          />
          </div>
          <div className='p-2 border rounded text-text-color my-5'>
            <textarea className="w-full bg-transparent focus:outline-0"
            value={reviewText} onChange={(e) => setReviewText(e.target.value)}
            type="text" placeholder="Say something about your experience"/>
          </div>

          
          
          <div className='w-full'>
            <button type="submit" className='border rounded px-3 py-1 mr-5'>Submit</button>
            <button type="button" onClick={() => closeAddReview()}>Cancel</button>

          </div>
          
        </form>

      </Modal>
    )
  }
  

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  
  if (isLoading || reviewLoading || bookingLoading) {
    return (
      <div className='min-h-[70vh]'>
      <Spinner/>
      </div>
      )
  }
  return (
    <>
    <div className='min-[992px]:grid grid-cols-2 min-[992px]:max-[1200px]:gap-6 gap-12 xl:px-12 px-5 my-10 justify-center'>

      <div className='w-full text-text-color px-3 py-5'>

          <div className='min-[575px]:flex items-center max-[575px]:text-center'>

              <div className='px-3 max-[992px]:pr-5 max-[575px]:flex max-[575px]:justify-center'>
                  <img className='min-[992px]:max-[1200px]:w-[10rem] min-[992px]:max-[1200px]:h-[9rem] w-[14rem] h-[14rem] rounded-[50%]'
                  alt="" src={userProfile ? userProfile?.profile_picture : profilePlaceholder}/>
              </div>

              <div className='sm:px-3'>
                  <p className='text-[1.2rem] min-[360px]:text-[1.5rem] md:text-[2rem] font-bold my-2'>{userProfile ? capitalize(userProfile?.first_name) : ''} {userProfile ? capitalize(userProfile?.last_name) : ''}</p>
                  <p className='my-2'>{userProfile ? userProfile?.phone : ''}</p>
                  <p className='my-2'>{userProfile ? userProfile?.gender : ''}</p>
                  <div className='flex flex-wrap items-center my-2 max-[575px]:justify-center'>
                  <p className='text-[#7393A7] font-bold text-xl mr-3'>{userProfile ? userProfile.rating : ''} stars</p>
                  {userProfile && !userProfile?.review && <button 
                  className='py-1 px-2 h-[1.5rem] bg-btn-bg text-xs text-[#fdfdfd] rounded-xl' 
                  onClick={() => setAddReviewModal(true)}>Add a review</button>}
                  </div>
                 
                  <p className='my-2'>{userProfile?.craft?.name ? capitalize(userProfile?.craft.name) : ''}</p>

              </div>

          </div>

          {userProfile?.role === 'artisan' ? (
            <>
              <div className='min-[575px]:p-10 max-[575px]:pt-5'>

              <div className=''>
                  <p className='my-5 text-[1.1rem]'>{userProfile?.bio ? userProfile.bio : ''}</p>

                  <p className='my-2 font-bold text-[1.1rem]'>{userProfile?.business_name ? capitalize(userProfile.business_name) : ''}</p>
                  <p className='my-2 font-bold text-[1.1rem]'>{userProfile?.business_address ? userProfile.business_address : ''}</p>
                  <p className='my-2 font-bold text-[1.1rem]'>{userProfile?.location?.name ? capitalize(userProfile.location.name) : ''}, Abuja, F.C.T, Nigeria</p>
              </div>
              </div>

              <div className='min-[575px]:p-6 p-2 max-[575px]:mt-10 gap-4 md:gap-2 flex w-full flex-wrap justify-between'>

              <img className='rounded-lg w-[15rem] h-[15rem] min-[992px]:max-[1200px]:w-[12rem] min-[992px]:max-[1200px]:h-[12rem]'
              alt="" src={userProfile ? userProfile?.work_pictures.work_image_1 : ''}/>

              <img className='rounded-lg w-[15rem] h-[15rem] min-[992px]:max-[1200px]:w-[12rem] min-[992px]:max-[1200px]:h-[12rem]'
              alt="" src={userProfile ? userProfile?.work_pictures.work_image_2 : ''}/>

              </div>
            </>
          ) : (
            ''
          )}
          
          </div>

          <div className='w-full text-text-color flex justify-center'>

          <div className='w-full'>

          <div className='px-3 overflow-scroll rounded-lg
          w-full min-[992px]:w-11/12 shadow-[0px_10px_15px_5px_rgba(0,0,0,0.1)] my-10'>
               <div className='min-[575px]:p-10 p-3  w-full'>
              <button className='px-5 py-2 bg-btn-bg text-white rounded'
              onClick={() => setAddBookingModal(true)}
              >Schedule Consultation</button>
              </div>
          </div>

         
          
          <div className='px-3 h-[25rem] overflow-scroll rounded-lg
          w-full min-[992px]:w-11/12 shadow-[0px_10px_15px_5px_rgba(0,0,0,0.1)] my-10'>
            
            <p className='font-bold text-[1.1rem] min-[360px]:text-[1.5rem] py-5 ml-3 sm:mr-10'>Reviews</p>

              <div className='px-3'>

              {userProfile?.reviews.length > 0 ? (
                userProfile?.reviews.map((review, index) => (
                  <div className='my-5' key={index}>
                    <p className='mb-2 text-md'>{review?.text}</p>

                    <div className='flex overflow-scroll w-full
                    items-center no-scrollbar text-sm'>
                        <p className='shrink-0 mr-3'>{review?.rating} stars</p>
                        {userProfile?.role === 'artisan' && <p className='shrink-0 mr-3 font-bold'><button>{capitalize(review?.userId?.first_name)} {capitalize(review?.userId?.last_name)}</button></p>}
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
      </div>
      <AddBookingModal open={addBookingModal} handleClose={closeAddBooking}/>
      <AddReviewModal open={addReviewModal} handleClose={closeAddReview}/>
    </>
  )
}
