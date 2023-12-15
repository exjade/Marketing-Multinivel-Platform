import React from 'react';
import PropTypes from 'prop-types'
import styles from './styles/investments.module.css';
import { motion } from 'framer-motion';
import useMotion from '../../../hooks/use-motion';
import InputDropdown from './input/dropdown';

const CryptoInput = ({
    setInvestment,
    tokenList,
    setTokenList,
    investment,
    setSelectPage,
    newCustomDoc,
}) => {

    const { container, item } = useMotion()

    const handleTokenList = () => {
        if (tokenList) {
            setTokenList(false)
        } else {
            setTokenList(true)
        }
    }



    return (
        <>
            <motion.div
                className={`${styles.SelecPaymentContainer}`}
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <div className={`${styles.SelectPaymentWrapper}`} >


                    <div className={`${styles.paymentOptions}`} >
                        <div className={`${styles.paymentOptionsWrapper}`} >
                            <h1>Select a Token</h1>
                            <div className={`${styles.rightOption}`} >
                                <InputDropdown
                                    setInvestment={setInvestment}
                                    investment={investment}
                                    tokenList={tokenList}
                                    setTokenList={setTokenList}
                                    handleTokenList={handleTokenList}
                                    setSelectPage={setSelectPage}
                                    newCustomDoc={newCustomDoc}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default CryptoInput

CryptoInput.propTypes = {
    setInvestment: PropTypes.func,
    setSelectPage: PropTypes.func,
    newCustomDoc: PropTypes.object,
    setTokenList: PropTypes.func,
    tokenList: PropTypes.bool,
    investment: PropTypes.object,
}