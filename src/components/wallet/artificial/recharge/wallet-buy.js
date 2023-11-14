import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/wallet.module.css'
// import QRCode from 'react-qr-code';
import { QRCodeCanvas  } from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { motion } from 'framer-motion'
import StakingLoader from '../staking/loader/staking-loader';

const WalletRechargeBalance = ({ customPayment }) => {
    return (
        <div className={`${styles.WalletStakingContainer} font-Inter-500 `}>
            <div className={`${styles.WalletStakingWrapper} `}>
                <h2 className='text-gray-primary font-semibold text-xl capitalize'>Deposit Balance</h2>
                {/* COIN IMAGE */}
                <img
                    src='https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Tether-USDT-icon.png'
                    alt="btc"
                    className='w-12 h-12 object-contain'
                />

                {/* COIN NETWORK */}
                <span className='flex flex-row gap-3 justify-between items-center'>
                    <p className='text-2xl font-bold text-white-normal'>USDT</p>
                    <p className='text-2xl font-bold text-gray-primary'>(TRC20)</p>
                </span>
                {/* QR CODE */}
                {
                    customPayment?.pay_address === undefined ||
                        customPayment?.pay_address === null ?
                        (<StakingLoader />)
                        : (
                            <div className='flex flex-col justify-center items-center w-full'>
                                <div className='flex flex-col justify-center items-center w-10/12'>
                                    <QRCodeCanvas 
                                        // size={256}
                                        // style={{ height: '256', maxWidth: '100%', width: '100%' }}
                                        value={customPayment?.pay_address}
                                        // viewBox={`0 0 256 256`}
                                        // renderAs="canvas"
                                    />
                                </div>
                            </div>
                        )
                }
                {/* ADDRESS */}
                <div className='bg-gray-adminParagraph py-8 my-4 px-2  rounded-xl flex w-full justify-center items-center h-7'>
                    <p className='text-white-primary text-md font-light break-words p-4   break-all'>
                        {customPayment?.pay_address}
                    </p>
                </div>
                {/* Warning */}
                <p className='text-gray-primary text-md font-light'>Only USDT can be received to this address</p>
            </div>
            <CopyToClipboard text={customPayment?.pay_address === undefined ? '' : customPayment?.pay_address}>
                <div className='w-full flex justify-center items-center mt-16 mb-10'>
                    <motion.button
                        type='button'
                        className='bg-green-landingButton w-1/3 h-10 rounded-2xl text-black-normal font-semibold'
                        whileTap={{ scale: 0.95 }}
                    >
                        Copy
                    </motion.button>
                </div>
            </CopyToClipboard>

        </div>
    )
}

export default WalletRechargeBalance
WalletRechargeBalance.propTypes = {
    customPayment: PropTypes.any,
    createDepositTicket: PropTypes.func,
}