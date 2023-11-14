
import React, { useEffect, useState } from 'react'
//framer motion
import { motion, AnimatePresence } from 'framer-motion'
//components
// import Header from '../components/header/Header'
// import Menu from '../components/header/menu'
import ProfileTimeline from '../components/profile/profile-timeline'
//hooks
import useTheme from '../hooks/use-theme'
// import useCoin from '../hooks/use-coin'
// import useMenu from '../hooks/use-menu'
//Proptypes
import PropTypes from 'prop-types'
//error
import Error from '../error/error'

const Packages = () => {

    useEffect(() => { document.title = 'Profile - Artificial' }, []) //eslint-disable-line
    const { theme, setTheme } = useTheme()
    // menu functionality
    const [isOpen, setIsOpen] = useState(false)


    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <Error>
                    <ProfileTimeline
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        theme={theme}
                        setTheme={setTheme}
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