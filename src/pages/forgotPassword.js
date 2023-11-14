import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
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


    useEffect(() => { document.title = 'Recover Password - Artificial' }, []); //eslint-disable-line
    const history = useHistory();
    const [emailAddress, setEmailAddress] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const isInvalid = emailAddress === '';

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
                className={`${styles.bg} container flex mx-auto max-w-screen-lg items-center justify-center h-screen`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className={`flex flex-col justify-center items-center`} >
                    {/* image */}

                    <div className={`flex flex-col w-5/5 mb-3 ${styles.wrapper}`} >

                        <span className='flex justify-center items-start w-full mb-10'>
                            <p className=' w-full text-white-normal text-4xl font-medium'>Recover Password</p>
                        </span>

                        <h2 className='text-gray-primary mt-4 mb-4 font-lato-300 text-base'>{t('Write your email address to find your account..')}</h2>

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

                        <form onSubmit={handleOnsubmit} method="POST">
                            <input
                                type="text"
                                aria-label="Enter your email address"
                                placeholder={t('Email')}
                                className='text-sm text-white-placeholder w-full mr-3 py-5 px-5 h-14  border-white-normal border-b-2 rounded-sm mb-2 mt-3 outline-none bg-black-backg font-inter-100'
                                onChange={({ target }) => setEmailAddress(target.value)}
                            />
                            <motion.button
                                disabled={isInvalid}
                                type='submit'
                                className={`bg-white-login_button w-full text-black-normal hover:bg-blue-feedback hover:text-white-normal rounded h-14 mt-3 font-lato-900 font-bold text-xl
                        ${isInvalid && 'cursor-not-allowed '}`}
                                whileTap={{ scale: 0.9 }}
                            >
                                {t('Recover account')}
                            </motion.button>
                        </form>
                    </div>
                    <div className={`flex justify-center items-center flex-col bg-white p-4 ${styles.donthaveaccount}`} >
                        <p className='text-sm font-lato-900 text-gray-primary'>
                            {t('Already have an account?')} {``}
                            <Link
                                to={ROUTES.LOGIN}
                                className='text-white-normal font-bold ml-1'
                            >
                                {t('Log in')}
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
export default ForgotPassword