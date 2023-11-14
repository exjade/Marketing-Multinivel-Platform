import React from 'react';
import PropTypes from 'prop-types';
import styles from './progress.module.css';

const IphoneCard = (props) => {

  return (
    <div className={`${styles.IphoneContainer} font-Biryani`} >
      <div className={styles.iphonecard}>
        <div className={`${styles.card}`} >
          <span className='flex flex-col justify-start gap-2'>
            {/* title */}
            <p className='text-gray-primary text-lg font-semibold'>Account value</p>
            {/* amount */}
            <p className='text-white-normal font-bold text-2xl'>
              {parseFloat(`${props.accountValue}`).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </p>
            <p className='text-gray-primary text-sm font-semibold italic'>Bot-Network-Wallet</p>
          </span>
          {/* currency */}
          <span className='flex flex-col justify-start gap-2'>
            <p className='text-gray-primary text-lg font-semibold'>Currency</p>
            <p className='text-white-normal font-bold text-lg'>USDT / US Dollar</p>
          </span>
        </div>
      </div>
    </div>

  )
};

export default IphoneCard;
IphoneCard.propTypes = {
  accountValue: PropTypes.number
}
