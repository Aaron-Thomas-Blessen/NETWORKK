import React, { useState } from 'react';

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
      {images.length > 0 && (
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      <button
        onClick={prevImage}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Prev
      </button>
      <button
        onClick={nextImage}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
