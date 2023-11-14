import React from 'react'
import Header from '../../components/header/artificial/header'
import ReferralDashboard from '../../components/referral/artificial'
import useUser from '../../hooks/use-user'

const ReferralProgram = () => {
    const { user } = useUser()

    return (
        <>
            <Header />
            {/* <div className='w-full h-screen'> */}
            <ReferralDashboard user={user} />
            {/* </div> */}
        </>
    )
}

export default ReferralProgram