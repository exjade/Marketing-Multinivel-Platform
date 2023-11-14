import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/wallet.module.css'

const WalletStakingCards = ({ stakingCrypto }) => {

    // Method for calculating current profit gain (%)
    // 1. we subtract the principal investment from the total earnings In this way, we obtain only the winning percentage without counting the current percentage.
    // 2. We calculate the profit percentage by dividing profitLessInvestment by stakingAmount and multiplying by 100. The result is stored in a variable called percentage.
    const PercentageGainBTC = stakingCrypto.btc.CalculatePercentageGain();
    const PercentageGainETH = stakingCrypto.eth.CalculatePercentageGain();
    const PercentageGainBNB = stakingCrypto.bnb.CalculatePercentageGain();
    const PercentageGainTRX = stakingCrypto.trx.CalculatePercentageGain();
    const PercentageGainSOL = stakingCrypto.sol.CalculatePercentageGain();

    return (
        <div className={`${styles.WalletStakingContainer}`}>
            <div className={`${styles.WalletStakingWrapper}`}>

                {/*  ================== BITCOIN  ================== */}
                <div className={`${styles.WalletStakingCard}`}>
                    <div className='flex flex-row justify-center items-center gap-4'>
                        <img
                            src={stakingCrypto.btc.image}
                            alt="btc"
                            className='w-12 h-12 object-contain'
                        />
                        <span className='flex flex-col justify-center items-start gap-2'>
                            <h2 className='capitalize font-semibold text-md sm:text-xl text-white-normal'>{stakingCrypto.btc.name}</h2>
                            <p className='uppercase font-semibold text-sm sm:text-lg text-gray-background'> {stakingCrypto.btc.coin_amount} {stakingCrypto.btc.coin}</p>
                        </span>
                    </div>
                    <span className='flex flex-col gap-2 justify-center text-end'>
                        <p className='capitalize font-semibold text-md sm:text-xl text-white-normal'>
                            {parseFloat(stakingCrypto.btc.earningAmount).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            })}
                        </p>
                        <p className={`${styles.WalletStakingPercentaje}`} >
                            {
                                isNaN(PercentageGainBTC) ?
                                    `+0.00%`
                                    :
                                    `+${PercentageGainBTC}%`
                            }
                        </p>
                    </span>
                </div>

                {/*  ================== ETHEREUM  ================== */}
                <div className={`${styles.WalletStakingCard}`}>
                    <div className='flex flex-row justify-center items-center gap-4'>
                        <img
                            src={stakingCrypto.eth.image}
                            alt="eth"
                            className='w-12 h-12 object-contain'
                        />
                        <span className='flex flex-col justify-center items-start gap-2'>
                            <h2 className='capitalize font-semibold text-md sm:text-xl text-white-normal'>{stakingCrypto.eth.name}</h2>
                            <p className='uppercase font-semibold text-sm sm:text-lg text-gray-background'> {stakingCrypto.eth.coin_amount} {stakingCrypto.eth.coin}</p>
                        </span>
                    </div>
                    <span className='flex flex-col gap-2 justify-center text-end'>
                        <p className='capitalize font-semibold text-md sm:text-xl text-white-normal'>
                            {parseFloat(stakingCrypto.eth.earningAmount).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            })}
                        </p>
                        <p className={`${styles.WalletStakingPercentaje}`} >
                            {
                                isNaN(PercentageGainETH) ?
                                    `+0.00%`
                                    :
                                    `+${PercentageGainETH}%`
                            }
                        </p>
                    </span>
                </div>

                {/*  ================== TETHER  ================== */}
                <div className={`${styles.WalletStakingCard}`}>
                    <div className='flex flex-row justify-center items-center gap-4'>
                        <img
                            src={stakingCrypto.bnb.image}
                            alt="bnb"
                            className='w-12 h-12 object-contain rounded-full'
                        />
                        <span className='flex flex-col justify-center items-start gap-2'>
                            <h2 className='capitalize font-semibold text-md sm:text-xl text-white-normal'>{stakingCrypto.bnb.name}</h2>
                            <p className='uppercase font-semibold text-sm sm:text-lg text-gray-background'> {stakingCrypto.bnb.coin_amount} {stakingCrypto.bnb.coin}</p>
                        </span>
                    </div>
                    <span className='flex flex-col gap-2 justify-center text-end'>
                        <p className='capitalize font-semibold text-md sm:text-xl text-white-normal'>
                            {parseFloat(stakingCrypto.bnb.earningAmount).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            })}
                        </p>
                        <p className={`${styles.WalletStakingPercentaje}`} >
                            {
                                isNaN(PercentageGainBNB) ?
                                    `+0.00%`
                                    :
                                    `+${PercentageGainBNB}%`
                            }
                        </p>
                    </span>
                </div>

                {/*  ================== TRON COIN  ================== */}
                <div className={`${styles.WalletStakingCard}`}>
                    <div className='flex flex-row justify-center items-center gap-4'>
                        <img
                            src={stakingCrypto.trx.image}
                            alt="trx"
                            className='w-12 h-12 object-contain rounded-full'
                        />
                        <span className='flex flex-col justify-center items-start gap-2'>
                            <h2 className='capitalize font-semibold text-md sm:text-xl text-white-normal'>{stakingCrypto.trx.name}</h2>
                            <p className='uppercase font-semibold text-sm sm:text-lg text-gray-background'> {stakingCrypto.trx.coin_amount} {stakingCrypto.trx.coin}</p>
                        </span>
                    </div>
                    <span className='flex flex-col gap-2 justify-center text-end'>
                        <p className='capitalize font-semibold text-md sm:text-xl text-white-normal'>
                            {parseFloat(stakingCrypto.trx.earningAmount).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            })}
                        </p>
                        <p className={`${styles.WalletStakingPercentaje}`} >
                            {
                                isNaN(PercentageGainTRX) ?
                                    `+0.00%`
                                    :
                                    `+${PercentageGainTRX}%`
                            }
                        </p>
                    </span>
                </div>

                {/*  ================== SOLANA COIN  ================== */}
                <div className={`${styles.WalletStakingCard}`}>
                    <div className='flex flex-row justify-center items-center gap-4'>
                        <img
                            src={stakingCrypto.sol.image}
                            alt="sol"
                            className='w-12 h-12 object-contain'
                        />
                        <span className='flex flex-col justify-center items-start gap-2'>
                            <h2 className='capitalize font-semibold text-md sm:text-xl text-white-normal'>{stakingCrypto.sol.name}</h2>
                            <p className='uppercase font-semibold text-sm sm:text-lg text-gray-background'> {stakingCrypto.sol.coin_amount} {stakingCrypto.sol.coin}</p>
                        </span>
                    </div>
                    <span className='flex flex-col gap-2 justify-center text-end'>
                        <p className='capitalize font-semibold text-md sm:text-xl text-white-normal'>
                            {parseFloat(stakingCrypto.sol.earningAmount).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            })}
                        </p>
                        <p className={`${styles.WalletStakingPercentaje}`} >
                            {
                                isNaN(PercentageGainSOL) ?
                                    `+0.00%`
                                    :
                                    `+${PercentageGainSOL}%`
                            }
                        </p>
                    </span>
                </div>



            </div>
        </div>
    )
}

export default WalletStakingCards
WalletStakingCards.propTypes = {
    stakingCrypto: PropTypes.object,
}