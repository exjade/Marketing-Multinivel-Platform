import { useState } from 'react'
import PropTypes from 'prop-types'
import Header from '../header/header-second'
import Menu from '../header/menu'
import ReferralUserList from './referral-userList'
import useTheme from '../../hooks/use-theme'
//styles
import '../../styles/sidebar/sidebar.css'

const ReferralListTimeline = ({
    user,
    username,
    photoURL,
    openMenu,
    toggleOpen,
    toggleClose,
    setIsOpen,
    handleOpen,
}) => {

    const { theme, setTheme } = useTheme()
    const [referralSearch, setReferralSearch] = useState('');

    return (
        <>
            <Header
                user={user}
                username={username}
                photoURL={photoURL}
                openMenu={openMenu}
                toggleOpen={toggleOpen}
                toggleClose={toggleClose}
                theme={theme}
                setTheme={setTheme}
                setIsOpen={setIsOpen}
                handleOpen={handleOpen}
            />

            {
                openMenu && (
                    <Menu
                        toggleClose={toggleClose}
                    />
                )
            }
            <ReferralUserList
                setReferralSearch={setReferralSearch}
                referralSearch={referralSearch}
            />
        </>

    )
}

export default ReferralListTimeline

ReferralListTimeline.propTypes = {
    setSearch: PropTypes.func,
    handleOpen: PropTypes.func,
    toggleOpen: PropTypes.func,
    toggleClose: PropTypes.func,
    openMenu: PropTypes.bool,
    setIsOpen: PropTypes.func,
    user: PropTypes.object,
    username: PropTypes.string,
    photoURL: PropTypes.string,
    isOpen: PropTypes.bool
}