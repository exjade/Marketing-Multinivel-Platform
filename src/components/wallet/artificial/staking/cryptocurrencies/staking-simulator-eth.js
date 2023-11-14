import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../../styles/wallet.module.css'
import { motion } from 'framer-motion'

const StakingSimulatorEth = (props) => {


    return (
        <div className={`${styles.StakingFormContainer} font-Inter-500`}>
            <div className={`${styles.StakingFormWrapper}`}>

                {/* TOKEN */}
                <div className={`${styles.StakingCryptoCards}`}>
                    <span className='flex flex-row justify-start items-center gap-4 rounded-lg w-full'>
                        <img
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                            alt="ethereum"
                            className='w-10 h-10 object-contain' />
                        <p className='text-white-normal font-medium capitalize'>Ethereum</p>
                    </span>

                    {/*  ============================= ETHEREUM =============================  */}
                    <div className={`${styles.StakingAPRContain} flex flex-col justify-start items-center gap-6 sm:gap-14 rounded-lg w-full `} >
                        <div className='flex flex-col justify-center items-center gap-8'>
                            <span className={`${styles.StakingFormAPR} gap-4`}>
                                <p >20%</p>
                            </span>
                            <span className={`${styles.StakingFormAPR} gap-4`}>
                                <p >10%</p>
                            </span>
                            <span className={`${styles.StakingFormAPR} gap-4`}>
                                <p >5%</p>
                            </span>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-8'>
                            <span className={`${styles.StakingFormAPRDays} gap-4`}>
                                <p >120Days</p>
                            </span>
                            <span className={`${styles.StakingFormAPRDays} gap-4`}>
                                <p >60Days</p>
                            </span>
                            <span className={`${styles.StakingFormAPRDays} gap-4`}>
                                <p >30Days</p>
                            </span>
                        </div>
                        <div className='flex flex-col justify-center items-center gap-4'>
                            <motion.button
                                type='button'
                                className={`${styles.StakingFormButton} gap-4`}
                                onClick={() => props.openModal()}
                                whileTap={{ scale: 0.8 }}
                            >
                                <p className='text-black-normal font-medium font-Inter-500'>
                                    Stake
                                </p>
                            </motion.button>
                            <motion.button
                                type='button'
                                className={`${styles.StakingFormButton} gap-4`}
                                onClick={() => props.openModal()}
                                whileTap={{ scale: 0.8 }}
                            >
                                <p className='text-black-normal font-medium font-Inter-500'>
                                    Stake
                                </p>
                            </motion.button>
                            <motion.button
                                type='button'
                                className={`${styles.StakingFormButton} gap-4`}
                                onClick={() => props.openModal()}
                                whileTap={{ scale: 0.8 }}
                            >
                                <p className='text-black-normal font-medium font-Inter-500'>
                                    Stake
                                </p>
                            </motion.button>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default StakingSimulatorEth

StakingSimulatorEth.propTypes = {
    setCurrency: PropTypes.func,
    currency: PropTypes.object,
    openModal: PropTypes.func,
}