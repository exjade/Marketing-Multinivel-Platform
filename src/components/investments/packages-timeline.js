import React from 'react'
//Proptypes
import PropTypes from 'prop-types'
//components
import styles from '../../styles/modules/packages/package.module.css'
//styles
import '../../styles/sidebar/sidebar.css'
//error
import Error from '../../error/error'
import Packages from './packages'

const PackageTimeline = () => {
    return (
        <>
            <main className={`${styles.main}`}>
                <div className=''></div>
                <section className={`${styles.section}`} >
                    <Error>
                        <Packages />
                    </Error>
                </section>
            </main>
        </>
    )
}

export default PackageTimeline

PackageTimeline.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    mobile: PropTypes.bool,
}