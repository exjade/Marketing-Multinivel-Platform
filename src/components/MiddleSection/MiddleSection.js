import React from 'react';
import PropTypes from 'prop-types';
//stiles
import '../../styles/sidebar/sidebar.css';
import styles from './artificial/styles/overview.module.css';
//components
// import MiddleCards from './cards' //eslint-disable-next-line 
// import MonthlyReport from './monthly-report'
// import FastCrypto from './FastCrypto'
// import CryptoTracker from './chart/crypto-tracker'
// import WithdrawalDashboard from './withdrawal-dashboard/withdrawal-dashboard'
import TotalBalances from './artificial/total-balances';
// error boundary
import Error from '../../error/error';
//hooks
import useUser from '../../hooks/use-user';
import EarningsOverview from './artificial/Earnings-overview';
import { useTranslation } from 'react-i18next';
import TitleDate from './artificial/title-date';
// import DashboardOverview from './artificial/overview/dashboard-overview'
// import RecentReferrals from './artificial/overview/recent-referrals'
// import MonthlyChartOverview from './artificial/overview/monthly-chart-overview'
import useEarningsOverview from '../../hooks/use-earningsOverview';
import useAuthListener from '../../hooks/use-auth-listener';
import useUsers from '../../hooks/use-users';
import DashboardOverview from './artificial/overview/new-design/dashboard-overview';
// import MonthlyRevenueChart from './artificial/overview/new-design/monthly-revenue-chart'
import LatestTransactions from './artificial/table/latest-transactions';
import ActionSuccess from '../actions-status/success';
import useActionSuccess from '../../hooks/action-status/action-success';


const MiddleSection = (
  // { coins, search }
) => {

  const { successAction, handleActiveActión } = useActionSuccess()
  //eslint-disable-next-line
  const { t } = useTranslation()
  const { user } = useUser()
  const { users } = useUsers()
  const { user: currentUser } = useAuthListener()
  const { earnings } = useEarningsOverview()
  const filterUserEarnings = earnings?.filter((earnings) => earnings.userId === currentUser?.uid)

  // ============================ TODO: REFACTOR LAST MONTH EARNINGS ============================ //
  const fechaHaceUnMes = new Date();
  fechaHaceUnMes.setMonth(fechaHaceUnMes.getMonth() - 1);
  const timestampHaceUnMes = Math.floor(fechaHaceUnMes.getTime() / 1000);
  const gananciasUltimoMes = filterUserEarnings.filter(ganancia => ganancia.date >= timestampHaceUnMes);
  const sumaMontos = gananciasUltimoMes.reduce((total, ganancia) => total + ganancia.amount, 0);
  // ============================ TODO: REFACTOR THIS MONTH EARNINGS ============================ //
  const fechaActual = new Date();
  const añoActual = fechaActual.getFullYear();
  const mesActual = fechaActual.getMonth() + 1;
  const gananciasMesActual = filterUserEarnings.filter(earning => {
    const fecha = new Date(earning.date);
    return fecha.getFullYear() === añoActual && fecha.getMonth() + 1 === mesActual;
  });
  const sumaMontosMesActual = gananciasMesActual.reduce((total, ganancia) => total + ganancia.amount, 0);
  // ============================ TODO: REFACTOR THIS WEEK EARNINGS ============================ //
  const fechaActual1 = new Date();
  const primerDiaSemana = new Date(fechaActual1.setDate(fechaActual1.getDate() - fechaActual1.getDay()));
  const ultimoDiaSemana = new Date(fechaActual1.setDate(fechaActual1.getDate() + 6));
  const gananciasSemanaActual = filterUserEarnings.filter(ganancia => {
    const fecha = new Date(ganancia.date);
    return fecha >= primerDiaSemana && fecha <= ultimoDiaSemana;
  });
  const montosSemanaActual = gananciasSemanaActual.reduce((total, ganancia) => total + ganancia.amount, 0);
  // ============================ TODO: REFACTOR  TODAY  EARNINGS ============================ //
  const todayEarnings = parseFloat(user?.Applied) * 0.018;


  const filterReferrals = users?.filter((u) => u.referral?.referrerBy.includes(user?.referral?.referralCode))
  const filterReferralsWithInvestment = filterReferrals?.filter((u) => u.Applied > 0)
  const filterReferralsWithoutInvestment = filterReferrals?.filter((u) => u.Applied < 0)


  return (
    <>
      <Error>
        <TitleDate
          user={user}
          handleActiveActión={handleActiveActión}
        />
      </Error>

      <Error>
        <DashboardOverview
          user={user}
          filterReferralsWithInvestment={filterReferralsWithInvestment}
          filterReferralsWithoutInvestment={filterReferralsWithoutInvestment}
          filterReferrals={filterReferrals}
        />
      </Error>

      <div className='flex flex-row w-full items-center justify-center '>
        <div className={`${styles.illustration} flex flex-col sm:flex-row w-11/12 items-center justify-between  font-roboto`}>
          <Error>
            <TotalBalances
              user={user}
            />
          </Error>
          <Error>
            <EarningsOverview
              sumaMontos={sumaMontos}
              sumaMontosMesActual={sumaMontosMesActual}
              montosSemanaActual={montosSemanaActual}
              todayEarnings={todayEarnings}
            />
          </Error>
        </div>
      </div>

      {/* <Error>
        <FastCrypto coins={coins} search={search} />
      </Error> */}

      {
        successAction &&
        (
          <ActionSuccess
            action={`Code`} />
        )
      }

    </>
  )
}

export default MiddleSection

MiddleSection.propTypes = {
  coins: PropTypes.array,
  search: PropTypes.string,
  theme: PropTypes.bool,
  user: PropTypes.object
};