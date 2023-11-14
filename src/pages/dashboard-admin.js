import React from 'react'
import AdminTimeline from '../components/admin/index'
//hooks
import useUser from '../hooks/use-user'

import '../styles/dashboard/header/header.css'

const DashboardAdmin = () => {
  const {  user: { rol } } = useUser()
 
  return (
    <>
      {
        rol === 'admin' || rol === 'owner' && rol !== 'investor' && rol !== 'sponsored' ? (
          <>
            {/* <>
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
            </> */}
            {/* {
              openMenu && (
                <Menu
                  toggleClose={toggleClose}
                />
              )
            } */}
            <AdminTimeline />
          </>

        ) : null
      }

    </>
  )
}

export default DashboardAdmin