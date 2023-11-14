import React from 'react'
import styles from '../landing.module.css'
import * as ROUTES from '../../../../constants/routes'
import { Link } from 'react-router-dom'

const LandingFaq = () => {
    return (
        <div className={styles.container}>
            <div className={styles.faqWrapper}>
                <span>
                    <img
                        src="/logo.webp"
                        alt="artificial logo"
                        className={styles.faqImage}
                    />
                </span>
                <div className='flex flex-col gap-5 items-center justify-center w-full'>
                    <h2 className='text-start text-2xl font-bold'>FAQ's</h2>
                    <p className='text-gray-info text-md font-light'>Everything you've always wanted to know and more.</p>
                    <Link to={ROUTES.FAQS} className={`${styles.faqButton} hover:bg-blue-emblema translate-x-0`}>
                        <button>
                            view all FAQ's
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingFaq