import React, { useState } from 'react'
import PropTypes from 'prop-types'
import WalletWithdrawalModal from './wallet-modal'
import WalletWithdrawalInfo from './wallet-withdrawal-info'

const WithdrawalWalletModal = (props) => {

  const [prevStep, setPrevStep] = useState({
    information: false
  })

  const emptyFields = props.withdrawalAddress === '' || props.withdrawalAmount < 0 || props.pin === '';
  const incorretPin = props.activeUser?.pin !== props.pin;
  const InsufficientFunds = parseInt(props.withdrawalAmount) + props.gasFee > parseInt(props.activeUser?.topupBalance);

  const validatePin = () => {

    if (incorretPin) {
      props.setPinError('Wrong security pin')
    } else {
      validateFunds();
    }
  }
  const validateFunds = () => {
    if (InsufficientFunds) {
      props.setWithdrawalAmountError('There isnt enough balance in your wallet to perform this action')
      setTimeout(() => {
        props.setWithdrawalAmountError('')
        props.setPinError('')
      }, 3000);
    } else {
      if (!InsufficientFunds) {
        props.setWithdrawalAmountError('')
      }

      setPrevStep({
        information: true
      })
      setTimeout(() => {
        props.setWithdrawalAmountError('')
        props.setPinError('')
      }, 1000);
    }
  }


  return (
    <>

      {
        !prevStep.information ? (
          <WalletWithdrawalModal
            handleCloseModal={props.handleCloseModal}
            setWithdrawalAmount={props.setWithdrawalAmount}
            setWithdrawalAddress={props.setWithdrawalAddress}
            setPin={props.setPin}
            setPrevStep={setPrevStep}
            emptyFields={emptyFields}
            incorretPin={incorretPin}
            pinError={props.pinError}
            validateFunds={validateFunds}
            validatePin={validatePin}
            withdrawalAmountError={props.withdrawalAmountError}

          />
        ) : (
          <WalletWithdrawalInfo
            handleCloseModal={props.handleCloseModal}
            makeWithdrawalRequest={props.makeWithdrawalRequest}
            withdrawalAddress={props.withdrawalAddress}
            withdrawalAmount={props.withdrawalAmount}
            gasFee={props.gasFee}
            gassFeeError={props.gassFeeError}
            loader={props.loader}
          />
        )
      }

    </>
  )
}

export default WithdrawalWalletModal

WithdrawalWalletModal.propTypes = {
  handleCloseModal: PropTypes.func,
  setWithdrawalAmount: PropTypes.func,
  setWithdrawalAddress: PropTypes.func,
  setPin: PropTypes.func,
  makeWithdrawalRequest: PropTypes.func,
  withdrawalAmount: PropTypes.number,
  withdrawalAddress: PropTypes.string,
  gasFee: PropTypes.number,
  pin: PropTypes.string,
  pinError: PropTypes.string,
  withdrawalAmountError: PropTypes.string,
  gassFeeError: PropTypes.string,
  activeUser: PropTypes.object,
  setPinError: PropTypes.func,
  setWithdrawalAmountError: PropTypes.func,
  loader: PropTypes.bool,
}