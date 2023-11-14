import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/wallet.module.css'
import RequestLoader from '../../../withdrawal/loader/request-loader'

const WalletWithdrawalInfo = (props) => {



  return (
    <div className={`${styles.withdrawalWalletContainer} bg-white-normal rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden`}>
      <div className="px-4 py-8 sm:px-10">
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300">
            </div>
          </div>
          <div className="relative flex justify-center text-sm leading-5">
            <span className="px-2 text-gray-500 bg-white-primary">
              Transfer
            </span>
          </div>
        </div>

        <div className='flex justify-center items-center mt-5'>
          <p className='text-2xl font-semibold'>-{props.withdrawalAmount} USDT</p>
        </div>

        <div className="mt-6">
          <div className="w-full space-y-6">
            <div className="w-full">
              <div className=" relative gap-2 flex flex-row justify-center items-center">
                <label>Asset</label>
                <input
                  type="text"
                  id="witdrawal-form-address"
                  className=" rounded-xs border-transparent outline-none flex-1 appearance-none  w-full py-2 px-4 bg-white-primary text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value="USDT-TRC20"
                  disabled
                />
              </div>
            </div>
            <div className="w-full">
              <div className=" relative gap-2 flex flex-row justify-center items-center">
                <label>To</label>
                <input
                  type="text"
                  id="witdrawal-form-wallet"
                  className=" rounded-xs border-transparent outline-none flex-1 appearance-none  w-full py-2 px-4 bg-white-primary text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={props.withdrawalAddress}
                  disabled
                />
              </div>
            </div>
            <div className="w-full">
              <div className=" relative gap-2 flex flex-row justify-center items-center">
                <label>Gass Fee</label>
                <input
                  type="text"
                  id="witdrawal-form-fee"
                  className={`${props.gassFeeError !== '' && 'border border-artificial-text-card-orange'}  rounded-xs border-transparent outline-none flex-1 appearance-none  w-full py-2 px-4 bg-white-primary text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                  value={props.gasFee}
                  disabled
                />
              </div>
            </div>
            {
              props.gassFeeError !== '' && (
                <p className='text-normal text-center text-red-card'>
                  {props.gassFeeError}
                </p>
              )
            }
                 {
              props.loader && (
                <div className='flex justify-center items-center'>
                  <RequestLoader />
                </div>
              )
            }

            <div>
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="button"
                  className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={() => props.makeWithdrawalRequest()}
                >
                  Sent
                </button>
              </span>
            </div>
            <div>
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="button"
                  className="py-2 px-4  bg-red-card hover:bg-red-card focus:ring-red-card focus:ring-offset-green-landingButton text-white-normal w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={() => props.handleCloseModal()}
                >
                  Cancel
                </button>
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletWithdrawalInfo


WalletWithdrawalInfo.propTypes = {
  makeWithdrawalRequest: PropTypes.func,
  handleCloseModal: PropTypes.func,
  withdrawalAddress: PropTypes.string,
  gasFee: PropTypes.number,
  withdrawalAmount: PropTypes.number,
  emptyFields: PropTypes.any,
  gassFeeError: PropTypes.string,
  loader: PropTypes.bool,
}