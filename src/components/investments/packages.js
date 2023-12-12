import React, { memo, useEffect, useState } from 'react'
import styles from '../../styles/modules/packages/package.module.css'
// import SkeletonPackages from './skeleton-packages'
import { useTranslation } from 'react-i18next';
import axios from 'axios';
//Hooks
import useUser from '../../hooks/use-user'
import useUsers from '../../hooks/use-users'
import useAuthListener from '../../hooks/use-auth-listener';
// Framer motion
import { motion } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid';
import shortid from 'shortid';
//Component
import FallBackLoader from '../FallBackLoader';
import useGetUnilevelBalance from '../../hooks/use-unilevel-balance';
import SelectWalletSumary from './modal/select-walletbalance-sumary';
import SelectPayment from './modal/select-payment';
import SelectQrPayment from './modal/investment-modal';
import CryptoInput from './modal/crypto-option';
import useCreatePayment from '../../hooks/use-create-payments';
import useMotion from '../../hooks/use-motion';
import {
    handlePackageOne,
    handlePackageTwo,
    handlePackageThree,
    handlePackageFour,
    handlePackageFive,
    handlePackageSix,
    handlePackageSeven,
    handlePackageEight,
    handlePackageNine,
    handlePackageTeen,
    handlePackageEleven
} from './utils/packages-functions';
//Firebase
import { firebase } from '../../lib/firebase'

import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    doc,
    getDoc
} from 'firebase/firestore'
const firestore = getFirestore(firebase)


