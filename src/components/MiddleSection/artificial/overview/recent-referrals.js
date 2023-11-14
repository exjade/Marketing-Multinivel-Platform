import React from 'react'
import styles from '../styles/overview.module.css'
// import useTheme from '../../../../hooks/use-theme'
import useUsers from '../../../../hooks/use-users'
import useUser from '../../../../hooks/use-user'
import { formatRelative } from 'date-fns'
import RecentReferralsLoader from './loader/recent-referrals-loader'

const RecentReferrals = () => {
  const { user: currentUser } = useUser()
  const { users } = useUsers()

  const usersReferredByMe = users?.filter(user => user?.referral?.referrerBy === currentUser?.referral?.referralCode)


  return (
    <section
      className={`${styles.contenedor} mt-2 font-Biryani my-10`}>
      <div className={`${styles.wrapper}`}>
        <div className='flex flex-col justify-center items-start gap-2'>
          <h3 className={`font-semibold text-xl text-white-normal`}>Direct Network</h3>
        </div>
        <>

          {
            usersReferredByMe?.length > 0 ?
              (
                <>
                  {
                    usersReferredByMe?.splice(0, 3)?.map((user, k) => (
                      < div
                        className={`${styles.middleSectionReferrals} flex flex-row justify-between items-center w-full rounded-xs px-10 py-8`}
                        key={k} >
                        <div className={`${styles.referralsMobile} flex flex-row  gap-5 items-center  `} >
                          <img
                            src={`${user?.photoURL === '' || user?.photoURL !== null ?
                              'https://www.eventfulnigeria.com/wp-content/uploads/2021/04/Avatar-PNG-Free-Download.png' : `${user?.photoURL}`
                              }`}
                            alt="referral"
                            className='w-10 h-10 object rounded-full'
                          />

                          <p className='text-white-primary'>Direct Member</p>

                          <p className={` capitalize text-white-primary`}>
                            {user?.fullName}
                          </p>

                          <p className={` capitalize text-white-primary`}>
                            {formatRelative(user?.created, new Date(), { addSuffix: true })}
                          </p>

                          <span className='flex flex-col gap-2 items-center justify-between'>
                            <>
                              <p className={`text-white-primary text-lg capitalize`} >
                                {parseFloat(`${user?.Applied}`).toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD'
                                })}
                              </p>
                            </>
                          </span>

                          <p className={` capitalize text-white-primary`}>
                            {
                              user?.Applied > 0 ? 'Completed' : 'Pending'
                            }
                          </p>
                        </div>
                      </div>
                    ))
                  }
                </>
              )
              :
              (
                <RecentReferralsLoader />
              )
          }

        </>
      </div>
    </section >
  )
}

export default RecentReferrals