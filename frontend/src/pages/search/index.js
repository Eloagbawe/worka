import React, { useState } from 'react'

const index = () => {
  const [searchMode, setSearchMode] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
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
                <label htmlFor="craft" className='mr-3 sm:mr-5'>Craft:</label>
                <select id="craft" defaultValue="none" name="craftList" form="searchArtisanForm" 
                className='border rounded focus:outline-0 bg-transparent p-2 my-5 w-full'>
                  <option value="none" disabled className='text-gray-400'>Choose a craft</option>
                  <option value="carpentry">carpentry</option>
                  <option value="tailoring">tailoring</option>
                </select>
              </div>

              <div className='flex items-center justify-center w-full'>
                <label htmlFor="location" className='mr-3 sm:mr-5'>Location:</label>
                <select id="location" defaultValue="none" name="locationList" form="searchArtisanForm" 
                className='border rounded focus:outline-0 bg-transparent p-2 my-5 w-full'>
                  <option value="none" disabled>Choose a location</option>
                  <option value="apo">apo</option>
                  <option value="wuye">wuye</option>
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

export default index