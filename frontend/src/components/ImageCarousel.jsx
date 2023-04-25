import React from 'react';
import Carousel from 'react-material-ui-carousel';
import workersImg from '../images/workers.png';
import tailoringImg from '../images/tailoring.png';
import hairDresserImg from '../images/hair_dresser.png';
import carpentryImg from '../images/carpentry.png';
import electricianImg from '../images/electrician.png';
import hairSalonImg from '../images/hair.png';

export const ImageCarousel = () => {
  const carouselImages = [ hairSalonImg, electricianImg, tailoringImg, carpentryImg, hairDresserImg, workersImg, ];

  return (
      <Carousel>
        {carouselImages.map((image, key) => (
          <img key={key} src={image} className={`rounded-lg w-full h-[22rem] lg:h-[28rem] object-cover object-top`} alt="carousel"/>
        ))}
      </Carousel>
  )
}
