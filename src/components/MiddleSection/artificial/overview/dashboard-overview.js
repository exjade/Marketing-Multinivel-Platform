import React from 'react'
import PropTypes from 'prop-types'
import styles from '../styles/overview.module.css'

const DashboardOverview = (props) => {

    const yourEarnings = props.user?.referral?.ReferralBalance;

    return (
        <section className={styles.main}>
            <div className={`${styles.container}`}>
                {/* TOTAL REVENUE */}
                <div className={`${styles.cards}`} >
                    <div className='flex flex-row gap-5 w-full justify-between px-4 items-center'>
                        <h3 className=' font-normal text-xl text-artificial-theme-white-primary text-start'>Total Revenue</h3>
                        <span className="material-symbols-sharp">
                            attach_money
                        </span>
                    </div>
                    <span className='flex flex-col w-full justify-between px-4 items-start gap-1'>

                        {
                            !isNaN(yourEarnings) ?
                                (< p className='font-semibold text-3xl  text-artificial-theme-white-primary text-start'>
                                    {
                                        parseFloat(yourEarnings).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        })
                                    }

                                </p>)
                                :
                                (
                                    <p className="font-semibold text-3xl text-artificial-theme-white-primary text-start">0</p>
                                )
                        }

                    </span>
                </div>
                {/* REFERRALS */}
                <div className={`${styles.cards}`} >
                    <div className='flex flex-row gap-5 w-full justify-between px-4 items-center'>
                        <h3 className=' font-normal text-xl text-artificial-theme-white-primary text-start'>Referrals</h3>
                        <span className="material-symbols-sharp">
                            group
                        </span>
                    </div>
                    <span className='flex flex-col w-full justify-between px-4 items-start gap-1'>
                        <div className='font-semibold text-4xl text-artificial-theme-white-primary text-start'>
                            {
                                props.filterReferrals.length > 0 ?
                                    (< p className='font-semibold text-3xl text-artificial-theme-white-primary text-start'>
                                        +{props.filterReferrals.length}
                                    </p>)
                                    :
                                    (
                                        <p className="font-semibold text-3xl text-artificial-theme-white-primary text-start">0</p>
                                    )
                            }
                        </div>
                    </span>
                </div>
                {/* INACTIVE REFERRALS */}
                <div className={`${styles.cards}`} >
                    <div className='flex flex-row gap-5 w-full justify-between px-4 items-center'>
                        <h3 className=' font-normal text-xl text-artificial-theme-white-primary text-start'>Inactive</h3>
                        <span className="material-symbols-sharp">
                            money_off
                        </span>
                    </div>
                    <span className='flex flex-col w-full justify-between px-4 items-start gap-1'>
                        {
                            props.filterReferralsWithoutInvestment.length > 0 ?
                                (< p className='font-semibold text-3xl text-artificial-theme-white-primary text-start'>
                                    +{props.filterReferralsWithoutInvestment.length}
                                </p>)
                                :
                                (
                                    <p className="font-semibold text-3xl text-artificial-theme-white-primary text-start">0</p>
                                )
                        }
                    </span>
                </div>
                {/* ACTIVE NOW */}
                <div className={`${styles.cards}`} >
                    <div className='flex flex-row gap-5 w-full justify-between px-4 items-center'>
                        <h3 className=' font-normal text-xl text-artificial-theme-white-primary text-start'>Active</h3>
                        <span className="material-icons-sharp">
                            attach_money
                        </span>
                    </div>
                    <span className='flex flex-col w-full justify-between px-4 items-start gap-1'>
                        <div className='font-semibold text-3xl text-artificial-theme-white-primary text-start'>

                            {
                                props.filterReferralsWithInvestment.length > 0 ?
                                    (< p className='font-semibold text-3xl text-artificial-theme-white-primary text-start'>
                                        +{props.filterReferralsWithInvestment.length}
                                    </p>)
                                    :
                                    (
                                        <p className="font-semibold text-3xl text-artificial-theme-white-primary text-start">0</p>
                                    )
                            }
                        </div>

                    </span>
                </div>
            </div>
        </section >
    )
}

export default DashboardOverview
DashboardOverview.propTypes = {
    user: PropTypes.object,
    filterReferralsWithInvestment: PropTypes.array,
    filterReferralsWithoutInvestment: PropTypes.array,
    filterReferrals: PropTypes.array,
}