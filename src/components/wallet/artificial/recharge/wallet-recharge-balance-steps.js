import React, { useState } from 'react'
import PropTypes from 'prop-types'
import WalletBuyForm from './wallet-buy-form'

const WalletRechargeBalanceSteps = (props) => {

    // Steps: 
    // (props.isActive.buy): The amount to invest is entered, the term, and the information is displayed to the user.
    // (props.isActive.recharge): If the user has added the information and decides to click on the invest button, a qr will be generated for the user to make the payment.
    const [userHasWrittenAnAmount, setUserHasWriteenAnAmount] = useState('')
    const amountEmpty = props.balanceUSDT <= 0;

    const setBuyAsActive = () => {
        if (amountEmpty) {
            setUserHasWriteenAnAmount('To proceed, please enter an amount to deposit')
            setTimeout(() => {
                setUserHasWriteenAnAmount('')
            }, [1500])
        }
    }
    const setActive = () => {
        props.setIsActive({
            home: false,
            wallet: false,
            buy: true,
            recharge: false,
            settings: false,
            stake: false,
        })
        setBuyAsActive()
    }

    const handleInputChange = (e) => {
        const typingTimer = setTimeout(() => {
            props.setBalanceUSDT(parseFloat(e.target.value));
        }, 800);

        return () => {
            clearTimeout(typingTimer);
            props.setBalanceUSDT(0)
        };
    };

    return (
        <>
            <WalletBuyForm
                stakingCrypto={props.stakingCrypto}
                setActive={setActive}
                handleInputChange={handleInputChange}
                balanceUSDT={props.balanceUSDT}
                userHasWrittenAnAmount={userHasWrittenAnAmount}
                amountEmpty={amountEmpty}
                customPayment={props.customPayment}
            />
        </>
    )
}

export default WalletRechargeBalanceSteps
WalletRechargeBalanceSteps.propTypes = {
    isActive: PropTypes.object,
    setIsActive: PropTypes.func,
    stakingCrypto: PropTypes.object,
    setBalanceUSDT: PropTypes.func,
    balanceUSDT: PropTypes.number,
    activeUser: PropTypes.object,
    customPayment: PropTypes.any,
}