import { useContext } from 'react'
import { Link } from 'react-router-dom'
//proptypes
import PropTypes from 'prop-types'
//styles
import '../../styles/sidebar/sidebar.css'
import styles from '../../styles/modules/sidebar/sidebar.module.css'
import useUser from '../../hooks/use-user'
//routes
import * as ROUTES from '../../constants/routes'
// import TranslationBtn from '../translations/translationBtn'
import { useTranslation } from 'react-i18next'
import DarkModeToggle from '../darkmode/toggle'
import { motion } from 'framer-motion'
import FirebaseContext from '../../context/firebase'


const LeftSidebar = ({ theme, setTheme }) => {
  const { t } = useTranslation()
  const { user } = useUser()
  const { firebase } = useContext(FirebaseContext)
  return (
    <div className={`${styles.main} leftaside`}>

      <aside className={`${styles.aside} leftaside`} >

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
          <Link to={ROUTES.WALLET}>
            <span className="material-symbols-sharp">wallet</span>
            <h4>{t('Wallet')}</h4>
          </Link>
          <Link to={ROUTES.PACKAGES} >
            <span className="material-symbols-sharp">crowdsource</span>
            <h4>{t('Invest')}</h4>
          </Link>
          <Link to={ROUTES.TRANSACTIONS}>
            <span className="material-symbols-sharp"> account_balance</span>
            <h4>{t('Balances')}</h4>
          </Link>
          {/* SETTINGS */}
          <Link to={ROUTES.SETTINGS} className='flex flex-row '>
            <span className="material-symbols-sharp">settings_alert</span>
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

        {/* BANNER MARKETING */}
        <div className="sidebar_leftsidebar_updates my-1 ">
          {/* <h4>{t('Bot de telegram')}</h4>
        <a
          href='https://t.me/+csH0CFp-0hM1NzU5'
          target='_blank'
          rel='noreferrer'
          className='cursor-pointer'>
          <p className='text-black-normal font-semibold'>
            Telegram
          </p>
        </a> */}
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


      </aside>
    </div>
  )
}

export default LeftSidebar

LeftSidebar.propTypes = {
  setIsOpen: PropTypes.func,
  theme: PropTypes.bool,
  setTheme: PropTypes.func,
}