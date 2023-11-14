import React from 'react';
import PropTypes from 'prop-types'
import styles from './styles/investments.module.css';
import { motion } from 'framer-motion';
import useMotion from '../../../hooks/use-motion';

const SelectWalletSumary = ({
    cancelInvestment,
}) => {

    const { container, item } = useMotion()

    return (
        <motion.div
            className={`${styles.SelecPaymentContainer}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <div className={`${styles.SelecPaymentWrapper}`} >

                <span className={`${styles.SelecPaymenttitle}`} >
                    <h1 className={`${styles.title}`} >Are you sure?</h1>
                </span>

                <div className={`${styles.SelecPaymentOptions}`}>
                    <motion.button
                        className={`${styles.SelectBorders}`}
                        whileTap={{ scale: 0.9 }}
                        variants={item}
                        onClick={() => console.log('')}
                    >
                        Invest Now
                    </motion.button>
                    <motion.button
                        className={`${styles.SelectBordersSelected}`}
                        whileTap={{ scale: 0.9 }}
                        variants={item}
                        onClick={() => cancelInvestment()}
                    >
                        Cancel
                    </motion.button>
                </div>

            </div>
        </motion.div>
    )
}

export default SelectWalletSumary

SelectWalletSumary.propTypes = {
    cancelInvestment: PropTypes.func,
}