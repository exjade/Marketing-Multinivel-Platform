import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles/referrals.module.css'
import { motion } from 'framer-motion'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as ROUTES from '../../../constants/routes'


const ReferralDashboard = (props) => {
    const history = useHistory()

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

    const goReferralList = () => {
        history.push(ROUTES.NETWORK_USERS)
    }

    return (
        <motion.div
            className={`${styles.ReferralDashboardContainer} font-roboto`}
            variants={container}
            initial="hidden"
            animate="visible">
            <motion.div className={`${styles.ReferralDashboardWrapper}`} variants={item} >
                {/* LEFT SECTION */}
                <motion.div
                    className={`${styles.ReferralLeft}`}
                    variants={item} >
                    <motion.div
                        className={`${styles.ReferralLeftWrapper}`}
                        variants={item} >
                            
                            <h2>Earn high rewards making connections</h2>

                            <p>Earn <b>up to 30%</b> commissions on every trade accross our compensation plan's</p>

                            <motion.button
                            type='button'
                            whileTap={{ scale: 0.95 }}
                            className={`${styles.buttonReferNow}`}
                            onClick={() => goReferralList()}
                            >
                                Earn now
                            </motion.button>

                    </motion.div>
                </motion.div>
                {/* RIGHT SECTION */}
                <motion.div
                    className={`${styles.ReferralRight}`}
                    variants={item} ></motion.div>
            </motion.div>
        </motion.div>
    )
}

export default ReferralDashboard
ReferralDashboard.propTypes = {
    user: PropTypes.object,
    action: PropTypes.string,
}