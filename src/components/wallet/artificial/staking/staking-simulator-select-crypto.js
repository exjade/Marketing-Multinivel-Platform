import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/wallet.module.css'
import { motion } from 'framer-motion'

const StakingSimulatorSelectCrypto = (props) => {

    const setNameAndCurrencyBitcoin = () => {
        props.setBitcoin({
            ...props.bitcoin,
            name: 'Cardano',
            coin: 'ADA',
        })
        props.setSelectCurrency({
            loader: false,
            bitcoin: true,
            ethereum: false,
            bnb: false,
            tron: false,
            solana: false,
        })
    }
    const setNameAndCurrencyEthereum = () => {
        props.setBitcoin({
            ...props.bitcoin,
            name: 'Ethereum',
            coin: 'ETH',
        })
        props.setSelectCurrency({
            loader: false,
            bitcoin: false,
            ethereum: true,
            bnb: false,
            tron: false,
            solana: false,
        })
    }
    const setNameAndCurrencyBNB = () => {
        props.setBitcoin({
            ...props.bitcoin,
            name: 'Tether',
            coin: 'USDT',
        })
        props.setSelectCurrency({
            loader: false,
            bitcoin: false,
            ethereum: false,
            bnb: true,
            tron: false,
            solana: false,
        })
    }
    const setNameAndCurrencyTron = () => {
        props.setBitcoin({
            ...props.bitcoin,
            name: 'Polkadot',
            coin: 'DOT',
        })
        props.setSelectCurrency({
            loader: false,
            bitcoin: false,
            ethereum: false,
            bnb: false,
            tron: true,
            solana: false,
        })
    }
    const setNameAndCurrencySolana = () => {
        props.setBitcoin({
            ...props.bitcoin,
            name: 'Solana',
            coin: 'SOL',
        })
        props.setSelectCurrency({
            loader: false,
            bitcoin: false,
            ethereum: false,
            bnb: false,
            tron: false,
            solana: true,
        })
    }

    return (
        <div className={`${styles.WalletStakingSelectCrypto}`} >
            <span className={`${styles.WalletStakingSelectLabel}`}>
                <h2 className='text-white-normal font-medium text-xl text-start'>Select currency</h2>
            </span>
            <div className={`${styles.WalletStakingOptions}`} >
                <motion.button
                    className={`${styles.WalletStakingButton}`}
                    type='button'
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{
                        scale: 0.8,
                        rotate: -90,
                        borderRadius: '100%'
                    }}
                    onClick={() => setNameAndCurrencyBitcoin()}>
                    <img
                        src={props.stakingCrypto.btc.image}
                        alt='btc image'
                        className='w-10 h-10 object-contain rounded-full'
                    />
                </motion.button>
                <motion.button
                    className={`${styles.WalletStakingButton}`}
                    type='button'
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{
                        scale: 0.8,
                        rotate: -90,
                        borderRadius: '100%'
                    }}
                    onClick={() => setNameAndCurrencyEthereum()}
                >
                    <img
                        src={props.stakingCrypto.eth.image}
                        alt='eth image'
                        className='w-10 h-10 object-contain rounded-full'
                    />
                </motion.button>
                <motion.button
                    className={`${styles.WalletStakingButton}`}
                    type='button'
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{
                        scale: 0.8,
                        rotate: -90,
                        borderRadius: '100%'
                    }}
                    onClick={() => setNameAndCurrencyBNB()}
                >
                    <img
                        src={props.stakingCrypto.bnb.image}
                        alt='bnb image'
                        className='w-10 h-10 object-contain rounded-full'
                    />
                </motion.button>
                <motion.button
                    className={`${styles.WalletStakingButton}`}
                    type='button'
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{
                        scale: 0.8,
                        rotate: -90,
                        borderRadius: '100%'
                    }}
                    onClick={() => setNameAndCurrencyTron()}
                >
                    <img
                        src={props.stakingCrypto.trx.image}
                        alt='trx image'
                        className='w-10 h-10 object-contain rounded-full'
                    />
                </motion.button>
                <motion.button
                    className={`${styles.WalletStakingButton}`}
                    type='button'
                    whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{
                        scale: 0.8,
                        rotate: -90,
                        borderRadius: '100%'
                    }}
                    onClick={() => setNameAndCurrencySolana()}
                >
                    <img
                        src={props.stakingCrypto.sol.image}
                        alt='sol image'
                        className='w-10 h-10 object-contain rounded-full'
                    />
                </motion.button>
            </div>
        </div >

    )
}

export default StakingSimulatorSelectCrypto

StakingSimulatorSelectCrypto.propTypes = {
    stakingCrypto: PropTypes.object,
    setSelectCurrency: PropTypes.func,
    bitcoin: PropTypes.object,
    setBitcoin: PropTypes.func,
}