const Packages = () => {
    const { unilevelDocs } = useGetUnilevelBalance()
    const { container, item } = useMotion()
    //HOOKS
    const { t } = useTranslation()
    const { user } = useUser()
    const { users } = useUsers()
    const { user: currentUser } = useAuthListener()
    // REINVESTMENT 
    const [error, setError] = useState('')
    const [successPayment, setSuccessPayment] = useState(false)
    //eslint-disable-next-line 
    const [failedPayment, setFailedPayment] = useState(false)


    const [tokenList, setTokenList] = useState(false)
    const [selectPage, setSelectPage] = useState({
        walletBalance: false,
        qrpayment: false,
        paymentOptions: false,
        crypto: false,
    })

    const openInvestmentModal = () => {
        setSelectPage({
            walletBalance: false,
            qrpayment: false,
            paymentOptions: true,
            crypto: false,
        })
    }
    const cancelInvestment = () => {
        setSelectPage({
            walletBalance: false,
            qrpayment: false,
            paymentOptions: true,
            crypto: false,
        })
    }
    const closePaymentOptions = () => {
        setSelectPage({
            walletBalance: false,
            qrpayment: false,
            paymentOptions: false,
            crypto: false,
        })
        setInvestment({
            id: uuidv4(),
            date: Date.now(),
            amount: 0,
            usdtAmount: 'USDT (TRC20)',
            packageName: '',
            divisas: '',
            currency: ''
        });
    }



    const packageNames = {
        package1: 'Quantitative Investment 1',
        package2: 'Quantitative Investment 2',
        package3: 'Quantitative Investment 3',
        package4: 'Quantitative Investment 4',
        package5: 'Quantitative Investment 5',
        package6: 'Quantitative Investment 6',
        package7: 'Quantitative Investment 7',
        package8: 'Quantitative Investment 8',
        package9: 'Quantitative Investment 9',
        package10: 'Quantitative Investment 10',
        package11: 'Quantitative Investment 11',
    }

    const packagePrice = {
        package1: 25,
        package2: 50,
        package3: 100,
        package4: 200,
        package5: 500,
        package6: 900,
        package7: 1000,
        package8: 3000,
        package9: 5000,
        package10: 10000,
        package11: 50000,
    }

    //NORMAL PAYMENTS
    const [isLoading, setIsLoading] = useState(true);
    const [investment, setInvestment] = useState({
        id: uuidv4(),
        date: Date.now(),
        amount: 0,
        usdtAmount: 'USDT (TRC20)',
        packageName: '',
        divisas: '',
        currency: ''
    })

    const priceAmount = investment.amount
    const orderId = shortid.generate().trim();
    const payCurrency = investment.currency
    const { pay } = useCreatePayment({
        orderId,
        priceAmount,
        payCurrency
    })


    const packageInformation = {
        id: investment.id,
        date: investment.date,
        amount: investment.amount,
        usdtAmount: investment.usdtAmount,
        packageName: investment.packageName,
    }


    // ======================================= CREATE PAYMENTS =========================================== // 

    const PackagePaymentsInformation = {
        paymentId: uuidv4(),
        currency: 'USDT (TRC20)',
        amount: parseFloat(investment?.amount),
        date: Date.now(),
        userId: user?.userId,
        username: user?.username,
        status: 'NEW',
    }

    const insuficientBalance = investment.amount > user?.topupBalance

    // Find my parent node ( user who invited me )
    const filterNodeRoot = users?.filter((u) => user?.referral?.referrerBy.includes(u.referral.referralCode))
    const nodeRootId = filterNodeRoot?.map(u => u.userId)

    async function sendInvestmentData() {
        try {
            const unilevelUndefined = parseFloat(unilevelDocs[0]?.inversion) === undefined || parseFloat(unilevelDocs[0]?.inversion) === null

            const postData = {
                inversion: parseFloat(investment?.amount),
                nodoId: currentUser.uid,
                nodoRoot: nodeRootId[0],
            };
            // If user has a parent node, do this
            if (filterNodeRoot?.length > 0) {
                updateDocument()
                // make a post request then adds the new node to the parent node
                axios.post(process.env.REACT_APP_UNILEVEL, postData).then(function (response) {
                    console.log('Node successfully added!');
                }).catch(function (error) {
                    console.log(error);
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function updateDocument() {
        try {
            // Obtener la referencia al documento que se desea actualizar
            const docRef = doc(firestore, 'nodes-unilevel', `unilevel/${user?.userId}/details`);
            const docSnap = await getDoc(docRef);
            if (docSnap?.exists()) {
                // Actualizar el documento con los nuevos datos
                await updateDoc(docRef, {
                    inversion: parseFloat(investment.amount) + docSnap?.data()?.inversion
                });
            }
        } catch (error) {
            console.error('Error al actualizar el documento:', error);
        }
    }



    useEffect(() => {
        const newCustomDoc = async () => {
            if (investment.amount < 0) return;
            try {
                if (!insuficientBalance) {
                    await sendInvestmentData()
                    //eslint-disable-next-line
                    const docRef = await addDoc(collection(firestore, 'investment-payments'), {
                        paymentId: PackagePaymentsInformation.paymentId,
                        currency: PackagePaymentsInformation.currency,
                        amount: parseFloat(investment?.amount),
                        date: Date.now(),
                        userId: PackagePaymentsInformation.userId,
                        username: PackagePaymentsInformation.username,
                        id: PackagePaymentsInformation.paymentId,
                        status: PackagePaymentsInformation.status,
                        packageInformation,
                        nowpayments: pay || null,
                    });
                    const userRef = doc(firestore, 'users', user?.docId);
                    await updateDoc(userRef, {
                        Applied: user?.Applied + investment.amount,
                        topupBalance: user?.topupBalance - investment.amount,
                    })

                } else {
                    //eslint-disable-next-line
                    const docRef = await addDoc(collection(firestore, 'failed-Payment'), {
                        paymentId: PackagePaymentsInformation.paymentId,
                        currency: PackagePaymentsInformation.currency,
                        amount: parseFloat(investment?.amount),
                        date: Date.now(),
                        userId: PackagePaymentsInformation.userId,
                        username: PackagePaymentsInformation.username,
                        id: PackagePaymentsInformation.paymentId,
                        status: PackagePaymentsInformation.status,
                        packageInformation,
                        nowpayments: pay || null,
                        error: 'Insufficient funds for the investment',
                    });
                    setError('Insufficient funds for the investment')
                }
            } catch (error) {
                console.log(error)
                setError('Please, Try again later')
            }
        }
        if (investment?.amount > 0 ) {
            if (insuficientBalance) {
                setError('Insufficient funds for the investment')
                setTimeout(() => {
                    setError('')
                    setInvestment({
                        ...investment,
                        id: uuidv4(),
                        date: Date.now(),
                        amount: 0,
                        usdtAmount: 'USDT (TRC20)',
                        packageName: '',
                        divisas: '',
                        currency: '',
                    });
                }, 1500)
                // return newCustomDoc()
            } else {
                setSuccessPayment(true)
                // newCustomDoc()
                setTimeout(() => {
                    setInvestment({
                        ...investment,
                        id: uuidv4(),
                        date: Date.now(),
                        amount: 0,
                        usdtAmount: 'USDT (TRC20)',
                        packageName: '',
                        divisas: '',
                        currency: '',
                    });
                }, 2000)
            }
        }
    }, [payCurrency, user])

    useEffect(() => {
        document.title = 'Investment - Artificial'
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }, [])

    const loader = () => { return <FallBackLoader /> };
    if (isLoading) { return loader(); }
    else {
        return (
            <div className={`${styles.container} font-roboto`}>
                <div className={`${styles.wraper}`}>

                    {
                        selectPage.paymentOptions &&
                        (
                            <SelectPayment
                                packageNames={packageNames}
                                investment={investment}
                                cancelInvestment={cancelInvestment}
                                setSelectPage={setSelectPage}
                                selectPage={selectPage}
                                closePaymentOptions={closePaymentOptions}
                            />
                        )
                    }
                    {
                        selectPage.walletBalance && (
                            <SelectWalletSumary
                                cancelInvestment={cancelInvestment}
                            />
                        )
                    }
                    {
                        selectPage.qrpayment && (
                            <SelectQrPayment
                                investment={investment}
                                cancelInvestment={cancelInvestment}
                                pay={pay}
                            />
                        )
                    }
                    {
                        selectPage.crypto && (
                            <CryptoInput
                                investment={investment}
                                cancelInvestment={cancelInvestment}
                                setInvestment={setInvestment}
                                tokenList={tokenList}
                                setTokenList={setTokenList}
                                setSelectPage={setSelectPage}
                            />
                        )
                    }

                    <motion.div
                        className={`${styles.packages} grid grid-cols-3`}
                        variants={container}
                        initial="hidden"
                        animate="visible"
                    >

                        <motion.div
                            className={`${styles.package}`}
                            whileHover={{ scale: 1.03 }}
                            variants={item}
                        >
                            <div className='flex flex-col justify-center gap-2 items-center'>
                                <span className='flex flex-col  justify-center items-center'>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Fquantitative-trading.png.webp?alt=media&token=282e3684-2140-4525-a1a0-1ac795b05e13"
                                        alt="package 500"
                                        className='w-48 h-48 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package1}</h3>
                            </div>


                            <q className='font-medium italic text-center w-9/12'>
                            In quantitative trading, emotions are replaced by algorithms, enabling objective decision-making based on data
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Amount</p>
                                    <p>${packagePrice.package1}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>ROI</p>
                                    <p>7%</p>
                                </span>
                            </div>

                            {/*============================= ERROR MESSAGE =============================*/}
                            {
                                error && packageNames.package1 === investment.packageName &&
                                <p className='text-normal text-center'>
                                    {error}
                                </p>
                            }
                            {successPayment && packagePrice.package1 === investment.amount &&
                                (<><img
                                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                                    alt="success payment"
                                    className='w-12 h-12 object-contain rounded-full'
                                />
                                </>)}
                            {failedPayment && packageNames.package1 === investment.packageName &&
                                (<>
                                    <p className='text-xl text-red-logo'>Try again later</p>
                                </>)}

                            <motion.button
                                type='button'
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.packageButton}`}
                                onClick={() => {
                                    openInvestmentModal()
                                    handlePackageOne(investment, packagePrice, packageNames, setInvestment)
                                }}
                            >
                                Invest now
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className={`${styles.package}`}
                            whileHover={{ scale: 1.03 }}
                            variants={item}
                        >
                            <div className='flex flex-col justify-center gap-2 items-center'>
                                <span className='flex flex-col  justify-center items-center'>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Fquantitative-trading.png.webp?alt=media&token=282e3684-2140-4525-a1a0-1ac795b05e13"
                                        alt="package 500"
                                        className='w-48 h-48 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package2}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                            The ability to analyze large amounts of data in real-time is key to success in quantitative trading
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Amount</p>
                                    <p>${packagePrice.package2}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>ROI</p>
                                    <p>7%</p>
                                </span>
                            </div>

                            {/*============================= ERROR MESSAGE =============================*/}
                            {
                                error && packageNames.package2 === investment.packageName &&
                                <p className='text-normal text-center'>
                                    {error}
                                </p>
                            }
                            {successPayment && packagePrice.package2 === investment.amount &&
                                (<><img
                                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                                    alt="success payment"
                                    className='w-12 h-12 object-contain rounded-full'
                                />
                                </>)}
                            {failedPayment && packageNames.package2 === investment.packageName &&
                                (<>
                                    <p className='text-xl text-red-logo'>Try again later</p>
                                </>)}

                            <motion.button
                                type='button'
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.packageButton}`}
                                onClick={() => {
                                    openInvestmentModal()
                                    handlePackageTwo(investment, packagePrice, packageNames, setInvestment)
                                }}
                            >
                                Invest Now
                            </motion.button>
                        </motion.div>
                        <motion.div
                            className={`${styles.package}`}
                            whileHover={{ scale: 1.03 }}
                            variants={item}
                        >
                            <div className='flex flex-col justify-center gap-2 items-center'>
                                <span className='flex flex-col  justify-center items-center'>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Fquantitative-trading.png.webp?alt=media&token=282e3684-2140-4525-a1a0-1ac795b05e13"
                                        alt="package 500"
                                        className='w-48 h-48 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package3}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                            Automation in quantitative trading allows for 24/7 strategy execution, seizing opportunities in the global market at any time
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Amount</p>
                                    <p>${packagePrice.package3}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>ROI</p>
                                    <p>7%</p>
                                </span>
                            </div>

                            {/*============================= ERROR MESSAGE =============================*/}
                            {
                                error && packageNames.package3 === investment.packageName &&
                                <p className='text-normal text-center'>
                                    {error}
                                </p>
                            }
                            {successPayment && packagePrice.package3 === investment.amount &&
                                (<><img
                                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                                    alt="success payment"
                                    className='w-12 h-12 object-contain rounded-full'
                                />
                                </>)}
                            {failedPayment && packageNames.package3 === investment.packageName &&
                                (<>
                                    <p className='text-xl text-red-logo'>Try again later</p>
                                </>)}

                            <motion.button
                                type='button'
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.packageButton}`}
                                onClick={() => {
                                    openInvestmentModal()
                                    handlePackageThree(investment, packagePrice, packageNames, setInvestment)
                                }}
                            >
                                Invest Now
                            </motion.button>
                        </motion.div>


                        <motion.div
                            className={`${styles.package}`}
                            whileHover={{ scale: 1.03 }}
                            variants={item}
                        >
                            <div className='flex flex-col justify-center gap-2 items-center'>
                                <span className='flex flex-col  justify-center items-center'>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Fquantitative-trading.png.webp?alt=media&token=282e3684-2140-4525-a1a0-1ac795b05e13"
                                        alt="package 500"
                                        className='w-48 h-48 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package4}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                            Quantitative trading aims to identify patterns and trends in historical data to predict future movements in asset prices
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Amount</p>
                                    <p>${packagePrice.package4}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>ROI</p>
                                    <p>7%</p>
                                </span>
                            </div>

                            {/*============================= ERROR MESSAGE =============================*/}
                            {
                                error && packageNames.package4 === investment.packageName &&
                                <p className='text-normal text-center'>
                                    {error}
                                </p>
                            }
                            {successPayment && packagePrice.package4 === investment.amount &&
                                (<><img
                                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                                    alt="success payment"
                                    className='w-12 h-12 object-contain rounded-full'
                                />
                                </>)}
                            {failedPayment && packageNames.package4 === investment.packageName &&
                                (<>
                                    <p className='text-xl text-red-logo'>Try again later</p>
                                </>)}

                            <motion.button
                                type='button'
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.packageButton}`}
                                onClick={() => {
                                    openInvestmentModal()
                                    handlePackageFour(investment, packagePrice, packageNames, setInvestment)
                                }}
                            >
                                Invest Now
                            </motion.button>
                        </motion.div>


                        <motion.div
                            className={`${styles.package}`}
                            whileHover={{ scale: 1.03 }}
                            variants={item}
                        >
                            <div className='flex flex-col justify-center gap-2 items-center'>
                                <span className='flex flex-col  justify-center items-center'>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Fquantitative-trading.png.webp?alt=media&token=282e3684-2140-4525-a1a0-1ac795b05e13"
                                        alt="package 500"
                                        className='w-48 h-48 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package5}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                            Diversifying strategies in quantitative trading helps mitigate risks and provides stability over time
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Amount</p>
                                    <p>${packagePrice.package5}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>ROI</p>
                                    <p>7%</p>
                                </span>
                            </div>

                            {/*============================= ERROR MESSAGE =============================*/}
                            {
                                error && packageNames.package5 === investment.packageName &&
                                <p className='text-normal text-center'>
                                    {error}
                                </p>
                            }
                            {successPayment && packagePrice.package5 === investment.amount &&
                                (<><img
                                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                                    alt="success payment"
                                    className='w-12 h-12 object-contain rounded-full'
                                />
                                </>)}
                            {failedPayment && packageNames.package5 === investment.packageName &&
                                (<>
                                    <p className='text-xl text-red-logo'>Try again later</p>
                                </>)}

                            <motion.button
                                type='button'
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.packageButton}`}
                                onClick={() => {
                                    openInvestmentModal()
                                    handlePackageFive(investment, packagePrice, packageNames, setInvestment)
                                }}
                            >
                                Invest Now
                            </motion.button>
                        </motion.div>


                        <motion.div
                            className={`${styles.package}`}
                            whileHover={{ scale: 1.03 }}
                            variants={item}
                        >
                            <div className='flex flex-col justify-center gap-2 items-center'>
                                <span className='flex flex-col  justify-center items-center'>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Fquantitative-trading.png.webp?alt=media&token=282e3684-2140-4525-a1a0-1ac795b05e13"
                                        alt="package 500"
                                        className='w-48 h-48 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package6}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                            Discipline and consistency in applying quantitative models are essential for long-term success in trading
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Amount</p>
                                    <p>${packagePrice.package6}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>ROI</p>
                                    <p>7%</p>
                                </span>
                            </div>

                            {/*============================= ERROR MESSAGE =============================*/}
                            {
                                error && packageNames.package6 === investment.packageName &&
                                <p className='text-normal text-center'>
                                    {error}
                                </p>
                            }
                            {successPayment && packagePrice.package6 === investment.amount &&
                                (<><img
                                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                                    alt="success payment"
                                    className='w-12 h-12 object-contain rounded-full'
                                />
                                </>)}
                            {failedPayment && packageNames.package6 === investment.packageName &&
                                (<>
                                    <p className='text-xl text-red-logo'>Try again later</p>
                                </>)}

                            <motion.button
                                type='button'
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.packageButton}`}
                                onClick={() => {
                                    openInvestmentModal()
                                    handlePackageSix(investment, packagePrice, packageNames, setInvestment)
                                }}
                            >
                                Invest Now
                            </motion.button>
                        </motion.div>


                        <motion.div
                            className={`${styles.package}`}
                            whileHover={{ scale: 1.03 }}
                            variants={item}
                        >
                            <div className='flex flex-col justify-center gap-2 items-center'>
                                <span className='flex flex-col  justify-center items-center'>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Fquantitative-trading.png.webp?alt=media&token=282e3684-2140-4525-a1a0-1ac795b05e13"
                                        alt="package 500"
                                        className='w-48 h-48 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package7}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                            Quantitative trading is based on logic and statistics, enabling informed decision-making backed by empirical evidence
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Amount</p>
                                    <p>${packagePrice.package7}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>ROI</p>
                                    <p>7%</p>
                                </span>
                            </div>

                            {/*============================= ERROR MESSAGE =============================*/}
                            {
                                error && packageNames.package7 === investment.packageName &&
                                <p className='text-normal text-center'>
                                    {error}
                                </p>
                            }
                            {successPayment && packagePrice.package7 === investment.amount &&
                                (<><img
                                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                                    alt="success payment"
                                    className='w-12 h-12 object-contain rounded-full'
                                />
                                </>)}
                            {failedPayment && packageNames.package7 === investment.packageName &&
                                (<>
                                    <p className='text-xl text-red-logo'>Try again later</p>
                                </>)}

                            <motion.button
                                type='button'
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.packageButton}`}
                                onClick={() => {
                                    openInvestmentModal()
                                    handlePackageSeven(investment, packagePrice, packageNames, setInvestment)
                                }}
                            >
                                Invest Now
                            </motion.button>
                        </motion.div>


                        <motion.div
                            className={`${styles.package}`}
                            whileHover={{ scale: 1.03 }}
                            variants={item}
                        >
                            <div className='flex flex-col justify-center gap-2 items-center'>
                                <span className='flex flex-col  justify-center items-center'>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Fquantitative-trading.png.webp?alt=media&token=282e3684-2140-4525-a1a0-1ac795b05e13"
                                        alt="package 500"
                                        className='w-48 h-48 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package8}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                            Speed of execution and adaptability are critical in quantitative trading, where markets can change in seconds
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Amount</p>
                                    <p>${packagePrice.package8}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>ROI</p>
                                    <p>7%</p>
                                </span>
                            </div>

                            {/*============================= ERROR MESSAGE =============================*/}
                            {
                                error && packageNames.package8 === investment.packageName &&
                                <p className='text-normal text-center'>
                                    {error}
                                </p>
                            }
                            {successPayment && packagePrice.package8 === investment.amount &&
                                (<><img
                                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                                    alt="success payment"
                                    className='w-12 h-12 object-contain rounded-full'
                                />
                                </>)}
                            {failedPayment && packageNames.package8 === investment.packageName &&
                                (<>
                                    <p className='text-xl text-red-logo'>Try again later</p>
                                </>)}

                            <motion.button
                                type='button'
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.packageButton}`}
                                onClick={() => {
                                    openInvestmentModal()
                                    handlePackageEight(investment, packagePrice, packageNames, setInvestment)
                                }}
                            >
                                Invest Now
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className={`${styles.package}`}
                            whileHover={{ scale: 1.03 }}
                            variants={item}
                        >
                            <div className='flex flex-col justify-center gap-2 items-center'>
                                <span className='flex flex-col  justify-center items-center'>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Fquantitative-trading.png.webp?alt=media&token=282e3684-2140-4525-a1a0-1ac795b05e13"
                                        alt="package 500"
                                        className='w-48 h-48 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package9}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                            Quantitative strategies can identify arbitrage opportunities and exploit inefficiencies in asset prices
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Amount</p>
                                    <p>${packagePrice.package9}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>ROI</p>
                                    <p>7%</p>
                                </span>
                            </div>

                            {/*============================= ERROR MESSAGE =============================*/}
                            {
                                error && packageNames.package9 === investment.packageName &&
                                <p className='text-normal text-center'>
                                    {error}
                                </p>
                            }
                            {successPayment && packagePrice.package9 === investment.amount &&
                                (<><img
                                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                                    alt="success payment"
                                    className='w-12 h-12 object-contain rounded-full'
                                />
                                </>)}
                            {failedPayment && packageNames.package9 === investment.packageName &&
                                (<>
                                    <p className='text-xl text-red-logo'>Try again later</p>
                                </>)}

                            <motion.button
                                type='button'
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.packageButton}`}
                                onClick={() => {
                                    openInvestmentModal()
                                    handlePackageNine(investment, packagePrice, packageNames, setInvestment)
                                }}
                            >
                                Invest Now
                            </motion.button>
                        </motion.div>


                        <motion.div
                            className={`${styles.package}`}
                            whileHover={{ scale: 1.03 }}
                            variants={item}
                        >
                            <div className='flex flex-col justify-center gap-2 items-center'>
                                <span className='flex flex-col  justify-center items-center'>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Fquantitative-trading.png.webp?alt=media&token=282e3684-2140-4525-a1a0-1ac795b05e13"
                                        alt="package 500"
                                        className='w-48 h-48 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package10}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                            Continuous improvement of models and algorithms is crucial in quantitative trading to stay ahead in a dynamic market environment
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Amount</p>
                                    <p>${packagePrice.package10}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>ROI</p>
                                    <p>7%</p>
                                </span>
                            </div>

                            {/*============================= ERROR MESSAGE =============================*/}
                            {
                                error && packageNames.package10 === investment.packageName &&
                                <p className='text-normal text-center'>
                                    {error}
                                </p>
                            }
                            {successPayment && packagePrice.package10 === investment.amount &&
                                (<><img
                                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                                    alt="success payment"
                                    className='w-12 h-12 object-contain rounded-full'
                                />
                                </>)}
                            {failedPayment && packageNames.package10 === investment.packageName &&
                                (<>
                                    <p className='text-xl text-red-logo'>Try again later</p>
                                </>)}

                            <motion.button
                                type='button'
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.packageButton}`}
                                onClick={() => {
                                    openInvestmentModal()
                                    handlePackageTeen(investment, packagePrice, packageNames, setInvestment)
                                }}
                            >
                                Invest Now
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className={`${styles.package}`}
                            whileHover={{ scale: 1.03 }}
                            variants={item}
                        >
                            <div className='flex flex-col justify-center gap-2 items-center'>
                                <span className='flex flex-col  justify-center items-center'>
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Fquantitative-trading.png.webp?alt=media&token=282e3684-2140-4525-a1a0-1ac795b05e13"
                                        alt="package 500"
                                        className='w-48 h-48 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package11}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                            Transparency in quantitative processes provides investors with confidence in understanding decision-making and risk management
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Amount</p>
                                    <p>${packagePrice.package11}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>ROI</p>
                                    <p>7%</p>
                                </span>
                            </div>

                            {/*============================= ERROR MESSAGE =============================*/}
                            {
                                error && packageNames.package11 === investment.packageName &&
                                <p className='text-normal text-center'>
                                    {error}
                                </p>
                            }
                            {successPayment && packagePrice.package11 === investment.amount &&
                                (<><img
                                    src="https://cdn-icons-png.flaticon.com/512/148/148767.png"
                                    alt="success payment"
                                    className='w-12 h-12 object-contain rounded-full'
                                />
                                </>)}
                            {failedPayment && packageNames.package11 === investment.packageName &&
                                (<>
                                    <p className='text-xl text-red-logo'>Try again later</p>
                                </>)}

                            <motion.button
                                type='button'
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.packageButton}`}
                                onClick={() => {
                                    openInvestmentModal()
                                    handlePackageEleven(investment, packagePrice, packageNames, setInvestment)
                                }}
                            >
                                Invest Now
                            </motion.button>
                        </motion.div>
                    </motion.div>

                </div>
            </div >
        )
    }
}

export default memo(Packages)

Packages.whyDidYouRender = true