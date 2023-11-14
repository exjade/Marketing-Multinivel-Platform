import { useContext } from 'react'
import { Link } from 'react-router-dom'
//proptypes
import PropTypes from 'prop-types'
//styles
import '../../styles/sidebar/sidebar.css'
import styles from '../../styles/modules/sidebar/sidebar.module.css'
import { motion } from 'framer-motion'
//routes
import * as ROUTES from '../../constants/routes'
//Context
import FirebaseContext from '../../context/firebase'
import useUser from '../../hooks/use-user'
import { useTranslation } from 'react-i18next';
import DarkModeToggle from '../darkmode/toggle'

const LeftSidebarMobile = ({ setIsOpen, isOpen, theme, setTheme  }) => {
  const { firebase } = useContext(FirebaseContext)
  const { t } = useTranslation()
  const { user } = useUser()
  return (
    <>
      {
        isOpen && (
          <motion.aside
            animate={{ x: 5, }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            {/* SIDEBAR */}
            <motion.button
              id="sidebar_leftsidebar_button"
              onClick={() => setIsOpen(false)}
            >
              <span className="material-icons-sharp">close</span>
            </motion.button>

            {/* LOGO */}
            <>
              <a href={ROUTES.DASHBOARD} className='flex flex-row justify-center items-center'>
                <img
                  src="/assets/logo.webp"
                  alt="logo"
                  className='object-contain w-44 h-44'
                  loading='lazy' />
              </a>
            </>

            {/* NAVIGATION */}
            <div className="sidebar_leftsidebar_icons font-Inter-600 font-bold ">
              <Link to={ROUTES.DASHBOARD} className={`${styles.active}`}>
                <span className="material-symbols-sharp">empty_dashboard</span>
                <h4>{t('Dashboard')}</h4>
              </Link>
              <Link to={ROUTES.PACKAGES} >
                <span className="material-symbols-sharp">add_card</span>
                <h4>{t('Investments')}</h4>
              </Link>
              <Link to={ROUTES.TRANSACTIONS}>
                <span className="material-symbols-sharp">receipt_long</span>
                <h4>{t('Transactions')}</h4>
              </Link>
              <Link to={ROUTES.WITHDRAWAL}>
                <span className="material-symbols-sharp">local_atm</span>
                <h4>{t('Withdrawal')}</h4>
              </Link>
              <Link to={ROUTES.WALLET}>
                <span className="material-symbols-sharp">wallet</span>
                <h4>{t('Wallet')}</h4>
              </Link>
              {/* SETTINGS */}
              <Link to={ROUTES.SETTINGS} className='flex flex-row '>
                <span className="material-symbols-sharp">manage_accounts</span>
                <h4 >{t('Settings')}</h4>
              </Link>

              {
                user?.rol === 'admin' && user?.rol !== 'owner' && user?.rol !== 'investor' && user?.rol !== 'sponsored' ? (
                  <Link to={ROUTES.ADMIN_DASHBOARD}>
                    <span className="material-icons-sharp text-red-logo">key</span>
                    <h4 className='text-red-logo'>{t('Admin')}</h4>
                  </Link>
                ) :
                  user?.rol === 'owner' && user?.rol !== 'admin' && user?.rol !== 'investor' && user?.rol !== 'sponsored' ? (
                    <Link to={ROUTES.ADMIN_DASHBOARD}>
                      <span className="material-icons-sharp text-red-logo">key</span>
                      <h4 className='text-red-logo'>{t('Admin')}</h4>
                    </Link>
                  ) : null
              }
            </div>

            <div className="sidebar_leftsidebar_icons font-Inter-600 font-bold ">
              {/* DARK MODE */}
              <DarkModeToggle
                theme={theme}
                setTheme={setTheme}
              />

              {/* LOG OUT */}
              <div className='flex justify-center items-center'>
                <motion.button
                  type='button'
                  className='leftsidebarMobile_button_logout flex flex-row h-12 bg-gray-withdrawal  text-black-normal justify-center items-center text-lg font-bold rounded-xl mt-5'
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
                  <span className='flex flex-row gap-5 justify-center'>
                    <span className="material-icons-sharp">logout</span>
                    <h4>{t('Log Out')}</h4>
                  </span>
                </motion.button>
              </div>
            </div>

          </motion.aside>
        )
      }
    </>

  )
}

export default LeftSidebarMobile

LeftSidebarMobile.propTypes = {
  setIsOpen: PropTypes.func,
  isOpen: PropTypes.bool,
  theme: PropTypes.bool,
  setTheme: PropTypes.func,
}