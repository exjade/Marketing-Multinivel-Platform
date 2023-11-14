
import React, { useEffect, useState } from 'react'
//framer motion
import { motion, AnimatePresence } from 'framer-motion'
//components
import PackageTimeline from '../components/investments/packages-timeline'
import Menu from '../components/header/menu'
//hooks
import useTheme from '../hooks/use-theme'
import useCoin from '../hooks/use-coin'
import useMenu from '../hooks/use-menu'
//Proptypes
import PropTypes from 'prop-types'
//error
import Error from '../error/error'
import Header from '../components/header/artificial/header'

const Packages = () => {

    useEffect(() => { document.title = 'Packages - Artificial' }, []) //eslint-disable-line
    const { theme, setTheme } = useTheme()
    const { setSearch } = useCoin()
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
                    setSearch={setSearch}
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
                    <PackageTimeline
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                </Error>
            </motion.div>
        </AnimatePresence>
    )
}

export default Packages

Packages.propTypes = {
    setSearch: PropTypes.func,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    theme: PropTypes.bool,
    setTheme: PropTypes.func
}