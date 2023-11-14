import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
//styles
import '../../styles/dashboard/header/header.css'
//eslint-disable-next-line no-unused-vars
import styles from '../../styles/modules/dashboard/header/header.module.css' //eslint-disable-next-line no-unused-vars
//routes
import * as ROUTES from '../../constants/routes'
import useAuthListener from '../../hooks/use-auth-listener'

const Header = ({
    user,
    openMenu,
    toggleOpen,
    toggleClose,
}) => {

    const { user: authUser } = useAuthListener()

    return (
        <>
            <header>
                <div className='dashboard_header_container'>
                    {/* LOGO */}
                    <Link to={ROUTES.DASHBOARD} className='flex flex-row justify-center items-center'>
                        <img
                            src="/assets/logo.webp"
                            alt="logo"
                            className='dashboard_header_logo object-contain rounded-full h-24 w-24'
                            loading='lazy'
                        />
                    </Link>
                    {/* PROFILE */}
                    <div className="dashboard_header_profile_account">
                        <div className="dashboard_header_profile_photo cursor pointer" >
                            {
                                !user?.photoURL ? (
                                    <>

                                        <a href={`/p/${authUser?.displayName}`}>
                                            <img src='https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg'
                                                alt="profile" loading='lazy' />
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <a href={`/p/${authUser?.displayName}`}>
                                            <img src={`${user?.photoURL}`} alt="profile" loading='lazy' />
                                        </a>

                                    </>
                                )
                            }

                        </div>
                        <h4 className='capitalize text-black-normal font-poppins-600 font-bold '>
                            {user?.username}
                        </h4>

                    </div>
                    {
                        openMenu ? (
                            <button id="dashboard_header_button" onClick={() => toggleClose()}>
                                <span className="material-icons-sharp">menu </span>
                            </button>
                        ) : (
                            <button id="dashboard_header_button" onClick={() => toggleOpen()}>
                                <span className="material-icons-sharp">menu </span>
                            </button>
                        )
                    }
                </div>

            </header>


        </>
    )
}

export default Header

Header.propTypes = {
    setSearch: PropTypes.func,
    handleOpen: PropTypes.func,
    toggleOpen: PropTypes.func,
    toggleClose: PropTypes.func,
    openMenu: PropTypes.bool,
    setIsOpen: PropTypes.func,
    user: PropTypes.object,
    username: PropTypes.string,
    photoURL: PropTypes.string

}