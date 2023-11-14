import React from 'react';
import styles from './table.module.css';
import useAdminDeposits from '../../../../hooks/use-adminDeposits';
import { formatRelative } from 'date-fns'
const LatestTransactions = () => {

    const { deposits } = useAdminDeposits()

    const filterTransactions = deposits?.filter(t => t.status !== 'NEW')
    const sortByDate = filterTransactions.sort((a, b) => b.date - a.date);

    return (
        <div className={`${styles.LatestTransactionsContainer}`} >
            <div className={`${styles.LatestTransactionsWrapper}`} >
                <div className={`${styles.LatestTransactionsTitle}`} >
                    <p className='text-white-normal'>Latest Transactions</p>
                </div>
                {/* <div className={`${styles.LatestTransactionsTable}`} > */}
                <div className={styles.tablaDatosContainer} >
                    <table className={styles.tabladatos} >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Member</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filterTransactions?.length > 0 ?
                                    (
                                        sortByDate?.splice(0, 4)?.map((item) => (
                                            <tr key={item.id} className={styles.tr}>
                                                <td>{item.id.slice(0, 5)}...</td>
                                                <td>****{item.username.slice(5, 7)}</td>
                                                <td>
                                                    {formatRelative(item.date, new Date(), { addSuffix: true })}
                                                </td>
                                                <td>
                                                    {
                                                        parseFloat(item.amount).toLocaleString('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD',
                                                        })
                                                    }
                                                </td>
                                                {
                                                    item.status === 'NEW' ?
                                                        (<td >Pending</td>)
                                                        :
                                                        (<td>Completed</td>)
                                                }

                                            </tr>
                                        ))
                                    ) :
                                    (
                                        <>
                                            <tr className={styles.tr}>
                                                <td className={`${styles.loaderdots} animate-pulse`}>
                                                    <span className={`${styles.loaderdot} `}></span>
                                                    <span className={`${styles.loaderdot} `}></span>
                                                    <span className={`${styles.loaderdot} `}></span>
                                                </td>
                                                <td className={`${styles.loaderdots} animate-pulse`}>
                                                    <span className={`${styles.loaderdot} `}></span>
                                                    <span className={`${styles.loaderdot} `}></span>
                                                    <span className={`${styles.loaderdot} `}></span>
                                                </td>
                                                <td className={`${styles.loaderdots} animate-pulse`}>
                                                    <span className={`${styles.loaderdot} `}></span>
                                                    <span className={`${styles.loaderdot} `}></span>
                                                    <span className={`${styles.loaderdot} `}></span>
                                                </td>
                                                <td className={`${styles.loaderdots} animate-pulse`}>
                                                    <span className={`${styles.loaderdot} `}></span>
                                                    <span className={`${styles.loaderdot} `}></span>
                                                    <span className={`${styles.loaderdot} `}></span>
                                                </td>
                                                <td className={`${styles.loaderdots} animate-pulse`}>
                                                    <span className={`${styles.loaderdot} `}></span>
                                                    <span className={`${styles.loaderdot} `}></span>
                                                    <span className={`${styles.loaderdot} `}></span>
                                                </td>
                                            </tr>
                                        </>

                                    )
                            }

                        </tbody>
                    </table>

                </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default LatestTransactions

LatestTransactions.propTypes = {

}