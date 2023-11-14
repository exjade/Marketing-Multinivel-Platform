import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/wallet.module.css'
import { motion } from 'framer-motion'

const WalletActions = (props) => {
  return (
    <div className={`${styles.WalletActionsContainer} font-Inter-500 `}>
      <div className={`${styles.WalletActionsWrapper} `}>

        {/* I need a button */}
        <motion.button
          type='button'
          onClick={() => props.setIsActive({
            home: false,
            wallet: false,
            buy: false,
            settings: false,
            stake: true,
          })}
          className={`${styles.WalletActionsButton}`}
          whileTap={{ scale: 0.95 }}
        >
          <span className="material-symbols-sharp">
            social_leaderboard
          </span>
        </motion.button>
        <span className='flex flex-col'>
          <p className='text-white-normal text-md font-semibold'>Staking</p>
          <p className='text-gray-primary text-sm font-light italic'>Committed to maximizing user profits through staking</p>
        </span>
      </div>
    </div>
  )
}

export default WalletActions

WalletActions.propTypes = {
   setIsActive: PropTypes.func
}