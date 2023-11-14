import React from 'react'
import { useTranslation } from 'react-i18next'
import useUsers from '../../../hooks/use-users'

const AdminEarnings = () => {



    const { t } = useTranslation()
    const { users } = useUsers()
    const filterApplied = users?.filter(user => user.Applied > 0)
    const filterInactive = users?.filter(user => user.Applied < 1)

    // sum applied 
    const investments = filterApplied?.map(user => user.Applied)
    const sumInvestments = investments?.reduce((a, b) => a + b, 0)

    // sum Balance
    const balance = filterApplied?.map(user => user.Balance)
    const sumBalance = balance?.reduce((a, b) => a + b, 0)

    //sum Profit
    const profit = filterApplied?.map(user => user.Profit)
    const profitNumbers = profit?.filter(number => number === number)
    const sumProfit = profitNumbers?.reduce((a, b) => a + b, 0)

    //sum withdrawals
    const withdrawals = filterApplied?.map(user => user.Withdrawal)
    const sumWithdrawals = withdrawals?.reduce((a, b) => a + b, 0)

    //ADMIN
    const filterAdmings = users?.filter(user => user.rol === 'admin')

    // filter users with rol === sponsored
    const filterSponsored = users?.filter(user => user.rol === 'sponsored')
    // sum sponsored Balance
    const sponsoredBalance = filterSponsored?.map(user => user.Balance)
    const sumSponsoredBalance = sponsoredBalance?.reduce((a, b) => a + b, 0)
    // sum sponsored Applied
    const sponsoredApplied = filterSponsored?.map(user => user.Applied)
    //eslint-disable-next-line
    const sumSponsoredApplied = sponsoredApplied?.reduce((a, b) => a + b, 0)

    //NOT sum sponsored Applied
    const filterNotSponsored = users?.filter(user => user.rol !== 'sponsored')
    const notSponsoredApplied = filterNotSponsored?.map(user => user.Applied)
    const notSumSponsoredApplied = notSponsoredApplied?.reduce((a, b) => a + b, 0)
    //  Investments less sponsored Balance
    //eslint-disable-next-line
    const platformEarnings = notSumSponsoredApplied - sumInvestments;

    //sum of withdrawals (sponsored)
    const withdrawals2 = filterNotSponsored?.map(user => user.Withdrawal)
    const SumSponsoredWithdrawal = withdrawals2?.reduce((a, b) => a + b, 0)


    // COLOMBIA AND MEXICO

    const mexicoUsers = filterApplied?.filter(mexico => mexico?.profile?.location === 'México')
    const colombiaUsers = filterApplied?.filter(colombia => colombia?.profile?.location === 'Colombia')

    const mexicoMap = mexicoUsers?.map(arr => arr?.Applied)
    const mexicoSum = mexicoMap?.reduce((a, b) => a + b, 0);

    const colombiaMap = colombiaUsers?.map(arr => arr?.Applied)
    const colombiaSum = colombiaMap?.reduce((a, b) => a + b, 0);


    const usersNotInColombiaOrMexico = filterApplied?.filter(country => country?.profile?.location !== 'México' && country?.profile?.location !== 'Colombia')

    const notMexicoOrColombia = usersNotInColombiaOrMexico?.map(arr => arr?.Applied)
    const notMexicoOrColombiaSum = notMexicoOrColombia?.reduce((a, b) => a + b, 0);


    return (
        <>
            <span className='flex justify-center items-center text-center w-full my-10 font-semibold uppercase'>
                <h2>{t('Company earnings')}</h2>
            </span>
            <section className='grid grid-cols-2  gap-5 '>
                {/*Inactive investments */}
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-info rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('System Investments')}</p>

                    <p className='inline-flex items-end mt-1 text-green-radored'>
                        <span className={`text-2xl font-medium leading-none`} >
                            {`${parseFloat(sumInvestments).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}
                        </span>
                    </p>
                </article>
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-info rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Inactive Investments')}</p>

                    <p className='inline-flex items-end mt-1'>
                        <span className={`text-2xl font-medium leading-none`} >
                            {filterInactive?.length}
                        </span>
                    </p>
                </article>
                {/* Active investments */}
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-info rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Active Investments')}</p>

                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none text-green-success'>{filterApplied?.length}</span>
                    </p>
                </article>
                {/* Registered Users */}
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-info rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Registered users')}</p>

                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none'>{users?.length}</span>
                    </p>
                </article>
                {/* Admins */}
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-info rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Registered Admins')}</p>

                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none'>{filterAdmings?.length}</span>
                    </p>
                </article>

                {/* Daily Investors Balance */}
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-100 rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Daily investors expected Balance')}</p>
                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none text-red-logo'>
                            {`${parseFloat(sumInvestments * 4 / 100).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}
                        </span>
                    </p>
                </article>
                {/* Weekly Investors Balance */}
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-100 rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Weekly investors expected Balance')}</p>
                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none text-red-logo'>
                            {`${parseFloat(sumInvestments * 20 / 100).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}
                        </span>
                    </p>
                </article>
                {/* Daily Investors Profit */}
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-100 rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Daily investors expected Profit')}</p>
                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none text-red-logo'>
                            {`${parseFloat(sumProfit * 4 / 100).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}
                        </span>
                    </p>
                </article>
                {/* Weekly Investors Profit */}
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-100 rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Weekly investors expected Profit')}</p>
                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none text-red-logo'>
                            {`${parseFloat((sumProfit * 4 / 100) * 5).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}
                        </span>
                    </p>
                </article>


                {/* Daily Investors Withdrawals */}
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-100 rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Daily Investors Pending Withdrawals')}</p>
                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none text-red-logo'>
                            {`${parseFloat(sumWithdrawals).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}
                        </span>
                    </p>
                </article>
                {/* Weekly Investors Withdrawals */}
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-100 rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Weekly Investors Pending Withdrawals')}</p>
                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none text-red-logo'>
                            {`${parseFloat(sumWithdrawals * 7).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}
                        </span>
                    </p>
                </article>
                {/* Weekly Sponsored Withdrawal */}
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-100 rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Weekly Sponsored Pending Withdrawals')}</p>
                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none text-button-primary'>
                            {`${parseFloat(SumSponsoredWithdrawal * 7).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}
                        </span>
                    </p>
                </article>
                {/* Sponsored Balance */}
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-100 rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Total Sponsored Balance')}</p>
                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none text-button-primary'>
                            {`$${parseInt(sumSponsoredBalance)}`}
                        </span>
                    </p>
                </article>

            </section >
            <span className='flex justify-center items-center text-center w-full my-10 font-semibold uppercase'>
                <h2>{t('Colombia and México')}</h2>
            </span>
            <section className='grid grid-cols-2  gap-5 '>
                {/* MEXICO & COLOMBIA USERS */}
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-100 rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Total México Users')}</p>
                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none text-black-normal'>
                            {mexicoUsers?.length}
                        </span>
                    </p>
                </article>
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-100 rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Total Colombia Users')}</p>
                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none text-black-normal'>
                            {colombiaUsers?.length}
                        </span>
                    </p>
                </article>
                {/* MEXICO & COLOMBIA APPLIED */}
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-100 rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Total México Investment')}</p>
                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none text-black-normal'>
                            {`${parseFloat(mexicoSum).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}
                        </span>
                    </p>
                </article>
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-100 rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Total Colombia Investment')}</p>
                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none text-black-normal'>
                            {`${parseFloat(colombiaSum).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}
                        </span>
                    </p>
                </article>
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-100 rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Total inversión sin categorizar')}</p>
                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none text-black-normal'>
                            {usersNotInColombiaOrMexico?.length}
                        </span>
                    </p>
                </article>
                <article className='relative px-6 pt-12 pb-6 bg-white-normal border border-gray-100 rounded-lg shadow-sm'>
                    <p className='text-sm font-semibold text-gray-info'>{t('Inversiones sin categorizar')}</p>
                    <p className='inline-flex items-end mt-1'>
                        <span className='text-2xl font-medium leading-none text-black-normal'>
                            {`${parseFloat(notMexicoOrColombiaSum).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}
                        </span>
                    </p>
                </article>
            </section>

        </>
    )
}

export default AdminEarnings

