import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//module styles
import styles from '../styles/modules/auth/auth.module.css'
//routes
import * as ROUTES from '../constants/routes';
//framer motion
import { motion, AnimatePresence } from 'framer-motion';
//firebase
import { firebase } from '../lib/firebase';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
const auth = getAuth(firebase);

const ForgotPassword = () => {

    //Hooks
    const { t } = useTranslation()


    useEffect(() => { document.title = 'Recover Password - CapitalTradersBusiness' }, []); //eslint-disable-line
    const history = useHistory();
    const [emailAddress, setEmailAddress] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const isInvalid = emailAddress.length < 11;

    const ForgotPassword = (emailAddress) => {
        return sendPasswordResetEmail(auth, emailAddress, {
            url: 'http://localhost:3000/login',
        });
    }

    const handleOnsubmit = async (event) => {
        event.preventDefault();
        ForgotPassword(emailAddress)
            .then(response => {
                console.log(response)
                setSuccess('Email sent successfully, please check your email');
                setTimeout(() => { history.push(ROUTES.LOGIN) }, 3000);
            })
            .catch(e => {
                console.log(e.message)
                setError('Email not found')
            })
    }

    return (
        <AnimatePresence>
            <motion.div
                className={`${styles['login-container']}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >


                <div className={`${styles['login-wrapper']}`} >


                    <div className={`${styles['login-branding']}`} >
                        <div className={`${styles['login-illustration']}`}>
                            <img 
                            src="https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Fauth-illustration.svg?alt=media&token=b65343c8-6ab1-4c33-98dc-6b72c3e9728f" 
                            alt="page illlustration"
                            width={440}
                            height={100}
                            />
                        </div>
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
                        <h2>Reset your password</h2>
                        <p className='text-gray-primary font-lato-300 text-base'>{t('Write your email address to find your account..')}</p>
                    </div>



                    {error &&
                        <p
                            className='mb-4 text-xs text-red-warning'
                            value={error}
                        >
                            {error}
                        </p>}
                    {success &&
                        <p
                            className='mb-4 text-xs text-green-success'
                            value={success}
                        >
                            {success}
                        </p>}

                    <form
                        onSubmit={handleOnsubmit}
                        method="POST"
                        className={`${styles['login-form']}`}
                    >
                        <div className={`${styles['login-form-container']}`}>
                            <input
                                type="text"
                                aria-label="Enter your email address"
                                placeholder={t('Email')}
                                className={styles['login-form-input']}
                                onChange={({ target }) => setEmailAddress(target.value)}
                            />
                        </div>
                        <motion.button
                            disabled={isInvalid}
                            type='submit'
                            className={`${styles['login-form-button']} 
                        ${isInvalid && 'cursor-not-allowed '}`}
                            whileTap={{ scale: 0.9 }}
                        >
                            Reset Password
                        </motion.button>
                    </form>


                    <span
                        className={styles['login-form-action']}
                    >
                        <p>Don't have an account?</p>
                        <a href={ROUTES.SIGN_UP}>Sign up</a>
                    </span>

                </div>
            </motion.div>
        </AnimatePresence>
    );
};
export default ForgotPassword