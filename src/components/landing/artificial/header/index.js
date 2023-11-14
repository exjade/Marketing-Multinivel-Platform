import React from 'react'
import styles from '../landing.module.css'
import * as ROUTES from '../../../../constants/routes'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useIsVisible from '../../../../hooks/use-isVisible';

const LandingHeader = () => {
    const { t } = useTranslation();

    const { isContentVisible } = useIsVisible()

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <header id="content" className={`${!isContentVisible ? `${styles.visible}` : `${styles.content}`} ${styles.headerContainer}`}>
            <motion.div
                className={`${styles.headerWrapper} my-5 font-Inter-600`}
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {/* LOGO */}
                <motion.div
                    className={`${styles.headerImg} flex flex-row items-center justify-center `}
                    variants={item}
                >
                    <img
                        src="logo.webp"
                        alt="landing logo"
                        className={` w-10 h-10 sm:w-22 sm:h-22 object-contain rounded-full`}
                    />
                    <p className='font-bold uppercase text-xs sm:text-xl subpixel-antialiased hidden sm:inline'>Artificial</p>
                </motion.div>

                {/* AUTH BUTTONS */}
                <div className='flex flex-row items-center justify-center'>
                    {/* BUTTON LOGIN  */}
                    <Link to={ROUTES.LOGIN}>
                        <button
                            type='button'
                            className='w-20 h-10 sm:w-32 sm:h-12 bg-transparent rounded-md text-white-normal text-sm sm:text-xl font-Inter-600'
                        >
                            {t('Member`s')}
                        </button>
                    </Link>
                    {/* BUTTON SIGNUP */}
                    <Link to={ROUTES.SIGN_UP}>
                        <button
                            type='button'
                            className='w-20 h-10 sm:w-32 sm:h-12 bg-white-normal rounded-md text-black-normal text-sm sm:text-xl font-Inter-600'
                        >
                            {t('Join')}
                        </button>
                    </Link>
                </div>
            </motion.div>
        </header>

    )
}

export default LandingHeader