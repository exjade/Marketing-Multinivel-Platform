import { useState } from 'react'
import PropTypes from 'prop-types'
import useUsers from '../../../hooks/use-users'
import styles from '../../..//styles/modules/admin/admindashboard.module.css'
import { useTranslation } from 'react-i18next'

const AdminSponsored = ({ setReferralSearch, referralSearch }) => {
    const { users } = useUsers()
    const { t } = useTranslation()
    const userSponsored = users?.filter(user => user.rol === 'sponsored')

    const usersEarnings = userSponsored?.sort((a, b) => parseFloat(b.Applied) - parseFloat(a.Applied))

    const filteredTransactions = usersEarnings?.filter(search =>
        search.username.toLowerCase().includes(referralSearch.toLowerCase()) ||
        search.userId?.toLowerCase().includes(referralSearch.toLowerCase()) ||
        search.fullName?.toLowerCase().includes(referralSearch.toLowerCase()) ||
        search.wallet?.toLowerCase().includes(referralSearch.toLowerCase()) ||
        search.emailAddress?.toLowerCase().includes(referralSearch.toLowerCase()) ||
        search.rol?.toLowerCase().includes(referralSearch.toLowerCase())
    )

    // Sponsored Stats
    const [displayStats, setDisplayStats] = useState(false)

    const sponsoredApplied = userSponsored?.reduce((a, b) => a + parseFloat(b.Applied), 0).toFixed(2);
    const sponsoredBalance = userSponsored?.reduce((a, b) => a + parseFloat(b.Balance), 0).toFixed(2);
    const sponsoredProfit = userSponsored?.reduce((a, b) => a + parseFloat(b.Profit), 0).toFixed(2);
    return (
        <>
            <div className='bg-black-normal mx-auto w-full h-full overflow-scroll'>
                <div className='flex flex-col justify-between items-center gap-20'>


                    <span className='flex flex-col items-center gap-10 justify-center'>
                        <h1 className='text-3xl font-bold text-white-primary uppercase mt-10'>{t('Sponsored List')}</h1>

                        {
                            !displayStats ? (
                                <button
                                    className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md active:transform active:scale-95'
                                    onClick={() => setDisplayStats(true)}
                                >
                                    Show sponsored stats
                                </button>
                            ) : (
                                <button
                                    className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md active:transform active:scale-95'
                                    onClick={() => setDisplayStats(false)}
                                >
                                    Hide sponsored stats
                                </button>
                            )
                        }
                    </span>


                    {/* SPONSORED STATS */}

                    {
                        displayStats && (
                            <div className='grid grid-cols-2 sm:grid-cols-4 w-10/12 gap-5'>
                                <div className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md'>
                                    <p className='text-md sm:text-lg font-normal text-center text-gray-adminParagraph capitalize'>{t('Users')}</p>
                                    <p className='text-2xl sm:text-[2em] font-extrabold text-gray-adminParagraph capitalize'>
                                        {userSponsored?.length}
                                    </p>
                                </div>
                                <div className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md'>
                                    <p className='text-md sm:text-lg font-normal text-center text-gray-adminParagraph capitalize'>{t('Investment')}</p>
                                    <p className='text-2xl sm:text-[2em] font-extrabold text-gray-adminParagraph capitalize'>
                                        {`${parseFloat(sponsoredApplied).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}`}
                                    </p>
                                </div>
                                <div className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md'>
                                    <p className='text-md sm:text-lg font-normal text-center text-gray-adminParagraph capitalize'>{t('Balance')}</p>
                                    <p className='text-2xl sm:text-[2em] font-extrabold text-gray-adminParagraph capitalize'>
                                        {`${parseFloat(sponsoredBalance).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}`}
                                    </p>
                                </div>
                                <div className='flex flex-col justify-center items-center gap-3 w-full bg-white-normal  rounded-xl p-[1em] shadow-gray-border shadow-md'>
                                    <p className='text-md sm:text-lg font-normal text-center text-gray-adminParagraph capitalize'>{t('Profit')}</p>
                                    <p className='text-2xl sm:text-[2em] font-extrabold text-gray-adminParagraph capitalize'>
                                        {`${parseFloat(sponsoredProfit).toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}`}
                                    </p>
                                </div>
                            </div>
                        )
                    }

                    {/* SEACH BAR */}
                    <div className="relative text-gray-600 flex justify-center items-center w-full">
                        <input type="search" name="serch" placeholder={t('Search_User')} className="bg-black-background text-center text-white-normal h-14 px-5 pr-10 rounded-full text-sm focus:outline-none w-10/12  "
                            onChange={e => {
                                setReferralSearch(e.target.value)
                            }}
                        />
                    </div>

                    <table className='table p-4 shadow rounded-lg w-full'>
                        <thead className='bg-white-primary'>
                            <tr>
                                <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                                    #
                                </th>
                                <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                                    {t('Username')}
                                </th>
                                <th className={`${styles.mobileHidden} border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase`} >
                                    {t('User Id')}
                                </th>
                                <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                                    {t('Investment')}
                                </th>
                                <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                                    {t('Balance')}
                                </th>
                                <th className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase'>
                                    {t('Profit')}
                                </th>
                                <th className={`${styles.mobileHidden} border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-black-background uppercase`} >
                                    {t('Email')}
                                </th>
                            </tr>
                        </thead>
                        {filteredTransactions.map((user, k) => (
                            <tbody key={k} className='w-full text-center overflow-scroll'>
                                <tr className='text-gray-700'>
                                    <td className='border p-4 dark:border-gray-info capitalize text-white-normal'>
                                        {k + 1}
                                    </td>
                                    <td className='border p-4 dark:border-gray-info   capitalize text-white-normal'>
                                        {user.username}
                                    </td>
                                    <td className={`${styles.mobileHidden} border p-4 dark:border-gray-info capitalize text-white-normal`} >
                                        {user.userId}
                                    </td>
                                    <td className='border p-4 dark:border-gray-info capitalize text-white-normal'>
                                        {`$${parseInt(user.Applied).toFixed(2)}`}
                                    </td>
                                    <td className='border p-4 dark:border-gray-info capitalize text-white-normal'>
                                        {`$${parseInt(user.Balance).toFixed(2)}`}
                                    </td>
                                    <td className='border p-4 dark:border-gray-info capitalize text-white-normal'>
                                        {`$${parseInt(user.Profit).toFixed(2)}`}
                                    </td>
                                    <td className={`${styles.mobileHidden} border p-4 dark:border-gray-info capitalize text-white-normal`} >
                                        {user.emailAddress}
                                    </td>
                                </tr>

                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </>
    )
}

export default AdminSponsored

AdminSponsored.propTypes = {
    referralSearch: PropTypes.string,
    setReferralSearch: PropTypes.func,
} 