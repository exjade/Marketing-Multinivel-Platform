import React from 'react'
import PropTypes from 'prop-types'
import useUsers from '../../hooks/use-users'
import useUser from '../../hooks/use-user'
import * as ROUTES from '../../constants/routes'
import { useTranslation } from 'react-i18next'

const ReferralUserList = ({ setReferralSearch, referralSearch }) => {
    const { t } = useTranslation()
    const { users } = useUsers()
    const { user: currentUser } = useUser()
    const usersReferredByMe = users?.filter(user => user?.referral?.referrerBy === currentUser?.referral?.referralCode)

    //eslint-disable-next-line no-unused-vars
    const orderByDate = users?.sort((a, b) => {
        return new Date(b?.referral?.joinDate) - new Date(a?.referral?.joinDate)
    })

    const filteredTransactions = usersReferredByMe?.filter(search =>
        search?.username?.toLowerCase().includes(referralSearch.toLowerCase()) ||
        search?.fullName?.toLowerCase().includes(referralSearch.toLowerCase())
    )

    return (
        <>

            <div className='bg-black-normal mx-auto w-full h-screen'>
                <div className='flex flex-col justify-between items-center gap-20'>

                    <span className='flex flex-col items-center gap-5 justify-center'>
                        <h1 className='text-3xl font-bold text-white-primary uppercase mt-10'>{t('Referral_List')},</h1>
                        <a href={ROUTES.DASHBOARD} className='text-normal font-bold text-red-logo uppercase mt-10' > - {t('Go_back_to_Dashboard')}</a>
                    </span>

                    <div className="relative text-gray-600 flex justify-center items-center w-full">
                        <input type="search" name="serch" placeholder={t('Search_User')} className="bg-black-background text-center text-white-normal h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-1/2 xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-11/12 "
                            onChange={e => {
                                setReferralSearch(e.target.value)
                            }}
                        />
                    </div>
                    {
                        filteredTransactions?.length > 0 ? (
                            <>
                                <table className='table p-4 shadow rounded-lg w-full'>
                                    <thead className='bg-white-primary'>
                                        <tr>
                                            <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                                                #
                                            </th>
                                            <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                                                {t('Full_Name')}
                                            </th>
                                            <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                                                {t('Username')}
                                            </th>
                                        </tr>
                                    </thead>
                                    {filteredTransactions.map((user, k) => (
                                        <tbody key={k} className='w-full text-center overflow-scroll'>
                                            <tr className='text-gray-700'>
                                                <td className='border p-4 dark:border-gray-info capitalize text-white-normal'>
                                                    {k + 1}
                                                </td>
                                                <td className='border p-4 dark:border-gray-info capitalize text-white-normal'>
                                                    {user?.fullName}
                                                </td>
                                                <td className='border p-4 dark:border-gray-info   capitalize text-white-normal'>
                                                    {user?.username}
                                                </td>
                                            </tr>

                                        </tbody>
                                    ))}
                                </table>
                            </>
                        ) : (
                            <>
                                <table className='table p-4 shadow rounded-lg w-full'>
                                    <thead className='bg-white-primary'>
                                        <tr>
                                            <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                                                {t('No users found')}
                                            </th>
                                        </tr>
                                    </thead>

                                </table>
                            </>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default ReferralUserList

ReferralUserList.propTypes = {
    referralSearch: PropTypes.string,
    setReferralSearch: PropTypes.func,
} 