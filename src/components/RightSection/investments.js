import React from 'react'
import * as ROUTES from '../../constants/routes'
//stiles
import '../../styles/sidebar/sidebar.css'
import styles from '../../styles/modules/rightsections/right.module.css'
//hooks
import useUser from '../../hooks/use-user'
import useInvestments from '../../hooks/use-investments'
import { useTranslation } from 'react-i18next'


const Investments = () => {
    const { t } = useTranslation()
    const { investmentsUsers } = useInvestments()
    const { user } = useUser()

    const clientTransactions = investmentsUsers?.filter(transaction => transaction.userId === user?.userId)
    const clientConfirmed = clientTransactions?.filter(transaction => transaction.amount > 0)

    return (
        <>
            {
                clientTransactions && clientTransactions?.length > 0 ? (
                    <div className="rightsection_investments_container">
                        {/* INVESTMENTS */}
                        <div className="rightsection_investments_header">
                            <h2 className='font-bold font-lato-700'>{t('Investments')}</h2>
                            <a href={ROUTES.TRANSACTIONS} >
                                <span className="material-icons-sharp">chevron_right</span>
                                {t('More')}
                            </a>
                        </div>
                        {
                            clientTransactions ? (
                                <>
                                    {clientConfirmed?.slice(0, 2).map((transaction, i) => (
                                        < div className="rightsection_investment" key={i}>


                                            {
                                                transaction.method === 'AMERICAN DOLLAR' ? (
                                                    <>
                                                        <img src='https://images.vexels.com/media/users/3/164649/isolated/preview/010f55d9bb5f8a28c3620583482d89ed-circulo-de-icono-de-idioma-de-bandera-de-estados-unidos.png' alt="american dollar" loading='lazy' />
                                                    </>
                                                ) : transaction.method === 'MEXICAN PESO' ?
                                                    (
                                                        <>
                                                            <img src='https://www.pngkey.com/png/full/12-123405_objects-mexico-flag-logo-png.png' alt="mexican peso" loading='lazy' />
                                                        </>
                                                    )
                                                    : transaction.method === 'COLOMBIAN PESO' ? (
                                                        <>
                                                            <img src='https://cdn-icons-png.flaticon.com/512/323/323343.png' alt="colombian peso" loading='lazy' />
                                                        </>
                                                    )
                                                        : transaction.method === 'BRAZILIAN REAL' ? (
                                                            <>
                                                                <img src='https://flyclipart.com/thumbs/brazil-flag-file-flag-of-brazil-1558779.png' alt="brazilian real" loading='lazy' />
                                                            </>
                                                        )
                                                            : transaction.currency === 'USDT (TRC20)' ? (
                                                                <>
                                                                    <img src='https://w7.pngwing.com/pngs/581/504/png-transparent-tether-usdt-cryptocoins-icon.png' alt="tether" loading='lazy' />
                                                                </>
                                                            )
                                                                : null
                                            }

                                            {
                                                transaction.method === 'AMERICAN DOLLAR' ? (
                                                    <>
                                                        <h4 className='font-bold font-lato-500'>
                                                            USD
                                                        </h4>
                                                    </>
                                                ) : transaction.method === 'MEXICAN PESO' ?
                                                    (
                                                        <>
                                                            <h4 className='font-bold font-lato-500'>
                                                                MXN
                                                            </h4>
                                                        </>
                                                    )
                                                    : transaction.method === 'COLOMBIAN PESO' ? (
                                                        <>
                                                            <h4 className='font-bold font-lato-500'>
                                                                COP
                                                            </h4>
                                                        </>
                                                    )
                                                        : transaction.method === 'BRAZILIAN REAL' ? (
                                                            <>
                                                                <h4 className='font-bold font-lato-500'>
                                                                    REAL
                                                                </h4>
                                                            </>
                                                        )
                                                            : transaction.currency === 'USDT (TRC20)' ? (
                                                                <>
                                                                    <h4 className='font-bold font-lato-500'>
                                                                        USDT
                                                                    </h4>
                                                                </>
                                                            )
                                                                : null
                                            }


                                            <div className="rightsection_investment_time">
                                                <p className='font-bold'>{t('Status')}</p>
                                                <p className='text-green-success'>{transaction.status}</p>
                                            </div>
                                            <div className={`${styles.CodehiddenMobile} rightsection_investment_bonds`} >
                                                <p>{t('Code')}</p>
                                                <small className={`${styles.text_muted}`}>{`${transaction?.id.substring(0, 7)}`}</small>
                                            </div>
                                            <div className="rightsection_investment_amount">
                                                <h4 className='font-bold font-lato-500'>
                                                    {parseFloat(transaction.amount)?.toLocaleString('en-US', {
                                                        style: 'currency',
                                                        currency: 'USD',
                                                    })}

                                                </h4>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <div className="rightsection_investment w-full h-full rounded-md justify-between flex items-center">
                                        <div className="flex flex-row gap-1 w-full">
                                            <div className="rightsection_investment bg-white-login_button h-16 w-2/6 animate-pulse"></div>
                                            <div className="rightsection_investment_time bg-white-login_button h-16 w-2/6 animate-pulse"></div>
                                            <div className="rightsection_investment_bonds bg-white-login_button h-16 w-2/6 animate-pulse"></div>
                                            <div className="rightsection_investment_amount bg-white-login_button h-16 w-2/6 animate-pulse"></div>
                                        </div>
                                    </div>
                                </>
                            )

                        }

                    </div>
                ) :
                    (
                        <>
                            <div className="rightsection_investments_container">
                                {/* INVESTMENTS */}
                                <div className="rightsection_investments_header">
                                    <h2 className='font-bold font-lato-700'>{t('Investments')}</h2>
                                    <a href={ROUTES.TRANSACTIONS} >
                                        <span className="material-icons-sharp">chevron_right</span>
                                        {t('More')}
                                    </a>
                                </div>

                                <>
                                    <div className="rightsection_investment w-full h-full rounded-md justify-between flex items-center">
                                        <div className="flex flex-row gap-1 w-full">
                                            <div className="rightsection_investment bg-white-login_button h-16 w-2/6 animate-pulse"></div>
                                            <div className="rightsection_investment_time bg-white-login_button h-16 w-2/6 animate-pulse"></div>
                                            <div className="rightsection_investment_bonds bg-white-login_button h-16 w-2/6 animate-pulse"></div>
                                            <div className="rightsection_investment_amount bg-white-login_button h-16 w-2/6 animate-pulse"></div>
                                        </div>
                                    </div>
                                </>
                            </div>
                        </>
                    )
            }


        </>
    )
}

export default Investments