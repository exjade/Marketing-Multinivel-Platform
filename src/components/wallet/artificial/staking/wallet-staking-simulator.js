import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/wallet.module.css'
import StakingModalInformation from './cryptocurrencies/modal/wallet-modal-information'
import StakingSimulatorSelectCrypto from './staking-simulator-select-crypto'
import StakingLoader from './loader/staking-loader'
import StakingSimulatorBtc from './cryptocurrencies/staking-simulator-btc'
import StakingSimulatorEth from './cryptocurrencies/staking-simulator-eth'
import StakingSimulatorBnb from './cryptocurrencies/staking-simulator-bnb'
import StakingSimulatorTron from './cryptocurrencies/staking-simulator-tron'
import StakingSimulatorSolana from './cryptocurrencies/staking-simulator-solana'


const WalletStakingSimulator = (props) => {
    return (
        <div className={`${styles.WalletStakingContainer} font-Inter-500 `}>
            <div className={`${styles.WalletStakingWrapper} `}>
                {/* AVAILABLE CRYPTOCURRENCIES  */}
                <StakingSimulatorSelectCrypto
                    stakingCrypto={props.stakingCrypto}
                    setSelectCurrency={props.setSelectCurrency}
                    setBitcoin={props.setBitcoin}
                    bitcoin={props.bitcoin}
                />

                {
                    props.selectCurrency.loader ?
                        (<StakingLoader />)
                        : props.selectCurrency.bitcoin ?
                            (<StakingSimulatorBtc
                                openModal={props.openModal}
                            />)
                            : props.selectCurrency.ethereum ?
                                (<StakingSimulatorEth
                                    openModal={props.openModal}
                                />)
                                : props.selectCurrency.bnb ?
                                    (<StakingSimulatorBnb
                                        openModal={props.openModal}
                                    />)
                                    : props.selectCurrency.tron ?
                                        (<StakingSimulatorTron
                                            openModal={props.openModal}
                                        />)
                                        : props.selectCurrency.solana ?
                                            (<StakingSimulatorSolana
                                                openModal={props.openModal}
                                            />)
                                            : (<StakingLoader />)
                }

                {
                    props.modal && (
                        <StakingModalInformation
                            closeModal={props.closeModal}
                            setBitcoin={props.setBitcoin}
                            bitcoin={props.bitcoin}
                            selectCurrency={props.selectCurrency}
                            setSelectCurrency={props.setSelectCurrency}
                            handleOnChangeInitialInvestment={props.handleOnChangeInitialInvestment}
                            AnnualPercentageRate={props.AnnualPercentageRate}
                            timestamp={props.timestamp}
                            stakeDate={props.stakeDate}
                            timestampSixteen={props.timestampSixteen}
                            timestampHundredTwenty={props.timestampHundredTwenty}
                            activeUser={props.activeUser}
                        />
                    )
                }

            </div>
        </div>
    )
}

export default WalletStakingSimulator

WalletStakingSimulator.propTypes = {
    stakingCrypto: PropTypes.object,
    selectCurrency: PropTypes.object,
    setSelectCurrency: PropTypes.func,
    modal: PropTypes.bool,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    setBitcoin: PropTypes.func,
    bitcoin: PropTypes.object,
    handleOnChangeInitialInvestment: PropTypes.func,
    AnnualPercentageRate: PropTypes.object,
    stakeDate: PropTypes.any,
    timestamp: PropTypes.any,
    timestampSixteen: PropTypes.any,
    timestampHundredTwenty: PropTypes.any,
    activeUser: PropTypes.object,
}