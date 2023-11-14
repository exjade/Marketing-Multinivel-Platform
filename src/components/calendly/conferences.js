import React from 'react'
import styles from './styles/calendly.module.css'
import useMotion from '../../hooks/use-motion'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet';
import * as ROUTES from '../../constants/routes'

const Conferences = () => {

    const { container, img, item } = useMotion()

    return (

        <motion.div className={`${styles.containerConferences}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <Helmet>
                <title>Events - ArtificialTech4u</title>
                <meta name="description" content="Welcome to ArtificialTech4u, your all-in-one platform. Harness the power of artificial intelligence to optimize your investment strategies and manage your digital assets securely. Explore our cutting-edge services and unlock new opportunities in the world of finance. Join us today and let Artificial Tech4u revolutionize your investment experience." />
                <meta property="og:title" content="ArtificialTech4u - Events" />
                <meta property="og:description" content="Our advanced login platform, powered by intelligent AI technology, ensures a seamless and secure login experience. Safeguard your investments and digital assets with our cutting-edge authentication protocols. Join us at Artificial Tech4u and discover the future of secure and intelligent financial management." />
                <meta property="og:image" content="https://firebasestorage.googleapis.com/v0/b/artificialtech4u-d99e3.appspot.com/o/logo.webp?alt=media&token=8956532b-e360-43fb-846e-19986f8860a6" />
                <meta property="og:url" content="artificialtech4u.com/events" />
            </Helmet>
            <motion.div className={`${styles.wrapperConferences}`} >

                {/* Title */}
                <span className={`${styles.eventTitle}`} >
                    <h1 >Today</h1>
                </span>

                {/* Event Card */}
                <motion.div className={`${styles.eventContainer}`} variants={item}>
                    <div className={`${styles.eventWrapper}`}>
                        <motion.img
                            src="https://firebasestorage.googleapis.com/v0/b/davi-pro-capital.appspot.com/o/events%2Fbanner-redppill.webp?alt=media&token=280a644f-b80b-46cb-a02c-9897d20cba4b"
                            alt="event image"
                            className={`${styles.eventImage}`}
                            loading='lazy'
                            variants={img}
                        />
                        <div className={`${styles.eventInformation}`} >
                            <div className={`${styles.eventInformationWrapper}`}>

                                <span className={`${styles.eventDate}`} >
                                    <p className='text-2xl font-bold '>9:30</p>
                                    <p className='text-xl'>PM</p>
                                </span>
                                <span className={`${styles.eventInfo} text-center`} >
                                    <p className='font-semibold text-lg text-black-normal '>Conoce la "formula redpill" de Artificial </p>
                                    <p className='text-gray-border opacity-95 hidden sm:inline'>Online</p>
                                </span>
                            </div>
                            <a href={ROUTES.EVENTS_REDPILL}
                                type='button'
                                className={`${styles.eventButton}`}
                                
                            >
                                Book Now
                            </a>
                        </div>
                    </div>
                </motion.div>


                <div className={`${styles.eventContainer}`}>
                 <span className={`${styles.eventTitle} my-5`} >
                    <h1 >Next</h1>
                </span>
                    <div className={`${styles.eventWrapper}`} >
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/artificialtech4u-d99e3.appspot.com/o/Night%20Mettenig%20.png?alt=media&token=5ac8da73-8d8f-44ac-9b05-f74d559bce89"
                            alt="event image"
                            className={`${styles.eventImage}`}
                        />
                        <div className={`${styles.eventInformation}`} >
                            <div className={`${styles.eventInformationWrapper}`}>

                                <span className={`${styles.eventDate}`} >
                                    <p className='text-2xl font-bold '>9:30</p>
                                    <p className='text-xl'>PM</p>
                                </span>
                                <span className={`${styles.eventInfo} text-center`} >
                                    <p className='font-semibold text-lg text-black-normal '>El método Night Meetting con Leonardo Macalister</p>
                                    <p className='text-gray-border opacity-95 hidden sm:inline'>Online</p>
                                </span>
                            </div>
                            <a href={ROUTES.EVENTS_MACALISTER}
                                type='button'
                                className={`${styles.eventButton}`}
                            >
                                Book Now
                            </a>
                        </div>
                    </div>
                </div>

            </motion.div>
        </motion.div>
    )
}

export default Conferences