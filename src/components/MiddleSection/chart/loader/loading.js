import React from 'react'
import styles from './loader.module.css'

const Loading = () => {
    return (
        <>
            <div className={`${styles.hidden} flex gap-8 p-8 flex-col bg-white-referralList w-full h-full`} >

                <div className="flex gap-20 items-center justify-center animate-pulse sm:gap-5 md:gap-10 lg:gap-14 xl:gap-20">
                    <p className="w-full rounded-sm h-8 bg-white-normal"></p>
                </div>
                <div className="flex gap-20 items-center justify-around animate-pulse sm:gap-5 md:gap-10 lg:gap-14 xl:gap-20">
                    <p className={`${styles.coinLoader} w-14 rounded-sm h-8 bg-gray-loader sm:w-18 md:w-20 xl:w-28 lg:w-24`} ></p>
                    <p className={`${styles.coinLoader} w-14 rounded-sm h-8 bg-gray-loader sm:w-18 md:w-20 xl:w-28 lg:w-24`} ></p>
                    <p className={`${styles.coinLoader} w-14 rounded-sm h-8 bg-gray-loader sm:w-18 md:w-20 xl:w-28 lg:w-24`} ></p>
                    <p className={`${styles.coinLoader} w-14 rounded-sm h-8 bg-gray-loader sm:w-18 md:w-20 xl:w-28 lg:w-24`} ></p>
                </div>
                <div className="flex gap-20 items-center justify-around animate-pulse sm:gap-5 md:gap-10 lg:gap-14 xl:gap-20">
                    <p className={`${styles.coinLoader}  w-14 rounded-sm h-8 bg-gray-loader sm:w-18 md:w-20 xl:w-28 lg:w-24`} ></p>
                    <p className={`${styles.coinLoader}  w-14 rounded-sm h-8 bg-gray-loader sm:w-18 md:w-20 xl:w-28 lg:w-24`} ></p>
                    <p className={`${styles.coinLoader}  w-14 rounded-sm h-8 bg-gray-loader sm:w-18 md:w-20 xl:w-28 lg:w-24`} ></p>
                    <p className={`${styles.coinLoader}  w-14 rounded-sm h-8 bg-gray-loader sm:w-18 md:w-20 xl:w-28 lg:w-24`} ></p>
                </div>
                <div className={` flex gap-20 items-center justify-around animate-pulse sm:gap-5 md:gap-10 lg:gap-14 xl:gap-20`} >
                    <p className={`${styles.coinLoader}  w-14 rounded-sm h-8 bg-gray-loader  sm:w-18 md:w-20 xl:w-28 lg:w-24`} ></p>
                    <p className={`${styles.coinLoader}  w-14 rounded-sm h-8 bg-gray-loader  sm:w-18 md:w-20 xl:w-28 lg:w-24`} ></p>
                    <p className={`${styles.coinLoader}  w-14 rounded-sm h-8 bg-gray-loader  sm:w-18 md:w-20 xl:w-28 lg:w-24`} ></p>
                    <p className={`${styles.coinLoader}  w-14 rounded-sm h-8 bg-gray-loader  sm:w-18 md:w-20 xl:w-28 lg:w-24`} ></p>
                </div>

            </div>
        </>
    )
}

export default Loading