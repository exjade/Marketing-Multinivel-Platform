import { useState, useEffect, useContext, useMemo } from 'react'
import UserContext from '../context/user'
import { firebase } from '../lib/firebase'
import {
    getFirestore,
    collection,
    getDocs,
} from 'firebase/firestore'
const firestore = getFirestore(firebase)

export default function useGetUnilevelBalance() {
    const { user: { uid: currentUserUID } } = useContext(UserContext)

    const [unilevelDocs, setUnilevelDocs] = useState([])

    async function getUnilevelDoc() {
        const docs = []
        const querySnap = await getDocs(collection(firestore, 'nodes-unilevel', 'unilevel', currentUserUID));
        querySnap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            docs.push({
                ...doc.data(),
                id: doc.id
            })
        });
        setUnilevelDocs(docs)
    }

    useEffect(() => {
        getUnilevelDoc()
    }, [])

    const memoizedUnilevelDocs = useMemo(() => unilevelDocs, [unilevelDocs]);

    return { unilevelDocs: memoizedUnilevelDocs }
}