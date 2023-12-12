import React, { useState } from 'react';
import styles from './styles/header.module.css';
import * as ROUTES from '../../../constants/routes';
import {
    Squares2X2Icon,
    ChevronUpIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion'
import Navigation from './navigation';
import useUser from '../../../hooks/use-user';
import useDropDown from '../../../hooks/use-dropdown';

const Header = () => {

    const { user } = useUser()
    const { dropdown, setDropdown } = useDropDown()

    const [navigation, setNavigation] = useState(true)
                   
    const displayNavigation = () => {
        setNavigation(true)
    }
    const hiddeNavigation = () => {
        setNavigation(false)
    }

    const displayDropwdown = () => {
        hiddeNavigation()
        setDropdown(true)
    }
    const hiddeDropwdown = () => {
        displayNavigation()
        setDropdown(false)
    }


    const walletBalance = user?.Withdrawal;
    const accountValue = walletBalance;


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
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }


    return (

        <div className={`${styles.container}`} >
            <div className={`${styles.wrapper}`} >
                <div className={`${styles.navigation}`}>
                    {/* image */}
                    <motion.span
                        className={styles.branding}
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >

                        <motion.img
                            src="/logo.webp"
                            alt="logo"
                            className='rounded-full h-12 w-12 object-contain'
                            whileHover={{ scale: 1.2, rotate: 90 }}
                            whileTap={{
                                scale: 0.8,
                                rotate: -90,
                                borderRadius: '100%'
                            }}
                        />
                        {/* <motion.img
                            src="/logotipo.png"
                            alt="logotipo"
                            className='rounded-full h-24 w-24 object-contain'
                            whileTap={{
                                scale: 0.8,
                                rotate: -90,
                                borderRadius: '100%'
                            }}
                        /> */}
                    </motion.span>
                    <div className={styles.divider}></div>
                    {/* links */}
                    <motion.div
                        className={styles.links}
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >


                        {
                            navigation && !dropdown ?
                                (
                                    <>
                                        <button
                                            type='button'
                                            onClick={() => hiddeNavigation()}
                                        >

                                            <Squares2X2Icon
                                                className='w-6 h-6 text-white-normal'
                                            />
                                        </button>

                                        <motion.a
                                            href={ROUTES.DASHBOARD}
                                            variants={item}
                                            className='hidden xl:inline '
                                        >
                                            Home
                                        </motion.a>
                                        <motion.a
                                            href={ROUTES.PACKAGES}
                                            variants={item}
                                            className='hidden xl:inline '
                                        >
                                            Invest
                                        </motion.a>
                                        <motion.a
                                            href={ROUTES.TRANSACTIONS}
                                            variants={item}
                                            className='hidden xl:inline '
                                        >
                                            Balances
                                        </motion.a>
                                        <span className={`${styles.wrapActive} hidden xl:inline`}>
                                            <a href={ROUTES.NETWORK} className={`${styles.active} hidden xl:inline`} >
                                                Network
                                            </a>
                                            <ChevronUpIcon
                                                className={`h-4 w-4 text-artificial-theme-purple-primary hidden xl:inline`} />
                                        </span>
                                    </>
                                ) : dropdown ?
                                    (
                                        <button
                                            type='button'
                                            onClick={() => hiddeDropwdown()}
                                        >

                                            <Squares2X2Icon
                                                className='w-6 h-6 text-white-normal'
                                            />
                                        </button>
                                    ) :
                                    (
                                        <button
                                            type='button'
                                            onClick={() => displayDropwdown()}
                                        >

                                            <Squares2X2Icon
                                                className='w-6 h-6 text-white-normal'
                                            />
                                        </button>
                                    )
                        }
                        {
                            dropdown && (
                                <Navigation
                                    container={container}
                                    item={item}
                                    hiddeNavigation={hiddeNavigation}
                                />
                            )
                        }

                    </motion.div>
                </div>

                <motion.a
                    href={`/p/${user?.username}`}
                    className={`${styles.user}`}
                    variants={container}
                    initial="hidden"
                    animate="visible">
                    {/* translate */}
                    {/* light/darkmode */}
                    {/* balance & profile pic */}
                    <motion.span
                        className={styles.userInfo}
                        variants={item}>
                        <p className='text-white-normal text-xl sm:text-md sm:text-2sl'>
                            {
                                isNaN(accountValue) ? (
                                    <p className='animate-pulse text-gray-loader'>...</p>
                                ) :
                                    (
                                        parseFloat(`${accountValue}`).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        })
                                    )
                            }

                        </p>
                    </motion.span>
                </motion.a>
            </div>
        </div>

    )
}

export default Header