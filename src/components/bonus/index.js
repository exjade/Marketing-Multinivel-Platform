import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles/bonus.module.css'
import {
  ArrowLongRightIcon,
  GiftIcon,
} from '@heroicons/react/24/outline';
import BonusCards from './rewards';
import * as ROUTES from '../../constants/routes'

const BonusTimeline = ({
  handleNoviceInvestor,
  selectedBonus,
  bonusDocs,
  addRewardBalance,
  findNoviceInvestor
}) => {

  const totalPrice = bonusDocs?.reduce((accumulator, reward) => accumulator + reward.price, 0);

  return (

    <div className={`${styles.container}`} >
      <div className={`${styles.wrapper} container  max-w-lg h-screen`} >

        {/* TOTAL REWARDS EARNED */}
        <div className={`${styles.Rewards}`} >
          <div className='flex flex-col justify-around items-center gap-2'>
            <p className='font-medium text-xl text-gray-primary text-center'>Total rewards earned</p>
            <span className='text-4xl font-extrabold text-artificial-main-blue-primary '>
              {
                findNoviceInvestor?.status === 'active' ? (
                  <p >$0.00</p>
                ) : findNoviceInvestor?.status === 'claimed' ?
                  (
                    isNaN(totalPrice) ? (
                      <p className='animate-pulse text-gray-background'>...</p>
                    ) : (
                      parseFloat(totalPrice).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })
                    )
                  ) :
                  (
                    <p >$0.00</p>
                  )
              }

            </span>
          </div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/artificialtech4u-d99e3.appspot.com/o/bonus-preview.png?alt=media&token=67ea41d8-2fe4-4598-b37a-a44aff95d734"
            alt="bonus"
            className='object-contain w-44 h-44'
          />
        </div>

        {/* ADS PARA INVITAR */}
        <a href={ROUTES.NETWORK} className={`${styles.Refercard}`} >
          <GiftIcon className='w-16 h-16 text-white-normal' />
          <span>
            <p className='text-xl text-white-normal'>Refer and Earn  </p>
            <ArrowLongRightIcon className='w-8 h-8 text-white-primary' />
          </span>
        </a>

        <div className={`${styles.cards} my-10`} >
          <BonusCards
            handleNoviceInvestor={handleNoviceInvestor}
            selectedBonus={selectedBonus}
            bonusDocs={bonusDocs}
            addRewardBalance={addRewardBalance}
            findNoviceInvestor={findNoviceInvestor}
          />
        </div>


      </div>
    </div>
  )
}

export default BonusTimeline

BonusTimeline.propTypes = {
  handleNoviceInvestor: PropTypes.func,
  selectedBonus: PropTypes.object,
  bonusDocs: PropTypes.any,
  addRewardBalance: PropTypes.func,
  findNoviceInvestor: PropTypes.any,
}