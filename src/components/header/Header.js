import React from 'react'
import PropTypes from 'prop-types'
//styles
import '../../styles/dashboard/header/header.css'
//eslint-disable-next-line no-unused-vars
import styles from '../../styles/modules/dashboard/header/header.module.css'
//routes
import * as ROUTES from '../../constants/routes'
//hooks
import useUser from '../../hooks/use-user'
import useAuthListener from '../../hooks/use-auth-listener'
import { useTranslation } from 'react-i18next'

const Header = ({
    // setSearch,
    // handleOpen,
    // handleClose,
    isOpen,
    theme,
    // setTheme,
    toggleOpen,
    toggleClose,
    openMenu
}) => {
    const { t } = useTranslation()
    const { user } = useUser()
    const { user: authUser } = useAuthListener()

    return (
        <>
            <header className={styles.header}>
                <div className='dashboard_header_container' >
                    {/* LOGO */}
                    {
                        theme ? (
                            <>
                                <a href={ROUTES.DASHBOARD} className='flex flex-row justify-center items-center'>
                                    <img
                                        src="/assets/logo.webp"
                                        alt="logo"
                                        className='dashboard_header_logo object-contain rounded-full h-44 w-44'
                                        loading='lazy' />
                                </a>
                            </>) : (
                            <>
                                <a href={ROUTES.DASHBOARD} className='flex flex-row justify-center items-center'>
                                    <img
                                        src="/assets/logo.webp"
                                        alt="logo"
                                        className='dashboard_header_logo object-contain rounded-full h-44 w-44'
                                        loading='lazy' />
                                </a>
                            </>
                        )
                    }

                    {/* SEACH BAR */}
                    {/* <div className="dashboard_header_searchbar"> */}
                        {/* <span className="material-icons-sharp">search</span>
                        <input
                            type="search"
                            placeholder={t('Search_a_coin')}
                            className={``}
                            onChange={e => setSearch(e.target.value)}
                        /> */}

                    {/* </div> */}
                    {/* PROFILE */}
                    <div className="dashboard_header_profile">

                        {/* Profile Area */}
                        <div className="dashboard_header_profile_account">
                            <div className="dashboard_header_profile_photo cursor pointer" >
                                {
                                    !user?.photoURL ? (
                                        <>

                                            <a href={`/p/${user?.username}`}>
                                                <img
                                                    src='https://marketplace.canva.com/EAFEits4-uw/1/0/1600w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-oEqs2yqaL8s.jpg'
                                                    alt="profile" loading='lazy' />
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <a href={`/p/${user?.username}`}>
                                                <img src={`${user?.photoURL}`} alt="profile" loading='lazy' />
                                            </a>

                                        </>

                                    )
                                }
                            </div>
                            {/* </Link> */}


                        </div>
                        <h5 className='capitalize text-xl font-semibold'>{authUser?.displayName}</h5>
                        {
                            openMenu ? (
                                <button
                                    id="dashboard_header_button"
                                    onClick={() => toggleClose()}>
                                    <span className="material-icons-sharp">menu </span>
                                </button>
                            )
                                :
                                (
                                    <button id="dashboard_header_button" onClick={() => toggleOpen()}>
                                        <span className="material-icons-sharp">menu </span>
                                    </button>
                                )
                        }


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
    setOpenMenu: PropTypes.func,
    openMenu: PropTypes.bool,
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func,
}