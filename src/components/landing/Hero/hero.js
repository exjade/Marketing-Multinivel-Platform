import React from 'react';
import styles from './css/hero.module.css';
import * as ROUTES from '../../../constants/routes';

const Hero = () => {
  return (
    <div className={`${styles['hero-container']} font-roboto`} >
      <div className={`${styles['hero-wrapper']}`} >

        {/* Illustration */}
        <div className={`${styles['hero-illustration-container']}`}>
          <div className={`${styles['hero-illustration-wrapper']}`}>
          </div>
        </div>

        {/* Hero Content */}
        <span className={`${styles['hero-paragraph']}`}>
          <h1>The Uncover financial services. </h1>
          <h3>A leader dedicated to providing cutting-edge solutions. Our commitment is to guide you toward achieving your financial goals.</h3>
        </span>

        <div className={`${styles['hero-buttons']}`} >
          <a className={`${styles['hero-buttons-firts-child']}`}
            href={ROUTES.SIGN_UP}
          >
            Get Started
            <span className="material-symbols-sharp ">
              arrow_right_alt
            </span>
          </a>
        </div>

      </div>
    </div>
  )
}

export default Hero
