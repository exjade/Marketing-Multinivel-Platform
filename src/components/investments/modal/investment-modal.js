import React from 'react';
import PropTypes from 'prop-types'
import styles from './styles/investments.module.css'
import {
    XMarkIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import useMotion from '../../../hooks/use-motion';
import { QRCodeCanvas } from 'qrcode.react';
// import StakingLoader from '../../wallet/artificial/staking/loader/staking-loader';
import ActionSuccess from '../../actions-status/success';
import useActionSuccess from '../../../hooks/action-status/action-success';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const SelectQrPayment = ({
    // investment,
    cancelInvestment,
    pay
}) => {
    const { container, item } = useMotion()

    const {
        successAction,
        handleActiveActión,
    } = useActionSuccess()

    var pay_amount = pay?.price_amount;
    var randomValue = 2 + Math.random() * 0.7;
    pay_amount += randomValue;
    pay_amount = pay_amount.toFixed(2);

    return (
        <motion.div
            className={`${styles.container}`}
            initial="hidden"
            animate="visible"
            variants={container}
        >
            <motion.div
                className={`${styles.wrapper}`}
                variants={item}
            >
                <div className={styles.packageName}>
                    <span className='font-semibold uppercase text-black-normal'>
                        {
                            pay?.price_currency === undefined ? (
                                <h1 className='uppercase animate-pulse'></h1>
                            ) :
                                (<h1 className='uppercase'>{pay?.price_currency}-{pay?.network}:</h1>)
                        }

                    </span>
                    <button
                        className={styles.close}
                        type='button'
                        onClick={() => cancelInvestment()}
                    >
                        <XMarkIcon
                            className='w-16 h-16 text-colorSecondary-theme-blue-primary   '
                        />
                    </button>
                </div>

                {
                    successAction &&
                    (
                        <ActionSuccess
                            action={`Wallet`} />
                    )
                }


                <motion.div
                    className={`${styles.qrcode}`}
                    variants={item}>
                    {
                        pay?.pay_address === undefined ||
                            pay?.pay_address === null ?
                            <></>
                            : (
                                <div
                                    className='flex flex-col justify-center items-center w-full'

                                >
                                    <CopyToClipboard text={pay?.pay_address} >

                                        <button
                                            className='flex flex-col justify-center items-center w-full cursor-pointer h-80 py-4'
                                            onClick={() => handleActiveActión()}
                                        >
                                            <QRCodeCanvas
                                                value={pay?.pay_address}
                                                height='256px'
                                                width='256px'
                                            />
                                        </button>
                                    </CopyToClipboard>
                                </div>
                            )
                    }
                </motion.div>


                <div className={`${styles.qramount}`}>
                    {/* <motion.span className={`${styles.address}`} variants={item}>
                        {
                            pay?.pay_address === undefined ?
                                (
                                    <p className='animate-pulse opacity-95'>...</p>
                                )
                                :
                                (
                                    <p className={`${styles.address} cursor-pointer`}>{pay?.pay_address}</p>
                                )
                        }
                    </motion.span> */}
                    {
                        pay?.pay_amount === undefined ?
                            (
                                <p className={`${styles.amount} animate-pulse opacity-95`}>
                                    ...
                                </p>
                            )
                            :
                            (
                                <span className='flex flex-col '>
                                    <p className='text-lg font-semibold uppercase'>{pay?.pay_currency}:</p>
                                    <p className={`${styles.amount}`}>
                                        {pay?.pay_amount?.toFixed(4)}
                                    </p>
                                    <p className='text-lg font-semibold uppercase'>USD:</p>
                                    <p className={`${styles.amount}`}>
                                        ${pay_amount?.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        })}
                                    </p>
                                </span>
                            )
                    }

                </div>
            </motion.div>
        </motion.div>
    )
}

export default SelectQrPayment
SelectQrPayment.propTypes = {
    packageNames: PropTypes.object,
    investment: PropTypes.object,
    cancelInvestment: PropTypes.func,
    pay: PropTypes.any,
}