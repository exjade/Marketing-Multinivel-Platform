import { useState } from 'react'
import ReferralListTimeline from '../components/referralList/referral-list'
import useUser from '../hooks/use-user'
import useMenu from '../hooks/use-menu'


const ReferralList = () => {

    const { user, user: { username, photoURL } } = useUser()
    const { openMenu, toggleOpen, toggleClose } = useMenu()
    //eslint-disable-next-line no-unused-vars
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => setIsOpen(true)

    return (
        <>
            <ReferralListTimeline
                user={user}
                username={username}
                photoURL={photoURL}
                openMenu={openMenu}
                toggleOpen={toggleOpen}
                toggleClose={toggleClose}
                setIsOpen={setIsOpen}
                handleOpen={handleOpen}
                isOpen={isOpen}
            />
        </>
    )
}

export default ReferralList