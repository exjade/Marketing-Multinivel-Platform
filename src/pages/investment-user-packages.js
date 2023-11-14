import { useState, useEffect } from 'react'
import InvestmentUserPackagesTimeline from '../components/investment-user-packages'
import useUser from '../hooks/use-user'
import useMenu from '../hooks/use-menu'


const InvestmentUserPackages = () => {

  useEffect(() => { document.title = 'Investments - Artificial'}, [])

  const { user, user: { username, photoURL } } = useUser()
  const { openMenu, toggleOpen, toggleClose } = useMenu()
  //eslint-disable-next-line no-unused-vars
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const handleOpen = () => setIsOpen(true)

  return (
    <>
      <InvestmentUserPackagesTimeline
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

export default InvestmentUserPackages