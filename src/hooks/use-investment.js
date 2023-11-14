import { useState, useEffect } from 'react';
import { getInvestments } from '../services/firebase'
import useUser from './use-user';

export default function useInvestment() {
    const { user } = useUser();
    const [invest, setInvest] = useState(null);

    useEffect(() => {
        async function getInvest() {
            const [response] = await getInvestments(user.userId)
            setInvest(response)
        }

        if (user.userId) {
            getInvest()
        }
    }, [user]);


    return { invest };
}