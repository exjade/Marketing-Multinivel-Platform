import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import shortid from 'shortid';
import { v4 as uuidv4 } from 'uuid';
//Context
import FirebaseContext from '../context/firebase';

//module styles
import styles from '../styles/modules/auth/auth.module.css'
//eslint-disable-next-line
import style from '../styles/landing/landing.module.css'
import '../styles/recaptcha/recaptcha.css'
//routes
import * as ROUTES from '../constants/routes';
//services
import { doesUsernameExist } from '../services/firebase';
//framer motion
import { motion, AnimatePresence } from 'framer-motion';

import { useTranslation } from 'react-i18next';
import ReCAPTCHA from 'react-google-recaptcha';
import { authentication } from '../lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// import TranslationBtn from '../components/translations/translationBtn';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ActionSuccess from '../components/actions-status/success';
import useActionSuccess from '../hooks/action-status/action-success';


const ReferralSignUp = () => {
    useEffect(() => {
        document.title = 'Create referral account - CapitalTradersBusiness';
    }, []); //eslint-disable-line

    const { successAction, handleActiveActión } = useActionSuccess()

    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);
    const { t } = useTranslation()
    const { referralCode } = useParams();

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [wallet, setWallet] = useState(''); //eslint-disable-line
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '' || username === '' || fullName === '' || wallet === ''
    const [captchaValido, setCambiarCaptchaValido] = useState(null);
    const [usuarioValido, setCambiarUsuarioValido] = useState(false);
    const [captchaError, setCaptchaError] = useState(false); //eslint-disable-line
    const [captchaExpired, setCaptchaExpired] = useState(false) //eslint-disable-line
    var grecaptcha;
    const [secretWord, setSecretWord] = useState('')



    const captcha = useRef(null);

    const onChange = () => {
        if (captcha.current.getValue()) {
            setCambiarCaptchaValido(true);
        }
    }

    const submit = () => {

        // Validamos los inputs del formulario
        // Si son correctos ya podemos enviar el fomulario, actualizar la Interfaz, etc.

        if (captcha.current.getValue()) {
            setCambiarUsuarioValido(true);
            setCambiarCaptchaValido(true);
            setCaptchaExpired(true);
        } else {
            setCaptchaError('Por favor acepta el captcha');
            setCambiarUsuarioValido(false);
            setCambiarCaptchaValido(false);
            setCaptchaExpired(false);
        }

        if (window.grecaptcha) grecaptcha.reset();
    }


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
                    Applied: 0,
                    Profit: 0,
                    Withdrawal: 0,
                    AppliedDate: null,
                    WithdrawalDate: null,
                    activePackages: [],
                    created: Date.now(),
                    createdAt: Date.now(),
                    emailAddress: emailAddress.toLowerCase().trim(),
                    fullName,
                    photoURL: '',
                    pin: '',
                    secretWord: secretWord.trim(),
                    profile: {
                        location: 'Earth',
                        description: 'CapitalTradersBusiness Investor'
                    },
                    rol: 'investor',
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase().trim(),
                    wallet: wallet.trim(),
                    paymentMethod: '',
                    bankAccount: '',
                    holderName: '',
                    holderID: '',
                    clabe: '',
                    accountNumber: '',
                    referral: {
                        id: uuidv4(),
                        email: emailAddress.toLowerCase().trim(),
                        referrerBy: referralCode,
                        referralCode: `${username.toLowerCase().trim()}_${shortid.generate().trim()}`,
                        userReferrals: [],
                        joinDate: Date.now(),
                        ReferralBalance: 0,
                        gananciasTotales: 0,
                        LastPaymentBalance: 0,
                        haveAlreadyPaidPercentaje: false,
                        HaveAlreadyReceivedPercentage: false,
                    },
                    topupBalance: 0,
                })
                submit()
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
            setError('Usersname is already taken, please try another');
            setTimeout(() => {
                setError('');
            }, 1500);
        }
    }

    /*=========================== Auth with Phone Number  ===========================*/
    const [signInMethod, setSignInMethod] = useState({
        email: true,
        phone: false
    })
    const [phoneNumber, setPhoneNumber] = useState('');
    const [OTP, setOTP] = useState('');
    const [expandForm, setExpandForm] = useState(false);


    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {//eslint-disable-line
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, authentication);
    }

    const requestOTP = async (e) => {
        e.preventDefault()

        if (phoneNumber?.length >= 12) {
            setExpandForm(true)
            generateRecaptcha()
            const appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    window.confirmationResult = confirmationResult;
                    // ...
                }).catch((error) => {
                    // Error; SMS not sent
                    console.log(error)
                });
        }
    }


    const verifyOTP = async (e) => {


        try {
            e.preventDefault()
            const otp = e.target.value
            setOTP(otp)

            if (otp?.length >= 6) {
                const confirmationResult = window.confirmationResult;
                confirmationResult
                    .confirm(otp)
                    .then(async (result) => {
                        // User signed in successfully.
                        const user = result.user;

                        const usernameExists = await doesUsernameExist(username);
                        if (!usernameExists.length) {
                            try {
                                const createdUserResult = await firebase
                                    .auth()
                                    .createUserWithEmailAndPassword(emailAddress, password);
                                // authentication firebase
                                await createdUserResult.user.updateProfile({
                                    displayName: username.toLowerCase(),
                                    phoneNumber: phoneNumber,
                                    uid: user.uid
                                })
                                // create user in firestore
                                await firebase.firestore().collection('users').doc(user.uid).set({
                                    Balance: 0,
                                    Applied: 0,
                                    Profit: 0,
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
                                        location: 'Somewhere',
                                        description: 'CapitalTradersBusiness '
                                    },
                                    pin: '',
                                    secretWord: secretWord.trim(),
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
                                        referrerBy: referralCode,
                                        referralCode: `${username.toLowerCase()}_${shortid.generate().trim()}`,
                                        userReferrals: [],
                                        joinDate: Date.now(),
                                        ReferralBalance: 0,
                                        gananciasTotales: 0,
                                        LastPaymentBalance: 0,
                                        haveAlreadyPaidPercentaje: false,
                                        HaveAlreadyReceivedPercentage: false,
                                    },
                                    topupBalance: 0,
                                })
                            } catch (error) { console.log(error) }
                        }
                        history.push(ROUTES.CREATEDUSER);
                        setTimeout(() => {
                            window.location.reload()
                        }, 1300);
                        clearWebsiteData()
                        window.location.reload()
                    }).catch((error) => {
                        // User couldn't sign in (bad verification code?)
                        console.log(error)
                    });
            }
        } catch (error) {
            console.log(error)
        }


    }

    const clearWebsiteData = async () => {

        // Get cache storage and clear cache storage
        window.caches.keys().then(function (names) {
            for (let name of names)
                window.caches.delete(name);
        });

        // Get indexed db and delete indexed db
        const dbs = await window.indexedDB.databases()
        dbs.forEach(db => { window.indexedDB.deleteDatabase(db.name) })

        // clear localStorage
        window.localStorage.clear();

        // clear sessionStorage
        window.sessionStorage.clear();

    }


    useEffect(() => {
        function generateSecretWord(length) {
            var characteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var secretWord = '';

            for (var i = 0; i < length; i++) {
                var index = Math.floor(Math.random() * characteres.length);
                secretWord += characteres.charAt(index);
            }
            setSecretWord(secretWord)
            return secretWord;
        }
        return generateSecretWord(40)
    }, [])


    return (
        <AnimatePresence>

            <motion.div
                className={`${styles.bg} container flex flex-col mx-auto max-w-screen items-center justify-center h-screen font-Inter-600`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {!usuarioValido &&
                    <div className={`${styles.centersignup} flex flex-col justify-center items-center`} >
                        {/* image */}
                        <div className={`flex flex-col w-5/5 mb-3 ${styles.sign_up_wrapper}`} >

                            <span className='flex flex-col justify-center items-start w-full mb-10'>
                                <p className=' w-full text-white-normal text-4xl font-medium'>Register,</p>
                                <p className=' w-full text-white-normal text-xl font-normal'>{referralCode}</p>

                            </span>


                            {/* END CHOOSE SIGN IN OPTION */}

                            {error &&
                                <p
                                    className='mb-4 text-xs text-red-warning'
                                    value={error}
                                >
                                    {error}
                                </p>}

                            {
                                successAction &&
                                <ActionSuccess
                                    action={`secret key`}
                                />
                            }

                            {signInMethod?.email && (
                                <form onSubmit={handleSignup} method="POST" className={styles.form}>

                                    <input
                                        type="text"
                                        aria-label="Enter your email username"
                                        placeholder={t('Username')}
                                        className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100'
                                        onChange={({ target }) => setUsername(target.value)}
                                        value={username}
                                    />
                                    <input
                                        type="text"
                                        aria-label="Enter your full name"
                                        placeholder={t('Full_Name')}
                                        className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100'
                                        onChange={({ target }) => setFullName(target.value)}
                                        value={fullName}
                                    />
                                    <input
                                        type="text"
                                        aria-label="Enter your email address"
                                        placeholder={t('Email')}
                                        className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100'
                                        onChange={({ target }) => setEmailAddress(target.value)}
                                        value={emailAddress}
                                    />
                                    <input
                                        type="password"
                                        aria-label="Enter your password"
                                        placeholder={t('Password')}
                                        className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100'
                                        onChange={({ target }) => setPassword(target.value)}
                                        value={password}
                                    />
                                    <input
                                        type="text"
                                        aria-label="Enter your usdt (trc20) - REQUIRED"
                                        placeholder={t('Wallet - (TRC20)')}
                                        className={`${wallet?.length > 10 && 'border border-green-radored'} text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100`}
                                        onChange={({ target }) => setWallet(target.value)}
                                        value={wallet}
                                    />
                                    <CopyToClipboard text={secretWord.trim()}>
                                        <button
                                            type="button"
                                            placeholder={secretWord.trim()}
                                            className={`${wallet?.length > 10 && 'border border-green-radored'} text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100 cursor-copy truncate`}
                                            onClick={() => handleActiveActión()}
                                        >
                                            {secretWord.trim()}
                                        </button>
                                    </CopyToClipboard>
                                    <q className='text-white-normal text-xs italic my-4'>Please,don't forget your secret key or you will not be able to withdraw money from your account.</q>
                                    <div className="recaptcha" >
                                        <ReCAPTCHA
                                            ref={captcha}
                                            sitekey={process.env.REACT_APP_GOOGLE_SITEKEY}
                                            onChange={onChange}
                                        />
                                    </div>

                                    {captchaValido === false && <div className="error_captcha text-red-warning" >Please, verify the captcha</div>}
                                    {
                                        captchaValido && !isInvalid ? (

                                            <motion.button
                                                // disabled={isInvalid}
                                                type='submit'
                                                className={`bg-white-login_button w-full text-black-normal hover:bg-blue-feedback hover:text-white-normal rounded h-14 mt-3 font-inter-600 font-bold text-xl`}
                                                // ${isInvalid && 'cursor-not-allowed '}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {t('Create an Account')}
                                            </motion.button>
                                        ) : (
                                            <motion.button
                                                disabled
                                                type='submit'
                                                className={`bg-white-login_button w-full text-black-normal hover:bg-blue-feedback hover:text-white-normal rounded h-14 mt-3 font-inter-600 font-bold text-xl cursor-not-allowed`}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {t('Create an Account')}
                                            </motion.button>
                                        )
                                    }
                                </form>
                            )
                            }

                            {signInMethod?.phone && (
                                <form onSubmit={requestOTP} method="POST" className={styles.form}>

                                    <input
                                        type="text"
                                        aria-label="Enter your email username"
                                        placeholder={t('Username')}
                                        className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100'
                                        onChange={({ target }) => setUsername(target.value)}
                                        value={username}
                                    />
                                    <input
                                        type="text"
                                        aria-label="Enter your full name"
                                        placeholder={t('Full_Name')}
                                        className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100'
                                        onChange={({ target }) => setFullName(target.value)}
                                        value={fullName}
                                    />
                                    <input
                                        type="text"
                                        aria-label="Enter your email address"
                                        placeholder={t('Email')}
                                        className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100'
                                        onChange={({ target }) => setEmailAddress(target.value)}
                                        value={emailAddress}
                                    />
                                    <input
                                        type="code"
                                        aria-label=""
                                        placeholder={t('text')}
                                        className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100'
                                        onChange={({ target }) => setPassword(target.value)}
                                        value={referralCode.trim()}
                                    />
                                    <input
                                        type="password"
                                        aria-label="Enter your password"
                                        placeholder={t('Password')}
                                        className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100'
                                        onChange={({ target }) => setPassword(target.value)}
                                        value={password}
                                    />
                                    <input
                                        type="text"
                                        aria-label="Enter your usdt (trc20) - REQUIRED"
                                        placeholder={t('Wallet - (TRC20)')}
                                        className={`${wallet?.length > 10 && 'border border-green-radored'} text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100`}
                                        onChange={({ target }) => setWallet(target.value)}
                                        value={wallet}
                                    />
                                    <CopyToClipboard text={secretWord.trim()}>
                                        <button
                                            type="button"
                                            placeholder={secretWord.trim()}
                                            className={`${wallet?.length > 10 && 'border border-green-radored'} text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100 cursor-copy truncate`}
                                        >
                                            {secretWord.trim()}
                                        </button>
                                    </CopyToClipboard>
                                    <input
                                        type="text"
                                        aria-label="PhoneNumber"
                                        placeholder={t('Example: +11234567890')}
                                        className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100'
                                        onChange={({ target }) => setPhoneNumber(target.value)}
                                        value={phoneNumber}
                                    />
                                    {
                                        expandForm && (
                                            <input
                                                type="text"
                                                aria-label="Enter OTP"
                                                placeholder={t('Confirm OTP')}
                                                className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-5  border-gray-border border-b-2 rounded-md mb-2 mt-3 outline-none bg-gray-login_input_bg font-lato-100'
                                                onChange={verifyOTP}
                                                value={OTP}
                                            />
                                        )
                                    }

                                    {
                                        !expandForm && (
                                            <motion.button
                                                // disabled={isInvalid}
                                                type='submit'
                                                className={`bg-white-login_button w-full text-black-normal rounded h-14 mt-3 font-lato-900 font-bold text-xl`}
                                                // ${isInvalid && 'cursor-not-allowed '}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {t('Send SMS')}
                                            </motion.button>
                                        )
                                    }
                                </form>
                            )
                            }

                        </div>

                        <div className={`flex justify-center items-center flex-col bg-white p-4 ${styles.donthaveaccount}`} >
                            <p className='text-sm font-lato-900 text-gray-primary'>
                                {t('Already have an account')} {``}
                                <a
                                    href={ROUTES.LOGIN}
                                    className='text-white-normal font-bold ml-1'
                                >
                                    {t('Login')}
                                </a>
                            </p>
                        </div>

                        <div id='recaptcha-container'></div>

                        {/* SIGN IN METHOD */}
                        <section className='flex flex-row gap-5 justify-center items-center my-10'>
                            {/* I want a button for sign up with phone number, with padding and background transparent with border color */}
                            <div className='flex flex-row justify-center items-center gap-2'>
                                <button
                                    type='button'
                                    onClick={() => setSignInMethod({ email: false, phone: true })}
                                    className='flex flex-row justify-center items-center gap-2 w-32 bg-transparent border-2 border-gray-border rounded-full py-2 px-6 text-white-placeholder font-lato-100 text-sm'>
                                    <span className="material-symbols-sharp">
                                        sms
                                    </span>
                                </button>
                            </div>
                            <div className='flex flex-row justify-center items-center gap-2'>
                                <button
                                    type='button'
                                    onClick={() => setSignInMethod({ email: true, phone: false })}
                                    className='flex flex-row justify-center items-center gap-2 w-32 bg-transparent border-2 border-gray-border rounded-full py-2 px-6 text-white-placeholder font-lato-100 text-sm'>
                                    <span className="material-symbols-sharp">
                                        alternate_email
                                    </span>
                                </button>
                            </div>
                        </section>
                    </div>
                }
                {/* <div className={`${style.translationFixed}`} >
                    <TranslationBtn />
                </div> */}

            </motion.div>
        </AnimatePresence>
    );
};
export default ReferralSignUp