import React from 'react'
//styles
import '../../styles/sidebar/sidebar.css'
//eslint-disable-next-line no-unused-vars
import Styles from '../../styles/modules/sidebar/sidebar.module.css'
//propTypes
import PropTypes from 'prop-types'
//framer motion
import { motion } from 'framer-motion'
import CreditCard from './credit-card'

const MiddleCards = ({ theme, user }) => {
  return (
    <>
      {/* CARDS */}
      <div className='Sidebar_Middle_Cards'>
        <motion.div
          className={`${theme ? 'card-dark-theme' : 'Sidebar_Middle_Card'}`}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 50
          }}
          whileHover={{ scale: 1.1 }}
        >
          <CreditCard user={user} />
        </motion.div>
      </div>
    </>
  )
}

export default MiddleCards

MiddleCards.propTypes = {
  theme: PropTypes.bool,
  user: PropTypes.object
}