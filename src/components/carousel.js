import React, { useState, useEffect } from 'react';
import Navbar from './nav';



const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState(0);

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

  useEffect(() => {
    const updateCarouselHeight = () => {
      const navbarHeight = document.querySelector('nav').offsetHeight;
      setCarouselHeight(window.innerHeight - navbarHeight);
    };

    window.addEventListener('resize', updateCarouselHeight);
    updateCarouselHeight();

    return () => {
      window.removeEventListener('resize', updateCarouselHeight);
    };
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel z-20 relative">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div  className="absolute top-0 w-full overflow-hidden z-0" style={{ height: carouselHeight + 'px' }}>
           <Navbar />
          </div>
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="carousel-btn prev" onClick={prevSlide}>
          &lt;
        </button>
        <button className="carousel-btn next" onClick={nextSlide}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
