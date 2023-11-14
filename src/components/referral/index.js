import React from 'react'
import PropTypes from 'prop-types'
import Header from '../header/header-referrals'
import ReferralSection from './mobile/referral-section/referral-users'
import ReferralBody from './mobile/referral-section/referral-body'
import useUser from '../../hooks/use-user'
import useUsers from '../../hooks/use-users'
import Menu from '../header/menu'

const ReferralTimeline = ({
    user,
    username,
    photoURL,
    openMenu,
    toggleOpen,
    toggleClose,
    setIsOpen,
    handleOpen,
    isLoading,
    setIsLoading,
}) => {

    const { user: activeUser } = useUser()
    const { users } = useUsers()

    return (
        <>
            <Header
                user={user}
                username={username}
                photoURL={photoURL}
                openMenu={openMenu}
                toggleOpen={toggleOpen}
                toggleClose={toggleClose}
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
            <ReferralSection
                user={activeUser}
                users={users}
            />
            <ReferralBody
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                user={activeUser}
            />
        </>
    )
}

export default ReferralTimeline

ReferralTimeline.propTypes = {
    setSearch: PropTypes.func,
    handleOpen: PropTypes.func,
    toggleOpen: PropTypes.func,
    toggleClose: PropTypes.func,
    openMenu: PropTypes.bool,
    setIsOpen: PropTypes.func,
    user: PropTypes.object,
    username: PropTypes.string,
    photoURL: PropTypes.string,
    isOpen: PropTypes.bool,
    isLoading: PropTypes.bool,
    setIsLoading: PropTypes.func,
}