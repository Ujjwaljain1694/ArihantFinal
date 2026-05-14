import React, { useState, useEffect } from "react";

import "./ImageSlider.css";



// Import all images from assets folder

import img1 from "./assets/370920250537324933732.jpg";

import img2 from "./assets/380920250538105403810.jpg";

import img3 from "./assets/380920250538366803836.jpg";

import img4 from "./assets/380920250538598053859.jpg";

import img5 from "./assets/arihant plus.jpg";



const sliderImages = [img1, img2, img3, img4, img5];



function ImageSlider() {



  

  // const [currentIndex, setCurrentIndex] = useState(4); // start with arihant plus first

  // const [slideDirection, setSlideDirection] = useState(null); // 'left' or 'right'

  // const [isSliding, setIsSliding] = useState(false);



  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     handleNext();
  //   }, 4000);

  //   return () => clearInterval(interval);
  // }, [currentIndex]);

  // const handleNext = () => {
  //   if (isSliding) return;

  //   setSlideDirection("left");
  //   setIsSliding(true);

  //   setTimeout(() => {
  //     setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
  //     setSlideDirection(null);
  //     setIsSliding(false);
  //   }, 500);
  // };

  // const handlePrev = () => {
  //   if (isSliding) return;

  //   setSlideDirection("right");
  //   setIsSliding(true);

  //   setTimeout(() => {
  //     setCurrentIndex((prev) =>
  //       prev === 0 ? sliderImages.length - 1 : prev - 1
  //     );
  //     setSlideDirection(null);
  //     setIsSliding(false);
  //   }, 500);
  // };



  // const getPrevIndex = () => (currentIndex - 1 + sliderImages.length) % sliderImages.length;

  // const getNextIndex = () => (currentIndex + 1) % sliderImages.length;



  // const prevSlide = () => {

  //   if (isSliding) return;

  //   setSlideDirection('right');

  //   setIsSliding(true);

  //   setTimeout(() => {

  //     setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderImages.length) % sliderImages.length);

  //     setSlideDirection(null);

  //     setIsSliding(false);

  //   }, 500);

  // };



  // const nextSlide = () => {

  //   if (isSliding) return;

  //   setSlideDirection('left');

  //   setIsSliding(true);

  //   setTimeout(() => {

  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);

  //     setSlideDirection(null);

  //     setIsSliding(false);

  //   }, 500);

  // };



  // return (

  //   <div className="slider-box">

  //     <div className={`slider-image-wrapper ${slideDirection ? `slide-${slideDirection}` : ''}`}>

  //       {/* Previous Image */}

  //       <div

  //         className="slider-image prev"

  //         style={{ backgroundImage: `url(${sliderImages[getPrevIndex()]})` }}

  //       >

  //       </div>



  //       {/* Current Image */}

  //       <div

  //         className="slider-image current"

  //         style={{ backgroundImage: `url(${sliderImages[currentIndex]})` }}

  //       >

  //       </div>



        
  //     </div>

  //   </div>

  // );

}



export default ImageSlider;

