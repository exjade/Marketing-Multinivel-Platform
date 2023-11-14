import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/wallet.module.css'
import { motion } from 'framer-motion';
import * as ROUTES from '../../../../constants/routes'

const WalletMenu = ({ isActive, setIsActive }) => {

    return (
        <div className={`${styles.menuContainer} font-Inter-500 capitalize`} >
            <div className={`${styles.menuWrapper}`} >
                {/* HOME */}
                <a href={ROUTES.DASHBOARD}
                    className={`${styles.menuIcons}`}>
                    <motion.button
                        type='button'
                        className={`${isActive.home ? `${styles.isActive}` : `${styles.noActive}`} capitalize`}
                        onClick={() => setIsActive({
                            home: true,
                            wallet: false,
                            buy: false,
                            recharge: false,
                            settings: false,
                            stake: false,
                        })}
                        whileTap={{ scale: 0.9 }}
                    >
                        <span className={`material-icons-outlined`}>
                            home
                        </span>
                        <p>home</p>
                    </motion.button>
                </a>
                {/* WALLET */}
                <motion.button
                    className={`${styles.menuIcons} ${isActive.wallet ? `${styles.isActive}` : `${styles.noActive}`} capitalize`}
                    onClick={() => setIsActive({
                        home: false,
                        wallet: true,
                        buy: false,
                        recharge: false,
                        settings: false,
                        stake: false,
                    })}
                    whileTap={{ scale: 0.9 }}
                >
                    <span className={`material-icons-outlined`}>
                        wallet
                    </span>
                    <p>Wallet</p>
                </motion.button>

                {/* RECHARGE */}
                <motion.button
                    className={`${styles.menuIcons} ${isActive.buy ? `${styles.isActive}` : `${styles.noActive}`} capitalize`}
                    onClick={() => setIsActive({
                        home: false,
                        wallet: false,
                        buy: false,
                        recharge: true,
                        settings: false,
                        stake: false,
                    })}
                    whileTap={{ scale: 0.9 }}
                >
                    <span className={`material-icons-outlined`}>
                        local_atm
                    </span>
                    <p>Recharge</p>
                </motion.button>


                {/* SETTINGS */}
                <a href={ROUTES.SETTINGS}
                    className={`${styles.menuIcons}`}>
                    <motion.button
                        className={`${isActive.settings ? `${styles.isActive}` : `${styles.noActive}`} capitalize`}
                        onClick={() => setIsActive({
                            home: false,
                            wallet: false,
                            buy: false,
                            recharge: false,
                            settings: true,
                            stake: false,
                        })}
                        whileTap={{ scale: 0.9 }}
                    >
                        <span className={` material-icons-outlined`}>
                            settings
                        </span>
                        <p>settings</p>
                    </motion.button>
                </a>

            </div>
        </div>
    )
}

export default WalletMenu

WalletMenu.propTypes = {
    isActive: PropTypes.object,
    setIsActive: PropTypes.func
}