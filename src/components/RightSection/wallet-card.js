import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/sidebar/right-sidebar.module.css'
import HalfCircleProgressBar from './artificial/HalfCircleProgressBar'
import IphoneCard from './artificial/iphone-card'

const WalletCard = (props) => {

    const investment = props?.user?.Applied;
    const profitGoal = props?.user?.Profit;


    const botBalance = props?.user?.Balance;
    const walletBalance = props?.user?.topupBalance;
    const networkBalance = props?.user?.referral?.ReferralBalance;
    const accountValue = botBalance + walletBalance + networkBalance;

    return (
        <div className={`${styles.walletcardContainer}`} >
            <div className={`${styles.walletcardWrapper}`} >

                <div className={`${styles.walletcardCard}`} >

                    {/* title */}
                    <h2>The Road to Prosperity</h2>
                    {/* progress bar */}
                    <HalfCircleProgressBar
                        investment={investment}
                        profitGoal={profitGoal}
                    />
                    {/* subtitle */}
                    <p className='text-sm text-white-normal italic'>Based on investment / Network</p>
                </div>

                <IphoneCard 
                accountValue={accountValue}
                />

            </div>
        </div>
    )
}

export default WalletCard

WalletCard.propTypes = {
    user: PropTypes.object,
}