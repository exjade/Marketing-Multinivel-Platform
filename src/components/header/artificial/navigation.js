import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import styles from './styles/header.module.css';
import * as ROUTES from '../../../constants/routes';
import {
  // ChevronUpIcon,
  HomeIcon,
  WalletIcon,
  Square2StackIcon,
  BuildingLibraryIcon,
  RectangleGroupIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import FirebaseContext from '../../../context/firebase';

const Navigation = ({
  item,
}) => {

  const { firebase } = useContext(FirebaseContext)

  return (
    <div className={`${styles.dropdownContainer}`} >
      <div className={`${styles.dropdownWrapper}`} >

        <div className={`${styles.dropdownNavigation}`} >
          <>
            <motion.a
              href={ROUTES.DASHBOARD}
              variants={item}
              className={styles.icons}
            >
              <HomeIcon className='w-8 h-8 mb-2 text-artificial-text-blue-third ' />
            </motion.a>

            <div className={styles.dropdownDivider}></div>  {/* DIVIDER */}

            <motion.a
              href={ROUTES.WALLET}
              variants={item}
              className={styles.icons}
            >
              <WalletIcon className='w-8 h-8 mb-2 text-artificial-text-blue-third ' />
            </motion.a>

            <div className={styles.dropdownDivider}></div>  {/* DIVIDER */}

            <motion.a
              href={ROUTES.PACKAGES}
              variants={item}
              className={styles.icons}
            >
              <Square2StackIcon className='w-8 h-8 mb-2 text-artificial-text-blue-third ' />
            </motion.a>

            <div className={styles.dropdownDivider}></div>  {/* DIVIDER */}

            <motion.a
              href={ROUTES.TRANSACTIONS}
              variants={item}
              className={styles.icons}
            >
              <BuildingLibraryIcon className='w-8 h-8 mb-2 text-artificial-text-blue-third ' />
            </motion.a>

            <div className={styles.dropdownDivider}></div>  {/* DIVIDER */}

            <motion.a href={ROUTES.NETWORK}
              variants={item}
              className={styles.icons} >
              <RectangleGroupIcon className='w-8 h-8 mb-2 text-artificial-theme-green-primary ' />
            </motion.a>

            <div className={styles.dropdownDivider}></div>  {/* DIVIDER */}

            <motion.a
              href={ROUTES.SETTINGS}
              variants={item}
              className={styles.icons}
            >
              <Cog6ToothIcon className='w-8 h-8 mb-2 text-artificial-theme-green-primary ' />
            </motion.a>

            <div className={styles.dropdownDivider}></div>  {/* DIVIDER */}

            <span className={styles.wrapActive}>
              <button
                type='button'
                className={styles.active}
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
                <ArrowLeftOnRectangleIcon className='w-8 h-8 mb-2 text-artificial-theme-green-primary ' />
              </button>
            </span>
          </>
        </div>

      </div>
    </div >
  )
}

export default Navigation

Navigation.propTypes = {
  item: PropTypes.object,
  hiddeNavigation: PropTypes.func
}