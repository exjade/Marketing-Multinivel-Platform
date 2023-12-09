import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styles from './sidebar-hide.module.css'
import {
    ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import useUser from '../../../hooks/use-user'
import * as ROUTES from '../../../constants/routes'
import FirebaseContext from '../../../context/firebase'

const SidebarHide = () => {

    const { user } = useUser()
    const { firebase } = useContext(FirebaseContext)

    return (
        <div className={`${styles.container} `} >
            <div className={`${styles.wrapper}`} >

                <div className={`${styles.navigation}`} >
                    <div className={`${styles.navigationWrapper}`} >

                        <a href={ROUTES.DASHBOARD}
                            className={`${styles.navigationIcons}`}>
                            <span className={`${styles.navigationIconsWrapper} `}>
                                <img
                                src='https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Ficons%2Fnavigation%2Fhome-removebg-preview.png?alt=media&token=ac843213-eb3e-4fa2-988d-a6004f7fa002'
                                alt='homeIcon'
                                className='w-10 h-10 text-white-normal mb-2 ' />
                            </span>
                        </a>

                        <a href={ROUTES.PACKAGES}
                            className={`${styles.navigationIcons} `}>
                            <span className={`${styles.navigationIconsWrapper} `}>
                                <img
                                src='https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Ficons%2Fnavigation%2Finvest-removebg-preview.png?alt=media&token=1515932a-cf7a-483c-959c-8e5df1d82811'
                                alt='investIcon' 
                                className='w-10 h-10 text-white-normal mb-2' />
                                <p></p>
                            </span>
                        </a>

                        <a href={ROUTES.TRANSACTIONS}
                            className={`${styles.navigationIcons} `}>
                            <span className={`${styles.navigationIconsWrapper} `}>
                                <img
                                src='https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Ficons%2Fnavigation%2Fbank-removebg-preview.png?alt=media&token=7826ac37-9ed7-4e9c-abd1-8c5a089568ee'
                                alt='bankIcon'
                                className='w-10 h-10 text-white-normal mb-2' />

                            </span>
                        </a>
                        <a href={ROUTES.NETWORK}
                            className={`${styles.navigationIcons} `}>
                            <span className={`${styles.navigationIconsWrapper} `}>
                                <img
                                src='https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Ficons%2Fnavigation%2Fhroup-removebg-preview.png?alt=media&token=10cd5de2-e914-4db3-9625-0be5318960f8'
                                alt='groupIcon'
                                className='w-10 h-10 text-white-normal mb-2' />

                            </span>
                        </a>

                        {
                            user?.rol === 'admin' && user?.rol !== 'owner' && user?.rol !== 'investor' && user?.rol !== 'sponsored' ? (
                                <a href={ROUTES.ADMIN_DASHBOARD}
                                    className={`${styles.navigationIcons}  `}>
                                    <span className={`${styles.navigationIconsWrapper} `}>
                                        <ShieldCheckIcon className='w-10 h-10 text-white-normal mb-2' />
                                        <p></p>
                                    </span>
                                </a>
                            ) :
                                user?.rol === 'owner' && user?.rol !== 'admin' && user?.rol !== 'investor' && user?.rol !== 'sponsored' ? (
                                    <a href={ROUTES.ADMIN_DASHBOARD}
                                        className={`${styles.navigationIcons}  `}>
                                        <span className={`${styles.navigationIconsWrapper} `}>
                                            <ShieldCheckIcon className='w-10 h-10 text-white-normal mb-2' />
                                            <p></p>
                                        </span>
                                    </a>
                                ) : null
                        }


                    </div>
                </div>


                <div className={`${styles.navigationBottom}`} >
                    <div className={`${styles.navigationWrapperBottom}`} >

                        <a href={ROUTES.SETTINGS}
                            className={`${styles.navigationIcons} `}>
                            <span className={`${styles.navigationIconsWrapper} `}>
                                <img
                                src='https://firebasestorage.googleapis.com/v0/b/capitaltraderscorp.appspot.com/o/images%2Ficons%2Fnavigation%2Fsettings-removebg-preview.png?alt=media&token=befa2bb0-3563-45e3-ac14-06016530690a'
                                alt='settingIcon'
                                className='w-10 h-10 text-white-normal mb-2 ' />

                            </span>
                        </a>

                        <a className={`${styles.navigationIcons} `}>
                            <button
                                type='button'
                                className={`${styles.navigationIconsWrapper} `}
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
                        </a>

                    </div>
                </div>

            </div>
        </div >
    )
}

export default SidebarHide

SidebarHide.propTypes = {
    showSidebar: PropTypes.func,
}