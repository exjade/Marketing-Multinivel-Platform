import React, { useEffect } from 'react'
import './css/swipper.css'
import Swiper from 'swiper';
import 'swiper/css';

const Swipper = () => {

  useEffect(() => {
    const swiper = new Swiper('.swiper-container', {
      effect: 'coverflow',
      loop: true,
      initialSlide: 0,
      slidesPerView: 4,
      spaceBetween: 30,
      lazy: true, // Cambiado de lazyLoading a lazy
      speed: 5000,
      grabCursor: true, // Cambiado a true para mostrar el cursor de agarre
      autoplay: {
        delay: 3000,
        disableOnInteraction: false, // Cambiado a false para que no se desactive en interacción
      },
      pagination: {
        el: '.swiper-wrapper',
        clickable: true,
      },
    });

    setTimeout(() => {
      swiper.update();
    }, 500);

    // Limpiar Swiper en la limpieza del wrapper
    return () => {
      swiper.destroy();
    };
  }, []);


  return (
    <div className='swiper-container'>
      <div
        className='swiper-wrapper'>
        <div className='swiper-slide'>
          <img
            src="/images/client-01.svg"
            alt="Client 1"
            height='21'
            width='110'
          />
        </div>
        <div className='swiper-slide'>
          <img
            src="/images/client-02.svg"
            alt="Client 2"
            height='21'
            width='110'
          />
        </div>
        <div className='swiper-slide'>
          <img
            src="/images/client-03.svg"
            alt="Client 3"
            height='21'
            width='110'
          />
        </div>
        <div className='swiper-slide'>
          <img
            src="/images/client-04.svg"
            alt="Client 4"
            height='21'
            width='110'
          />
        </div>
        <div className='swiper-slide'>
          <img
            src="/images/client-05.svg"
            alt="Client 5"
            height='21'
            width='110'
          />
        </div>
        <div className='swiper-slide'>
          <img
            src="/images/client-06.svg"
            alt="Client 6"
            height='21'
            width='110'
          />
        </div>
        <div className='swiper-slide'>
          <img
            src="/images/client-07.svg"
            alt="Client 7"
            height='21'
            width='110'
          />
        </div>
        <div className='swiper-slide'>
          <img
            src="/images/client-08.svg"
            alt="Client 8"
            height='21'
            width='110'
          />
        </div>
        <div className='swiper-slide'>
          <img
            src="/images/client-09.svg"
            alt="Client 9"
            height='21'
            width='110'
          />
        </div>
      </div>
      <div className='swiper-button-next'></div>
      <div className='swiper-button-prev'></div>
    </div >

  )
}

export default Swipper