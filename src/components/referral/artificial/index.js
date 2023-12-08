import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles/referrals.module.css'
import { motion } from 'framer-motion'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as ROUTES from '../../../constants/routes'
import useActionSuccess from '../../../hooks/action-status/action-success';
import ActionSuccess from '../../actions-status/success';

const ReferralDashboard = (props) => {

    const {
        successAction,
        handleActiveActión,
    } = useActionSuccess()

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

    const referralCode = props?.user?.referral?.referralCode?.trim()
    const copyReferralCode = `${process.env.REACT_APP_REFERRAL_URL}${referralCode}`
    const code = `${referralCode}`

    return (
        <motion.div
            className={`${styles.ReferralDashboardContainer} font-roboto`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <motion.div className={`${styles.ReferralDashboardWrapper}`} variants={item} >
                {/* HERO */}
                <motion.div className={`${styles.ReferralDashboardHero}`} variants={item} >
                    <motion.div className={`${styles.ReferralDashboarTitle}`} variants={item}>
                        <div className={`${styles.ReferralDashboardH1Container}`}>
                            <span className={`${styles.ReferralDashboardH1}`}>
                                <p>Refer Friends. Earn</p>
                                <p className='text-artificial-theme-green-primary underline decoration-4'>
                                    High Rewards
                                </p>
                            </span>
                            <p>Together!</p>
                        </div>
                        <motion.div className={`${styles.ReferralDashboardSubContainer}`} variants={item}>
                            <div className={`${styles.subWrapper}`}>
                                <p className={`${styles.subtitle} text-gray-primary text-lg  font-light`} >Earn
                                    <b className='text-white-normal text-bold px-1  font-xl'>up to 30%</b>
                                    commissions on every trade across our compensation plan's.</p>
                                <div className={styles.buttons} >
                                    <a href={ROUTES.BONUS} className={styles.buttonReferNow}>
                                        Earn Now
                                    </a>
                                    <a href={ROUTES.NETWORK_USERS} className={styles.buttonMyReferrals}>
                                        View my referrals
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {
                        successAction &&
                        (
                            <ActionSuccess
                                action={`Link Code`} />
                        )
                    }

                    <motion.div className={`${styles.ReferralDashboardLinksContainer}`} variants={item}>
                        <motion.div className={`${styles.ReferralDashboardLinksWrapper}`} variants={item}>

                            <div className={`${styles.ReferralDashboardLinksLinks}`}>

                                <div>
                                    {/* input */}
                                    {/* icon */}
                                    <div className={`${styles.ReferralWrapper}`} >
                                        <span className='flexitems-center justify-center'>
                                            <h1 className={` text-sm
                                             sm:text-md text-white-normal`}>
                                                Network link
                                            </h1>
                                        </span>
                                        <span className={styles.ReferralGroup} >
                                            <input type="text" placeholder={copyReferralCode} disabled className={`${styles.link} text-start h-10 w-9/12 px-10 text-sm py-2 outline-none  bg-gray-input rounded-xs text-artificial-theme-blue-primary`} />
                                            <CopyToClipboard text={copyReferralCode} >
                                                <button
                                                    className={styles.ReferralButton}
                                                    onClick={() => handleActiveActión()}>
                                                    <span className="material-symbols-sharp text-2xl ml-5">
                                                        file_copy
                                                    </span>
                                                </button>
                                            </CopyToClipboard>
                                        </span>
                                    </div>
                                </div>

                                <div className={styles.ReferralDashboardLinksDivider}></div>

                                <div>
                                    {/* input */}
                                    {/* icon */}
                                    <div className={`${styles.ReferralWrapper}`} >
                                        <span className='flexitems-center justify-center'>
                                            <h1 className={` text-sm sm:text-md text-white-normal`}>
                                                Referral Code
                                            </h1>
                                        </span>
                                        <span className={styles.ReferralGroup}>
                                            <input type="text" placeholder={code} disabled className={`${styles.link} text-start h-10 w-9/12 px-10 text-sm py-2 outline-none  bg-gray-input rounded-xs  text-artificial-theme-blue-primary `} />
                                            <CopyToClipboard text={code} >
                                                <button
                                                    className={styles.ReferralButton}
                                                    onClick={() => handleActiveActión()}
                                                >
                                                    <span className="material-symbols-sharp text-2xl ml-5">
                                                        file_copy
                                                    </span>
                                                </button>
                                            </CopyToClipboard>
                                        </span>
                                    </div>
                                </div>

                            </div>

                        </motion.div>
                    </motion.div>
                </motion.div>
                {/* LINKS */}
            </motion.div>
        </motion.div>
    )
}

export default ReferralDashboard
ReferralDashboard.propTypes = {
    user: PropTypes.object,
    action: PropTypes.string,
}