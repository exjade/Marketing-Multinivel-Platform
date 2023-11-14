import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { formatRelative } from 'date-fns'
import styles from '../styles/user-profile.module.css'
import ReferralsPagination from './referrals-pagination'

const RecentReferrals = ({
   filteredTransactions, 
   setSearchUser,
    usersReferredByMe,
    currentPosts,
    prevHandler,
    nextHandler,
    currentPage
   }) => {

  //Ordenamos por fecha
  const orderBy = filteredTransactions?.sort((a, b) => {//eslint-disable-line
    return new Date(b?.referral?.joinDate) - new Date(a?.referral?.joinDate)
  })

  return (
    <section className={`${styles.contenedor} my-10`} >
      <div className={`${styles.referralwrapper}`}>
        <div className='flex flex-row w-full items-center justify-around gap-2'>
          <span className='flex flex-col gap-2 w-6/12'>
            <h3 className='font-medium text-2xl text-black-normal'>Recent referrals</h3>
            <p className='italic font-light text-lg'>{`You invited ${usersReferredByMe?.length} user until now. `}</p>
          </span>
          <div className="relative text-gray-info flex justify-center sm:justify-end items-center w-6/12">
            <input type="search" name="serch" placeholder='seach user' className="bg-black-background text-center text-white-normal h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-11/12 xl:w-11/12 lg:w-11/12 md:w-11/12 sm:w-11/12 "
              onChange={e => {
                setSearchUser(e.target.value.toLowerCase())
              }}
            />
          </div>
        </div>

        {
          currentPosts?.length > 0 ? (
            <>
              {currentPosts?.map((user, k) => (
                <Fragment key={k}>
                  <div className={`${styles.wrap} flex flex-row justify-between items-center w-full rounded-md px-10 py-10 hover:cursor-pointer bg-white-normal`}>
                    <div className='text-white-normal flex flex-row gap-5'>
                      <img
                        src={`${user?.photoURL === '' || user?.photoURL !== null ?
                        'https://www.eventfulnigeria.com/wp-content/uploads/2021/04/Avatar-PNG-Free-Download.png' : `${user?.photoURL}`
                          }`}
                        alt="referral"
                        className='w-10 h-10 object rounded-full'
                      />
                      <span className='flex flex-col justify-center items-start'>
                        <h3 className={`font-medium text-black-normal text-xl capitalize`}>
                          {user?.fullName}
                        </h3>
                        <p>{user?.emailAddress}</p>
                      </span>
                    </div>
                    <div className='flex flex-col gap-2'>
                      <span className='flex flex-col gap-2 items-center justify-between'>
                        {
                          user?.rol === 'sponsored' ? (
                            <>
                              <p className={`text-gray-info font-medium  text-lg sm:text-2xl`} >
                                {parseFloat(`${user?.Applied}`).toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD'
                                })}
                              </p>
                            </>
                          )
                            :
                            (
                              <>
                                <p className={`text-green-radored font-medium  text-lg sm:text-2xl`} >
                                  +{parseFloat(`${user?.Applied}`).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                  })}
                                </p>
                              </>
                            )
                        }
                        <p className='inline lg:hidden'>Investment</p>
                      </span>
                      <span className='flex flex-col gap-2 items-center justify-between'>
                        <p className='font-poppins-500 font-medium text-lg '>
                          {formatRelative(user?.created, new Date(), { addSuffix: true })}
                        </p>
                        <p className='inline lg:hidden'>Join date</p>
                      </span>

                    </div>
                  </div>
                </Fragment>
              ))}
            </>
          ) :
            (
              <>
                <table className='table p-4 shadow rounded-lg w-full'>
                  <thead className='bg-white-primary'>
                    <tr>
                      <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                        No users found
                      </th>
                    </tr>
                  </thead>

                </table>
              </>
            )
        }
        {/* PAGINATION */}
        <div className='w-full flex justify-center items-center my-4'>
          <ReferralsPagination
            currentPage={currentPage}
            prevHandler={prevHandler}
            nextHandler={nextHandler}
          />
        </div>
      </div >
    </section >
  )
}

export default RecentReferrals

RecentReferrals.propTypes = {
  currentUser: PropTypes.object,
  setSearchUser: PropTypes.func,
  filteredTransactions: PropTypes.array,
  usersReferredByMe: PropTypes.array,
  users: PropTypes.array,
  currentPosts:  PropTypes.any,
  prevHandler:  PropTypes.func,
  nextHandler:  PropTypes.func,
  currentPage:PropTypes.number,
}