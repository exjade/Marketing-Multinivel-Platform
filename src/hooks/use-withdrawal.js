import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/user'
import { firebase } from '../lib/firebase'
import { getFirestore, query, collection, getDocs } from 'firebase/firestore'
const firestore = getFirestore(firebase)

export default function useWithdrawal() {
    const [withdrawal, setWithdrawal] = useState(null)
    const { user } = useContext(UserContext)

    useEffect(() => {

        async function getWithdrawals() {
            const q = query(collection(firestore, 'Withdrawals'));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setWithdrawal(
                    {
                        ...doc.data(),
                        docId: doc.id
                    }
                )
            });
        }
        getWithdrawals()
    }, [user])

    return { withdrawal }
}