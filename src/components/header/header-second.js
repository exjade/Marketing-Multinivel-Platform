import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
//styles
import '../../styles/dashboard/header/header.css'
//eslint-disable-next-line no-unused-vars
import styles from '../../styles/modules/dashboard/header/header.module.css'
//routes
import * as ROUTES from '../../constants/routes'
import useUser from '../../hooks/use-user'

const Header = () => {

    const { user } = useUser()

    return (
        <>
            <header className={styles.headersecond}>
                <div className='dashboard_header_container' >
                    {/* LOGO */}
                    <Link to={ROUTES.DASHBOARD}
                        className='flex flex-row justify-center items-center'>
                        <img
                            src="/assets/logo.webp"
                            alt="logo"
                            className='dashboard_header_logo object-contain rounded-full h-44 w-44'
                            loading='lazy' />
                    </Link>

                    {/* PROFILE */}
                    <div className="dashboard_header_profile">
                        {/* Profile Area */}
                        <div className="dashboard_header_profile_account">
                            <Link to={`/p/${user?.username}`}>
                                <div className="dashboard_header_profile_photo cursor pointer" >
                                    <img
                                        src={`${user?.photoURL === '' || user?.photoURL === null ?
                                        'https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg' : user?.photoURL}`}
                                        alt="profile"
                                        loading='lazy'
                                        className='rounded-full  object-contain'
                                    />
                                </div>
                            </Link>
                            <h5 className='capitalize'>{user?.emailAddress}</h5>
                        </div>
                    </div>
                </div>
            </header>


        </>
    )
}

export default Header

Header.propTypes = {
    setSearch: PropTypes.func,
    handleOpen: PropTypes.func,
    theme: PropTypes.bool,
    setTheme: PropTypes.func,
    toggleOpen: PropTypes.func,
    toggleClose: PropTypes.func,
    openMenu: PropTypes.bool,
    setIsOpen: PropTypes.func,
    user: PropTypes.object,
    username: PropTypes.string,
    photoURL: PropTypes.string

}