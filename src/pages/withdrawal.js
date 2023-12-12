import { useEffect } from 'react'
import WithdrawalTimeline from '../components/withdrawal'

const Withdrawal = () => {
    useEffect(() => { document.title = 'Payout | CapitalTradersBusiness' }, [])
    return (
        <>
        <WithdrawalTimeline />
        </>
    )
}

export default Withdrawal