import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/sidebar/right-sidebar.module.css'

const RightMycards = ({ user }) => {
  return (
    <section className='my-10'>
      <span className={`${styles.mycards} my-10 px-8 sm:px-6`} >
        <h3 className='capitalize font-bold text-2xl '>Card Portfolio</h3>
        <h3></h3>
      </span>
      <div className={`${styles.card}`}>
        <div className={`${styles.cardWrapper} bg-colorSecondary-text-card-primary`} >
          {/* BALANCE & LOGO */}
          <div className='flex flex-row justify-between items-center -full'>
            <span className=' flex flex-col row-5 '>
              <p className='text-white-primary text-xl font-normal capitalize'>current balance</p>
              <p className='text-white-primary text-xl font-semibold capitalize'>
                {parseFloat(user?.Balance).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </p>
            </span>
            <img
              src="https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-mastercard-logo-png-vector-download-19.png"
              alt="mastercard"
              className='h-16 w-16 object-contain opacity-80'
            />
          </div>
          {/* CARD HOLDER & WALLET  */}
          <div className='flex flex-col'>
            <span>
              <p className='text-white-primary text-xl font-normal capitalize'>USDT Address</p>
              <p className='text-white-primary text-normal font-semibold capitalize'>
                {user?.wallet !== '' || user?.wallet !== undefined ?  `${user?.wallet}` : 'Update in settings'  }
              </p>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RightMycards


RightMycards.propTypes = {
  user: PropTypes.object,
}