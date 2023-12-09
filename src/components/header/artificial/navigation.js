import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import styles from './styles/header.module.css';
import * as ROUTES from '../../../constants/routes';
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
              <img
                src='https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Ficons%2Fnavigation%2Fhome-removebg-preview.png?alt=media&token=ac843213-eb3e-4fa2-988d-a6004f7fa002'
                alt='homeIcon'
                className='w-10 h-10 text-white-normal mb-2 ' />
            </motion.a>

            <div className={`${styles.dropdownDivider} hidden sm:inline`}></div>  {/* DIVIDER */}

            <motion.a
              href={ROUTES.PACKAGES}
              variants={item}
              className={styles.icons}
            >
              <img
                src='https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Ficons%2Fnavigation%2Finvest-removebg-preview.png?alt=media&token=1515932a-cf7a-483c-959c-8e5df1d82811'
                alt='investIcon'
                className='w-10 h-10 text-white-normal mb-2' />
            </motion.a>

            <div className={`${styles.dropdownDivider} hidden sm:inline`}></div>  {/* DIVIDER */}

            <motion.a
              href={ROUTES.TRANSACTIONS}
              variants={item}
              className={styles.icons}
            >
              <img
                src='https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Ficons%2Fnavigation%2Fbank-removebg-preview.png?alt=media&token=7826ac37-9ed7-4e9c-abd1-8c5a089568ee'
                alt='bankIcon'
                className='w-10 h-10 text-white-normal mb-2' />
            </motion.a>

            <div className={`${styles.dropdownDivider} hidden sm:inline`}></div>  {/* DIVIDER */}

            <motion.a href={ROUTES.NETWORK}
              variants={item}
              className={styles.icons} >
              <img
                src='https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Ficons%2Fnavigation%2Fhroup-removebg-preview.png?alt=media&token=10cd5de2-e914-4db3-9625-0be5318960f8'
                alt='groupIcon'
                className='w-10 h-10 text-white-normal mb-2' />
            </motion.a>

            <div className={`${styles.dropdownDivider} hidden sm:inline`}></div>  {/* DIVIDER */}

            <motion.a
              href={ROUTES.SETTINGS}
              variants={item}
              className={styles.icons}
            >
              <img
                src='https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Ficons%2Fnavigation%2Fsettings-removebg-preview.png?alt=media&token=befa2bb0-3563-45e3-ac14-06016530690a'
                alt='settingIcon'
                className='w-10 h-10 text-white-normal mb-2 ' />
            </motion.a>

            <div className={`${styles.dropdownDivider} hidden sm:inline`}></div>  {/* DIVIDER */}

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
                <img
                  src='https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Ficons%2Fnavigation%2Flogout-removebg-preview.png?alt=media&token=548c36e0-c0b4-4201-b5a1-b9964ca5fa23'
                  alt='logoutIcon'
                  className='w-10 h-10 text-white-normal mb-2' />
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