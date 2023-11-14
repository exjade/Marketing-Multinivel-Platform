import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from '../css/referral.module.css'
import ReferralLoader from './referral-loader'
import PackagesList from './active-packages'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'react-i18next'

const ReferralBody = ({
    isLoading,
    setIsLoading,
    user
}) => {
    
    const { t } = useTranslation()

    // LOADER
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () => 
            setIsLoading(true) 
    }, [])

    const handleLoader = () => { return <ReferralLoader /> }

    if (isLoading) return handleLoader()
    else {
        return (
            <section className={`${styles.users}  text-green-header w-full `} >
                <div className={`flex justify-center bg-white-normal items-center py-10 text-2xl font-poppins-500 font-normal rounded-tr-3xl rounded-tl-3xl`} >
                    <h2 className='text-green-header'>{t('My Packages')}</h2>
                </div>
                <PackagesList
                    user={user}
                />
            </section>
        )
    }
}

export default ReferralBody

ReferralBody.propTypes = {
    isLoading: PropTypes.bool,
    setIsLoading: PropTypes.func,
    user: PropTypes.object
}