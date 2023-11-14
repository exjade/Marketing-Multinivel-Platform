import React from 'react'
import styles from '../css/packages.module.css'
const HeaderLoader = () => {
    return (
        <>
            <section className={`${styles.section} grid grid-row-2 place-items-center justify-around font-poppins-600 bg-black-default w-full h-full py-16 gap-10 pb-36`} >
                <div className='text-7xl font-normal flex flex-col justify-center items-center bg-black-default w-full text-white-normal gap-10'>
                    <h3 className='bg-gray-loader h-10 w-1/2'></h3>
                    <div className='grid grid-cols-3 gap-10 justify-between place-items-center '>
                        <div
                            className='text-black-default h-36 w-40 bg-gray-loader rounded-lg '
                        ></div>
                        <div
                            className='text-black-default h-36 w-40 bg-gray-loader rounded-lg '
                        ></div>
                        <div
                            className='text-black-default h-36 w-40 bg-gray-loader rounded-lg '
                        ></div>

                    </div>
                </div>
            </section>

        </>
    )
}
export default HeaderLoader