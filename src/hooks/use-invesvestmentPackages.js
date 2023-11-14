import { useState, useEffect, useContext } from 'react'
import UserContext from '../context/user'
import { firebase } from '../lib/firebase'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
const firestore = getFirestore(firebase)

export default function UseInvestmentPackages() {
    const [investemntPackages, setInvestmentPackages] = useState([])
    const { user } = useContext(UserContext)

    useEffect(() => {

        async function getReinvestments() {
            let w = []
            const querySnapshot = await getDocs(collection(firestore, 'investment-payments'));
            querySnapshot.forEach((doc) => {
                w.push(
                    {
                        ...doc.data(),
                        docId: doc.id
                    }
                )
            });
            setInvestmentPackages(w)
        }
        if (investemntPackages) {
            getReinvestments()
        }
        return () => {
            setInvestmentPackages([])
        }
    }, [user])

    return { investemntPackages }
}