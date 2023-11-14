import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from '../../../styles/landing/landing.module.css'
import { motion } from 'framer-motion'
import useMotion from '../../../hooks/use-motion'
import useIsVisible from '../../../hooks/use-isVisible'


const LandingTestimonials = () => {
    const { t } = useTranslation()
    const { item, container, image } = useMotion()
    const { isContentVisible } = useIsVisible()

    return (
        <motion.section
            id="transition"
            className={`${isContentVisible ? `${styles.transition} ${styles.visible}` : `${styles.transition}`} ${styles.Content} flex flex-col justify-center items-center w-full h-screen gap-16`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {/* TiTLE */}
            <div className='flex flex-col gap-4 justify-center items-center w-10/12'>
                <p className='uppercase text-green-landingButton leading-8'>{t('FEEDBACK')}</p>
                <h1 className='text-2xl lg:text-[3em] font-normal'>{t('What our investors say?')}</h1>
            </div>
            {/* TESTIMONIALS */}
            <div className='grid grid-cols-1 lg:grid-cols-2 w-8/12 gap-5'>
                <motion.div
                    className='text-start sm:text-center bg-blue-feedback text-white-primary rounded-xl p-10 gap-3 leading-4 '
                    variants={image}
                >
                    <div className='text-xs sm:text-sm '>
                        {t('Artificial has been a real driver of my financial success. Their innovative approach and use of artificial intelligence in their investment strategies have proven to be highly effective. I have made significant gains and have full confidence in their experience and expertise in the cryptocurrency market.')}
                    </div>
                    <p className='text-white-normal font-normal text-xs sm:text-sm'>- Carlos M.</p>
                </motion.div>
                <motion.div
                    className='text-start sm:text-center bg-blue-feedback text-white-primary rounded-xl p-10 gap-3 leading-4 '
                    variants={item}
                >
                    <div className='text-xs sm:text-sm '>
                        {t('I am grateful to have found Artificial. Not only have they provided me with lucrative investment opportunities, but they have also helped me better understand the world of cryptocurrencies and blockchain technology. I am excited for the future ahead of me thanks to their platform and commitment to innovation.')}
                    </div>
                    <p className='text-white-normal font-normal text-xs sm:text-sm'>- Ana S.</p>
                </motion.div>
                <motion.div
                    className='hidden lg:inline text-start sm:text-center bg-blue-feedback text-white-primary gap-3 leading-4 rounded-xl p-10 '
                    variants={image}
                >
                    <div className='text-xs sm:text-sm '>
                        {t('As an active investor, I have tried several platforms, but none compares to Artificial. Their approach based on blockchain technology and artificial intelligence has allowed me to make informed decisions and get consistent results. I am truly impressed by their professionalism and dedication to the success of their users.')}
                    </div>
                    <p className='text-white-normal font-normal text-xs sm:text-sm'>- Laura Morales</p>
                </motion.div>
                <motion.div
                    className='hidden lg:inline text-start sm:text-center bg-blue-feedback text-white-primary gap-3 leading-4 rounded-xl p-10 '
                    variants={item}
                >
                    <div className='text-xs sm:text-sm '>
                        {t('Its technological approach and sound investment strategy have provided me with exceptional results. I recommend Artificial to anyone who wants to take full advantage of the potential of cryptocurrencies.')}
                    </div>
                    <p className='text-white-normal font-normal text-xs sm:text-sm'>- Roberto Vargas</p>
                </motion.div>
            </div>
        </motion.section >
    )
}

export default LandingTestimonials