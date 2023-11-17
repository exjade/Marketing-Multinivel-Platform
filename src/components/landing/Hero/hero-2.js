import React from 'react'
import styles from './css/hero2.module.css';
import * as ROUTES from '../../../constants/routes';

const Hero = () => {
    return (
        <div className={`${styles['hero-container']}`} >
            <div className={`${styles['hero-wrapper']}`} >

                <span className={`${styles['hero-text']}`}>
                    <h4>Secure investment strategies</h4>
                    <h2>Take control of your Financial</h2>
                    <p>
                        At Capital Traders Corp, we highly value the trust our clients place in us, working diligently to foster long-term relationships built on transparency and integrity.
                        From investment management to personalized financial planning, our extensive range of services is designed to optimize growth and financial security.
                    </p>
                </span>

                <div className={`${styles['hero-buttons']}`} >
                    <a className={`${styles['hero-buttons-firts-child']}`}
                        href={ROUTES.SIGN_UP} >
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