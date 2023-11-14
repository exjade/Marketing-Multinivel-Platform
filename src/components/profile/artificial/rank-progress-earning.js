import React from 'react'
import PropTypes from 'prop-types'
import CircularProgressBar from './progress-bar'
import styles from '../styles/user-profile.module.css'
import ReferralLink from '../../referral/mobile/referral-link/referral-link'

const RankProgressEarning = ({ user }) => {

    const ranks = {
        silver: 12000,
        gold: 150000,
        esmerald: 600000,
        diamond: 1500000
    }

    return (
        <>
            {/* CARDS CURRENT RANK - YOUR PROGRESS - CURRENT ROLE  */}
            <div className={`${styles.grid} w-full`} >
                <div className={`${styles.cards}`} >
                    <div className={styles.title} >
                        <h3 className='capitalize text-lg sm:text-2xl font-medium sm:font-semibold text-white-normal'>current rank</h3>
                        {/* RANK & ICON */}
                        <div className='text-white-normal flex flex-row justify-between items-center gap-2 sm:gap-10 lg:gap-6 '>
                            <span className="material-symbols-sharp text-2xl sm:text-4xl">
                                arrow_drop_up
                            </span>
                            <p className='capitalize  text-lg sm:text-2xl font-xl sm:font-normal text-white-normal'>Platino</p>
                        </div>
                    </div>
                    <div className={`${styles.img} inline opacity-80`} >
                        <img
                            src="/images/profilecard-preview.png"
                            alt="bored ape preview"
                        />
                    </div>
                </div>
                <div className={`${styles.cards}`} >
                    <div className={styles.title} >
                        <h3 className='capitalize text-lg sm:text-2xl font-medium sm:font-semibold text-white-normal'>your progress</h3>
                        {/* RANK & ICON */}
                        <div className='text-white-normal flex flex-col justify-between items-center gap-2 sm:gap-2 lg:gap-4 '>
                            <p className='capitalize  text-md sm:text-xl font-xl sm:font-normal text-white-normal'>your balance:</p>
                            <div className='flex flex-row justify-center items-center gap-2'>
                                <p className='text-white-normal text-center text-md sm:text-xl font-xl sm:font-normal'>
                                    {parseFloat(user?.Balance).toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD'
                                    })}
                                </p>
                                <span className="material-symbols-sharp text-sm sm:text-3xl ">
                                    monetization_on
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.progressbar} opacity-80`} >
                        <CircularProgressBar
                            user={user}
                        />
                    </div>
                </div>
                {/* <div className={`${styles.earncard}`} >
                    <div className={styles.earnings} >
                        <ReferralLink
                            user={user}
                        />
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default RankProgressEarning

RankProgressEarning.propTypes = {
    user: PropTypes.object
}