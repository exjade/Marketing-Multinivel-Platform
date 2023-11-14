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
    secretWordtxt,
}) => {


    return (
        <form
            id='login'
            onSubmit={handleSubmit}
            className='flex flex-col justify-center items-center w-full font-Inter-600 mb-72'>
            <div className='bg-white-normal w-5/6 rounded-md '>
                <div className='container mx-auto bg-white-normal rounded'>
                    <div className={`${Styles.banner} mx-auto`}>
                        <div className='xl:w-10/12 w-11/12 mx-auto xl:mx-0'>
                            <div className='rounded relative mt-8 h-48'>
                                <img src='https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form1.jpg' className='w-full h-full object-cover rounded absolute shadow' />
                                <div className='absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded' />
                                <div className='flex items-center px-3 py-2 rounded absolute right-0 mr-4 mt-4 cursor-pointer'>
                                    <div className='ml-2 text-gray-100'>
                                        {/* <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-edit' width={18} height={18} viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                                            <path stroke='none' d='M0 0h24v24H0z' />
                                            <path d='M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3' />
                                            <path d='M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3' />
                                            <line x1={16} y1={5} x2={19} y2={8} />
                                        </svg> */}
                                    </div>
                                </div>
                                <div className='w-20 h-20 rounded-full bg-cover bg-center bg-no-repeat absolute bottom-0 -mb-10 ml-12 shadow flex items-center justify-center'>
                                    <img src='https://cdn.tuk.dev/assets/webapp/forms/form_layouts/form2.jpg' className='absolute z-0 h-full w-full object-cover rounded-full shadow top-0 left-0 bottom-0 right-0' />
                                    <div className='absolute bg-black opacity-50 top-0 right-0 bottom-0 left-0 rounded-full z-0' />
                                    <div className='cursor-pointer flex flex-col justify-center items-center z-10 text-gray-100'>
                                        {/* <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-edit' width={20} height={20} viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                                            <path stroke='none' d='M0 0h24v24H0z' />
                                            <path d='M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3' />
                                            <path d='M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3' />
                                            <line x1={16} y1={5} x2={19} y2={8} />
                                        </svg> */}
                                    </div>
                                </div>
                            </div>
                            <div className='mt-16 flex flex-col xl:w-2/6 lg:w-1/2 md:w-1/2 w-full'>
                                <label htmlFor='username' className='pb-2 text-sm font-bold text-gray-800 dark:text-black-textBg'>
                                    Username
                                </label>
                                <input
                                    type='text'
                                    id='username'
                                    name='username'
                                    className='border border-gray-adminParagraph dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-gray-apr bg-gray-landing_feature placeholder-gray-500 text-gray-500 dark:text-black-textBg'
                                    placeholder='@example'
                                    onChange={handleOnChange}
                                    value={`@${user?.username}`}
                                    disabled
                                />

                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${Styles.information} container mx-auto bg-white-normal mt-10 rounded px-4`}>
                    <div className='xl:w-full border-b border-gray-adminParagraph dark:border-gray-700 py-5'>
                        <div className='flex justify-center w-10/12 mx-auto xl:w-full xl:mx-0 items-center'>
                            <p className='text-lg text-gray-800 dark:text-black-textBg font-bold'>Personal Information</p>
                        </div>
                    </div>
                    <div className='mx-auto pt-4 w-full'>
                        <div className='container mx-auto w-10/12'>

                            {/* EMAIL */}
                            <div className='xl:w-4/12 lg:w-1/2 md:w-1/2 flex flex-col mb-6'>
                                <label htmlFor='Email' className='pb-2 text-sm font-bold text-gray-800 dark:text-black-textBg'>
                                    Email
                                </label>
                                <div className='border border-green-400 shadow-sm rounded flex'>
                                    <div className='px-4 py-3 dark:text-black-textBg flex items-center border-r border-green-400'>
                                        <svg xmlns='http://www.w3.org/2000/svg' className='text-black-normal icon icon-tabler icon-tabler-mail' width={20} height={20} viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                                            <path stroke='none' d='M0 0h24v24H0z' />
                                            <rect x={3} y={5} width={18} height={14} rx={2} />
                                            <polyline points='3 7 12 13 21 7' />
                                        </svg>
                                    </div>
                                    <input
                                        type='text'
                                        id='Email'
                                        name='email'
                                        className='pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-gray-landing_feature text-gray-500 dark:text-black-textBg'
                                        placeholder='example@gmail.com'
                                        onChange={handleOnChange}
                                        value={user?.emailAddress}
                                        disabled
                                    />
                                </div>
                            </div>

                            {/* CITY */}
                            <div className='xl:w-4/12 lg:w-1/2 md:w-1/2 flex flex-col mb-6'>
                                <label htmlFor='City' className='pb-2 text-sm font-bold text-gray-800 dark:text-black-textBg'>
                                    City
                                </label>
                                <div className='border border-gray-adminParagraph dark:border-gray-700 shadow-sm rounded flex'>
                                    <input
                                        type='text'
                                        id='City'
                                        name='city'
                                        className='pl-3 py-3 w-full text-sm focus:outline-none border border-transparent focus:border-gray-apr bg-gray-landing_feature rounded placeholder-gray-500 text-gray-500 dark:text-black-textBg'
                                        placeholder='Los Angeles'
                                        onChange={handleOnChange}
                                        value={infoUser.city} />

                                    <div className='px-4 flex items-center border-l border-gray-adminParagraph dark:border-gray-700 flex-col justify-center text-gray-500 dark:text-black-textBg'>
                                        <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-chevron-up' width={16} height={16} viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                                            <path stroke='none' d='M0 0h24v24H0z' />
                                            <polyline points='6 15 12 9 18 15' />
                                        </svg>
                                        <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-chevron-down' width={16} height={16} viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
                                            <path stroke='none' d='M0 0h24v24H0z' />
                                            <polyline points='6 9 12 15 18 9' />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* STATE */}
                            <div className='xl:w-4/12 lg:w-1/2 md:w-1/2 flex flex-col mb-6'>
                                <label htmlFor='State/Province' className='pb-2 text-sm font-bold text-gray-800 dark:text-black-textBg'>
                                    State/Province
                                </label>
                                <input
                                    type='text'
                                    id='State/Province'
                                    name='state'
                                    className='border border-gray-adminParagraph dark:border-gray-700 pl-3 py-3 shadow-sm bg-gray-landing_feature rounded text-sm focus:outline-none focus:border-gray-apr placeholder-gray-500 text-gray-500 dark:text-black-textBg'
                                    placeholder='California'
                                    onChange={handleOnChange}
                                    value={infoUser.state} />
                            </div>
                            {/* COUNTRY */}
                            <div className='xl:w-4/12 lg:w-1/2 md:w-1/2 flex flex-col mb-6'>
                                <label htmlFor='Country' className='pb-2 text-sm font-bold text-gray-800 dark:text-black-textBg'>
                                    Country
                                </label>
                                <input
                                    type='text'
                                    id='Country'
                                    name='country'
                                    className='border bg-gray-landing_feature border-gray-adminParagraph dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-gray-apr placeholder-gray-500 text-gray-500 dark:text-black-textBg'
                                    placeholder='United States'
                                    onChange={handleOnChange}
                                    value={infoUser.country} />
                            </div>
                            {/* POSTAL CODE */}
                            <div className='xl:w-4/12 lg:w-1/2 md:w-1/2 flex flex-col mb-6'>
                                <div className='flex items-center pb-2'>
                                    <label htmlFor='ZIP' className='text-sm font-bold text-gray-800 dark:text-black-textBg'>
                                        ZIP/Postal Code
                                    </label>
                                    <div className='ml-2 cursor-pointer text-gray-600 dark:text-black-textBg'>
                                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={16} height={16}>
                                            <path className='heroicon-ui' d='M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' fill='currentColor' />
                                        </svg>
                                    </div>
                                </div>
                                <input
                                    type='text'
                                    name='zip'
                                    id='ZIP'
                                    className='bg-gray-landing_feature border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-gray-apr placeholder-gray-500 text-gray-500 dark:text-black-textBg'
                                    placeholder={86745}
                                    onChange={handleOnChange}
                                    value={infoUser.zip} />
                            </div>
                            {/* USDT WALLET  */}
                            <div className='xl:w-4/12 lg:w-1/2 md:w-1/2 flex flex-col mb-6'>
                                <div className='flex items-center pb-2'>
                                    <label htmlFor='ZIP' className='text-sm font-bold text-gray-800 dark:text-black-textBg'>
                                        Payout wallet (USDT/TRC20)
                                    </label>
                                    <div className='ml-2 cursor-pointer text-gray-600 dark:text-black-textBg'>
                                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={16} height={16}>
                                            <path className='heroicon-ui' d='M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' fill='currentColor' />
                                        </svg>
                                    </div>
                                </div>
                                <input
                                    type='text'
                                    name='wallet'
                                    id='WALLET'
                                    className='bg-gray-landing_feature border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-gray-apr placeholder-gray-500 text-gray-500 dark:text-black-textBg'
                                    placeholder='TSXm5ytQghAdtkmTk2cNreBD7MYqzms1hH'
                                    onChange={handleOnChange}
                                    value={infoUser.wallet} />
                            </div>
                            {/* SECURITY PIN  */}
                            <div className='xl:w-4/12 lg:w-1/2 md:w-1/2 flex flex-col mb-6'>
                                <div className='flex items-center pb-2'>
                                    <label htmlFor='ZIP' className='text-sm font-bold text-gray-800 dark:text-black-textBg'>
                                        Security PIN
                                    </label>
                                    <div className='ml-2 cursor-pointer text-gray-600 dark:text-black-textBg'>
                                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width={16} height={16}>
                                            <path className='heroicon-ui' d='M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' fill='currentColor' />
                                        </svg>
                                    </div>
                                </div>
                                <input
                                    type='number'
                                    name='pin'
                                    id='PIN'
                                    className='bg-gray-landing_feature border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-gray-apr placeholder-gray-500 text-gray-500 dark:text-black-textBg'
                                    placeholder='86745'
                                    onChange={handleOnChange}
                                    value={infoUser.pin} />

                            </div>

                            {
                                secretWordtxt &&
                                (
                                    <p className='my-5 text-lg font-bold text-red-card'>{secretWordtxt}</p>
                                )
                            }

                            {/* SECRET WORD  */}
                            <div className='xl:w-4/12 lg:w-1/2 md:w-1/2 flex flex-col mb-6'>
                                <div className='flex items-center pb-2'>
                                    <label htmlFor='ZIP' className='text-sm font-bold text-gray-800 dark:text-black-textBg'>
                                        Private Key
                                    </label>
                                    <span className="material-symbols-sharp text-[3px]">
                                        lock
                                    </span>
                                </div>
                                <input
                                    type='text'
                                    name='secretWord'
                                    id='SECRETWORD'
                                    className='bg-gray-landing_feature border border-red-400 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-gray-apr placeholder-gray-500 text-gray-500 dark:text-black-textBg'
                                    placeholder='86745'
                                    onChange={handleOnChange}
                                    value={infoUser.secretWord} />

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
                        <p className='text-red-warning text-right mb-2 mt-2 text-lg'>{error}</p>
                    )
                }

                <div className='container mx-auto w-11/12 xl:w-full'>
                    <div className='w-full py-4 sm:px-20 bg-white-normal flex justify-end px-10'>
                        <button
                            type='button'
                            className='bg-red-warning focus:outline-none transition duration-150 ease-in-out hover:bg-gray-loader dark:bg-gray-700 rounded text-white-normal dark:text-indigo-600 px-12 py-4 text-xs mr-4'>
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='bg-green-success focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white-normal px-12 py-4 text-md'
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