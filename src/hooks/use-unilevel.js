import { useState, useEffect, useContext, useMemo } from 'react'
import UserContext from '../context/user'
import { firebase } from '../lib/firebase'
import { getFirestore, getDocs, collection } from 'firebase/firestore'
const firestore = getFirestore(firebase)

export default function useUnilevel() {

    const [docId, setDocId] = useState([])
    const [referralsLength, setReferralsLength] = useState(0)
    const { user, user: { uid: currentUserUID } } = useContext(UserContext)



    // Memoized version of getNodesReferredByMe function
    const getNodesReferredByMeMemoized = useMemo(() => {
        return function getNodesReferredByMe(documentosArray) {
            const filterDocs = documentosArray?.filter(u => u.nodoRoot === currentUserUID);
            getReferredQty(filterDocs[1])
            setDocId(filterDocs);
        };
    }, [currentUserUID]);



    // Recursive function to obtain the total number of referrals
    const getReferredQty = (nodo) => {
        let quantityReferred = 0;

        if (docId !== null || docId !== undefined) {
            if (nodo && typeof nodo.referidos !== 'undefined' && nodo.referidos !== null) {
                // Check if the node has referrals
                if (Object.prototype.hasOwnProperty.call(nodo, 'referidos')) {
                    quantityReferred += nodo.referidos.length; // Add direct referrals

                    // Traverse the referrals and call the function recursively
                    nodo.referidos.forEach((referido) => {
                        quantityReferred += getReferredQty(referido); // Add referrals from referrers
                    });
                }
            }
        }
        setReferralsLength(quantityReferred)
        return quantityReferred;
    };

    async function obtenerDocumentos() {
        try {

            const documentosArray = []; // Array for storing documents

            // Get all the documents in the "users" collection
            const usuariosSnapshot = await getDocs(collection(firestore, 'users'));


            // Iterate for each user document
            for (const usuarioDoc of usuariosSnapshot.docs) {
                // Obtain user ID
                const userUID = usuarioDoc.id;

                const userData = usuarioDoc.data();
                const username = userData.username;

                // Get all documents in the collection "nodes-unilevel" 
                const querySnapshot = await getDocs(collection(firestore, 'nodes-unilevel', 'unilevel', userUID));

                // Iterate through each document of the "nodes-unilevel" collection 
                querySnapshot.forEach((nodeDoc) => {
                    // push  docs to the array
                    documentosArray.push({
                        username: username,
                        userID: userUID,
                        nodeID: nodeDoc.id,
                        ...nodeDoc.data()
                    });
                });
            }
            getNodesReferredByMeMemoized(documentosArray)
        } catch (error) {
            console.log('Error al obtener documentos:', error);
        }
    }

    useEffect(() => {
        obtenerDocumentos();
    }, [user])

    return { docId, referralsLength, getReferredQty }
}