import React from 'react'
import PropTypes from 'prop-types'
import styles from './dashboard-overview.module.css'
import {
    BanknotesIcon,
    UserGroupIcon,
    ExclamationCircleIcon,
    HandThumbUpIcon
} from '@heroicons/react/24/outline';

const DashboardOverview = (props) => {

    const yourEarnings = props.user?.referral?.ReferralBalance;

    return (
        <div className={styles.main}>
            <div className={`${styles.container} font-Biryani`}>

                <div>
                    <p className='text-white-normal text-xl font-bold'>Building Your Network:</p>
                </div>

                <div className={`${styles.cards}`} >

                    <div className={`${styles.childCard}`}>
                        {/* icono */}
                        <span className={`${styles.cardIcon}`}>
                            <BanknotesIcon
                                className={` ${styles.headerIcon} w-12 h-12 text-black-normal mb-2  rounded-full `}
                            />
                        </span>
                        {/* titulo */}
                        <h3 className={styles.text}>Gross Revenue</h3>
                        {/* balance */}
                        {
                            !isNaN(yourEarnings) ?
                                (
                                    <p className='font-semibold text-2xl text-white-normal'>
                                        {
                                            parseFloat(yourEarnings).toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            })
                                        }
                                    </p>
                                )
                                :
                                (
                                    <p className='font-semibold text-2xl text-white-normal'>0</p>
                                )
                        }
                    </div>


                    <div className={styles.verticalDivider}></div> {/* verticalDivider */}
                    <div className={styles.horizontalDivider}></div> {/* horizontalDivider */}


                    <div className={`${styles.childCard}`}>
                        {/* icono */}
                        <span className={`${styles.cardIcon}`}>
                            <UserGroupIcon
                                className={` ${styles.headerIcon} w-12 h-12 text-black-normal mb-2  rounded-full `}
                            />
                        </span>
                        {/* titulo */}
                        <h3 className={styles.text}>Referral Downline</h3>
                        {/* balance */}
                        {
                            props.filterReferrals.length > 0 ?
                                <p className='font-semibold text-2xl text-white-normal'>
                                    +{props.filterReferrals.length}
                                </p>
                                :
                                (
                                    <p className='font-semibold text-2xl text-white-normal'>0</p>
                                )
                        }
                    </div>

                    <div className={styles.verticalDivider}></div> {/* verticalDivider */}
                    <div className={styles.horizontalDivider}></div> {/* horizontalDivider */}

                    <div className={`${styles.childCard}`}>
                        {/* icono */}
                        <span className={`${styles.cardIcon}`}>
                            <ExclamationCircleIcon
                                className={` ${styles.headerIcon} w-12 h-12 text-black-normal mb-2  rounded-full `}
                            />
                        </span>
                        {/* titulo */}
                        <h3 className={styles.text}>Non-Active Network</h3>
                        {/* balance */}
                        {
                            props.filterReferralsWithoutInvestment.length > 0 ?
                                <p className='font-semibold text-2xl text-white-normal'>
                                    +{props.filterReferralsWithoutInvestment.length}
                                </p>
                                :
                                (
                                    <p className='font-semibold text-2xl text-white-normal'>0</p>
                                )
                        }
                    </div>

                    <div className={styles.verticalDivider}></div> {/* verticalDivider */}
                    <div className={styles.horizontalDivider}></div> {/* horizontalDivider */}

                    <div className={`${styles.childCard}`}>
                        {/* icono */}
                        <span className={`${styles.cardIcon}`}>
                            <HandThumbUpIcon
                                className={` ${styles.headerIcon} w-12 h-12 text-black-normal mb-2  rounded-full `}
                            />
                        </span>
                        {/* titulo */}
                        <h3 className={styles.text}>Active Network</h3>
                        {/* balance */}
                        {
                            props.filterReferralsWithInvestment.length > 0 ?
                                (
                                    <p className='font-semibold text-2xl text-white-normal'>
                                        +{props.filterReferralsWithInvestment.length}
                                    </p>
                                )
                                :
                                (
                                    <p className='font-semibold text-2xl text-white-normal'>0</p>
                                )
                        }
                    </div>

                </div>

            </div>
        </div>

    )
}

export default DashboardOverview

DashboardOverview.propTypes = {
    user: PropTypes.object,
    filterReferralsWithInvestment: PropTypes.array,
    filterReferralsWithoutInvestment: PropTypes.array,
    filterReferrals: PropTypes.array,
}