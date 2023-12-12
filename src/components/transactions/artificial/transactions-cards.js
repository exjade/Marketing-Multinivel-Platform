import React from 'react'
import PropTypes from 'prop-types';
import styles from './styles/transactions.module.css'

const TransactionsCards = (props) => {

    return (
        <div className={`${styles.transactionsCardsContainer} font-Roboto`} >
            <div className={`${styles.transactionsCardsWrapper}`} >
                {/* Staking Balance */}
                <div className={`${styles.transactionsCards}`}>

            
                    {/* Investment Balance */}
                    <div className={`${styles.transactionsCardsBalance}`} >
                        <span >
                            <p className='text-lg capitalize font-medium text-white-normal' >Balance</p>
                            <p className='font-bold text-2xl text-white-normal'>
                                {parseFloat(props.user.Balance).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </p>
                        </span>
                    </div>
                    {/* Withdrawal Balance */}
                    <div className={`${styles.transactionsCardWithdrawal}`} >
                        <span >
                            <p className={`${styles.withdrawal1}  text-lg font-medium text-white-normal`} >Available</p>
                            <p className={`${styles.withdrawal2}  font-bold text-2xl text-white-normal`} >
                                {parseFloat(props.user.Withdrawal).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </p>
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TransactionsCards

TransactionsCards.propTypes = {
    user: PropTypes.object,
    staking: PropTypes.any,
}