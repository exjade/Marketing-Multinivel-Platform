import { useState, useEffect } from 'react'
import axios from 'axios';
//Firebase
import { firebase } from '../lib/firebase'

import {
    getFirestore,
    collection,
    addDoc,
} from 'firebase/firestore'
const firestore = getFirestore(firebase)


export default function useCreatePayment({
    priceAmount,
    orderId,
    payCurrency,
    PackagePaymentsInformation,
    setError,
    setInvestment,
    packageInformation,
    investment,
    sendInvestmentData,
}) {

    const [pay, setPay] = useState([])

    /* =========================== AUTH ======================================== */

    useEffect(() => {
        const getToken = async () => {
            const res = await axios.get(process.env.REACT_APP_NOWPAYMENTS_TKN)
            localStorage.setItem('token', res.data.token);
        }
        // getToken()
    }, [])

    const tkn = localStorage.getItem('token')
    /* =========================== AUTH ======================================== */

    var myHeaders = new Headers();
    myHeaders.append('x-api-key', process.env.REACT_APP_NOWPAYMENTS_API)
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Authorization', `Bearer ${tkn}`);

    var raw = JSON.stringify({
        'price_amount': priceAmount,
        'price_currency': 'usd',
        'pay_currency': payCurrency,
        'ipn_callback_url': 'https://capitaltraderscorp.com/investment',
        'order_id': orderId,
        'order_description': 'Capital Traders Business',
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };


    const getPaymentData = async () => {
        if (payCurrency !== undefined && priceAmount) {
            //eslint-disable-next-line
            const payment = fetch('https://api.nowpayments.io/v1/payment', requestOptions)
                .then(response => response.json())
                .then(result => {
                    setPay(result)
                    // console.log(result);
                })
                .catch(error => console.log('error', error));
        }
    }

    useEffect(() => {
        if (payCurrency !== undefined && priceAmount >= 10 && parseFloat(investment?.amount)) {
            getPaymentData()
        }
    }, [payCurrency])


   
   



    return { pay }

}