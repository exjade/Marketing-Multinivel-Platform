import React from 'react'
import PropTypes from 'prop-types'
import QRCode from 'react-qr-code';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const SelectQrPayment = ({ address, size, priceAmount, currency }) => {
    return (
        <>

            <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow">
                <form className="flex-auto p-6">
                    <div className="flex flex-wrap">
                        <h1 className="flex-auto text-xl font-semibold dark:text-gray-40 uppercase">
                            {currency} Amount
                        </h1>
                        <div className="text-xl font-semibold text-gray-500 dark:text-gray-300">
                            {priceAmount}
                        </div>
                        <div className="w-full flex-none text-sm font-medium text-gray-500 dark:text-gray-300 mt-2 uppercase">
                            {currency} Address
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-300">
                        {address}
                    </p>
                </form>
                <div className="flex-none flex justify-center items-center w-full">
                    <QRCode
                        value={address}
                        size={size}
                    />
                </div>
                <CopyToClipboard text={address}>
                    <div className="flex w-full justify-center items-center my-4 text-sm font-medium">
                        <button type="button" className="py-2 w-10/12 px-4 bg-indigo-600 hover:bg-green-button hover:text-white-normal focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                            Copy QR Code
                        </button>
                    </div>
                </CopyToClipboard>
            </div>

        </>
    )
}

export default SelectQrPayment

SelectQrPayment.propTypes = {
    size: PropTypes.number,
    priceAmount: PropTypes.number,
    address: PropTypes.string,
    currency: PropTypes.string, 
}