import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { resetCrafts, getCrafts } from '../features/crafts/craftSlice';
import { resetLocations, getLocations } from '../features/locations/locationSlice';
import { reset } from '../features/auth/authSlice';
import { resetSearch, searchArtisans } from '../features/search/searchSlice';

import { resetBooking } from '../features/booking/bookingSlice';
import { resetReview } from '../features/review/reviewSlice';
import { resetProfile } from '../features/profile/profileSlice';

import { Spinner } from '../components/Spinner';


export const Search = () => {
  const [searchMode, setSearchMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState({
    craftId: 'none',
    locationId: 'none'
  })


  const {craftId, locationId } = searchData;
  const { crafts, craftsError, craftsMessage } = useSelector((state) => state.craft);
  const { locations, locationsError, locationsMessage } = useSelector((state) => state.location);
  const { user } = useSelector((state) => state.auth)
  const { results, pageInfo, searchLoading, searchError, searchSuccess, searchMessage} = useSelector((state) => state.search);

  useEffect(() => {

    if (craftsError) {
      craftsMessage?.status === 500 ? 
      toast.error('A Network Error has occurred') :
      toast.error(craftsMessage?.message)
      return;
    }
    else if (locationsError) {
      locationsMessage?.status === 500 ? 
      toast.error('A Network Error has occurred') :
      toast.error(locationsMessage?.message)
      return;
    } else {
      dispatch(getCrafts());
      dispatch(getLocations());
     
    }  
  }, [dispatch, craftsError, locationsError, locationsMessage, craftsMessage])

  useEffect(() => {
  
    return () => {
      dispatch(reset());
      dispatch(resetProfile());
      dispatch(resetBooking());
      dispatch(resetReview());
      dispatch(resetLocations());
      dispatch(resetCrafts());
      dispatch(resetSearch());
    }
  }, [dispatch])

  useEffect(() => {

    if (searchError) {
      if (searchMessage?.status === 500) {
        toast.error('A Network Error has occurred');
        return;
      }
      toast.error(searchMessage?.message);
    }
    if (!user || user.role !== 'user') {
      navigate('/');
    }

    if (searchSuccess) {
      setSearchMode(true)
    }
    // return () => {
    //   dispatch(reset());
    //   dispatch(resetCrafts());
    //   dispatch(resetLocations());
    // }

  }, [navigate, user, searchError, searchMessage, searchSuccess])

  

  const onChange = (e) => {
    setSearchData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchMode(false);
    setPage(1);
    const data = {
      page: 1
    }
    if (craftId !== 'none') {
      data['craftId'] = craftId;
    }

    if (locationId !== 'none') {
      data['locationId'] = locationId;
    }
    dispatch(searchArtisans(data))
  }

  const handlePrevious = () => {
    const data = {
      page: page - 1
    }


    if (craftId !== 'none') {
      data['craftId'] = craftId;
    }

    if (locationId !== 'none') {
      data['locationId'] = locationId;
    }
    dispatch(searchArtisans(data)).then(() => {
      if (searchSuccess) {
        setPage(page - 1)
      }
    })

  }

  const handleNext = () => {
    const data = {
      page: page + 1
    }


    if (craftId !== 'none') {
      data['craftId'] = craftId;
    }

    if (locationId !== 'none') {
      data['locationId'] = locationId;
    }
    dispatch(searchArtisans(data)).then(() => {
      if (searchSuccess) {
        setPage(page + 1)
      }
    })
  }

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
  
  if (searchLoading) {
    return (
      <div className='min-h-[70vh]'>
      <Spinner/>
      </div>
      )
  }
  return (
    <div className='text-text-color mt-10'>

      {
        <div className='flex justify-center'>
        <div className='sm:w-3/5 xl:w-2/5 w-10/12 max-[320px]:w-11/12'>
        <h2 className='text-center font-bold text-[2rem] mb-5'>Search Artisan</h2>

          <div className='w-full flex justify-center'>

          <form onSubmit={handleSearchSubmit} id="searchArtisanForm" className='py-5 max-[500px]:w-11/12 w-3/4'>

              <div className='flex items-center justify-center w-full'>
                <label htmlFor="craft" className='mr-8 sm:mr-10'>Craft:</label>
                <select id="craft" value={craftId} name="craftId" form="searchArtisanForm" 
                className='border rounded focus:outline-0 bg-transparent p-2 my-5 w-full' onChange={onChange}>
                  <option value="none"></option>
                  {crafts?.map((craft, key) => (
                    <option key={key} value={craft?._id}>{craft?.name}</option>
                  ))}
                </select>
              </div>

              <div className='flex items-center justify-center w-full'>
                <label htmlFor="location" className='mr-2 sm:mr-4'>Location:</label>
                <select id="location" value={locationId} name="locationId" form="searchArtisanForm" 
                className='border rounded focus:outline-0 bg-transparent p-2 my-5 w-full' onChange={onChange}>
                  <option value="none"></option>
                  {locations?.map((location, key) => (
                    <option key={key} value={location?._id}>{location?.name}</option>
                  ))}
                </select>
              </div>

              <div className='mt-10'>
                <button type="submit"
                className='px-12 py-2 text-lg rounded-xl bg-btn-bg text-white'>Search</button>
              </div>              
             
            </form>
            </div>

        </div>
          
          
        </div>
      }

      {searchMode && 
        <div className='p-4 sm:p-6 xl:p-20 '>
          <p className='font-bold text-lg'>Search Results: </p>

          <div className='grid grid-cols-1 min-[475px]:grid-cols-2 min-[992px]:grid-cols-4 gap-6 justify-center mt-10'>

            {results && results?.length > 0 ? (
              results?.map((result, key) => (
              <div className='border rounded-lg p-5' key={key}>

                <p className='my-1'>Name: {result?.first_name ? `${capitalize(result?.first_name)} `: ''} {result?.last_name ? `${capitalize(result?.last_name)} `: ''}</p>
                <p className='my-1'>{result?.craft?.name}</p>
                <p className='my-1'>{result?.location?.name}</p>
                <p className='my-1 font-bold'>{result?.rating} stars</p>

                <Link to={`/profile/${result?._id}`}><button className='rounded px-3 py-2 bg-[#2A528A] text-white my-3'>View Profile</button></Link>

              </div>
              ))
            ):('No results')}
            
          </div>

          <div className='flex flex-wrap mt-10'>
            {pageInfo && pageInfo?.hasPrevious && <button onClick={() => handlePrevious()}className='rounded-lg px-3 py-2 bg-btn-bg text-white my-3 mr-10 w-2/5 sm:w-32'>Previous</button>}
            {pageInfo && pageInfo?.hasNext && <button onClick={() => handleNext()} className='rounded-lg px-3 py-2 bg-btn-bg text-white my-3 w-2/5 sm:w-32'>Next</button>}
          </div>

        </div>
      }
      
    </div>
  )
}
