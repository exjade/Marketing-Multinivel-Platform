import { useState, useEffect } from 'react'
import useUser from './use-user';
import axios from 'axios';
import { firebase } from '../lib/firebase'
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs,
} from 'firebase/firestore';
const firestore = getFirestore(firebase)

export default function useAutomaticActivation() {
    const { user } = useUser()
    const [nowpayments, setNowPayments] = useState(null)
    const [paymentAwaitingInfo, setPaymentAwaitingInfo] = useState([])
    const [paymentAwaiting, setPaymentAwaiting] = useState([])

    /* =========================== AUTH ======================================== */

    useEffect(() => {
        const getToken = async () => {
            const res = await axios.get(process.env.REACT_APP_NOWPAYMENTS_TKN)
            localStorage.setItem('token', res.data.token);
        }
        getToken()
    }, [user])

    /* =========================== AUTH ======================================== */

    const tkn = localStorage.getItem('token')

    var myHeaders = new Headers();
    myHeaders.append('x-api-key', process.env.REACT_APP_NOWPAYMENTS_API);
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${tkn}`);

    //eslint-disable-next-line

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
    };

    // get Payment for user from firebase
    const getPaymentDoc = async () => {
        const q2 = query(collection(firestore, 'payments'), where('status', '==', 'NEW'));
        const querySnapshot = await getDocs(q2);
        querySnapshot.forEach((doc) => {
            setPaymentAwaitingInfo({
                docId: doc.id, data: doc.data()
            })
            setPaymentAwaiting(doc.data()?.nowpayments?.paymentId)
        });
    }


    //eslint-disable-next-line
    const getPaymentStatus = async () => {
        getPaymentDoc()
        // eslint-disable-next-line
            fetch(`https://api.nowpayments.io/v1/payment/${paymentAwaiting}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setNowPayments(result.data)
                })
                .catch(error => console.log('error', error));
    }


    const activateInvestment = async () => {
        try {
            await getPaymentDoc()
            await getPaymentStatus()
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
            getPaymentDoc()
            getPaymentStatus()
            activateInvestment()
    }, [user])


    return { nowpayments, paymentAwaiting, paymentAwaitingInfo, }

}