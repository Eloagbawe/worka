import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetCrafts, getCrafts } from '../features/crafts/craftSlice';
import { resetLocations, getLocations } from '../features/locations/locationSlice';
import { reset } from '../features/auth/authSlice';

export const Search = () => {
  const [searchMode, setSearchMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { crafts, craftsError, craftsLoading, craftsMessage } = useSelector((state) => state.craft);
  const { locations, locationsError, locationsLoading, locationsMessage } = useSelector((state) => state.location);
  const { user } = useSelector((state) => state.auth)

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
  }, [dispatch, craftsError, locationsError, locationsMessage, craftsMessage])

  useEffect(() => {

    // if (!user) {
    //   router.push('/login');
    // } 
    return () => {
      dispatch(reset());
      dispatch(resetCrafts());
      dispatch(resetLocations());
    }

  }, [dispatch])

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    setSearchMode(true);
    
  }
  return (
    <div className='text-text-color mt-10'>

      {true &&
        <div className='flex justify-center'>
        <div className='sm:w-3/5 xl:w-2/5 w-10/12 max-[320px]:w-11/12'>
        <h2 className='text-center font-bold text-[2rem] mb-5'>Search Artisan</h2>

          <div className='w-full flex justify-center'>

          <form onSubmit={handleSearchSubmit} id="searchArtisanForm" className='py-5 max-[500px]:w-11/12 w-3/4'>

              <div className='flex items-center justify-center w-full'>
                <label htmlFor="craft" className='mr-8 sm:mr-10'>Craft:</label>
                <select id="craft" defaultValue="none" name="craftList" form="searchArtisanForm" 
                className='border rounded focus:outline-0 bg-transparent p-2 my-5 w-full'>
                  <option value="none" disabled className='text-gray-400'>Choose a craft</option>
                  {crafts?.map((craft, key) => (
                    <option key={key} value={craft?._id}>{craft?.name}</option>
                  ))}
                </select>
              </div>

              <div className='flex items-center justify-center w-full'>
                <label htmlFor="location" className='mr-2 sm:mr-4'>Location:</label>
                <select id="location" defaultValue="none" name="locationList" form="searchArtisanForm" 
                className='border rounded focus:outline-0 bg-transparent p-2 my-5 w-full'>
                  <option value="none" disabled>Choose a location</option>
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

            <div className='border rounded-lg p-5'>

              <p className='my-1'>Name: Joy Momoh</p>
              <p className='my-1'>Hairdressing</p>
              <p className='my-1'>Wuye</p>
              <p className='my-1 font-bold'>5 stars</p>

              <button className='rounded px-3 py-2 bg-[#2A528A] text-white my-3'>View Profile</button>

            </div>

            <div className='border rounded-lg p-5'>

              <p className='my-1'>Name: Joy Momoh</p>
              <p className='my-1'>Hairdressing</p>
              <p className='my-1'>Wuye</p>
              <p className='my-1 font-bold'>5 stars</p>

              <button className='rounded px-3 py-2 bg-[#2A528A] text-white my-3'>View Profile</button>

            </div>

            <div className='border rounded-lg p-5'>

              <p className='my-1'>Name: Joy Momoh</p>
              <p className='my-1'>Hairdressing</p>
              <p className='my-1'>Wuye</p>
              <p className='my-1 font-bold'>5 stars</p>

              <button className='rounded px-3 py-2 bg-[#2A528A] text-white my-3'>View Profile</button>

            </div>

            <div className='border rounded-lg p-5'>

              <p className='my-1'>Name: Joy Momoh</p>
              <p className='my-1'>Hairdressing</p>
              <p className='my-1'>Wuye</p>
              <p className='my-1 font-bold'>5 stars</p>

              <button className='rounded px-3 py-2 bg-[#2A528A] text-white my-3'>View Profile</button>

            </div>

          </div>

          <div className='flex flex-wrap mt-10'>
            <button className='rounded-lg px-3 py-2 bg-btn-bg text-white my-3 mr-10 w-2/5 sm:w-32'>Previous</button>
            <button className='rounded-lg px-3 py-2 bg-btn-bg text-white my-3 w-2/5 sm:w-32'>Next</button>
          </div>

        </div>
      }
      
    </div>
  )
}
