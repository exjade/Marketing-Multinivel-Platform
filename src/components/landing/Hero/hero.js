import React from 'react'
import styles from '../../../styles/landing/landing.module.css'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'
import { useTranslation } from 'react-i18next'

const LandingHero = () => {
    const { t } = useTranslation()
    return (
        <>
            <div className={`${styles.Background}  flex flex-row justify-around items-center w-full h-screen`} >
                <div className='flex flex-col justify-center items-center w-full'>
                    {/* TITLE */}
                    <span className='capitalize font-semibold flex flex-col my-10
                 text-[2em] sm:text-5xl text-start
                  '>
                        <p>{t('Let things Go')}</p>
                        <p>{t('Better With')}</p>
                        <p>{t('Cryptocurrency')}</p>
                    </span>
                    {/* BUTTON */}
                    <div className='flex flex-col my-5'>
                        <Link to={ROUTES.SIGN_UP}>
                            <button className='w-44 h-22 py-5 px-10 shadow-green-parrafo rounded-md bg-green-landingButton text-blue-landingBackground font-bold text-center'>
                                {t('Get Started')}
                            </button>
                        </Link>
                    </div>
                </div>

                <div className='hidden xl:flex w-full items-end justify-end'>
                    <img
                        src="/images/hero_hand.webp"
                        alt="hero hand"
                        className='object-cover'
                    />
                </div>

            </div>
        </>
    )
}

export default LandingHero