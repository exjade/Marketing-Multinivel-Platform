import React from 'react'
import PropTypes from 'prop-types'
//error boundary
import Error from '../../error/error'
//Hook
// import TableRank from './ranks/table-rank' //eslint-disable-next-line 
//stiles
import '../../styles/sidebar/sidebar.css'
import '../../styles/dashboard/header/header.css'
import styles from '../../styles/sidebar/right-sidebar.module.css'
//components
// import RecentTransactions from './transactions'
import RightProfile from './right-profile'
import RightMycards from './right-mycards'
import useUser from '../../hooks/use-user'
import WalletCard from './wallet-card'


const RightSection = ({ theme }) => {
  const { user } = useUser()
  return (
    <>
      <div className={` sm:px-5 sm:py-4 font-Biryani ${styles.dropshadow} ${theme ? `${styles.darkmain}` : `${styles.main}`}`}>
        <Error>
          <RightProfile
            user={user}
          />
        </Error>
        <Error>
          <RightMycards
            user={user}
          />
        </Error>
        <Error>
          <WalletCard 
           user={user}
          />
        </Error>
      </div>
    </>
  )
}

export default RightSection

RightSection.propTypes = {
  theme: PropTypes.bool,
}