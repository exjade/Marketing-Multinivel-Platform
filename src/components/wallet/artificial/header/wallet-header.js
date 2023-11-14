import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'
// import * as ROUTES from '../../../constants/routes'
import styles from '../../styles/wallet.module.css'
import AnimatedGraph from './wallet-header-graph'
import { motion } from 'framer-motion';

const WalletHeader = (props) => {
    const data = [20, 60, 40, 80, 120, 200];
    const duration = 500; // duración de la animación en milisegundos
    return (
        <div className={`${styles.headerContainer} `} >
            <div className={`${styles.headerWrapper} `} >
                {/* Navigation */}
                <div className='flex flex-col w-1/2'>

                    {/* Your balance */}
                    <div className='flex flex-col gap-2 justify-center items-start '>
                        <p className='text-lg font-medium text-gray-info '>
                            {
                                props.isActive.recharge ? ('Wallet Balance')
                                    : props.isActive.wallet && !props.isActive.recharge ? ('Staking Balance')
                                        : ('Wallet Balance')
                            }
                        </p>
                        <div className='flex flex-row justify-center items-center gap-2'>
                            {
                                props.isActive.recharge && !props.isActive.stake ?
                                    (<div className=' text-white-normal'>
                                        {
                                            props.activeUser?.topupBalance === null ||
                                                props.activeUser?.topupBalance === null ||
                                                isNaN(props.activeUser?.topupBalance) ?

                                                (
                                                    <p className='text-2xl font-bold text-white-normal'>
                                                        $0.00
                                                    </p>
                                                )
                                                : (
                                                    <p className='text-2xl font-bold text-white-normal'>
                                                        {parseFloat(props.activeUser?.topupBalance).toLocaleString('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD'
                                                        })}
                                                    </p>
                                                )
                                        }

                                        <motion.button
                                            type='button'
                                            whileTap={{ scale: 0.9 }}
                                            className={`${styles.walletWithdrawals}`}
                                            onClick={() => props.handleOpenModal()}
                                        >
                                            Sent
                                        </motion.button>
                                    </div>)
                                    : props.isActive.buy ?
                                        (<div className='text-2xl font-bold text-white-normal'>
                                            {
                                                props.activeUser?.topupBalance === null ||
                                                    props.activeUser?.topupBalance === null ||
                                                    isNaN(props.activeUser?.topupBalance) ?
                                                    (
                                                        <p className='text-2xl font-bold text-white-normal'>
                                                            $0.00
                                                        </p>
                                                    )
                                                    : (
                                                        <p className='text-2xl font-bold text-white-normal'>
                                                            {parseFloat(props.activeUser?.topupBalance).toLocaleString('en-US', {
                                                                style: 'currency',
                                                                currency: 'USD'
                                                            })}
                                                        </p>
                                                    )
                                            }
                                        </div>)
                                        : null
                            }
                            {
                                props.isActive.wallet &&
                                (<div className='flex flex-col justify-center items-start gap-2'>
                                    <p className='text-2xl font-bold text-white-normal'>
                                        {parseFloat(props.sumEarningAmount).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        })}
                                    </p>
                                    <span className={`${styles.headerTxtStat} `} >
                                        <p>
                                            {parseFloat(props.currentYields).toLocaleString('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            })}
                                        </p>
                                        <p>
                                            {
                                                isNaN(props.ProfitPercentage) || props.ProfitPercentage === '0.00' ? ('--') :
                                                    (`${props.ProfitPercentage}%`)

                                            }
                                        </p>
                                    </span>
                                </div>)
                            }
                        </div>


                    </div>
                </div>
                <AnimatedGraph data={data} duration={duration} />
            </div>
        </div >
    )
}

export default WalletHeader

WalletHeader.propTypes = {
    stakingCrypto: PropTypes.object,
    currentYields: PropTypes.number,
    ProfitPercentage: PropTypes.string,
    sumEarningAmount: PropTypes.number,
    activeUser: PropTypes.object,
    isActive: PropTypes.object,
    handleOpenModal: PropTypes.func,
}