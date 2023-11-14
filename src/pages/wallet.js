import { useState, useEffect } from 'react'
import useUser from '../hooks/use-user'
import useMenu from '../hooks/use-menu'
import WalletTimeline from '../components/wallet'


const Wallet = () => {

  useEffect(() => { document.title = 'Artificial - Wallet' }, [])

  const { user } = useUser()
  const { openMenu, toggleOpen, toggleClose } = useMenu()
  //eslint-disable-next-line no-unused-vars
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleOpen = () => setIsOpen(true)

  return (
    <>
      <WalletTimeline
        user={user}
        // username={username}
        // photoURL={photoURL}
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

export default Wallet