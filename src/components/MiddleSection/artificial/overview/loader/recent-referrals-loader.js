import React from 'react'
import styles from '../../styles/overview.module.css'

const RecentReferralsLoader = () => {
    return (
        < div
            className={`${styles.middleSectionReferrals} flex flex-col justify-between items-center w-full rounded-xs px-10 py-8 gap-8`}>
            <div className={`${styles.referralsMobile} flex flex-row  gap-5 items-center  `} >
                <div className='w-10 h-10 bg-gray-loader object rounded-full animate-pulse'></div>

                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>

                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>


                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>


                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>


                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>

            </div>
            <div className={`${styles.referralsMobile} flex flex-row  gap-5 items-center  `} >
                <div className='w-10 h-10 bg-gray-loader object rounded-full animate-pulse'></div>

                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>

                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>


                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>


                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>


                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>

            </div>
            <div className={`${styles.referralsMobile} flex flex-row  gap-5 items-center  `} >
                <div className='w-10 h-10 bg-gray-loader object rounded-full animate-pulse'></div>

                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>

                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>


                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>


                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>


                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>

            </div>
            <div className={`${styles.referralsMobile} flex flex-row  gap-5 items-center  `} >
                <div className='w-10 h-10 bg-gray-loader object rounded-full animate-pulse'></div>

                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>

                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>


                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>


                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>


                <div className='bg-gray-loader w-20 h-4 animate-pulse'></div>

            </div>
        </div>
    )
}

export default RecentReferralsLoader