import React, { useEffect, useState } from 'react'
//framer motion
import { motion, AnimatePresence } from 'framer-motion'
//components
// import Header from '../components/header/Header'
import TransactionTimeline from '../components/transactions/transaction-timeline'
import Menu from '../components/header/menu'
//hooks
import useTheme from '../hooks/use-theme'
import useTransactions from '../hooks/use-transactions'
import useMenu from '../hooks/use-menu'
//Proptypes
import PropTypes from 'prop-types'
//error
import Error from '../error/error'
import Header from '../components/header/artificial/header'

const Transaction = () => {

    useEffect(() => { document.title = 'Balances - CapitalTradersBusiness' }, []) //eslint-disable-line
    const { theme, setTheme } = useTheme()
    const { transactionSearch, setTransactionSearch } = useTransactions()
    // menu functionality
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => setIsOpen(true)

    const { openMenu, toggleOpen, toggleClose } = useMenu()
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Header
                    handleOpen={handleOpen}
                    theme={theme}
                    setTheme={setTheme}
                    openMenu={openMenu}
                    toggleOpen={toggleOpen}
                    toggleClose={toggleClose}
                />
                {
                    openMenu && (
                        <Menu toggleClose={toggleClose} />
                    )
                }
                <Error>
                    <TransactionTimeline
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        transactionSearch={transactionSearch}
                        setTransactionSearch={setTransactionSearch}
                    />
                </Error>
            </motion.div>
        </AnimatePresence>
    )
}

export default Transaction

Transaction.propTypes = {
    setSearch: PropTypes.func,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    theme: PropTypes.bool,
    setTheme: PropTypes.func
}