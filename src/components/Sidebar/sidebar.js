import React from 'react'
//components
import LeftSidebar from './LeftSidebar'
import LeftSidebarMobile from './LeftSidebarMobile'
//styles
import '../../styles/sidebar/sidebar.css'
//Proptypes
import PropTypes from 'prop-types'
//hooks
import useMobile from '../../hooks/use-mobile'

const SidebarComponent = ({ isOpen, setIsOpen, theme, setTheme }) => {

    const { mobile } = useMobile(setIsOpen, isOpen)
    return (
        <>
            {
                isOpen ? (
                    <LeftSidebarMobile
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        theme={theme}
                        setTheme={setTheme}
                    />
                ) : mobile && !isOpen ? (
                    <LeftSidebar
                        setIsOpen={setIsOpen}
                        theme={theme}
                        setTheme={setTheme}
                    />


                ) : (<LeftSidebar
                    setIsOpen={setIsOpen}
                    theme={theme}
                    setTheme={setTheme}
                />

                )

            }
        </>
    )
}

export default SidebarComponent

SidebarComponent.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    mobile: PropTypes.bool,
    theme: PropTypes.bool,
    setTheme: PropTypes.func,
}