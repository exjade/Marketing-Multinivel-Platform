import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Header from '../../../header/header-referrals'
import ReferralLink from './referral-link'
import ReferralUsers from './referral-users'
import ReferralLoader from './referral-loader'
import Menu from '../../../header/menu'

const DashboardReferralHistory = ({
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
    // LOADER
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])
    const handleLoader = () => { return <ReferralLoader /> }

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
            <div className='w-full h-1/3'>
                <ReferralLink
                    user={user}
                />
            </div>

            <div className='w-full h-2/3 '>
                {
                    isLoading ? handleLoader() : <ReferralUsers  user={user} />
                }
            </div>
        </>
    )
}

export default DashboardReferralHistory

DashboardReferralHistory.propTypes = {
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