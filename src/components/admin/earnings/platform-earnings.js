import React from 'react'
import { useTranslation } from 'react-i18next'
import useUser from '../../../hooks/use-user'
import AdminEarnings from './admin-earnings'

const PlatformEarnings = () => {

    const { t } = useTranslation()

    const { user: { rol } } = useUser()
    return (
        <>
            {
                rol === 'owner' || rol == 'admin' && rol !== 'investor' && rol !== 'sponsored' ? (
                    <section className="text-white bg-gray-900">
                        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                            <AdminEarnings />
                        </div>
                    </section>
                ) : (
                    <p className='h-screen w-screen flex justify-center items-center text-red-warning font-bold text-3xl'>{t('Unauthorized access')}</p>
                )
            }


        </>
    )
}

export default PlatformEarnings