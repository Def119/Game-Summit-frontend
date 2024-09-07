import React, { useState, useEffect, useRef } from "react";
import "./slideshow.css";

const Slideshow = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;
  const slideshowRef = useRef(null);

  // Add duplicates of the first and last images for seamless circular effect
  const extendedImages = [images[length - 1], ...images, images[0]];

  useEffect(() => {
    if (length <= 1) return; // No need for sliding if there's only one image

    const timer = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, [current, length]);

  const nextSlide = () => {
    setCurrent(prev => (prev + 1) % (length + 2));
    if (current === length) {
      setTimeout(() => {
        slideshowRef.current.style.transition = 'none';
        setCurrent(1);
        setTimeout(() => {
          slideshowRef.current.style.transition = 'transform 1s ease';
        }, 50);
      }, 1000);
    }
  };

  const prevSlide = () => {
    setCurrent(prev => (prev - 1 + length + 2) % (length + 2));
    if (current === 1) {
      setTimeout(() => {
        slideshowRef.current.style.transition = 'none';
        setCurrent(length);
        setTimeout(() => {
          slideshowRef.current.style.transition = 'transform 1s ease';
        }, 50);
      }, 1000);
    }
  };

  return (
    <div className="slideshow">
      <div
        className="slideshow-container"
        ref={slideshowRef}
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {extendedImages.map((image, index) => (
          <div className="slide" key={index}>
            <img src={image} alt={`slide-${index}`} />
          </div>
        ))}
      </div>
      <button className="left-arrow" onClick={prevSlide}>‹</button>
      <button className="right-arrow" onClick={nextSlide}>›</button>
    </div>
  );
};

export default Slideshow;