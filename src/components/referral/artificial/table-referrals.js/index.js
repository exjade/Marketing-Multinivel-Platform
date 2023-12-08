import React from 'react';
import PropTypes from 'prop-types'
import styles from '../styles/table-referrals.module.css';
import {
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const TableReferrals = ({
  setSearchUser,
  filterSearchbar,
}) => {

  return (

    <div className={`${styles.container} font-roboto `} >
      <div className={`${styles.wrapper} container`} >
        {/* CONTACTS / TOTAL USERS / SORT USERS / SEARCH USERS */}
        <div className={`${styles.Header}`} >
          <div className={`${styles.Headerleft}`}>
            <span className={`${styles.contacts}`}>
              <h1 className={`text-artificial-theme-green-primary text-2xl font-medium`} >
                Contacts
              </h1>
              <p className={`text-artificial-theme-gray-secondary text-2xl font-extralight hidden sm:inline`} >
                {filterSearchbar?.length}
              </p>
            </span>
            {/* <div className={`${styles.Sort}`} >
              <p className={`text-artificial-theme-gray-secondary text-md font-extralight hidden md:inline`} >
                Sort by:
              </p>
              <p className={`text-artificial-theme-white-secondary  text-sm font-extralight hidden md:inline`}>
                Date Created
              </p>
            </div> */}

          </div>
          <div className={`${styles.Headerright}`}>
            <div className={`${styles.SearchBar}`}>
              <input
                type="search"
                placeholder='Seach an user'
                className={`${styles.input}`}
                onChange={e => setSearchUser(e.target.value)}
              />
              <MagnifyingGlassIcon className='w-8 h-8 ' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableReferrals

TableReferrals.propTypes = {
  setSearchUser: PropTypes.func,
  filterSearchbar: PropTypes.array,
}