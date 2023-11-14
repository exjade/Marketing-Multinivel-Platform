import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/user'
import { firebase } from '../lib/firebase'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
const firestore = getFirestore(firebase)

export default function useReinvestments() {
    const [reinvestments, setReinvestment] = useState([])
    const { user } = useContext(UserContext)

    useEffect(() => {

        async function getReinvestments() {
            let w = []
            const querySnapshot = await getDocs(collection(firestore, 'Reinvestment'));
            querySnapshot.forEach((doc) => {
                w.push(
                    {
                        ...doc.data(),
                        docId: doc.id
                    }
                )
            });
            setReinvestment(w)
        }
        if (reinvestments) {
            getReinvestments()
        }
        return () => {
            setReinvestment([])
        }
    }, [user])

    return { reinvestments }
}