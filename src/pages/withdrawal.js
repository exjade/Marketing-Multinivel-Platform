import { useEffect } from 'react'
import WithdrawalTimeline from '../components/withdrawal'

const Withdrawal = () => {
    useEffect(() => { document.title = 'Payout - Artificial' }, [])
    return (
        <>
        <WithdrawalTimeline />
        </>
    )
}

export default Withdrawal