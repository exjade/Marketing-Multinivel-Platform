import { useState } from 'react'
import useWithdrawals from '../../../hooks/use-withdrawals'
import WithdrawalsList from './withdrawals-list'
import styles from '../../../styles/modules/withdrawal-dashboard/w-dashboard.module.css';
import WithdrawalPagination from './withdrawal-pagination'

const WithdrawalDashboard = () => {

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostPerPage] = useState(4) //eslint-disable-line

    const { withdrawals } = useWithdrawals()
    const statusDeposited = withdrawals?.filter((withdrawal) => withdrawal?.WithdrawalStatus === 'Deposited')

    const orderBy = statusDeposited?.sort((a, b) => {
        return b.WithdrawalDate - a.WithdrawalDate
    })

    const lastPostIndex = currentPage * postsPerPage; // 1 * 10 = 10
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = orderBy?.slice(firstPostIndex, lastPostIndex); // 0, 10

    return (
        <>
            <ul className='coinlist list-group overflow-hidden mt-10'>
                <div className="container mx-auto sm:w-10/12 w-full md:w-full xl:w-full">
                    <div className='w-full h-full'>
                        <div className="-mx-4 px-4 sm:px-8 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-5 py-5 font-semibold bg-white-normal border-1 border-b border-gray-info text-black-normal  text-left text-sm uppercase ">
                                                Username
                                            </th>
                                            <th scope="col" className="px-5 py-5 font-semibold bg-white-normal border-1 border-b border-gray-info text-black-normal  text-left text-sm uppercase flex justify-center items-center">
                                                Currency
                                            </th>
                                            <th scope="col" className={`${styles.hiddenMobile} ${styles.hiddenMobileFold} px-5 py-5 font-semibold bg-white-normal border-1 border-b border-gray-info text-black-normal  text-left text-sm uppercase`}>
                                                Wallet
                                            </th>
                                            <th scope="col" className={`${styles.hiddenMobileFold} px-5 py-5 font-semibold bg-white-normal border-1 border-b border-gray-info text-black-normal  text-left text-sm uppercase`}>
                                                Status
                                            </th>
                                            <th scope="col" className="px-5 py-5 font-semibold bg-white-normal border-1 border-b border-gray-info text-black-normal  text-left text-sm uppercase ">
                                                Amount
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody >
                                        {currentPosts?.map(withdrawal => {
                                            return (
                                                <WithdrawalsList
                                                    key={withdrawal.id}
                                                    withdrawal={withdrawal}

                                                />
                                            )
                                        })}

                                    </tbody>
                                </table>
                                <div className='flex flex-row justify-center items-center bg-white-normal py-2 '>
                                    <WithdrawalPagination
                                        totalPosts={orderBy?.length}
                                        postsPerPage={postsPerPage}
                                        setCurrentPage={setCurrentPage}
                                        currentPage={currentPage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </>
    )
}

export default WithdrawalDashboard