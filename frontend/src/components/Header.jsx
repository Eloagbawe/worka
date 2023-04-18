import React from 'react';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import workersImg from '../../public/images/workers.png';
import tailoringImg from '../../public/images/tailoring.png';
import hairDresserImg from '../../public/images/hair_dresser.png';
import carpentryImg from '../../public/images/carpentry.png';
import electricianImg from '../../public/images/electrician.png';
import hairSalonImg from '../../public/images/hair.png';

export const Header = () => {

  const carouselImages = [ hairSalonImg, electricianImg, tailoringImg, carpentryImg, hairDresserImg, workersImg, ];
  return (
    <>
    <div className='px-4 sm:px-12 py-4 md:grid grid-cols-2 gap-4 justify-center'>
        <div className='p-4 sm:p-6 xl:p-12'>

            <h2 className='text-text-color text-[3rem] max-[345px]:text-[2rem] min-[1090px]:text-[4rem] font-bold'>The right place to find Artisans near you!</h2>
            <button className='px-12 py-2 mt-8 text-xl rounded-xl bg-search-btn-bg text-white'>Search</button>

        </div>

        <div className=' mt-5 md:mt-0 h-[30rem]'>

          <Carousel>
            {carouselImages.map((image, key) => (
              <Image key={key} src={image} className={`rounded-lg h-[22rem] lg:h-[28rem] object-cover object-top`} priority alt="carousel image"/>
            ))}
          </Carousel>

        </div>

    </div>
    </>
  )
}
