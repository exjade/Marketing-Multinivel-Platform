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
        package1: 'StockBroker',
        package2: 'NoviceTrader',
        package3: 'Trader',
        package4: 'ProTrader',
        package5: 'MasterTrader',
        package6: 'Expert',
        package7: 'ProExpert',
        package8: 'CryptoTrader',
        package9: 'CryptoExpert',
        package10: 'GoldCrypto',
        package11: 'DiamondCrypto',
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
    console.log(investment)

    const priceAmount = investment.amount
    const orderId = shortid.generate().trim();
    const payCurrency = investment.currency
    const { pay } = useCreatePayment({
        orderId,
        priceAmount,
        payCurrency
    })
    console.log(pay)


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
            <div className={`${styles.container} font-Inter-500`}>
                <div className={`${styles.wraper}`}>
                    <div className={`flex flex-col justify-center items-center mt-16 gap-4 ${styles.title}`} >
                        <h1 className='font-bold text-center text-5x1 uppercase'>{t('Empower Your Future: The Path of Smart Investing')}</h1>
                        <p className='text-md'>
                            Our trained neural network analyzes behavioral patterns to make intelligent decisions in real-time.
                            With a focus on precision and risk management, we offer a secure path to optimized returns.
                            Join us and take the next step towards financial success!
                        </p>
                    </div>

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
                                        src="assets/trade-bot.webp"
                                        alt="package 500"
                                        className='w-32 h-32 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package1}</h3>
                            </div>


                            <q className='font-medium italic text-center w-9/12'>
                                Our investment plan offers you the opportunity to be courageous and make the most of every opportunity.
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Size</p>
                                    <p>{packagePrice.package1}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Revenue share</p>
                                    <p>{packagePrice.package1}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Daily Earnings</p>
                                    <p>1.8%</p>
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

                            {/* <motion.button
                                type='button'
                                whileTap={{ scale: 0.9 }}
                                className={`${styles.packageButton}`}
                                onClick={() => setPackageOne()}
                            >
                                Invest Now
                            </motion.button> */}
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
                                        src="assets/trade-bot.webp"
                                        alt="package 500"
                                        className='w-32 h-32 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package2}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                                Our investment plan is designed for those who dare to dream big and achieve greatness. Together, we can reach new heights of financial success."
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Size</p>
                                    <p>{packagePrice.package2}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Revenue share</p>
                                    <p>{packagePrice.package2}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Daily Earnings</p>
                                    <p>1.8%</p>
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
                                        src="assets/trade-bot.webp"
                                        alt="package 500"
                                        className='w-32 h-32 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package3}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                                Invest in yourself, invest in your future. Our investment plan is not just about financial returns; it's about investing in your own potential.
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Size</p>
                                    <p>{packagePrice.package3}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Revenue share</p>
                                    <p>{packagePrice.package3}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Daily Earnings</p>
                                    <p>1.8%</p>
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
                                        src="assets/trade-bot.webp"
                                        alt="package 500"
                                        className='w-32 h-32 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package4}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                                Our investment plan empowers you with knowledge, expertise, and guidance to make informed decisions. Take control of your financial journey today
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Size</p>
                                    <p>{packagePrice.package4}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Revenue share</p>
                                    <p>{packagePrice.package4}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Daily Earnings</p>
                                    <p>1.8%</p>
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
                                        src="assets/trade-bot.webp"
                                        alt="package 500"
                                        className='w-32 h-32 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package5}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                                Our investment plan opens the doors to exclusive opportunities that can change your financial future.
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Size</p>
                                    <p>{packagePrice.package5}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Revenue share</p>
                                    <p>{packagePrice.package5}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Daily Earnings</p>
                                    <p>1.8%</p>
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
                                        src="assets/trade-bot.webp"
                                        alt="package 500"
                                        className='w-32 h-32 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package6}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                                Start investing today and let compound interest work its magic.
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Size</p>
                                    <p>{packagePrice.package6}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Revenue share</p>
                                    <p>{packagePrice.package6}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Daily Earnings</p>
                                    <p>1.8%</p>
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
                                        src="assets/trade-bot.webp"
                                        alt="package 500"
                                        className='w-32 h-32 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package7}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                                Step outside your comfort zone and let the magic happen.
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Size</p>
                                    <p>{packagePrice.package7}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Revenue share</p>
                                    <p>{packagePrice.package7}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Daily Earnings</p>
                                    <p>1.8%</p>
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
                                        src="assets/trade-bot.webp"
                                        alt="package 500"
                                        className='w-32 h-32 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package8}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                                Our investment plan empowers you to dream beyond limits and invest in your vision. Dare to dream, and let our plan turn those dreams into reality.
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Size</p>
                                    <p>{packagePrice.package8}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Revenue share</p>
                                    <p>{packagePrice.package8}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Daily Earnings</p>
                                    <p>1.8%</p>
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
                                        src="assets/trade-bot.webp"
                                        alt="package 500"
                                        className='w-32 h-32 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package9}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                                Don't wait for opportunities to find you; seize them with our investment plan. Time waits for no one, so make every second count.
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Size</p>
                                    <p>{packagePrice.package9}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Revenue share</p>
                                    <p>{packagePrice.package9}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Daily Earnings</p>
                                    <p>1.8%</p>
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
                                        src="assets/trade-bot.webp"
                                        alt="package 500"
                                        className='w-32 h-32 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package10}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                                Our investment plan challenges you to step out of your comfort zone and explore new possibilities. Be the architect of your own financial success!
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Size</p>
                                    <p>{packagePrice.package10}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Revenue share</p>
                                    <p>{packagePrice.package10}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Daily Earnings</p>
                                    <p>1.8%</p>
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
                                        src="assets/trade-bot.webp"
                                        alt="package 500"
                                        className='w-32 h-32 object-contain '
                                        loading='lazy'
                                    />
                                </span>
                                <h3 className='font-bold text-2xl'>{packageNames.package11}</h3>
                            </div>
                            <q className='font-medium italic text-center w-9/12'>
                                Our investment plan challenges you to step out of your comfort zone and explore new possibilities. Be the architect of your own financial success!
                            </q>

                            <div className={`${styles.packageContainerInfo}`}>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Trade Size</p>
                                    <p>{packagePrice.package11}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Revenue share</p>
                                    <p>{packagePrice.package11}</p>
                                </span>
                                <span className={`${styles.packageInformation}`}>
                                    <p>Daily Earnings</p>
                                    <p>1.8%</p>
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