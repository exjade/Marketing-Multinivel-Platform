import React, { useState, useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import CookieConsent from 'react-cookie-consent';
//Context
import FirebaseContext from '../context/firebase';
//module styles
import styles from '../styles/modules/auth/login.module.css'
import style from '../styles/landing/landing.module.css'
import { authentication } from '../lib/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
//routes
import * as ROUTES from '../constants/routes';
//framer motion
import { motion, AnimatePresence } from 'framer-motion';

import { useTranslation } from 'react-i18next';
import TranslationBtn from '../components/translations/translationBtn';

const Login = () => {
    useEffect(() => { document.title = 'Log In - Artificial' }, []); //eslint-disable-line
    const { t } = useTranslation()
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');


    const [error, setError] = useState('');
    const isInvalid = password === '' || emailAddress === '';


    /*=========================== Auth with Email & Password  ===========================*/
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            history.push(ROUTES.DASHBOARD);
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
                if (!isInvalid) setPassword('');
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
            'callback': (response) => { //eslint-disable-line
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
        e.preventDefault()
        const otp = e.target.value
        setOTP(otp)

        if (otp?.length >= 6) {
            const confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp).then((result) => {
                // User signed in successfully.
                const user = result.user; //eslint-disable-line
            }).catch((error) => {
                // User couldn't sign in (bad verification code?)
                console.log(error)
            });
        }
    }

    return (
        <AnimatePresence>


            <motion.div
                className={`${styles.bg} container flex flex-col mx-auto max-w-screen mt-15 items-center justify-center h-screen font-Inter-600 `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className={`flex flex-col justify-center items-center`} >
                    {/* image */}

                    <div className={`flex flex-col w-5/5 mb-3 ${styles.wrapper}`} >

                        <span className='flex justify-center items-start w-full mb-10'>
                            <p className=' w-full text-white-normal text-4xl font-medium'>Login</p>
                        </span>




                        {/* END CHOOSE SIGN IN OPTION */}

                        {error &&
                            <p
                                className='mb-4 text-xs text-red-warning'
                                value={error}
                            >
                                {error}
                            </p>}
                        {/*  ============================================== EMAIL AUTH ==============================================  */}
                        {signInMethod?.email && (
                            <form
                                onSubmit={handleLogin}
                                method="POST">
                                <input
                                    type="text"
                                    aria-label="Enter your email address"
                                    placeholder={t('Email')}
                                    className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-14  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100'
                                    onChange={({ target }) => setEmailAddress(target.value)}
                                />
                                <input
                                    value={password}
                                    type="password"
                                    aria-label="Enter your password"
                                    placeholder={t('Password')}
                                    className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-14  border-white-primary border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-lato-100'
                                    onChange={({ target }) => setPassword(target.value)}
                                />
                                <motion.button
                                    disabled={isInvalid}
                                    type='submit'
                                    className={`bg-white-login_button hover:bg-blue-feedback flex items-center justify-center w-full text-black-normal hover:text-white-normal rounded h-14 mt-3 font-lato-900 font-bold text-xl 
                        ${isInvalid && 'cursor-not-allowed '}`}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {t('Login')}
                                </motion.button>
                            </form>
                        )}

                        {/*  ============================================== PHONE AUTH ==============================================  */}
                        {signInMethod?.phone && (
                            <form onSubmit={requestOTP} method="POST">
                                <input
                                    type="text"
                                    aria-label="PhoneNumber"
                                    placeholder={t('Example: +11234567890')}
                                    className='text-sm text-white-placeholder w-full mr-3 py-8 px-8 h-5  border-white-normal border-b-2 rounded-md mb-2 mt-3 outline-none bg-black-backg font-lato-100'
                                    onChange={({ target }) => setPhoneNumber(target.value)}
                                    value={phoneNumber}
                                />
                                {
                                    expandForm && (
                                        <input
                                            type="text"
                                            aria-label="Enter OTP"
                                            placeholder={t('Confirm OTP')}
                                            className='text-sm text-white-placeholder w-full mr-3 py-8 px-8 h-5  border-white-normal border-b-2 rounded-md mb-2 mt-3 outline-none bg-black-backg font-lato-100'
                                            onChange={verifyOTP}
                                            value={OTP}
                                        />
                                    )
                                }
                                <motion.button
                                    type='submit'
                                    className={`bg-white-login_button w-full text-black-normal rounded h-14 mt-3 font-lato-900 font-bold text-xl
                        `}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {t('Send SMS')}
                                </motion.button>
                            </form>
                        )}

                    </div>


                    <div className={`flex justify-center items-center flex-col bg-white p-4 ${styles.donthaveaccount}`} >
                        <p className='text-sm font-lato-900 text-gray-primary'>
                            {t('Don`t have an account?')} {``}
                            <Link
                                to={ROUTES.SIGN_UP}
                                className='text-white-normal font-bold ml-1'
                            >
                                {t('Sign up')}
                            </Link>
                        </p>
                        <p className='text-sm font-lato-900 text-gray-primary'>
                            <Link
                                to={ROUTES.RECOVERPASSWORD}
                                className='text-white-normal font-bold ml-1'
                            >
                                {t('Forgot your password?')}
                            </Link>
                        </p>
                    </div>
                    <div id='recaptcha-container'></div>
                </div>

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


                <CookieConsent
                    location="bottom"
                    buttonText="Accept"
                    cookieName="PolicyAndTerms"
                    style={{ background: '#11193E' }}
                    buttonStyle={{ color: '#CFCFCF', fontSize: '10px' }}
                    expires={360}
                >We use cookies to enhance your browsing experience on this website.  {' '}.
                    <span style={{ fontSize: '10px' }}>By clicking "Accept," you agree to the terms and conditions.</span>
                </CookieConsent>
                {/* <div className={`${style.translationFixed}`} >
                    <TranslationBtn />
                </div> */}
            </motion.div>
        </AnimatePresence>
    );
};
export default Login