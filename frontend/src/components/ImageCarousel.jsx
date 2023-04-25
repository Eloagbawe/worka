import React from 'react';
import Carousel from 'react-material-ui-carousel';

export const ImageCarousel = () => {
  const carouselImages = [ 
    'https://res.cloudinary.com/eloagbawe/image/upload/v1682452890/worka_carousel_images/vligosirbjtoafkstpuh.png',
    'https://res.cloudinary.com/eloagbawe/image/upload/v1682452890/worka_carousel_images/qbt8mnq4mk4ckugofprm.png',
    'https://res.cloudinary.com/eloagbawe/image/upload/v1682452891/worka_carousel_images/tekgw5mfjxeo1jxlukth.png',
    'https://res.cloudinary.com/eloagbawe/image/upload/v1682452890/worka_carousel_images/wuzzacuv5whjzqxozjy7.png',
    'https://res.cloudinary.com/eloagbawe/image/upload/v1682452891/worka_carousel_images/wlawde0tiv2frbmo0x4b.png',
    'https://res.cloudinary.com/eloagbawe/image/upload/v1682452890/worka_carousel_images/imufopqo9d8uahhuzxfz.png', ];

  return (
      <Carousel>
        {carouselImages.map((image, key) => (
          <img key={key} src={image} className={`rounded-lg w-full h-[22rem] lg:h-[28rem] object-cover object-top`} alt="carousel"/>
        ))}
      </Carousel>
  )
}
