import React, { useEffect, useState } from 'react';
//framer motion
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/landing/landing.module.css'
//components
// import Header from '../components/header/Header';
import Timeline from '../components/timeline';
import Menu from '../components/header/menu';
//hooks
import useTheme from '../hooks/use-theme';
import useRefferal from '../hooks/use-referral';
//Proptypes
import PropTypes from 'prop-types';
import Error from '../error/error';
import Header from '../components/header/artificial/header';
// import TranslationBtn from '../components/translations/translationBtn';

const Dashboard = () => {

  useEffect(() => { document.title = 'Dashboard - CapitalTradersBusiness' }, []) //eslint-disable-line
  const { theme, setTheme } = useTheme()
  //eslint-disable-next-line no-unused-vars
  const { users: referralUsers } = useRefferal()

  // menu sidebar functionality
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  // menu expand 
  const [openMenu, setOpenMenu] = useState(false);
  const toggleOpen = () => setOpenMenu(true);
  const toggleClose = () => setOpenMenu(false);


  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Error>
            <Header
              theme={theme}
              setTheme={setTheme}
              toggleOpen={toggleOpen}
              openMenu={openMenu}
              toggleClose={toggleClose}
              setOpenMenu={setOpenMenu}
              handleOpen={handleOpen}
              handleClose={handleClose}
              isOpen={isOpen}
            />
          </Error>
          {
            openMenu && (
              <Menu toggleClose={toggleClose} />
            )
          }
          <Error>
            <Timeline
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              theme={theme}
              setTheme={setTheme}
            />
          </Error>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default Dashboard

Dashboard.propTypes = {
  coins: PropTypes.array,
  search: PropTypes.string,
  setSearch: PropTypes.func,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  theme: PropTypes.bool,
  setTheme: PropTypes.func,
}