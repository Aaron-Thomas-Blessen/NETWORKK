import React, { useState, useEffect } from 'react';
import Navbar from './nav';



const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
 

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  

  return (
    <div className="carousel-container">
      <div className="carouselrelative h-auto">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div  className="absolute top-0 w-full overflow-hidden ">
           <Navbar />
          </div>
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Carousel;
