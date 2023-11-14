import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import styles from '../../styles/modules/header/menu.module.css';
import FirebaseContext from '../../context/firebase'
import { motion } from 'framer-motion';
import * as ROUTES from '../../constants/routes'
// import useAuthListener from '../../hooks/use-auth-listener';
import { useTranslation } from 'react-i18next';

const Menu = ({ toggleClose }) => {
    const { t } = useTranslation()
    const { firebase } = useContext(FirebaseContext);
    // const { user } = useAuthListener()
    return (
        <>
            <motion.div
                className={`${styles.container} `}
                animate={{ x: [100, 0] }}
                transition={{ ease: 'easeOut', duration: 2 }}
            >
                <div className={`${styles.wrapper} `}>
                    <div className={`${styles.menuHorizontalXyz} w-4 border bg-white rounded-lg dark:bg-black dark:border dark:text-white`} >

                        <a href={ROUTES.PACKAGES} className={styles.menuHorizontalProfileLink}>
                            <motion.button
                                type="button"
                                className={`${styles.menuHorizontalButtonXyz} relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b text-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700   dark:border-gray-600 dark:hover:bg-gray-branding dark:hover:text-black-normal dark:focus:ring-gray-500 dark:focus:text-white`}
                                // onClick={() => {
                                //     toggleClose()
                                //     setTimeout(() => { window.location.reload() }, 0)
                                // }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <span className="material-symbols-sharp">
                                    crowdsource
                                </span>
                                <p className='hidden sm:flex'>{t('Invest')}</p>
                            </motion.button>
                        </a>
                        <a href={ROUTES.WALLET} className={styles.menuHorizontalProfileLink}>
                            <motion.button
                                type="button"
                                className={`${styles.menuHorizontalButtonXyz} relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-white-normal hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-branding dark:hover:text-black-normal dark:focus:ring-gray-500 dark:focus:text-white`}
                                whileTap={{ scale: 0.9 }}
                            >
                                <span className="material-symbols-sharp">
                                    wallet
                                </span>
                                <p className='hidden sm:flex'>{t('Wallet')}</p>
                            </motion.button>
                        </a>
                        <a href={ROUTES.TRANSACTIONS} className={styles.menuHorizontalProfileLink}>
                            <motion.button
                                type="button"
                                className={`${styles.menuHorizontalButtonXyz} relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-primary rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-branding dark:hover:text-black-normal dark:focus:ring-gray-500 dark:focus:text-white`}
                                whileTap={{ scale: 0.9 }}
                            >
                                <span className="material-symbols-sharp">
                                    account_balance
                                </span>
                                <p className='hidden sm:flex'>{t('Balances')}</p>
                            </motion.button>
                        </a>
                        <a href={ROUTES.SETTINGS} className={styles.menuHorizontalProfileLink}>
                            <motion.button
                                type="button"
                                className={`${styles.menuHorizontalButtonXyz} relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-white-normal hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-branding dark:hover:text-black-normal dark:focus:ring-gray-500 dark:focus:text-white`}
                                whileTap={{ scale: 0.9 }}
                            >
                                <span className="material-symbols-sharp">
                                    settings_alert
                                </span>
                                <p className='hidden sm:flex'>{t('Settings')}</p>
                            </motion.button>
                        </a>
                        <a href={ROUTES.SETTINGS} className={styles.menuHorizontalProfileLink}>
                            <motion.button
                                type="button"
                                className={`${styles.menuHorizontalButtonXyz} relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-white-normal hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-branding dark:hover:text-black-normal dark:focus:ring-gray-500 dark:focus:text-white`}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                    firebase.auth().signOut()
                                    setTimeout(() => { window.location.reload() }, 50)
                                }

                                }
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        firebase.auth().signOut()
                                    }
                                }}
                            >
                                <span className="material-symbols-sharp">
                                    login
                                </span>
                                <p className='hidden sm:flex'>{t('Log Out')}</p>
                            </motion.button>
                        </a>

                        {/* <motion.button
                            type="button"
                            className={`${styles.menuHorizontalButtonXyz} relative inline-flex items-center w-full px-4 py-2 text-sm font-medium rounded-b-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-branding dark:hover:text-black-normal dark:focus:ring-gray-500 dark:focus:text-white`}
                            onClick={() => {
                                firebase.auth().signOut()
                                setTimeout(() => { window.location.reload() }, 50)
                            }

                            }
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    firebase.auth().signOut()
                                }
                            }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <span className="material-symbols-sharp">
                                move_item
                            </span>
                            {t('Logout')}
                        </motion.button> */}

                    </div>
                </div>
            </motion.div>
        </>

    );
};

export default Menu
Menu.propTypes = {
    toggleClose: PropTypes.func
}