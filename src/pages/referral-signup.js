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
        generateRecaptcha()
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
                        referralCode: `${username.toLowerCase().trim()}_000${shortid.generate().trim()}`,
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


    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {//eslint-disable-line
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, authentication);
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
                className={`${styles['login-container']}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className={`${styles.centersignup} flex flex-col justify-center items-center`} >
                    <div className={`${styles['login-wrapper']}`} >

                        <div className={`${styles['login-branding']}`} >
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 90 }}
                                whileTap={{
                                    scale: 0.8,
                                    rotate: -90,
                                    borderRadius: '100%'
                                }}
                                className={`${styles['login-branding-box']}`}>
                                <img
                                    src="/logo.webp"
                                    alt="ctb-logo"
                                    className='w-12 h-12 object-contain'
                                />
                            </motion.div>
                            <h2>Create your free account</h2>
                        </div>



                        {/* END CHOOSE SIGN IN OPTION */}

                        {error &&
                            <p
                                className='mb-4 text-xs text-red-warning'
                                value={error}
                            >
                                {error}
                            </p>}


                        <form
                            onSubmit={handleSignup}
                            method="POST"
                            className={`${styles['login-form']}`}
                        >


                            <div className={`${styles['login-form-container']}`}>
                                <input
                                    type='text'
                                    aria-label="Enter your email username"
                                    placeholder={t('Username')}
                                    className={styles['login-form-input']}
                                    onChange={({ target }) => setUsername(target.value)}
                                    value={username}
                                />
                            </div>
                            <div className={`${styles['login-form-container']}`}>
                                <input
                                    type="text"
                                    aria-label="Enter your full name"
                                    placeholder={t('Full_Name')}
                                    className={styles['login-form-input']}
                                    onChange={({ target }) => setFullName(target.value)}
                                    value={fullName}
                                />
                            </div>
                            <div className={`${styles['login-form-container']}`}>

                                <input
                                    type="text"
                                    aria-label="Enter your email address"
                                    placeholder={t('Email')}
                                    className={styles['login-form-input']}
                                    onChange={({ target }) => setEmailAddress(target.value)}
                                    value={emailAddress}
                                />
                            </div>
                            <div className={`${styles['login-form-container']}`}>

                                <input
                                    type="password"
                                    aria-label="Enter your password"
                                    placeholder={t('Password')}
                                    className={styles['login-form-input']}
                                    onChange={({ target }) => setPassword(target.value)}
                                    value={password}
                                />
                            </div>
                            <div className={`${styles['login-form-container']}`}>

                                <input
                                    type="text"
                                    aria-label="Enter your usdt (trc20) - REQUIRED"
                                    placeholder={t('Wallet - (TRC20)')}
                                    className={styles['login-form-input']}
                                    onChange={({ target }) => setWallet(target.value)}
                                    value={wallet}
                                />
                            </div>
                            <div className={`${styles['login-form-container']}`}>

                                <input
                                    disabled
                                    type="text"
                                    className={styles['login-form-input']}
                                    value={referralCode}
                                />
                            </div>



                            {captchaValido === false && <div className="error_captcha text-red-warning" >Please, verify the captcha</div>}
                            {
                                captchaValido && !isInvalid ? (

                                    <motion.button
                                        type='submit'
                                        whileTap={{ scale: 0.95 }}
                                        className={`${styles['login-form-button']} ${isInvalid && 'cursor-not-allowed'}`}
                                    >
                                        {t('Sign Up')}
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        disabled
                                        type='submit'
                                        whileTap={{ scale: 0.95 }}
                                        className={`${styles['login-form-button']} ${isInvalid && 'cursor-not-allowed'}`}
                                    >
                                        {t('Sign Up')}
                                    </motion.button>
                                )
                            }



                            <span
                                className={styles['login-form-action']}
                            >
                                <p>Don't have an account?</p>
                                <a href={ROUTES.LOGIN}>Sign in</a>
                            </span>

                            <div className={styles.recaptcha} >
                                <ReCAPTCHA
                                    ref={captcha}
                                    sitekey={process.env.REACT_APP_GOOGLE_SITEKEY}
                                    onChange={onChange}
                                    size='compact'
                                />
                            </div>

                        </form>
                    </div>

                    <div id='recaptcha-container'></div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
};
export default ReferralSignUp