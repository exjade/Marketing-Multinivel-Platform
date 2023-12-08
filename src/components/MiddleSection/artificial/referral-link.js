import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { motion } from 'framer-motion';
// import * as ROUTES from '../../../../constants/routes'
import styles from './styles/overview.module.css'
import { useTranslation } from 'react-i18next';


const ReferralLink = (props) => {
    const { t } = useTranslation()
    const referralCode = props?.user?.referral?.referralCode?.trim()
    const copyReferralCode = `${process.env.REACT_APP_REFERRAL_URL}${referralCode}`

    return (
        <motion.section
            className={`${styles.ReferralContainer}  text-white-normal py-10 text-xl font-normal font-roboto `}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className={`${styles.ReferralWrapper}`} >
                <span className='flexitems-center justify-center'>
                    <h1 className={` text-lg sm:text-2xl`}>
                        Invite Friends
                    </h1>
                </span>
                <span className={styles.ReferralGroup}>
                    <input type="text" placeholder={referralCode} disabled className={`${styles.link} text-start h-14 w-9/12 px-10 text-sm py-2 outline-none  bg-gray-input rounded-xs text-white-normal`} />
                    <CopyToClipboard text={copyReferralCode} >
                        <button
                            className={styles.ReferralButton}
                            onClick={() => props.handleActiveActión()}
                        >
                            <span className="material-symbols-sharp text-2xl ml-5">
                                file_copy
                            </span>
                        </button>
                    </CopyToClipboard>
                </span>
            </div>
        </motion.section>
    )
}

export default ReferralLink

ReferralLink.propTypes = {
    user: PropTypes.object,
    handleActiveActión: PropTypes.func
}