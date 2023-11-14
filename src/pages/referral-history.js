import { useState } from 'react'
import useUser from '../hooks/use-user'
import useMenu from '../hooks/use-menu'
import DashboardReferralHistory from '../components/referral/mobile/referral-link'


const ReferralHistory = () => {

  const { user, user: { username, photoURL } } = useUser()
  const { openMenu, toggleOpen, toggleClose } = useMenu()
  //   //eslint-disable-next-line no-unused-vars
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <DashboardReferralHistory
        user={user}
        username={username}
        photoURL={photoURL}
        openMenu={openMenu}
        toggleOpen={toggleOpen}
        toggleClose={toggleClose}
        setIsOpen={setIsOpen}
        handleOpen={handleOpen}
        isOpen={isOpen}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    </>
  )
}

export default ReferralHistory