import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
//Context
import FirebaseContext from '../context/firebase';
import shortid from 'shortid';
//module styles
import styles from '../styles/modules/auth/auth.module.css'
//routes
import * as ROUTES from '../constants/routes';

import '../styles/recaptcha/recaptcha.css'
//services
import { doesUsernameExist } from '../services/firebase';
//framer motion
import { motion, AnimatePresence } from 'framer-motion';

import { useTranslation } from 'react-i18next';


const ManualSignupUsers = () => {
    useEffect(() => {
        document.title = 'Create new account - Artificial';
    }, []); //eslint-disable-line
    const { t } = useTranslation()
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');

    const [cedula, setCedula] = useState(null)
    const [pais, setPais] = useState(null)
    const [inversion, setInversion] = useState('')
    const [rendimiento, setRendimiento] = useState('')
    const [semanas, setSemanas] = useState(null)
    const [paquetes, setPaquetes] = useState(0)
    // PAQUETE 1
    const [pAmount, setPAmount] = useState(null)
    const [pProfit, setPProfit] = useState(null)
    const [pProgress, setPProgress] = useState(null)
    // PAQUETE 2
    const [pAmount2, setPAmount2] = useState(null)
    const [pProfit2, setPProfit2] = useState(null)
    const [pProgress2, setPProgress2] = useState(null)
    // PAQUETE 3
    const [pAmount3, setPAmount3] = useState(null)
    const [pProfit3, setPProfit3] = useState(null)
    const [pProgress3, setPProgress3] = useState(null)
    // PAQUETE 4
    const [pAmount4, setPAmount4] = useState(null)
    const [pProfit4, setPProfit4] = useState(null)
    const [pProgress4, setPProgress4] = useState(null)
    // PAQUETE 5
    const [pAmount5, setPAmount5] = useState(null)
    const [pProfit5, setPProfit5] = useState(null)
    const [pProgress5, setPProgress5] = useState(null)
    // PAQUETE 6
    const [pAmount6, setPAmount6] = useState(null)
    const [pProfit6, setPProfit6] = useState(null)
    const [pProgress6, setPProgress6] = useState(null)
    // PAQUETE 7
    const [pAmount7, setPAmount7] = useState(null)
    const [pProfit7, setPProfit7] = useState(null)
    const [pProgress7, setPProgress7] = useState(null)
    // PAQUETE 8
    const [pAmount8, setPAmount8] = useState(null)
    const [pProfit8, setPProfit8] = useState(null)
    const [pProgress8, setPProgress8] = useState(null)
    // PAQUETE 9
    const [pAmount9, setPAmount9] = useState(null)
    const [pProfit9, setPProfit9] = useState(null)
    const [pProgress9, setPProgress9] = useState(null)
    // PAQUETE 10
    const [pAmount10, setPAmount10] = useState(null)
    const [pProfit10, setPProfit10] = useState(null)
    const [pProgress10, setPProgress10] = useState(null)
    // PAQUETE 11
    const [pAmount11, setPAmount11] = useState(null)
    const [pProfit11, setPProfit11] = useState(null)
    const [pProgress11, setPProgress11] = useState(null)
    // PAQUETE 12
    const [pAmount12, setPAmount12] = useState(null)
    const [pProfit12, setPProfit12] = useState(null)
    const [pProgress12, setPProgress12] = useState(null)
    // PAQUETE 13
    const [pAmount13, setPAmount13] = useState(null)
    const [pProfit13, setPProfit13] = useState(null)
    const [pProgress13, setPProgress13] = useState(null)
    // PAQUETE 14
    const [pAmount14, setPAmount14] = useState(null)
    const [pProfit14, setPProfit14] = useState(null)
    const [pProgress14, setPProgress14] = useState(null)
    // PAQUETE 15
    const [pAmount15, setPAmount15] = useState(null)
    const [pProfit15, setPProfit15] = useState(null)
    const [pProgress15, setPProgress15] = useState(null)
    // PAQUETE 16
    const [pAmount16, setPAmount16] = useState(null)
    const [pProfit16, setPProfit16] = useState(null)
    const [pProgress16, setPProgress16] = useState(null)
    // PAQUETE 17
    const [pAmount17, setPAmount17] = useState(null)
    const [pProfit17, setPProfit17] = useState(null)
    const [pProgress17, setPProgress17] = useState(null)
    // PAQUETE 18
    const [pAmount18, setPAmount18] = useState(null)
    const [pProfit18, setPProfit18] = useState(null)
    const [pProgress18, setPProgress18] = useState(null)
    // PAQUETE 19
    const [pAmount19, setPAmount19] = useState(null)
    const [pProfit19, setPProfit19] = useState(null)
    const [pProgress19, setPProgress19] = useState(null)
    // PAQUETE 20
    const [pAmount20, setPAmount20] = useState(null)
    const [pProfit20, setPProfit20] = useState(null)
    const [pProgress20, setPProgress20] = useState(null)




    const [wallet, setWallet] = useState(''); //eslint-disable-line
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [reffered, setRefferred] = useState('');
    const code = `${username.toLowerCase()}_${shortid.generate().trim()}`;

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '' || username === '' || fullName === '' || wallet === ''

    const handleSignup = async (e) => {
        e.preventDefault()

        const usernameExists = await doesUsernameExist(username);
        if (!usernameExists.length) {
            try {
                const createdUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(emailAddress, password);
                // authentication firebase
                await createdUserResult.user.updateProfile({
                    displayName: username.toLowerCase(),
                })
                // create user in firestore
                await firebase.firestore().collection('users').doc(createdUserResult.user.uid).set({
                    Balance: 0,
                    Applied: parseInt(inversion),
                    Profit: parseInt(rendimiento),
                    Withdrawal: 0,
                    AppliedDate: null,
                    WithdrawalDate: null,
                    activePackages: [],
                    created: Date.now(),
                    createdAt: Date.now(),
                    emailAddress: emailAddress.toLowerCase().trim(),
                    fullName,
                    photoURL: '',
                    profile: {
                        location: pais,
                        description: 'Artificial Investor'
                    },
                    rol: 'investor',
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    wallet: wallet.trim(),
                    paymentMethod: '',
                    bankAccount: '',
                    holderName: '',
                    holderID: '',
                    clabe: '',
                    accountNumber: '',
                    referral: {
                        email: emailAddress.toLowerCase().trim(),
                        referrerBy: reffered,
                        referralCode: code,
                        userReferrals: [],
                        joinDate: Date.now(),
                        ReferralBalance: 0,
                        haveAlreadyPaidPercentaje: false,
                        HaveAlreadyReceivedPercentage: false,
                    },
                    cedula: parseInt(cedula),
                    packages: {
                        packageOne: {
                            packageAmount: parseInt(pAmount),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit),
                            packageProgress: parseInt(pProgress),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageTwo: {
                            packageAmount: parseInt(pAmount2),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit2),
                            packageProgress: parseInt(pProgress2),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageThree: {
                            packageAmount: parseInt(pAmount3),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit3),
                            packageProgress: parseInt(pProgress3),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageFour: {
                            packageAmount: parseInt(pAmount4),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit4),
                            packageProgress: parseInt(pProgress4),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageFive: {
                            packageAmount: parseInt(pAmount5),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit5),
                            packageProgress: parseInt(pProgress5),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageSix: {
                            packageAmount: parseInt(pAmount6),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit6),
                            packageProgress: parseInt(pProgress6),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageSeven: {
                            packageAmount: parseInt(pAmount7),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit7),
                            packageProgress: parseInt(pProgress7),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageEigth: {
                            packageAmount: parseInt(pAmount8),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit8),
                            packageProgress: parseInt(pProgress8),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageNine: {
                            packageAmount: parseInt(pAmount9),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit9),
                            packageProgress: parseInt(pProgress9),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageTeen: {
                            packageAmount: parseInt(pAmount10),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit10),
                            packageProgress: parseInt(pProgress10),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageEleven: {
                            packageAmount: parseInt(pAmount11),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit11),
                            packageProgress: parseInt(pProgress11),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageTwelve: {
                            packageAmount: parseInt(pAmount12),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit12),
                            packageProgress: parseInt(pProgress12),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageThirteen: {
                            packageAmount: parseInt(pAmount13),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit13),
                            packageProgress: parseInt(pProgress13),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageFourteen: {
                            packageAmount: parseInt(pAmount14),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit14),
                            packageProgress: parseInt(pProgress14),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageFifteen: {
                            packageAmount: parseInt(pAmount15),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit15),
                            packageProgress: parseInt(pProgress15),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageSixteen: {
                            packageAmount: parseInt(pAmount16),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit16),
                            packageProgress: parseInt(pProgress16),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageSeventeen: {
                            packageAmount: parseInt(pAmount17),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit17),
                            packageProgress: parseInt(pProgress17),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageEighteen: {
                            packageAmount: parseInt(pAmount18),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit18),
                            packageProgress: parseInt(pProgress18),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageNineteen: {
                            packageAmount: parseInt(pAmount19),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit19),
                            packageProgress: parseInt(pProgress19),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },
                        packageTwenty: {
                            packageAmount: parseInt(pAmount20),
                            packageDate: Date.now(),
                            packageID: shortid.generate().trim(),
                            packageName: 'Package',
                            packageProfit: parseInt(pProfit20),
                            packageProgress: parseInt(pProgress20),
                            uid: createdUserResult.user.uid,
                            username: username.toLowerCase(),
                        },

                    }
                })
                history.push(ROUTES.DASHBOARD);
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            } catch (error) {
                setError(error.message);
                setTimeout(() => {
                    setError('');
                }, 1500);
            }
        } else {
            setError('Username is already taken, please try another');
            setTimeout(() => {
                setError('');
            }, 1500);
        }
    }

    return (
        <AnimatePresence>

            <motion.div
                className='mx-auto max-w-screen-lg flex items-center justify-center my-20'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className={`${styles.centersignup} flex flex-col justify-center items-center`} >
                    <div className={`flex flex-col w-5/5 mb-3 ${styles.sign_up_wrapper}`} >

                        <span className='flex flex-row gap-2'>
                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Registro de usuarios:</h1>
                        </span>

                        {error &&
                            <p
                                className='mb-4 text-xs text-red-warning'
                                value={error}
                            >
                                {error}
                            </p>}

                        <form onSubmit={handleSignup} method="POST">
                            <p className='text-white-normal font-normal text-center '>Nombre de usuario: {username}</p>
                            <input
                                type="text"
                                aria-label="Enter your email username"
                                placeholder={t('Nombre de usuario')}
                                className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                onChange={({ target }) => setUsername(target.value)}
                                value={username}
                            />
                            <p className='text-white-normal font-normal text-center '>Nombre completo: {fullName}</p>
                            <input
                                type="text"
                                aria-label="Enter your full name"
                                placeholder={t('Nombre de Inversor')}
                                className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                onChange={({ target }) => setFullName(target.value)}
                                value={fullName}
                            />
                            <p className='text-white-normal font-normal text-center '>Correo: {emailAddress}</p>
                            <input
                                type="text"
                                aria-label="Enter your email address"
                                placeholder={t('Correo de inversonista')}
                                className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                onChange={({ target }) => setEmailAddress(target.value)}
                                value={emailAddress}
                            />
                            <input
                                type="password"
                                aria-label="Enter your password"
                                placeholder={t('Contraseña')}
                                className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                onChange={({ target }) => setPassword(target.value)}
                                value={password}
                            />
                            <p className='text-white-normal font-normal text-center '>USDT Wallet: {wallet}</p>
                            <input
                                type="text"
                                aria-label="Enter your usdt (trc20)"
                                placeholder={t('Wallet - (TRC20)')}
                                className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                onChange={({ target }) => setWallet(target.value)}
                                value={wallet}
                            />
                            <p className='text-white-normal font-normal text-center '>Cedula: {cedula}</p>
                            <input
                                type="number"
                                aria-label="Cedula de inversionista"
                                placeholder='Cedula de inversionista'
                                className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                onChange={({ target }) => setCedula(target.value)}
                                value={cedula}
                            />
                            <p className='text-white-normal font-normal text-center '>Inversión: {inversion}</p>
                            <input
                                type="number"
                                aria-label="Inversión USD"
                                placeholder='Inversión USD'
                                className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                onChange={({ target }) => setInversion(target.value)}
                                value={inversion}
                            />
                            <p className='text-white-normal font-normal text-center'>
                                ROI Sugerido: {(semanas / 100) * inversion}
                            </p>
                            <select
                                className='text-sm text-white-normal w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                name='semanas'
                                placeholder='SEMANAS'
                                value={semanas}
                                onChange={({ target }) => setSemanas(target.value)}
                            >
                                <option value={20} >Pago 1</option>
                                <option value={40} >Pago 2</option>
                                <option value={60} >Pago 3</option>
                                <option value={80} >Pago 4</option>
                                <option value={100} >Pago 5</option>
                                <option value={120} >Pago 6</option>
                                <option value={140} >Pago 7</option>
                                <option value={160} >Pago 8</option>
                                <option value={180} >Pago 9</option>
                                <option value={200} >Pago 10</option>

                            </select>
                            <p className='text-white-normal font-normal text-center '>Rendimiento (ROI): {rendimiento}</p>
                            <input
                                type="number"
                                aria-label="RENDIMIENTO ACTUAL"
                                placeholder='ROI ACTUAL'
                                className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                onChange={({ target }) => setRendimiento(target.value)}
                                value={rendimiento}
                            />
                            <p className='text-white-normal font-normal text-center '>Código de referido {code}</p>
                            <input
                                type="string"
                                aria-label="Código de referido"
                                placeholder='Código de referido'
                                className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                value={code}
                                disabled
                            />
                            <p className='text-white-normal font-normal text-center '>Referido por {code}</p>
                            <input
                                type="string"
                                aria-label="Código de referido"
                                placeholder='Código de referido'
                                className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                onChange={({ target }) => setRefferred(target.value)}
                                value={reffered}
                            />
                            <p className='text-white-normal font-normal text-center '>País seleccionado: {pais}</p>
                            <select
                                className='text-sm text-white-normal w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                name='country'
                                placeholder='PAIS'
                                value={pais}
                                onChange={({ target }) => setPais(target.value)}
                            >
                                <option className='text-white-normal'>{t('Elige un país...')}</option>
                                <option>{t('México')}</option>
                                <option>{t('Colombia')}</option>
                                <option>{t('USA')}</option>
                                <option>{t('Italy')}</option>
                                <option>{t('France')}</option>
                                <option>{t('Germany')}</option>
                                <option>{t('Spain')}</option>
                                <option>{t('Brazil')}</option>
                                <option>{t('Ecuador')}</option>
                                <option>{t('Chile')}</option>
                                <option>{t('Venezuela')}</option>
                                <option>{t('Puerto Rico')}</option>
                                <option>{t('El Salvador')}</option>
                                <option>{t('Guatemala')}</option>
                                <option>{t('Honduras')}</option>
                                <option>{t('Other')}</option>
                            </select>
                            <p className='text-white-normal font-normal text-center '>¿Cuántos paquetes de inversión tiene el inversor?</p>
                            <select
                                className='text-sm text-white-normal w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                name='paquetes'
                                placeholder='Cantidad de paquetes'
                                value={paquetes}
                                onChange={({ target }) => setPaquetes(target.value)}
                            >
                                <option value={0} >Ninguno</option>
                                <option value={1} >Posee 1</option>
                                <option value={2} >Posee 2</option>
                                <option value={3} >Posee 3</option>
                                <option value={4} >Posee 4</option>
                                <option value={5} >Posee 5</option>
                                <option value={6} >Posee 6</option>
                                <option value={7} >Posee 7</option>
                                <option value={8} >Posee 8</option>
                                <option value={9} >Posee 9</option>
                                <option value={10} >Posee 10</option>
                                <option value={11} >Posee 11</option>
                                <option value={12} >Posee 12</option>
                                <option value={13} >Posee 13</option>
                                <option value={14} >Posee 14</option>
                                <option value={15} >Posee 15</option>
                                <option value={16} >Posee 16</option>
                                <option value={17} >Posee 17</option>
                                <option value={18} >Posee 18</option>
                                <option value={19} >Posee 19</option>
                                <option value={20} >Posee 20</option>
                            </select>

                            {/* ==================== PAQUETE 1 =================== */}
                            {
                                parseInt(paquetes) === 1 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                    </>

                                )
                            }


                            {/* ==================== PAQUETE 2 =================== */}
                            {
                                parseInt(paquetes) === 2 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                    </>
                                )
                            }


                            {/* ==================== PAQUETE 3 =================== */}
                            {
                                parseInt(paquetes) === 3 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                    </>
                                )
                            }

                            {/* ==================== PAQUETE 4 =================== */}
                            {
                                parseInt(paquetes) === 4 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                    </>
                                )
                            }

                            {/* ==================== PAQUETE 5 =================== */}
                            {
                                parseInt(paquetes) === 5 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                    </>
                                )

                            }

                            {/* ==================== PAQUETE 6 =================== */}
                            {
                                parseInt(paquetes) === 6 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #6:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount6(target.value)}
                                            value={pAmount6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit6(target.value)}
                                            value={pProfit6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress6(target.value)}
                                            value={pProgress6}
                                        />
                                    </>
                                )
                            }

                            {/* ==================== PAQUETE 7 =================== */}
                            {
                                parseInt(paquetes) === 7 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #6:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount6(target.value)}
                                            value={pAmount6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit6(target.value)}
                                            value={pProfit6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress6(target.value)}
                                            value={pProgress6}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #7:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount7(target.value)}
                                            value={pAmount7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit7(target.value)}
                                            value={pProfit7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress7(target.value)}
                                            value={pProgress7}
                                        />
                                    </>
                                )
                            }
                            {/* ==================== PAQUETE 8 =================== */}
                            {
                                parseInt(paquetes) === 8 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #6:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount6(target.value)}
                                            value={pAmount6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit6(target.value)}
                                            value={pProfit6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress6(target.value)}
                                            value={pProgress6}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #7:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount7(target.value)}
                                            value={pAmount7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit7(target.value)}
                                            value={pProfit7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress7(target.value)}
                                            value={pProgress7}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #8:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount8(target.value)}
                                            value={pAmount8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit8(target.value)}
                                            value={pProfit8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress8(target.value)}
                                            value={pProgress8}
                                        />
                                    </>
                                )
                            }
                            {/* ==================== PAQUETE 9 =================== */}
                            {
                                parseInt(paquetes) === 9 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #6:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount6(target.value)}
                                            value={pAmount6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit6(target.value)}
                                            value={pProfit6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress6(target.value)}
                                            value={pProgress6}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #7:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount7(target.value)}
                                            value={pAmount7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit7(target.value)}
                                            value={pProfit7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress7(target.value)}
                                            value={pProgress7}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #8:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount8(target.value)}
                                            value={pAmount8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit8(target.value)}
                                            value={pProfit8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress8(target.value)}
                                            value={pProgress8}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #9:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount9(target.value)}
                                            value={pAmount9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit9(target.value)}
                                            value={pProfit9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress9(target.value)}
                                            value={pProgress9}
                                        />
                                    </>
                                )
                            }
                            {/* ==================== PAQUETE 10 =================== */}
                            {
                                parseInt(paquetes) === 10 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #6:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount6(target.value)}
                                            value={pAmount6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit6(target.value)}
                                            value={pProfit6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress6(target.value)}
                                            value={pProgress6}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #7:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount7(target.value)}
                                            value={pAmount7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit7(target.value)}
                                            value={pProfit7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress7(target.value)}
                                            value={pProgress7}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #8:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount8(target.value)}
                                            value={pAmount8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit8(target.value)}
                                            value={pProfit8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress8(target.value)}
                                            value={pProgress8}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #9:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount9(target.value)}
                                            value={pAmount9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit9(target.value)}
                                            value={pProfit9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress9(target.value)}
                                            value={pProgress9}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #10:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount10(target.value)}
                                            value={pAmount10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit10(target.value)}
                                            value={pProfit10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress10(target.value)}
                                            value={pProgress10}
                                        />
                                    </>
                                )
                            }
                            {/* ==================== PAQUETE 11 =================== */}
                            {
                                parseInt(paquetes) === 11 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #6:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount6(target.value)}
                                            value={pAmount6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit6(target.value)}
                                            value={pProfit6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress6(target.value)}
                                            value={pProgress6}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #7:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount7(target.value)}
                                            value={pAmount7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit7(target.value)}
                                            value={pProfit7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress7(target.value)}
                                            value={pProgress7}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #8:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount8(target.value)}
                                            value={pAmount8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit8(target.value)}
                                            value={pProfit8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress8(target.value)}
                                            value={pProgress8}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #9:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount9(target.value)}
                                            value={pAmount9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit9(target.value)}
                                            value={pProfit9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress9(target.value)}
                                            value={pProgress9}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #10:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount10(target.value)}
                                            value={pAmount10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit10(target.value)}
                                            value={pProfit10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress10(target.value)}
                                            value={pProgress10}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #11:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount11(target.value)}
                                            value={pAmount11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit11(target.value)}
                                            value={pProfit11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress11(target.value)}
                                            value={pProgress11}
                                        />
                                    </>
                                )
                            }
                            {/* ==================== PAQUETE 12 =================== */}
                            {
                                parseInt(paquetes) === 12 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #6:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount6(target.value)}
                                            value={pAmount6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit6(target.value)}
                                            value={pProfit6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress6(target.value)}
                                            value={pProgress6}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #7:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount7(target.value)}
                                            value={pAmount7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit7(target.value)}
                                            value={pProfit7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress7(target.value)}
                                            value={pProgress7}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #8:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount8(target.value)}
                                            value={pAmount8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit8(target.value)}
                                            value={pProfit8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress8(target.value)}
                                            value={pProgress8}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #9:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount9(target.value)}
                                            value={pAmount9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit9(target.value)}
                                            value={pProfit9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress9(target.value)}
                                            value={pProgress9}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #10:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount10(target.value)}
                                            value={pAmount10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit10(target.value)}
                                            value={pProfit10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress10(target.value)}
                                            value={pProgress10}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #11:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount11(target.value)}
                                            value={pAmount11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit11(target.value)}
                                            value={pProfit11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress11(target.value)}
                                            value={pProgress11}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #12:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount12(target.value)}
                                            value={pAmount12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit12(target.value)}
                                            value={pProfit12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress12(target.value)}
                                            value={pProgress12}
                                        />
                                    </>
                                )
                            }
                            {/* ==================== PAQUETE 13 =================== */}
                            {
                                parseInt(paquetes) === 13 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #6:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount6(target.value)}
                                            value={pAmount6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit6(target.value)}
                                            value={pProfit6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress6(target.value)}
                                            value={pProgress6}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #7:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount7(target.value)}
                                            value={pAmount7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit7(target.value)}
                                            value={pProfit7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress7(target.value)}
                                            value={pProgress7}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #8:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount8(target.value)}
                                            value={pAmount8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit8(target.value)}
                                            value={pProfit8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress8(target.value)}
                                            value={pProgress8}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #9:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount9(target.value)}
                                            value={pAmount9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit9(target.value)}
                                            value={pProfit9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress9(target.value)}
                                            value={pProgress9}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #10:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount10(target.value)}
                                            value={pAmount10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit10(target.value)}
                                            value={pProfit10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress10(target.value)}
                                            value={pProgress10}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #11:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount11(target.value)}
                                            value={pAmount11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit11(target.value)}
                                            value={pProfit11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress11(target.value)}
                                            value={pProgress11}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #12:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount12(target.value)}
                                            value={pAmount12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit12(target.value)}
                                            value={pProfit12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress12(target.value)}
                                            value={pProgress12}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #13:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount13(target.value)}
                                            value={pAmount13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit13(target.value)}
                                            value={pProfit13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress13(target.value)}
                                            value={pProgress13}
                                        />
                                    </>
                                )
                            }
                            {/* ==================== PAQUETE 14 =================== */}
                            {
                                parseInt(paquetes) === 14 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #6:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount6(target.value)}
                                            value={pAmount6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit6(target.value)}
                                            value={pProfit6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress6(target.value)}
                                            value={pProgress6}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #7:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount7(target.value)}
                                            value={pAmount7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit7(target.value)}
                                            value={pProfit7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress7(target.value)}
                                            value={pProgress7}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #8:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount8(target.value)}
                                            value={pAmount8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit8(target.value)}
                                            value={pProfit8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress8(target.value)}
                                            value={pProgress8}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #9:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount9(target.value)}
                                            value={pAmount9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit9(target.value)}
                                            value={pProfit9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress9(target.value)}
                                            value={pProgress9}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #10:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount10(target.value)}
                                            value={pAmount10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit10(target.value)}
                                            value={pProfit10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress10(target.value)}
                                            value={pProgress10}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #11:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount11(target.value)}
                                            value={pAmount11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit11(target.value)}
                                            value={pProfit11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress11(target.value)}
                                            value={pProgress11}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #12:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount12(target.value)}
                                            value={pAmount12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit12(target.value)}
                                            value={pProfit12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress12(target.value)}
                                            value={pProgress12}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #13:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount13(target.value)}
                                            value={pAmount13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit13(target.value)}
                                            value={pProfit13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress13(target.value)}
                                            value={pProgress13}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #14:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount14(target.value)}
                                            value={pAmount14}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit14(target.value)}
                                            value={pProfit14}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress14(target.value)}
                                            value={pProgress14}
                                        />
                                    </>
                                )
                            }
                            {/* ==================== PAQUETE 15 =================== */}
                            {
                                parseInt(paquetes) === 15 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #6:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount6(target.value)}
                                            value={pAmount6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit6(target.value)}
                                            value={pProfit6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress6(target.value)}
                                            value={pProgress6}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #7:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount7(target.value)}
                                            value={pAmount7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit7(target.value)}
                                            value={pProfit7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress7(target.value)}
                                            value={pProgress7}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #8:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount8(target.value)}
                                            value={pAmount8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit8(target.value)}
                                            value={pProfit8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress8(target.value)}
                                            value={pProgress8}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #9:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount9(target.value)}
                                            value={pAmount9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit9(target.value)}
                                            value={pProfit9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress9(target.value)}
                                            value={pProgress9}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #10:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount10(target.value)}
                                            value={pAmount10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit10(target.value)}
                                            value={pProfit10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress10(target.value)}
                                            value={pProgress10}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #11:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount11(target.value)}
                                            value={pAmount11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit11(target.value)}
                                            value={pProfit11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress11(target.value)}
                                            value={pProgress11}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #12:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount12(target.value)}
                                            value={pAmount12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit12(target.value)}
                                            value={pProfit12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress12(target.value)}
                                            value={pProgress12}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #13:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount13(target.value)}
                                            value={pAmount13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit13(target.value)}
                                            value={pProfit13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress13(target.value)}
                                            value={pProgress13}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #14:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount14(target.value)}
                                            value={pAmount14}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit14(target.value)}
                                            value={pProfit14}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress14(target.value)}
                                            value={pProgress14}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #15:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount15(target.value)}
                                            value={pAmount15}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit15(target.value)}
                                            value={pProfit15}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress15(target.value)}
                                            value={pProgress15}
                                        />
                                    </>
                                )
                            }
                            {/* ==================== PAQUETE 16 =================== */}
                            {
                                parseInt(paquetes) === 16 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #6:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount6(target.value)}
                                            value={pAmount6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit6(target.value)}
                                            value={pProfit6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress6(target.value)}
                                            value={pProgress6}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #7:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount7(target.value)}
                                            value={pAmount7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit7(target.value)}
                                            value={pProfit7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress7(target.value)}
                                            value={pProgress7}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #8:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount8(target.value)}
                                            value={pAmount8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit8(target.value)}
                                            value={pProfit8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress8(target.value)}
                                            value={pProgress8}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #9:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount9(target.value)}
                                            value={pAmount9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit9(target.value)}
                                            value={pProfit9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress9(target.value)}
                                            value={pProgress9}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #10:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount10(target.value)}
                                            value={pAmount10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit10(target.value)}
                                            value={pProfit10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress10(target.value)}
                                            value={pProgress10}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #11:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount11(target.value)}
                                            value={pAmount11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit11(target.value)}
                                            value={pProfit11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress11(target.value)}
                                            value={pProgress11}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #12:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount12(target.value)}
                                            value={pAmount12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit12(target.value)}
                                            value={pProfit12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress12(target.value)}
                                            value={pProgress12}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #13:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount13(target.value)}
                                            value={pAmount13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit13(target.value)}
                                            value={pProfit13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress13(target.value)}
                                            value={pProgress13}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #14:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount14(target.value)}
                                            value={pAmount14}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit14(target.value)}
                                            value={pProfit14}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress14(target.value)}
                                            value={pProgress14}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #15:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount15(target.value)}
                                            value={pAmount15}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit15(target.value)}
                                            value={pProfit15}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress15(target.value)}
                                            value={pProgress15}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #16:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount16(target.value)}
                                            value={pAmount16}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit16(target.value)}
                                            value={pProfit16}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress16(target.value)}
                                            value={pProgress16}
                                        />
                                    </>
                                )
                            }
                            {/* ==================== PAQUETE 17 =================== */}
                            {
                                parseInt(paquetes) === 17 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #6:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount6(target.value)}
                                            value={pAmount6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit6(target.value)}
                                            value={pProfit6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress6(target.value)}
                                            value={pProgress6}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #7:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount7(target.value)}
                                            value={pAmount7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit7(target.value)}
                                            value={pProfit7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress7(target.value)}
                                            value={pProgress7}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #8:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount8(target.value)}
                                            value={pAmount8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit8(target.value)}
                                            value={pProfit8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress8(target.value)}
                                            value={pProgress8}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #9:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount9(target.value)}
                                            value={pAmount9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit9(target.value)}
                                            value={pProfit9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress9(target.value)}
                                            value={pProgress9}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #10:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount10(target.value)}
                                            value={pAmount10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit10(target.value)}
                                            value={pProfit10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress10(target.value)}
                                            value={pProgress10}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #11:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount11(target.value)}
                                            value={pAmount11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit11(target.value)}
                                            value={pProfit11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress11(target.value)}
                                            value={pProgress11}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #12:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount12(target.value)}
                                            value={pAmount12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit12(target.value)}
                                            value={pProfit12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress12(target.value)}
                                            value={pProgress12}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #13:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount13(target.value)}
                                            value={pAmount13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit13(target.value)}
                                            value={pProfit13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress13(target.value)}
                                            value={pProgress13}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #14:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount14(target.value)}
                                            value={pAmount14}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit14(target.value)}
                                            value={pProfit14}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress14(target.value)}
                                            value={pProgress14}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #15:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount15(target.value)}
                                            value={pAmount15}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit15(target.value)}
                                            value={pProfit15}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress15(target.value)}
                                            value={pProgress15}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #16:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount16(target.value)}
                                            value={pAmount16}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit16(target.value)}
                                            value={pProfit16}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress16(target.value)}
                                            value={pProgress16}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #17:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount17(target.value)}
                                            value={pAmount17}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit17(target.value)}
                                            value={pProfit17}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress17(target.value)}
                                            value={pProgress17}
                                        />
                                    </>
                                )
                            }
                            {/* ==================== PAQUETE 18 =================== */}
                            {
                                parseInt(paquetes) === 18 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #6:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount6(target.value)}
                                            value={pAmount6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit6(target.value)}
                                            value={pProfit6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress6(target.value)}
                                            value={pProgress6}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #7:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount7(target.value)}
                                            value={pAmount7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit7(target.value)}
                                            value={pProfit7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress7(target.value)}
                                            value={pProgress7}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #8:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount8(target.value)}
                                            value={pAmount8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit8(target.value)}
                                            value={pProfit8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress8(target.value)}
                                            value={pProgress8}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #9:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount9(target.value)}
                                            value={pAmount9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit9(target.value)}
                                            value={pProfit9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress9(target.value)}
                                            value={pProgress9}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #10:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount10(target.value)}
                                            value={pAmount10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit10(target.value)}
                                            value={pProfit10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress10(target.value)}
                                            value={pProgress10}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #11:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount11(target.value)}
                                            value={pAmount11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit11(target.value)}
                                            value={pProfit11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress11(target.value)}
                                            value={pProgress11}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #12:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount12(target.value)}
                                            value={pAmount12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit12(target.value)}
                                            value={pProfit12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress12(target.value)}
                                            value={pProgress12}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #13:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount13(target.value)}
                                            value={pAmount13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit13(target.value)}
                                            value={pProfit13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress13(target.value)}
                                            value={pProgress13}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #14:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount14(target.value)}
                                            value={pAmount14}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit14(target.value)}
                                            value={pProfit14}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress14(target.value)}
                                            value={pProgress14}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #15:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount15(target.value)}
                                            value={pAmount15}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit15(target.value)}
                                            value={pProfit15}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress15(target.value)}
                                            value={pProgress15}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #16:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount16(target.value)}
                                            value={pAmount16}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit16(target.value)}
                                            value={pProfit16}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress16(target.value)}
                                            value={pProgress16}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #17:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount17(target.value)}
                                            value={pAmount17}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit17(target.value)}
                                            value={pProfit17}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress17(target.value)}
                                            value={pProgress17}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #18:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount18(target.value)}
                                            value={pAmount18}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit18(target.value)}
                                            value={pProfit18}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress18(target.value)}
                                            value={pProgress18}
                                        />
                                    </>
                                )
                            }
                            {/* ==================== PAQUETE 19 =================== */}
                            {
                                parseInt(paquetes) === 19 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #6:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount6(target.value)}
                                            value={pAmount6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit6(target.value)}
                                            value={pProfit6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress6(target.value)}
                                            value={pProgress6}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #7:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount7(target.value)}
                                            value={pAmount7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit7(target.value)}
                                            value={pProfit7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress7(target.value)}
                                            value={pProgress7}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #8:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount8(target.value)}
                                            value={pAmount8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit8(target.value)}
                                            value={pProfit8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress8(target.value)}
                                            value={pProgress8}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #9:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount9(target.value)}
                                            value={pAmount9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit9(target.value)}
                                            value={pProfit9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress9(target.value)}
                                            value={pProgress9}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #10:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount10(target.value)}
                                            value={pAmount10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit10(target.value)}
                                            value={pProfit10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress10(target.value)}
                                            value={pProgress10}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #11:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount11(target.value)}
                                            value={pAmount11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit11(target.value)}
                                            value={pProfit11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress11(target.value)}
                                            value={pProgress11}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #12:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount12(target.value)}
                                            value={pAmount12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit12(target.value)}
                                            value={pProfit12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress12(target.value)}
                                            value={pProgress12}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #13:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount13(target.value)}
                                            value={pAmount13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit13(target.value)}
                                            value={pProfit13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress13(target.value)}
                                            value={pProgress13}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #14:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount14(target.value)}
                                            value={pAmount14}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit14(target.value)}
                                            value={pProfit14}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress14(target.value)}
                                            value={pProgress14}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #15:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount15(target.value)}
                                            value={pAmount15}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit15(target.value)}
                                            value={pProfit15}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress15(target.value)}
                                            value={pProgress15}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #16:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount16(target.value)}
                                            value={pAmount16}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit16(target.value)}
                                            value={pProfit16}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress16(target.value)}
                                            value={pProgress16}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #17:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount17(target.value)}
                                            value={pAmount17}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit17(target.value)}
                                            value={pProfit17}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress17(target.value)}
                                            value={pProgress17}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #18:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount18(target.value)}
                                            value={pAmount18}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit18(target.value)}
                                            value={pProfit18}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress18(target.value)}
                                            value={pProgress18}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #19:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount19(target.value)}
                                            value={pAmount19}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit19(target.value)}
                                            value={pProfit19}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress19(target.value)}
                                            value={pProgress19}
                                        />
                                    </>
                                )
                            }
                            {/* ==================== PAQUETE 20 =================== */}
                            {
                                parseInt(paquetes) === 20 && (
                                    <>
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #1:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount(target.value)}
                                            value={pAmount}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit(target.value)}
                                            value={pProfit}
                                        />

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress(target.value)}
                                            value={pProgress}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #2:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount2(target.value)}
                                            value={pAmount2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Rendimiento"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit2(target.value)}
                                            value={pProfit2}
                                        />

                                        <input
                                            type="number"
                                            aria-label="Progreso"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress2(target.value)}
                                            value={pProgress2}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #3:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount3(target.value)}
                                            value={pAmount3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit3(target.value)}
                                            value={pProfit3}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress3(target.value)}
                                            value={pProgress3}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #4:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount4(target.value)}
                                            value={pAmount4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit4(target.value)}
                                            value={pProfit4}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress4(target.value)}
                                            value={pProgress4}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #5:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount5(target.value)}
                                            value={pAmount5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit5(target.value)}
                                            value={pProfit5}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress5(target.value)}
                                            value={pProgress5}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #6:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount6(target.value)}
                                            value={pAmount6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit6(target.value)}
                                            value={pProfit6}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress6(target.value)}
                                            value={pProgress6}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #7:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount7(target.value)}
                                            value={pAmount7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit7(target.value)}
                                            value={pProfit7}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress7(target.value)}
                                            value={pProgress7}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #8:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount8(target.value)}
                                            value={pAmount8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit8(target.value)}
                                            value={pProfit8}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress8(target.value)}
                                            value={pProgress8}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #9:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount9(target.value)}
                                            value={pAmount9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit9(target.value)}
                                            value={pProfit9}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress9(target.value)}
                                            value={pProgress9}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #10:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount10(target.value)}
                                            value={pAmount10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit10(target.value)}
                                            value={pProfit10}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress10(target.value)}
                                            value={pProgress10}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #11:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount11(target.value)}
                                            value={pAmount11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit11(target.value)}
                                            value={pProfit11}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress11(target.value)}
                                            value={pProgress11}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #12:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount12(target.value)}
                                            value={pAmount12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit12(target.value)}
                                            value={pProfit12}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress12(target.value)}
                                            value={pProgress12}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #13:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount13(target.value)}
                                            value={pAmount13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit13(target.value)}
                                            value={pProfit13}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress13(target.value)}
                                            value={pProgress13}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #14:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount14(target.value)}
                                            value={pAmount14}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit14(target.value)}
                                            value={pProfit14}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress14(target.value)}
                                            value={pProgress14}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #15:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount15(target.value)}
                                            value={pAmount15}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit15(target.value)}
                                            value={pProfit15}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress15(target.value)}
                                            value={pProgress15}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #16:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount16(target.value)}
                                            value={pAmount16}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit16(target.value)}
                                            value={pProfit16}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress16(target.value)}
                                            value={pProgress16}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #17:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount17(target.value)}
                                            value={pAmount17}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit17(target.value)}
                                            value={pProfit17}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress17(target.value)}
                                            value={pProgress17}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #18:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount18(target.value)}
                                            value={pAmount18}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit18(target.value)}
                                            value={pProfit18}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress18(target.value)}
                                            value={pProgress18}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #19:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount19(target.value)}
                                            value={pAmount19}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit19(target.value)}
                                            value={pProfit19}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress19(target.value)}
                                            value={pProgress19}
                                        />
                                        <span className='flex flex-row gap-2'>
                                            <h1 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'> Paquetes de usuarios #20:</h1>
                                        </span>

                                        <input
                                            type="number"
                                            aria-label="INVERSION PAQUETE 1"
                                            placeholder="Cantidad de Inversión"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPAmount20(target.value)}
                                            value={pAmount20}
                                        />

                                        <input
                                            type="number"
                                            aria-label="RENDIMIENTO PAQUETE 1"
                                            placeholder="Rendimiento hasta el momento"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProfit20(target.value)}
                                            value={pProfit20}
                                        />

                                        <input
                                            type="number"
                                            aria-label="PAGADO PAQUETE 1"
                                            placeholder="Semanas pagadas"
                                            className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                            onChange={({ target }) => setPProgress20(target.value)}
                                            value={pProgress20}
                                        />
                                    </>
                                )
                            }


                            {
                                !isInvalid ? (

                                    <motion.button
                                        // disabled={isInvalid}
                                        type='submit'
                                        className={`bg-white-login_button w-full text-black-normal rounded h-14 mt-3 font-lato-900 font-bold text-xl`}
                                        // ${isInvalid && 'cursor-not-allowed '}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {t('Sign up')}
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        disabled
                                        type='submit'
                                        className={`bg-white-login_button w-full text-black-normal rounded h-14 mt-3 font-lato-900 font-bold text-xl cursor-not-allowed`}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {t('Sign up')}
                                    </motion.button>
                                )
                            }
                        </form>
                    </div>


                </div>


            </motion.div>
        </AnimatePresence>
    );
};
export default ManualSignupUsers