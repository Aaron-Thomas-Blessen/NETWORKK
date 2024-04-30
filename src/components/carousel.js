import React, { useState, useEffect } from 'react';

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
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="flex-shrink-0 w-full">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
      <button 
        className="absolute top-1/2 left-0 z-10 transform -translate-y-1/2 bg-white bg-opacity-50 text-black font-bold p-2 rounded-full cursor-pointer hover:bg-opacity-75"
        onClick={prevSlide}
      >
        &lt;
      </button>
      <button 
        className="absolute top-1/2 right-0 z-10 transform -translate-y-1/2 bg-white bg-opacity-50 text-black font-bold p-2 rounded-full cursor-pointer hover:bg-opacity-75"
        onClick={nextSlide}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
