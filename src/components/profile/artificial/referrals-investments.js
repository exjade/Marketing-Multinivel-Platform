import React from 'react'
import PropTypes from 'prop-types'
//eslint-disable-next-line
import styles from '../styles/user-profile.module.css'

const ReferralInvestments = ({ usersReferredByMe, user, referralsLength }) => {

  const haveApplied = usersReferredByMe?.filter(u => u.Applied > 0 && u.rol !== 'sponsored')
  const haveAppliedSponsor = usersReferredByMe?.filter(u => u.Applied > 0 && u.rol === 'sponsored')

  const sumApplied = haveApplied?.map(u => u.Applied)
  const sumAppliedSponsor = haveAppliedSponsor?.map(u => u.Applied)
  // sum referral balances
  const sum = sumApplied?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const sumSponsor = sumAppliedSponsor?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const percenntage = sum * 0.10

  const yourEarnings = user?.referral?.ReferralBalance - user?.referral?.LastPaymentBalance

  return (
    <div className={`w-11/12 my-10 flex justify-center items-center`} >
      <section className="flex flex-wrap flex-row items-center justify-center w-full p-6 my-6 bg-gray-100 text-gray-800">
        {/* SECTION 1 */}
        <div className="container grid grid-cols-2 place-items-center gap-6 mx-auto sm:grid-cols-2 xl:grid-cols-4">
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-50 text-gray-800">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-indigo-600">
              <span className="material-symbols-sharp text-4xl">
                payments
              </span>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-xl sm:text-2xl font-semibold leading-none">
                {
                  isNaN(yourEarnings) ? (
                    <p className="font-semibold text-2xl text-start">$0.00</p>
                  ) :
                    (
                      parseFloat(yourEarnings).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })
                    )
                }

              </p>
              <p className="capitalize">Weekly Earnings</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-50 text-gray-800">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-indigo-600">
              <span className="material-symbols-sharp">
                account_tree
              </span>
            </div>
            <div className="flex flex-col justify-center align-middle">

              {
                referralsLength === 0 || referralsLength === undefined || referralsLength === null || isNaN(referralsLength) ?
                  (
                    <p className="text-xl sm:text-2xl font-semibold leading-none">
                      {usersReferredByMe?.length}</p>
                  ) :
                  (
                    <p className="text-xl sm:text-2xl font-semibold leading-none">
                      {referralsLength}</p>

                  )
              }
              <p className="capitalize">Referrals</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-50 text-gray-800">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="h-9 w-9 text-gray-100">
                <path d="M425.706,142.294A240,240,0,0,0,16,312v88H160V368H48V312c0-114.691,93.309-208,208-208s208,93.309,208,208v56H352v32H496V312A238.432,238.432,0,0,0,425.706,142.294Z"></path>
                <rect width="32" height="32" x="80" y="264"></rect>
                <rect width="32" height="32" x="240" y="128"></rect>
                <rect width="32" height="32" x="136" y="168"></rect>
                <rect width="32" height="32" x="400" y="264"></rect>
                <path d="M297.222,335.1l69.2-144.173-28.85-13.848L268.389,321.214A64.141,64.141,0,1,0,297.222,335.1ZM256,416a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,416Z"></path>
              </svg>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-xl sm:text-2xl font-semibold leading-none">
                {
                  isNaN(user?.referral?.ReferralBalance) ? (
                    <p className="font-semibold text-2xl text-start">$0.00</p>
                  ) :
                    (
                      parseFloat(user?.referral?.ReferralBalance).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })
                    )
                }
              </p>
              <p className="capitalize">Total Earnings</p>
            </div>
          </div>
          <div className="flex p-4 space-x-4 rounded-lg md:space-x-6 bg-gray-50 text-gray-800">
            <div className="flex justify-center p-2 align-middle rounded-lg sm:p-4 bg-indigo-600">
              <span className="material-symbols-sharp">
                military_tech
              </span>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <p className="text-xl sm:text-2xl font-semibold leading-none">
                {parseFloat(sumSponsor).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD'
                })}
              </p>
              <p className="capitalize">Sponsors Total</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ReferralInvestments

ReferralInvestments.propTypes = {
  user: PropTypes.object,
  usersReferredByMe: PropTypes.array,
  referralsLength: PropTypes.number,
}