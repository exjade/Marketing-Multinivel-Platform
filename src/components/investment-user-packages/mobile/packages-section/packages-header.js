import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from '../css/packages.module.css'
import HeaderLoader from './header-loader';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';
// import * as ROUTES from '../../../../constants/routes';
// import { useTranslation } from 'react-i18next';

const InvestmentUserPackagesSection = ({



    user,
}) => {
    //HOOKS
    const { t } = useTranslation()
    const { packages } = user;
    const [isLoading, setIsLoading] = useState(true)
    const remaining = user?.Applied * 2 - user?.Profit

    const p = []
    if (packages?.packageOne?.packageAmount > 0) p.push(packages?.packageOne);
    if (packages?.packageTwo?.packageAmount > 0) p.push(packages?.packageTwo);
    if (packages?.packageThree?.packageAmount > 0) p.push(packages?.packageThree);
    if (packages?.packageFour?.packageAmount > 0) p.push(packages?.packageFour);
    if (packages?.packageFive?.packageAmount > 0) p.push(packages?.packageFive);
    if (packages?.packageSix?.packageAmount > 0) p.push(packages?.packageSix);
    if (packages?.packageSeven?.packageAmount > 0) p.push(packages?.packageSeven);
    if (packages?.packageEigth?.packageAmount > 0) p.push(packages?.packageEight);
    if (packages?.packageNine?.packageAmount > 0) p.push(packages?.packageNine);
    if (packages?.packageTeen?.packageAmount > 0) p.push(packages?.packageTeen);
    if (packages?.packageEleven?.packageAmount > 0) p.push(packages?.packageEleven);
    if (packages?.packageTwelve?.packageAmount > 0) p.push(packages?.packageTwelve);
    if (packages?.packageThirteen?.packageAmount > 0) p.push(packages?.packageThirteen);
    if (packages?.packageFourteen?.packageAmount > 0) p.push(packages?.packageFourteen);
    if (packages?.packageFifteen?.packageAmount > 0) p.push(packages?.packageFifteen);
    if (packages?.packageSixteen?.packageAmount > 0) p.push(packages?.packageSixteen);
    if (packages?.packageSeventeen?.packageAmount > 0) p.push(packages?.packageSeventeen);
    if (packages?.packageEighteen?.packageAmount > 0) p.push(packages?.packageEighteen);
    if (packages?.packageNineteen?.packageAmount > 0) p.push(packages?.packageNineteen);
    if (packages?.packageTwenty?.packageAmount > 0) p.push(packages?.packageTwenty);

    // LOADER
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () =>
            setIsLoading(true)
    }, [])

    const handleLoader = () => { return <HeaderLoader /> }

    if (isLoading) return handleLoader()
    else {


        return (
            <section className={`${styles.section} grid grid-row-2 place-items-center justify-around font-poppins-600 bg-black-default w-full h-full py-16 gap-10 pb-36`} >
                <div className='text-7xl font-normal flex justify-center items-center bg-black-default w-full text-white-normal'>
                    <h2 className={`${styles.title} capitalize`}>{t('Investment Packages')}</h2>
                </div>

                <div className='grid grid-cols-3 gap-3 justify-between place-items-center '>
                    <motion.div
                        className='text-black-default h-36 w-40 bg-white-normal rounded-lg '
                        initial={{ scale: 0 }}
                        animate={{ rotate: 360, scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 160,
                            damping: 20
                        }}
                    >
                        <span className='flex flex-col justify-center items-center w-full h-full mt-4'>
                            <h3 className={`${styles.counttitle}`}>
                                {t('Active Packages')}
                            </h3>
                            <h1 className={`${styles.count}`}>
                                {p.length}
                            </h1>
                        </span>
                    </motion.div>
                    <motion.div
                        className='text-black-default h-36 w-40 bg-white-normal rounded-lg'
                        initial={{ scale: 0 }}
                        animate={{ rotate: 360, scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 160,
                            damping: 20
                        }}
                    >
                        <span className='flex flex-col justify-center items-center w-full h-full mt-4'>
                            <h3 className={`${styles.counttitle} break-words`}>{t('Investment')}</h3>
                            <h1 className={`${styles.count}`}>
                                {`${parseFloat(user?.Applied).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}`}
                            </h1>
                        </span>
                    </motion.div>
                    <motion.div
                        className='text-black-default h-36 w-40 bg-white-normal rounded-lg'
                        initial={{ scale: 0 }}
                        animate={{ rotate: 360, scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 160,
                            damping: 20
                        }}
                    >
                        <span className='flex flex-col justify-center items-center w-full h-full mt-4'>
                            <h3 className={`${styles.counttitle}`}>{t('Remainig')}</h3>
                            <h1 className={`${styles.count}`}>
                                {`${parseFloat(remaining).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })}`}
                            </h1>
                        </span>
                    </motion.div>
                </div>
            </section >
        )
    }
}

export default InvestmentUserPackagesSection

InvestmentUserPackagesSection.propTypes = {
    user: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired
}