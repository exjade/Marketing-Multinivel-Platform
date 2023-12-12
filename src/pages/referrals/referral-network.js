import React, { useEffect, useState } from 'react'
import Header from '../../components/header/artificial/header';
import TableReferrals from '../../components/referral/artificial/table-referrals.js';
import TableContacts from '../../components/referral/artificial/table-referrals.js/table';
import useUnilevel from '../../hooks/use-unilevel';
import FallBackLoader from '../../components/FallBackLoader';
import useUsers from '../../hooks/use-users';
import useUser from '../../hooks/use-user';

const ReferralNetwork = () => {

    const { docId, referralsLength, getReferredQty } = useUnilevel()
    const { users } = useUsers()
    const { user: currentUser } = useUser()

    const [isLoading, setIsLoading] = useState(true);
    const [searchUser, setSearchUser] = useState('')

    const filterSearchbar = docId?.filter(search =>
        search.username?.toLowerCase().includes(searchUser.toLowerCase())
    )

    const usersReferredByMe = users?.filter(user => user?.referral?.referrerBy === currentUser?.referral?.referralCode)

    useEffect(() => {
        document.title = 'Network - CapitalTradersBusiness'
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }, [])

    const loader = () => { return <FallBackLoader /> };
    if (isLoading) { return loader(); }
    else {
        return (
            <>
                <Header />
                <div className='mt-20'>
                    <TableReferrals
                        setSearchUser={setSearchUser}
                        filterSearchbar={filterSearchbar}
                    />
                    <TableContacts
                        referralsLength={referralsLength}
                        filterSearchbar={filterSearchbar}
                        getReferredQty={getReferredQty}
                        usersReferredByMe={usersReferredByMe}
                    />
                </div>
            </>
        )
    }
}

export default ReferralNetwork