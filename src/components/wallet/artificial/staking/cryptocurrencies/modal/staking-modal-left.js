import React from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import styles from '../../../../styles/wallet.module.css'

const StakingModalLeft = (props) => {

    const notEnoughBalance = props.bitcoin.initialInvestment > props.activeUser?.topupBalance;

    const handleClick = () => {
        // Accediendo al valor actual del input
        // Cambiando el valor del input
        props.inputRef.current.value = parseFloat(props.activeUser?.topupBalance);
        const value = props.inputRef.current.value = parseFloat(props.activeUser?.topupBalance);

        props.setBitcoin({
            ...props.bitcoin,
            initialInvestment: value
        })
    };

    return (
        <>
            <div className={`${styles.StakingModalConclusionLeft}`} >
                <div className={`${styles.StakingModalLeftWrapper} py-8 px-8`} >
                    {/* TITLE */}
                    <span className='flex justify-between items-start my-10'>
                        <h2 className='text-gray-landing_feature font-medium text-2xl'>Staking DeFi</h2>
                        <button
                            type='button'
                            className='text-white-normal inline lg:hidden '
                            onClick={() => props.closeModalResetCurrency()}
                        >
                            <span className="material-symbols-sharp text-3xl">
                                cancel
                            </span>
                        </button>
                    </span>

                    <div className={styles.ModalTypeLeftWrapper}>
                        {/* CURRENCY */}
                        <span className='flex flex-row justify-start items-center gap-5 my-4'>
                            <img
                                src={
                                    props.selectCurrency.bitcoin ? 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png' :
                                        props.selectCurrency.ethereum ? 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' :
                                            props.selectCurrency.bnb ? 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png' :
                                                props.selectCurrency.tron ? 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png' :
                                                    props.selectCurrency.solana ? 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png' :
                                                        null
                                }
                                alt="currency"
                                className='h-6 w-6 object-contain rounded-full'
                            />
                            <p className='text-md uppercase text-gray-landing_feature font-semibold'>
                                {
                                    props.selectCurrency.bitcoin ? 'Cardano' :
                                        props.selectCurrency.ethereum ? 'Ethereum' :
                                            props.selectCurrency.bnb ? 'Tether' :
                                                props.selectCurrency.tron ? 'Polkadot' :
                                                    props.selectCurrency.solana ? 'Solana' :
                                                        null
                                }
                            </p>
                        </span>
                        {/* TYPE */}
                        <p className='capitalize text-sm text-gray-branding' >type</p>
                        <span className={`${styles.ModalTypeLeft} cursor-not-allowed`} >
                            <p className='capitalize text-md text-gray-branding' >bloqueado</p>
                        </span>
                        {/* DURATION */}
                        <div className='flex flex-col justify-center items-start gap-2'>
                            <p className='capitalize text-sm text-gray-branding' >Duration</p>
                            <div className={styles.ModalTypeLeftDuration}>
                                <motion.button
                                    type='button'
                                    whileTap={{
                                        scale: 0.8,
                                    }}
                                    onClick={() => props.setCurrencyDurationThirtyDays()}
                                >
                                    30Days
                                </motion.button>
                                <motion.button
                                    type='button'
                                    whileTap={{
                                        scale: 0.8,
                                    }}
                                    onClick={() => props.setCurrencyDurationSixtyDays()}
                                >
                                    60Days
                                </motion.button>
                                <motion.button
                                    type='button'
                                    whileTap={{
                                        scale: 0.8,
                                    }}
                                    onClick={() => props.setCurrencyDurationHundredTwentyDays()}
                                >
                                    120Days
                                </motion.button>
                            </div>
                        </div>

                        {/* AMOUNT */}
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row justify-between items-center'>
                                <p className='capitalize text-lg text-gray-branding'>amount</p>
                                <span>
                                    <p className='text-sm text-gray-branding'>
                                        Available {parseFloat(props.activeUser?.topupBalance).toFixed(2)} USDT
                                    </p>
                                    <p className='text-sm text-gray-branding'>
                                        {`Swap -> 
                                            ${props.selectCurrency.bitcoin && props.conversionCurrency[0]?.conversionAmount !== undefined ?
                                                props.conversionCurrency[0]?.conversionAmount :
                                                props.selectCurrency.ethereum && props.conversionCurrency[1]?.conversionAmount !== undefined ?
                                                    props.conversionCurrency[1]?.conversionAmount :
                                                    props.selectCurrency.bnb && props.conversionCurrency[2]?.conversionAmount !== undefined ?
                                                        props.conversionCurrency[2]?.conversionAmount :
                                                        props.selectCurrency.tron && props.conversionCurrency[3]?.conversionAmount !== undefined ?
                                                            props.conversionCurrency[3]?.conversionAmount :
                                                            props.selectCurrency.solana && props.conversionCurrency[4]?.conversionAmount !== undefined ?
                                                                props.conversionCurrency[4]?.conversionAmount :
                                                                '0.0000'
                                            } ${props.bitcoin.coin}`}
                                    </p>
                                </span>
                            </div>
                            <div className={`${styles.StakingModalInput}`}>
                                <input
                                    type="number"
                                    placeholder='Type an amount'
                                    onChange={(e) => props.handleOnChangeInitialInvestment(e)}
                                    ref={props.inputRef}
                                />
                                <p className='uppercase text-xl text-gray-branding cursor-default'>
                                    USDT
                                </p>
                                <button
                                    type='button'
                                    onClick={() => handleClick()}
                                    className='uppercase text-md text-green-landingButton line-through cursor-not-allowed'
                                    disabled
                                >
                                    Max
                                </button>
                            </div>
                        </div>
                        {/* NOT ENOUGHT ASSETS */}
                        <p className='text-red-warning text-sm'>
                            {notEnoughBalance && props.availableBalance}
                        </p>

                        {/* Blocked quantity limits */}
                        {/* <div className='flex flex-col gap-2'>
                            <p className='text-md text-gray-branding'> Blocked quantity limits</p>
                            <div className='flex flex-col justify-center items-start gap-2'>
                                <span className={styles.StakingModalLimitsText} >
                                    <p>Minimum:</p>
                                    <p>0.01 BTC</p>
                                </span>
                                <span className={styles.StakingModalLimitsText} >
                                    <p>Available quota:</p>
                                    <p>10000 BTC</p>
                                </span>
                                <span className={styles.StakingModalLimitsText} >
                                    <p> Total personal quota:</p>
                                    <p>10000 BTC</p>
                                </span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div >
        </>
    )
}

export default StakingModalLeft

StakingModalLeft.propTypes = {
    closeModal: PropTypes.func,
    selectCurrency: PropTypes.object,
    setBitcoin: PropTypes.func,
    bitcoin: PropTypes.object,
    handleOnChangeInitialInvestment: PropTypes.func,
    closeModalResetCurrency: PropTypes.func,
    setCurrencyDurationThirtyDays: PropTypes.func,
    setCurrencyDurationSixtyDays: PropTypes.func,
    setCurrencyDurationHundredTwentyDays: PropTypes.func,
    availableBalance: PropTypes.string,
    userBalance: PropTypes.number,
    activeUser: PropTypes.object,
    conversionCurrency: PropTypes.array,
    setMaxInicialInvestment: PropTypes.func,
    inputRef: PropTypes.any,
}