import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/user'
import { firebase } from '../lib/firebase'
import {
    getFirestore,
    collection,
    query,
    where,
    onSnapshot,
} from 'firebase/firestore'
const firestore = getFirestore(firebase)

export default function useBonus() {
    const { user: { uid: currentUserUID } } = useContext(UserContext)

    const [bonusDocs, setBonusDocs] = useState(null)

    useEffect(() => {

        const q = query(collection(firestore, 'bonus-user'), where('uid', '==', currentUserUID));

        const unsuscribe = onSnapshot(q, (querySnapshot) => {

            const currencies = [];
            querySnapshot.forEach(doc => {
                currencies.push({
                    ...doc.data(),
                    id: doc.id
                })
            })
            setBonusDocs(currencies)
        })
        return () => unsuscribe()
    }, [])

    return { bonusDocs }
}