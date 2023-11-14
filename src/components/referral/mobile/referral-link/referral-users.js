import React from 'react'
import styles from '../css/referral.module.css'
import PropTypes from 'prop-types'
import { formatRelative } from 'date-fns'
import useUsers from '../../../../hooks/use-users'

const ReferralListUsers = ({ user }) => {

    const { users } = useUsers()
    const filteredUsers = users?.filter(u => user?.referral?.userReferrals.includes(u.id))
    const orderBy = filteredUsers?.sort((a, b) => {
        return b.created - a.created
    })

    console.log(filteredUsers)

    return (
        <div className='flex flex-col gap-10 py-10 h-full w-full '>
            {
                orderBy?.map((user, i) => (
                    <div
                        className={`${styles.hover} p-5 grid grid-cols-3 justify-items-center place-content-centerbg-white-normal text-green-header w-full h-full`}
                        key={i}
                    >
                        {
                            user?.photoURL === '' || user?.photoURL === undefined || user?.photoURL === null ?
                                (<>
                                    <img
                                        src='https://www.eventfulnigeria.com/wp-content/uploads/2021/04/Avatar-PNG-Free-Download.png'
                                        alt="avatar"
                                        className='w-24 h-24 rounded-full object-cover'
                                    />
                                </>) :
                                (<>
                                    <img
                                        src={user?.photoURL}
                                        alt="avatar"
                                        className='w-24 h-24 rounded-full object-cover'
                                    />
                                </>)
                        }

                        <div className='flex flex-col justify-center items-center'>
                            <h2 className='text-2xl font-poppins-500 font-medium break-words'>
                                {user?.fullName}
                            </h2>
                            {
                                user?.created === undefined || user?.created === null || user?.created === '' ?
                                    (
                                        <p className='text-sm font-poppins-500 font-normal italic'>
                                            No date
                                        </p>
                                    ) :
                                    (
                                        <p className='text-sm font-poppins-500 font-normal italic'>
                                            {formatRelative(user?.created, new Date(), { addSuffix: true })}
                                        </p>
                                    )
                            }
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                            {user?.rol === 'investor' ? (
                                <>
                                 <h2 className='text-2xl font-poppins-500 font-medium'>
                                {parseFloat(user?.Applied).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </h2>
                                <p className='text-sm font-poppins-500 font-normal italic'>
                                    Investment
                                </p>
                                </>
                            ) :
                            <>
                             <h2 className='text-2xl font-poppins-500 font-medium text-red-warning'>
                                {parseFloat(user?.Applied).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </h2>
                                <p className='text-sm font-poppins-500 font-normal italic text-red-warning'>
                                    Sponsored
                                </p>
                            </>
                            }
                        </div>
                    </div>

                ))
            }

        </div>
    )
}

export default ReferralListUsers

ReferralListUsers.propTypes = {
    users: PropTypes.array,
    user: PropTypes.object
}