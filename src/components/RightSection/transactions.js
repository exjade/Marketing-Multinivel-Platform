import React from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'
//styles
import '../../styles/sidebar/sidebar.css'
import styles from '../../styles/modules/rightsections/right.module.css'
//hooks
import useInvestments from '../../hooks/use-investments'
import { useTranslation } from 'react-i18next'
import { formatDistance } from 'date-fns'


const RecentTransactions = () => {
  const { t } = useTranslation();
  const { investmentsUsers } = useInvestments()

  const investmentCompleted = investmentsUsers?.filter(investment => investment.status === 'COMPLETED')
  const lastCompleted = investmentCompleted?.sort((a, b) => { return new Date(b.date) - new Date(a.date) })


  return (
    <div className="rightsection_recent_transactions_container">
      <div className="rightsection_recent_transactions_header px-8 sm:px0">
        <h2 className='font-semibold capitalize'>{t('RecentTransactions')}</h2>
        <Link to={ROUTES.TRANSACTIONS}>
          <p className='capitalize'>view all</p>
        </Link>
      </div>

      {
        investmentCompleted?.length > 0 ?
          (
            <>
              {
                lastCompleted?.slice(2, 6).map((investment, k) => (
                  <div className="rightsection_recent_transactions_list" key={k}>
                    {/* SERVICES */}
                    <div className="rightsection_recent_transactions_service">
                      <div className={`rightsection_recent_transactions_service_icon ${styles.bg_purple_light}`}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/2794/2794088.png"
                          alt="tether"
                          className='w-8 h-8 object-contain'
                        />
                      </div>
                      <div className="rightsection_recent_transactions_service_details">
                        <h4>{investment.currency.substring(0, 8)}</h4>
                        <p className='font-normal capitalize'>{`${investment.username.substring(0, 3)}***`}</p>
                      </div>
                    </div>

                    {/* PRICE */}
                    <span>
                      <h4 className='font-bold font-Inter-400 text-green-button'>
                        {`${parseInt(investment.amount)?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}`}
                      </h4>
                      <i> {formatDistance(investment.date, new Date(), { addSuffix: true })}</i>
                    </span>

                  </div>
                ))
              }

            </>
          )
          :
          (<>
            <div className="flex flex-col gap-4">
              <div className='bg-white-login_button h-20 w-full rounded-xl animate-pulse'></div>
              <div className='bg-white-login_button h-20 w-full rounded-xl animate-pulse'></div>
              <div className='bg-white-login_button h-20 w-full rounded-xl animate-pulse'></div>
              <div className='bg-white-login_button h-20 w-full rounded-xl animate-pulse'></div>
            </div>
          </>)
      }



    </div>
  )
}

export default RecentTransactions