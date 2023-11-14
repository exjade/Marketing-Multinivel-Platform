import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/wallet.module.css'


const WalletWithdrawalModal = (props) => {


  return (
    <div className={`${styles.withdrawalWalletContainer} bg-white-normal rounded-lg shadow sm:max-w-md sm:w-full sm:mx-auto sm:overflow-hidden`} id='modal'>
      <div className="px-4 py-8 sm:px-10">
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300">
            </div>
          </div>
          <div className="relative flex justify-center text-sm leading-5">
            <span className="px-2 text-gray-500 bg-white-primary">
              Send USDT
            </span>
          </div>
        </div>
        <div className="mt-6">
          <div className="w-full space-y-6">
            <div className="w-full">
              <div className=" relative ">
                <input
                  type="text"
                  id="witdrawal-form-address"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white-primary text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Address: USDT-TRC20"
                  onChange={(e) => props.setWithdrawalAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full">
              <div className=" relative ">
                <input
                  type="number"
                  id="witdrawal-form-amount"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white-primary text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Amount USDT"
                  onChange={(e) => props.setWithdrawalAmount(parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div className="w-full">
              <div className=" relative ">
                <input
                  type="text"
                  id="witdrawal-form-pin"
                  className={`${props.pinError && 'border border-artificial-text-card-orange'} rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white-primary text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent`}
                  placeholder="Your security pin"
                  onChange={(e) => props.setPin(e.target.value)}
                />
              </div>
            </div>

            {
              props.pinError !== '' && (
                <p className='text-normal text-center text-red-card'>
                  {props.pinError}
                </p>
              )
            }

            {
              props.withdrawalAmountError !== '' && (
                <p className='text-normal text-center text-red-card break-words'>
                  {props.withdrawalAmountError}
                </p>
              )
            }


            <div>
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="button"
                  className={`${props.emptyFields && 'cursor-not-allowed hover:bg-red-card hover:text-white-normal'} py-2 px-4   text-black-normal w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg`}
                  onClick={() => props.validatePin()}
                  disabled={props.emptyFields}
                >
                  Continue
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
                  Close
                </button>
              </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletWithdrawalModal

WalletWithdrawalModal.propTypes = {
  handleCloseModal: PropTypes.func,
  setWithdrawalAmount: PropTypes.func,
  setWithdrawalAddress: PropTypes.func,
  setPin: PropTypes.func,
  setPrevStep: PropTypes.func,
  emptyFields: PropTypes.any,
  incorretPin: PropTypes.any,
  pinError: PropTypes.string,
  withdrawalAmountError: PropTypes.string,
  validatePin: PropTypes.func,
  loader: PropTypes.bool,
}