import React from 'react';
import styles from './css/hero.module.css'

const Hero = () => {
  return (
    <div className={`${styles['hero-container']} font-roboto`} >
      <div className={`${styles['hero-wrapper']}`} >

        {/* Illustration */}
        <div className={`${styles['hero-illustration-container']}`}>
          <div className={`${styles['hero-illustration-wrapper']}`}>
            {/* <img
              src='https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Fglow-bottom.svg?alt=media&token=7696150a-dc9e-4e02-aaa4-e54a490ff873'
              alt='Hero illustration'
              width='2146'
              height='774'
              className={`${styles['hero-illustration-image']}`}
            /> */}
          </div>
        </div>

        {/* Hero Content */}
        <span className={`${styles['hero-paragraph']}`}>
          <h1>The Uncover financial services. </h1>
          <h3>A leader dedicated to providing cutting-edge solutions. Our commitment is to guide you toward achieving your financial goals.</h3>
        </span>

        <div className={`${styles['hero-buttons']}`} >
          <button className={`${styles['hero-buttons-firts-child']}`} >Get Started
            <span className="material-symbols-sharp ">
              arrow_right_alt
            </span>
          </button>
          <button className={`${styles['hero-buttons-second-child']}`} ></button>
        </div>

      </div>
    </div>
  )
}

export default Hero
