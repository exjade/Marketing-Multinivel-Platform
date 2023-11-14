import React from 'react'
//styles
import '../../styles/sidebar/sidebar.css'
import styles from '../../styles/modules/sidebar/sidebar.module.css' //eslint-disable-line
//propTypes
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'react-i18next'

const MonthlyReport = ({ user, theme }) => {
    const { t } = useTranslation()
    const profitEarningPercentaje = () => (user?.Profit * 100) / user?.Applied;
    return (

        <div className={`middlesection_montly_container`} >

            {/* USERS BALANCE */}
            <div className={`${theme ? 'card-dark-theme' : 'Sidebar_Middle_Card'}`}>
                <h3 className='font-poppins-700 font-bold capitalize' > {t('Balance')}</h3>
                <div className='middlesection_title flex flex-col gap-3'>
                   
                        <h2>
                            {parseFloat(user?.Balance).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            })}
                        </h2>
                       
                  
                    <p className={`${styles.text_muted} middlesection_monthly_report_text_muted`} >
                        {t('Current Balance')}
                    </p>
                </div>
            </div>
            {/* USERS APPLIED */}
            <div className={`${theme ? 'card-dark-theme' : 'Sidebar_Middle_Card'}`}>
                <h3 className='font-poppins-700 font-bold capitalize '>{t('Investment')}</h3>
                <div className='middlesection_title flex flex-col gap-3'>
                   
                        <h2>
                            {parseFloat(user?.Applied).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            })}
                        </h2>
                   
                      
                    
                    <p className={`${styles.text_muted} middlesection_monthly_report_text_muted`} >
                         {t('Current Investment')}
                    </p>
                </div>
            </div>

            {/* USERS PROFIT */}
            <div className={`${theme ? 'card-dark-theme' : 'Sidebar_Middle_Card'}`}>
                <h3 className='font-poppins-700 font-bold capitalize'>{t('profit')}</h3>
                <div className='middlesection_title flex flex-col gap-3'>
                    
                        <h2>
                            {parseFloat(user?.Profit).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            })}
                        </h2>
                        <h6 className={`${styles.success} middlesection_monthtly_report_success`} >
                            {profitEarningPercentaje(user?.Applied, user?.Profit).toFixed(2)}%
                        </h6>
                  
                    <p className={`${styles.text_muted} middlesection_monthly_report_text_muted`}  >
                         {t('Current Profit')}
                    </p>
                </div>
            </div>

            {/* REPORT 4 */}
            <div className={`${theme ? 'card-dark-theme' : 'Sidebar_Middle_Card'}`}>
                <h3 className='font-poppins-700 font-bold capitalize'>{t('withdrawal')}</h3>
                <div className='middlesection_title flex flex-col gap-3'>
                    
                        <h2>
                            {parseFloat(user?.Withdrawal).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            })}
                        </h2>
              
                    <p className={`${styles.text_muted} middlesection_monthly_report_text_muted`}  >
                         {t('Current Withdrawal')}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MonthlyReport

MonthlyReport.propTypes = {
    theme: PropTypes.any,
    user: PropTypes.object,
    Balance: PropTypes.number,
    Withdrawal: PropTypes.number,
    Profit: PropTypes.number,
    Applied: PropTypes.number
}

