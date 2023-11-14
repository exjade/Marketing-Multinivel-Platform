import React from 'react'
import PropTypes from 'prop-types'
import styles from '../css/referral.module.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as ROUTES from '../../../../constants/routes';
import { useTranslation } from 'react-i18next';

const ReferralSection = ({
    user,
    users
}) => {
    const { t } = useTranslation()
    const { referral } = user;
    const today = Date.now()
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    const filteredUsers = users?.filter(u => user?.referral?.userReferrals.includes(u.id))
    const filterUserCreated = filteredUsers?.filter(u => u.created < today && u.created > yesterday)


    return (
        <section className={`${styles.section} grid grid-row-3 font-poppins-600 bg-black-default w-full h-full py-16 gap-10 pb-28`} >
            <div className='text-7xl font-normal flex justify-center items-center bg-black-default w-full text-white-normal'>
                <h1 className={`${styles.title} capitalize`}>{t('My Referrals')}</h1>
            </div>
            <div className='grid grid-cols-2 gap-2 justify-between place-items-center '>
                <motion.div
                    className='text-black-default h-52 w-40 bg-white-normal rounded-lg '
                    initial={{ scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 160,
                        damping: 20
                    }}
                >
                    <span className='flex flex-col justify-center items-center w-full h-full '>
                        <h1 className={`${styles.count}`}>
                            {referral?.userReferrals?.length}
                        </h1>
                        <h3 className={`${styles.counttitle}`}>{t('All referrals')}</h3>
                    </span>
                </motion.div>

                <motion.div
                    className='text-black-default h-52 w-40 bg-white-normal rounded-lg'
                    initial={{ scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 160,
                        damping: 20
                    }}
                >
                    <span className='flex flex-col justify-center items-center w-full h-full '>
                        <h1 className={`${styles.count}`}>
                            {filterUserCreated?.length}
                        </h1>
                        <h3 className={`${styles.counttitle}`}>{t('Today referrals')}</h3>
                    </span>
                </motion.div>
            </div>
            <Link to={ROUTES.REFERRAL_HISTORY}>
                <div className='flex justify-center items-center'>
                    <div className='text-green-header h-20 w-10/12 bg-white-normal rounded-lg cursor-pointer'>
                        <div className='grid-cols-3 grid justify-between place-items-center w-full h-full '>
                            <span className="material-symbols-sharp">
                                person_add
                            </span>
                            <h3 className={`${styles.referraltitle}`}>{t('See Referrals List')}</h3>
                            <span className="material-symbols-sharp">
                                arrow_forward
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
            <div className='flex justify-center items-center'>
                <div className='text-green-header h-20 w-1/3 bg-white-normal rounded-lg cursor-pointer'>
                    <div className='flex flex-row gap-5 justify-center items-center w-full h-full '>
                        <span className="material-symbols-sharp">
                            payments
                        </span>
                        <h3 className='font-semibold text-normal'>
                            {`${parseFloat(user?.referral?.ReferralBalance).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReferralSection

ReferralSection.propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
}