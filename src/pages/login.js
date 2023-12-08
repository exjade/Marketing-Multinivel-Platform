import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
//Context
import FirebaseContext from '../context/firebase';
//module styles
import styles from '../styles/modules/auth/login.module.css'
import style from '../styles/landing/landing.module.css'
//routes
import * as ROUTES from '../constants/routes';
//framer motion
import { motion, AnimatePresence } from 'framer-motion';


const Login = () => {

    useEffect(() => { document.title = 'Log In - CapitalTradersBusiness' }, []); //eslint-disable-line

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
            setError('Please try in a few seconds');
            setTimeout(() => {
                if (!isInvalid) setPassword('');
                setError('');
            }, 1500);
        }
    }


    return (
        <AnimatePresence>
            <motion.div
                className={`${styles['login-container']}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} >
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
                        <h2>Sign in to your account</h2>
                    </div>

                    {error &&
                        <p
                            className='mb-4 text-xs text-red-warning'
                            value={error}
                        >
                            {error}
                        </p>
                    }

                    <form
                        onSubmit={handleLogin}
                        method="POST"
                        className={`${styles['login-form']}`}
                    >
                        <div className={`${styles['login-form-container']}`}>
                            <label
                                htmlFor="email"
                                className={styles['login-form-label']}
                            >Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className={styles['login-form-input']}
                                onChange={({ target }) => setEmailAddress(target.value)}
                                value={emailAddress}
                            />
                        </div>
                        <div className={`${styles['login-form-container']}`}>
                            <span className={`${styles['login-form-forgot']}`}>
                                <label
                                    htmlFor="password"
                                    className={styles['login-form-label']}
                                >Password</label>
                                <a
                                    href={ROUTES.RECOVERPASSWORD}
                                    className={styles['login-form-forgot-link']}
                                >Forgot?</a>
                            </span>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className={styles['login-form-input']}
                                onChange={({ target }) => setPassword(target.value)}
                                value={password}
                            />
                        </div>
                        <motion.button
                            type='submit'
                            whileTap={{ scale: 0.95 }}
                            className={styles['login-form-button']}
                        >
                            Sign in
                        </motion.button>
                        <span
                            className={styles['login-form-action']}
                        >
                            <p>Don't have an account?</p>
                            <a href={ROUTES.SIGN_UP}>Sign up</a>
                        </span>
                    </form>




                </div>
            </motion.div>
        </AnimatePresence>
    );
};
export default Login