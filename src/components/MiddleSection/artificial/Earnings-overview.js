import React from 'react'
import PropTypes from 'prop-types'

const EarningsOverview = (props) => {
  return (
    <section className='font-inter-500 flex flex-col items-center gap-5 w-full sm:w-6/12 m-5 font-Biryani'>
      {/* TITULO */}
      <h2 className='font-semibold text-xl text-white-normal'>Gains Report</h2>
      {/* CONTAINER */}
      <div className='flex flex-col w-full'>
        {/* WRAPPER */}
        <div className='flex flex-col items-center sm:items-end'>
          <div className='flex flex-row items-center justify-between px-8 w-11/12 sm:w-11/12 h-12 bg-artificial-theme-white-secondary rounded-t-xl'>
            <p className='font-semibold text-lg text-black-normal'>Last month</p>
            <p className='font-semibold text-lg text-black-normal'>
              {parseFloat(`${props.sumaMontos}`).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </p>
          </div>
          <div className='flex flex-row items-center justify-between px-8 w-11/12 sm:w-11/12 h-12 bg-artificial-theme-white-secondary'>
            <p className='font-semibold text-lg text-black-normal'>This month</p>
            <p className='font-semibold text-lg text-black-normal'>
              {parseFloat(`${props.sumaMontosMesActual}`).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </p>
          </div>
          <div className='flex flex-row items-center justify-between px-8 w-11/12 sm:w-11/12 h-12 bg-artificial-theme-white-secondary'>
            <p className='font-semibold text-lg text-black-normal'>This week</p>
            <p className='font-semibold text-lg text-black-normal'>
              {parseFloat(`${props.montosSemanaActual}`).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })}
            </p>
          </div>
          <div className='flex flex-col items-start justify-around px-8 py-2 w-11/12 sm:w-11/12 h-32 bg-artificial-theme-dark-black rounded-xl'>
            <p className='font-semibold text-lg text-white-primary'>
              Incoming's Earnings
            </p>
            {
              isNaN(props.todayEarnings) ? (
                <p className="bg-black-balanceCard w-20 h-8 rounded-sm"></p>
              ) :
                (
                  <>
                    <p className='font-bold text-2xl text-white-normal animate pulse'>

                      {parseFloat(`${props.todayEarnings}`).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </p>
                  </>
                )
            }

          </div>
        </div>
      </div>



    </section>
  )
}

export default EarningsOverview

EarningsOverview.propTypes = {
  sumaMontos: PropTypes.number,
  sumaMontosMesActual: PropTypes.number,
  montosSemanaActual: PropTypes.number,
  todayEarnings: PropTypes.number,
}