import React from 'react'
import styles from '../../../styles/landing/landing.module.css'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'
import { useTranslation } from 'react-i18next'

import { motion } from 'framer-motion'
import useMotion from '../../../hooks/use-motion'


const LandinCallToAction = () => {
    const { t } = useTranslation()

    const { item, container, image } = useMotion()

    return (
        <motion.section
            className={`${styles.topBoxShadow} flex flex-col justify-center items-center w-full h-screen px-10 gap-16`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <motion.div
                className={` w-full rounded-lg p-8 sm:p-16  border border-blue-feedback flex flex-col gap-4`} variants={image}>
                {/* TITLE */}
                <p className='text-gray-background '>WELL..</p>
                <h1 className='capitalize text-2xl lg:text-[3em] font-normal'>{t('Are you ready to be amoung us?')}</h1>
                {/* BUTTON */}
                <motion.div variants={item} className='flex flex-col my-5 w-full'>
                    <Link to={ROUTES.SIGN_UP}>
                        <button className='w-44 h-22  sm:w-72 py-2 px-10 sm:py-5 sm:px-10 shadow-green-parrafo rounded-md bg-blue-feedback text-white-primary font-bold text-center'>
                            {t('Yes, join community')}
                        </button >
                    </Link>
                </motion.div>
                <p className='text-gray-primary'>{t('We support a variery of the most popular digital currencies')}</p>
            </motion.div>
        </motion.section>
    )
}

export default LandinCallToAction