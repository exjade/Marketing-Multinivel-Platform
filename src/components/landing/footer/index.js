import React from 'react'
import styles from './css/footer.module.css'

const Footer = () => {
    return (
        <div className={`${styles['footer-container']}`} >
            <div className={`${styles['footer-wrapper']}`} >

                <img 
                src="/logo.webp" 
                alt="logo" 
                className='object-container w-10 h-10'
                />

                <p>@CapitaltradersCorp - All rights reserved.</p>

            </div>
        </div>
    )
}

export default Footer