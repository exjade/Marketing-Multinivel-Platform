import { useState } from 'react'
import Withdrawal from '../../pages/withdrawal'
import Transaction from '../../pages/transactions'
import PlatformEarningsTimeline from './users/admin-earnings-timeline'
import PlatformEarnings from './earnings/platform-earnings'
import AdminSponsoredUsers from './sponsored'
import * as ROUTES from '../../constants/routes'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AdminWallet from './wallet-withdrawals'

const AdminDashboard = () => {
    const { t } = useTranslation()
    const history = useHistory()
    const [page, setPage] = useState({
        transactions: false,
        walletWithdrawals: false,
        users: false,
        withdrawals: false,
        earnings: false,
        sponsored: false,
    })

    const goDashboard = () => {
        history.push(ROUTES.DASHBOARD)
    }

    return (
        <>
            <div>
                <header className=' flex justify-center items-center w-full overflow-hidden'>
                    <h1 className='font-bold font-2xl text-center cursor-pointer' onClick={() => goDashboard()}>{t('Admin Dashboard')}</h1>
                </header>

                <section className="p-4 bg-black-background text-white-normal overflow-scroll">
                    <div className="container flex justify-between h-16 mx-auto md:justify-center md:space-x-8">
                        <ul className="space-x-3 md:flex flex justify-center items-center">
                            <li className="flex">
                                <button className="flex items-center px-4 font-bold -mb-1 border-b-2 border-transparent"
                                    onClick={() => setPage({
                                        transactions: true,
                                        users: false,
                                        withdrawals: false,
                                        earnings: false,
                                        sponsored: false
                                    })}
                                >{t('Transactions')}</button>
                            </li>
                            <li className="flex">
                                <button className="flex items-center px-4 font-bold -mb-1 border-b-2 border-transparent"
                                    onClick={() => setPage({
                                        transactions: false,
                                        users: false,
                                        withdrawals: true,
                                        earnings: false,
                                        sponsored: false
                                    })}
                                >{t('Withdrawals')}</button>
                            </li>
                            <li className="flex">
                                <button className="flex items-center px-4 font-bold -mb-1 border-b-2 border-transparent"
                                    onClick={() => setPage({
                                        transactions: false,
                                        users: false,
                                        withdrawals: false,
                                        walletWithdrawals: true,
                                        earnings: false,
                                        sponsored: false
                                    })}
                                >{t('Wallet')}</button>
                            </li>
                        </ul>
                        <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
                            <span className="material-symbols-sharp text-red-logo">
                                admin_panel_settings
                            </span>
                        </a>
                        <ul className="space-x-3 md:flex flex justify-center items-center">
                            <li className="flex">
                                <button className="flex items-center px-4 -mb-1 border-b-2 border-transparent font-bold"
                                    onClick={() => setPage({
                                        transactions: false,
                                        users: true,
                                        withdrawals: false,
                                        earnings: false,
                                        sponsored: false
                                    })}
                                >{t('Users')}</button>
                            </li>
                            <li className="flex">
                                <button className="flex items-center px-4 -mb-1 border-b-2 border-transparent font-bold"
                                    onClick={() => setPage({
                                        earnings: true,
                                        transactions: false,
                                        users: false,
                                        withdrawals: false,
                                        sponsored: false
                                    })}
                                >{t('Earning')}</button>
                            </li>
                            <li className="flex">
                                <button className="flex items-center px-4 -mb-1 border-b-2 border-transparent font-bold"
                                    onClick={() => setPage({
                                        sponsored: true,
                                        transactions: false,
                                        users: false,
                                        withdrawals: false,
                                        earnings: false
                                    })}
                                >{t('Sponsored')}</button>
                            </li>
                        </ul>
                    </div>
                </section>

                <section className='overflow-hidden'>
                    {
                        page.transactions && !page.users && !page.withdrawals && !page.earnings && !page.sponsored &&
                        <Transaction />
                    }
                    {
                        page.walletWithdrawals && !page.transactions && !page.users && !page.withdrawals && !page.earnings && !page.sponsored &&
                         <AdminWallet />
                    }
                    {
                        page.users && !page.transactions && !page.withdrawals && !page.earnings && !page.sponsored && (
                            <PlatformEarningsTimeline />
                        )
                    }
                    {
                        page.withdrawals && !page.transactions && !page.users && !page.earnings && !page.sponsored &&
                        <Withdrawal />
                    }
                    {
                        page.earnings && !page.transactions && !page.users && !page.withdrawals && !page.sponsored && (
                            <PlatformEarnings
                            />
                        )
                    }
                    {
                        page.sponsored && !page.transactions && !page.users && !page.withdrawals && !page.earnings && (
                            <AdminSponsoredUsers />
                        )
                    }
                </section>
            </div>
        </>
    )
}

export default AdminDashboard