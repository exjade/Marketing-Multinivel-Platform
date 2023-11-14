import React from 'react';
import PropTypes from 'prop-types'
import styles from './styles/investments.module.css';
import { motion } from 'framer-motion';
import {
    XMarkIcon
} from '@heroicons/react/24/outline';
import useMotion from '../../../hooks/use-motion';

const SelectPayment = ({
    setSelectPage,
    closePaymentOptions,
}) => {

    const { container, item } = useMotion()

    return (
        <>
           

            <motion.div
                className={`${styles.SelecPaymentContainer}`}
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <div className={`${styles.SelecPaymentWrapper}`} >

                    <span className={`${styles.SelecPaymenttitle}`} >
                        <button
                            type='button'
                            className={styles.closeOptions}
                            onClick={() => closePaymentOptions()}
                        >
                            <XMarkIcon className='w-10 h-10 text-red-card' />
                        </button>
                        <h1 className={`${styles.title}`} >Select Payment Option</h1>
                    </span>

                    <div className={`${styles.SelecPaymentOptions}`}>
                        <motion.button
                            className={`${styles.SelectBorders}`}
                            whileTap={{ scale: 0.9 }}
                            variants={item}
                            onClick={() => setSelectPage({
                                walletBalance: false,
                                qrpayment: false,
                                crypto: true
                            })}
                        >
                            QR Payment
                        </motion.button>
                        <motion.button
                            className={`${styles.SelectBordersSelected}`}
                            whileTap={{ scale: 0.9 }}
                            variants={item}
                            onClick={() => setSelectPage({
                                walletBalance: true,
                                qrpayment: false,
                                crypto: false,
                            })}
                        >
                            Wallet Balance
                        </motion.button>
                    </div>

                </div>
            </motion.div>
        </>
    )
}

export default SelectPayment

SelectPayment.propTypes = {
    closePaymentOptions: PropTypes.func,
    setSelectPage: PropTypes.func,
    selectPage: PropTypes.object,
}