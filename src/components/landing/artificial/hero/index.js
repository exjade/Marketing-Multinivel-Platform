import React from 'react'
import styles from '../landing.module.css'
import * as ROUTES from '../../../../constants/routes'
import { Link } from 'react-router-dom'
import useMotion from '../../../../hooks/use-motion'
import { motion } from 'framer-motion';
import useIsVisible from '../../../../hooks/use-isVisible'


const LandingHero = () => {

    const { item, container, image } = useMotion()
    const {isContentVisible } = useIsVisible()

    return (
        <div id="content" className={`${isContentVisible ? `${styles.content} ${styles.visible}` : `${styles.content}`} ${styles.container} mb-16 sm:mb-2`}>
            <motion.div
                className={`${styles.heroWrapper} flex flex-col gap-20`}
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {/* Description */}
                <div className='flex flex-col gap-14 items-center justify-center w-full'>
                    <span className='flex flex-col justify-center items-center gap-4 w-full'>
                        <motion.h1
                            className='text-xl sm:text-5xl font-medium sm:font-thin leading-loose tracking-wide sm:tracking-widest text-center'
                            variants={item}
                        >
                            Freedom, Transformation, Tokenization
                        </motion.h1>
                        <h3 className='w-full sm:w-7/12 font-thin leading-tight break-words'>
                            Artificia, we believe in creating a strong and secure financial future for our investors.
                            Our team of blockchain and investment management experts works tirelessly to identify
                            and seize the best opportunities for growth to give our investors a competitive advantage.
                        </h3>
                        <p className='italic'>Join us at Artificial, and discover how together we can build a path to a brighter, more prosperous future."</p>
                    </span>
                    <div className='flex flex-row justify-around items-center gap-4 w-8/12'>
                        <Link to={ROUTES.SIGN_UP}>
                            <motion.button className={styles.buttonOne} variants={item}>
                                Get started
                            </motion.button>
                        </Link>
                        <Link to={ROUTES.LOGIN}>
                            <motion.button className={styles.buttonTwo} variants={item}>
                                Log on
                            </motion.button>
                        </Link>
                    </div>
                </div>
                {/* Hero Image */}
                <motion.div
                    className='flex flex-row justify-center items-center w-full gap-4'
                    variants={image}>
                    <img
                        src="/assets/landing-image.png"
                        alt="artificial ilustration"
                        className={styles.landingImage}
                    />
                </motion.div>
            </motion.div>
        </div>
    )
}

export default LandingHero