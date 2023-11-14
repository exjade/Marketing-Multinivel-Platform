import React, { useState } from 'react'
import PropTypes from 'prop-types'
import WalletStakingCards from './staking/wallet-staking-cards'
import WalletRechargeBalanceSteps from './recharge/wallet-recharge-balance-steps'
import WalletStakingSimulator from './staking/wallet-staking-simulator'
import WalletRechargeBalance from './recharge/wallet-buy'
import useCreateCustomPayment from '../../../hooks/use-create-custom-package';


const WalletMenuScreens = (props) => {

    // ========================  DEPOSIT BALANCE  ======================== //
    const [error, setError] = useState('')
    const customPriceAmount = parseFloat(props.balanceUSDT);
    const activeUser = props.activeUser;

    const resetBalanceUSDT =  () => {
        props.setBalanceUSDT(0)
    }

    const { customPayment } = useCreateCustomPayment({ customPriceAmount, activeUser, setError, resetBalanceUSDT })

    return (
        <>
            {
                props.isActive.wallet ?
                    (
                        <WalletStakingCards
                            stakingCrypto={props.stakingCrypto}
                        />
                    ) : props.isActive.recharge ?
                        (
                            <WalletRechargeBalanceSteps
                                isActive={props.isActive}
                                setIsActive={props.setIsActive}
                                stakingCrypto={props.stakingCrypto}
                                setBalanceUSDT={props.setBalanceUSDT}
                                balanceUSDT={props.balanceUSDT}
                                activeUser={props.activeUser}
                                customPayment={customPayment}
                            />
                        )
                        : props.isActive.buy ? (
                            <WalletRechargeBalance
                                customPayment={customPayment}
                                error={error}
                            />
                        )
                            : props.isActive.stake ?
                                (
                                    <WalletStakingSimulator
                                        stakingCrypto={props.stakingCrypto}
                                        selectCurrency={props.selectCurrency}
                                        setSelectCurrency={props.setSelectCurrency}
                                        modal={props.modal}
                                        openModal={props.openModal}
                                        closeModal={props.closeModal}
                                        bitcoin={props.bitcoin}
                                        setBitcoin={props.setBitcoin}
                                        handleOnChangeInitialInvestment={props.handleOnChangeInitialInvestment}
                                        AnnualPercentageRate={props.AnnualPercentageRate}
                                        stakeDate={props.stakeDate}
                                        timestamp={props.timestamp}
                                        timestampSixteen={props.timestampSixteen}
                                        timestampHundredTwenty={props.timestampHundredTwenty}
                                        activeUser={props.activeUser}
                                    />
                                )
                                : null
            }


        </>
    )
}

export default WalletMenuScreens

WalletMenuScreens.propTypes = {
    isActive: PropTypes.object,
    setIsActive: PropTypes.func,
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
    setBalanceUSDT: PropTypes.func,
    balanceUSDT: PropTypes.number,
    activeUser: PropTypes.object,
}