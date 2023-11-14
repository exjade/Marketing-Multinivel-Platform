import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/user'
import { firebase } from '../lib/firebase'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
const firestore = getFirestore(firebase)

export default function useEarningsOverview() {
    const [earnings, setEarnings] = useState([])
    const { user } = useContext(UserContext)

    useEffect(() => {

        async function getWithdrawals() {
            let w = []
            const querySnapshot = await getDocs(collection(firestore, 'earnings-overview'));
            querySnapshot.forEach((doc) => {
                w.push(
                    {
                        ...doc.data(),
                        docId: doc.id
                    }
                )
            });
            setEarnings(w)
        }
        if (earnings) {
            getWithdrawals()
        }
        return () => {
            setEarnings([])
        }
    }, [user])

    return { earnings }
}