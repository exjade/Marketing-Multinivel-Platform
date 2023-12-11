import React from 'react'
//Proptypes
import PropTypes from 'prop-types'
import '../../styles/sidebar/sidebar.css'
//error
import Error from '../../error/error'
import Packages from './packages'

const PackageTimeline = () => {
    return (
        <>
                    <Error>
                        <Packages />
                    </Error>
        </>
    )
}

export default PackageTimeline

PackageTimeline.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    mobile: PropTypes.bool,
}