import React from 'react'
//Proptypes
import PropTypes from 'prop-types'
//components
import styles from '../../styles/modules/profile/profile.module.css'
// import Profile from './profile'
import UserProfile from './artificial/user-profile'
//styles
import '../../styles/sidebar/sidebar.css'
//error
import Error from '../../error/error'
// import Packages from './packages'
import useMobile from '../../hooks/use-mobile'
import Header from '../header/artificial/header'

const ProfileTimeline = ({
    isOpen,
    // setIsOpen,
    // theme,
    // setTheme
}) => {

    const { mobile } = useMobile({ isOpen })

    return (
        <>

            <Error >
                <Header
                />
            </Error>

            <Error>
                <div className={`${styles.main}`}  >
                    <div></div>
                    <section className={`${styles.section}`} >
                        <UserProfile />
                    </section>
                    <div></div>
                </div>
            </Error>
        </>
    )
}

export default ProfileTimeline

ProfileTimeline.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    theme: PropTypes.bool,
    setTheme: PropTypes.func,
    mobile: PropTypes.bool,
}