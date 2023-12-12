import React from 'react'
// import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { motion } from 'framer-motion';
// import * as ROUTES from '../../../../constants/routes'
import styles from '../css/referral.module.css'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next';


const ReferralLink = ({ user }) => {
  const { t } = useTranslation()
  const referralCode = user?.referral?.referralCode?.trim()
  const copyReferralCode = `https://capitaltradersbusiness.com/code/${referralCode}`

  return (
    <motion.section
      className={`${styles.border} flex flex-col w-full  items-center gap-4  text-white-normal py-10 text-xl font-Inter-500 font-normal `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <span className='flexitems-center justify-center'>
        <h1 className={`${styles.titleLink} text-lg sm:text-2xl`}>{t('Your Link')}</h1>
      </span>
      <input type="text" placeholder={copyReferralCode} disabled className='text-center w-9/12 px-10 text-sm py-2 outline-none h-full bg-gray-input rounded-xl text-white-normal' />
      <p className='text-sm italic text-white-primary capitalize'>click to copy</p>
      <CopyToClipboard text={copyReferralCode}>
        <button className='bg-white-normal h-14 w-20 rounded-lg text-center text-black-default font-bold'>
          <span className="material-symbols-sharp text-2xl">
            file_copy
          </span>
        </button>
      </CopyToClipboard>
    </motion.section>
  )
}

export default ReferralLink

ReferralLink.propTypes = { 
  user: PropTypes.object
}