import React from 'react'
import PropTypes from 'prop-types'
import Styles from '../styles/settings.module.css'

const ArtificialSettings = ({
    handleSubmit,
    updateUserInformation,
    handleOnChange,
    user,
    success,
    error,
    infoUser,
}) => {


    return (
        <form
            id='login'
            onSubmit={handleSubmit}
            className={`${Styles.background} flex flex-col justify-center items-center w-full h-full font-roboto mb-72 bg-blue-background`} >
            <div className=' w-5/6 rounded-md '>
               
                <div className={`${Styles.information} container mx-auto bg-blue-background mt-10 rounded px-4`}>
                    <div className='xl:w-full border-b border-gray-adminParagraph dark:border-gray-700 py-5'>
                        <div className='flex justify-center w-10/12 mx-auto xl:w-full xl:mx-0 items-center'>
                            <p className='text-lg text-gray-800 dark:text-white-placeholder font-bold'>Personal Information</p>
                        </div>
                    </div>
                    <div className='mx-auto pt-4 w-full'>
                        <div className='container mx-auto w-10/12'>

                            {/* EMAIL */}
                            <div className='xl:w-4/12 lg:w-1/2 md:w-1/2 flex flex-col mb-6'>
                                <label htmlFor='Email' className='pb-2 text-sm font-bold text-gray-800 dark:text-white-placeholder'>
                                    Email
                                </label>
                                <div className='border border-green-400 shadow-sm rounded flex'>
                                    <input
                                        type='text'
                                        id='Email'
                                        name='email'
                                        className='pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-blue-input text-gray-500 dark:text-white-placeholder'
                                        placeholder='example@gmail.com'
                                        onChange={handleOnChange}
                                        value={user?.emailAddress}
                                        disabled
                                    />
                                </div>
                            </div>

                            {/* STATE */}
                            <div className='xl:w-4/12 lg:w-1/2 md:w-1/2 flex flex-col mb-6'>
                                <label htmlFor='State/Province' className='pb-2 text-sm font-bold text-gray-800 dark:text-white-placeholder'>
                                    State/Province
                                </label>
                                <input
                                    type='text'
                                    id='State/Province'
                                    name='state'
                                    className='border border-gray-adminParagraph dark:border-gray-700 pl-3 py-3 shadow-sm bg-blue-input rounded text-sm focus:outline-none focus:border-gray-apr placeholder-gray-500 text-gray-500 dark:text-white-placeholder'
                                    placeholder='London'
                                    onChange={handleOnChange}
                                    value={infoUser.state} />
                            </div>
                            {/* COUNTRY */}
                            <div className='xl:w-4/12 lg:w-1/2 md:w-1/2 flex flex-col mb-6'>
                                <label htmlFor='Country' className='pb-2 text-sm font-bold text-gray-800 dark:text-white-placeholder'>
                                    Country
                                </label>
                                <input
                                    type='text'
                                    id='Country'
                                    name='country'
                                    className='border bg-blue-input border-gray-adminParagraph dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-gray-apr placeholder-gray-500 text-gray-500 dark:text-white-placeholder'
                                    placeholder='United Kingdom'
                                    onChange={handleOnChange}
                                    value={infoUser.country} />
                            </div>
                            {/* POSTAL CODE */}
                            <div className='xl:w-4/12 lg:w-1/2 md:w-1/2 flex flex-col mb-6'>
                                <div className='flex items-center pb-2'>
                                    <label htmlFor='ZIP' className='text-sm font-bold text-gray-800 dark:text-white-placeholder'>
                                        ZIP/Postal Code
                                    </label>
                                    
                                </div>
                                <input
                                    type='text'
                                    name='zip'
                                    id='ZIP'
                                    className='bg-blue-input border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-gray-apr placeholder-gray-500 text-gray-500 dark:text-white-placeholder'
                                    placeholder={86745}
                                    onChange={handleOnChange}
                                    value={infoUser.zip} />
                            </div>
                            {/* USDT WALLET  */}
                            <div className='xl:w-4/12 lg:w-1/2 md:w-1/2 flex flex-col mb-6'>
                                <div className='flex items-center pb-2'>
                                    <label htmlFor='ZIP' className='text-sm font-bold text-gray-800 dark:text-white-placeholder'>
                                        Payout wallet (USDT/BEP20)
                                    </label>
                                    
                                </div>
                                <input
                                    type='text'
                                    name='wallet'
                                    id='WALLET'
                                    className='bg-blue-input border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-gray-apr placeholder-gray-500 text-gray-500 dark:text-white-placeholder'
                                    onChange={handleOnChange}
                                    value={infoUser.wallet} />
                            </div>
                            {/* SECURITY PIN  */}
                            <div className='xl:w-4/12 lg:w-1/2 md:w-1/2 flex flex-col mb-6'>
                                <div className='flex items-center pb-2'>
                                    <label htmlFor='ZIP' className='text-sm font-bold text-gray-800 dark:text-white-placeholder'>
                                        PIN*
                                    </label>
                                    
                                </div>
                                <input
                                    type='number'
                                    name='pin'
                                    id='PIN'
                                    className='bg-blue-input border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-gray-apr placeholder-gray-500 text-gray-500 dark:text-white-placeholder'
                                    onChange={handleOnChange}
                                    value={infoUser.pin} />

                            </div>

                        </div>
                    </div>
                </div>

                {
                    success && (
                        <p className='text-green-button text-right mb-2 mt-2 text-lg'>{success}</p>
                    )
                }
                {
                    error && (
                        <p className='text-badges-admin text-right mb-2 mt-2 text-lg'>{error}</p>
                    )
                }

                <div className='container mx-auto w-11/12 xl:w-full'>
                    <div className='w-full py-4 sm:px-20  flex justify-center px-10'>
                        <button
                            type='button'
                            className='bg-badges-admin focus:outline-none transition duration-150 ease-in-out hover:bg-gray-loader dark:bg-gray-700 rounded text-white-normal dark:text-indigo-600 px-12 py-4 text-xs mr-4'>
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='bg-badges-primary focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white-normal px-12 py-4 text-md'
                            onClick={updateUserInformation}>

                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default ArtificialSettings
ArtificialSettings.propTypes = {
    handleSubmit: PropTypes.func,
    updateUserInformation: PropTypes.func,
    handleOnChange: PropTypes.func,
    user: PropTypes.object,
    error: PropTypes.bool,
    success: PropTypes.bool,
    infoUser: PropTypes.object,
    secretWordtxt: PropTypes.string,
}