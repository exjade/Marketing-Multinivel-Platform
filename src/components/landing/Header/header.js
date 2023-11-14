import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'

const LandingHeader = () => {
    const { t } = useTranslation();
    return (
        <header className='flex flex-row justify-around items-center sm:px-10 sm:py-10 py-5 h-20'>
            {/* LOGO */}
            <div>
                <Link to='/'>
                    <img src='/logo.webp' alt='logo' className='w-28 h-28 object-contain' />
                </Link>
            </div>

            {/* NAVBAR */}
            <div className='flex flex-row items-center justify-center'>
                {/* BUTTON LOGIN  */}
                <Link to={ROUTES.LOGIN}>
                    <button
                        type='button'
                        className='w-32 h-12 bg-transparent rounded-md text-white-normal font-poppins-600'
                    >
                        {t('Login')}
                    </button>
                </Link>
                {/* BUTTON SIGNUP */}
                <Link to={ROUTES.SIGN_UP}>
                    <button
                        type='button'
                        className='w-32 h-12 bg-white-normal rounded-md text-black-normal font-poppins-600'
                    >
                        {t('Sign up')}
                    </button>
                </Link>
            </div>

        </header>
    )
}

export default LandingHeader