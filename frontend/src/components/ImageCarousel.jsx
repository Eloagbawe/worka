import React from 'react'
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import workersImg from '../../public/images/workers.png';
import tailoringImg from '../../public/images/tailoring.png';
import hairDresserImg from '../../public/images/hair_dresser.png';
import carpentryImg from '../../public/images/carpentry.png';
import electricianImg from '../../public/images/electrician.png';
import hairSalonImg from '../../public/images/hair.png';


export const ImageCarousel = () => {
  const carouselImages = [ hairSalonImg, electricianImg, tailoringImg, carpentryImg, hairDresserImg, workersImg, ];

  return (
      <Carousel>
        {carouselImages.map((image, key) => (
          <Image key={key} src={image} className={`rounded-lg h-[22rem] lg:h-[28rem] object-cover object-top`} priority alt="carousel image"/>
        ))}
      </Carousel>
  )
}
