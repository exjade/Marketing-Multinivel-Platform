import { useState, useEffect } from 'react';
// import useUser from './use-user';
import { firebase } from '../lib/firebase'
import { getFirestore, getDocs, collection, query, orderBy} from 'firebase/firestore';
const firestore = getFirestore(firebase);

export default function useInvestments() {
    const [investmentsUsers, setInvestmentsUsers] = useState(null);

    useEffect(() => {
        async function getInvestments() {

            const q = query(collection(firestore, 'payments'), orderBy('date', 'asc'));
            const querySnapshop = await getDocs(q);
            let docs = []
            querySnapshop.forEach(doc => {
                docs.push({
                    docId: doc.id,
                    ...doc.data()
                })
            })
            setInvestmentsUsers(docs);

        }
        getInvestments()
    }, []);
    return { investmentsUsers };
}