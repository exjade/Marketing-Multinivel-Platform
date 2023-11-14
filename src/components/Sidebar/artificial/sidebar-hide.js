import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styles from './sidebar-hide.module.css'
import {
    HomeIcon,
    BuildingLibraryIcon,
    WalletIcon,
    Square2StackIcon,
    ShieldCheckIcon,
    ArrowRightCircleIcon,
    ArrowLeftOnRectangleIcon,
    Cog8ToothIcon,
    RectangleGroupIcon,
} from '@heroicons/react/24/outline';
import useUser from '../../../hooks/use-user'
import * as ROUTES from '../../../constants/routes'
import FirebaseContext from '../../../context/firebase'

const SidebarHide = (props) => {

    const { user } = useUser()
    const { firebase } = useContext(FirebaseContext)

    return (
        <div className={`${styles.container} `} >
            <div className={`${styles.wrapper}`} >

                <div className={`${styles.header}`} >
                    <div className={`${styles.headerWrapper}`} >
                       <div></div>
                        <button
                            className={`${styles.headerButton}`}
                            onClick={(e) => props.showSidebar(e)}
                        >
                            <ArrowRightCircleIcon
                                className={` ${styles.headerIcon} w-12 h-12 text-white-normal mb-2  rounded-full `}
                            />
                        </button>
                    </div>
                </div>

                <div className={`${styles.navigation}`} >
                    <div className={`${styles.navigationWrapper}`} >

                        <a href={ROUTES.DASHBOARD}
                            className={`${styles.navigationIcons} bg-artificial-theme-gray-primary`}>
                            <span className={`${styles.navigationIconsWrapper} `}>
                                <HomeIcon className='w-10 h-10 text-white-normal mb-2 ' />
                            </span>
                        </a>

                        <a href={ROUTES.WALLET}
                            className={`${styles.navigationIcons} `}>
                            <span className={`${styles.navigationIconsWrapper} `}>
                                <WalletIcon className='w-10 h-10 text-white-normal mb-2' />
                                <p></p>
                            </span>
                        </a>

                        <a href={ROUTES.PACKAGES}
                            className={`${styles.navigationIcons} `}>
                            <span className={`${styles.navigationIconsWrapper} `}>
                                <Square2StackIcon className='w-10 h-10 text-white-normal mb-2' />
                                <p></p>
                            </span>
                        </a>

                        <a href={ROUTES.TRANSACTIONS}
                            className={`${styles.navigationIcons} `}>
                            <span className={`${styles.navigationIconsWrapper} `}>
                                <BuildingLibraryIcon className='w-10 h-10 text-white-normal mb-2' />

                            </span>
                        </a>
                        <a href={ROUTES.NETWORK}
                            className={`${styles.navigationIcons} `}>
                            <span className={`${styles.navigationIconsWrapper} `}>
                                <RectangleGroupIcon className='w-10 h-10 text-white-normal mb-2' />

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
                                <Cog8ToothIcon className='w-10 h-10 text-white-normal mb-2 ' />

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
                                <ArrowLeftOnRectangleIcon className='w-10 h-10 text-white-normal mb-2' />
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