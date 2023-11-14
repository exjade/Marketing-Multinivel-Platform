import React from 'react'
import PropTypes from 'prop-types'
import * as ROUTES from '../../../constants/routes'

const TotalBalances = (props) => {
  return (
    <section className='flex flex-col items-center justify-between gap-5 w-full sm:w-6/12 font-Biryani'>
      {/* TITULO  */}
      <h2 className='font-semibold text-xl text-white-normal'>Account Balance</h2>
      {/* CARD DE BALANCE */}
      <div className='container flex items-center justify-center w-full'>
        <div className=' flex flex-col sm:flex-row items-start sm:items-center justify-between bg-artificial-theme-dark-black rounded-xs 
        w-full sm:w-11/12 h-32 
        mx-4 xl:mx-4 lg:mx-4 2xl:mx-4 md:mx-2 sm:mx-2'>
          <span className='p-4 flex flex-col gap-4 items-center'>
            {
              isNaN(props.user?.Balance) || props.user?.Balance === undefined  ? (
                <p className="bg-black-balanceCard w-20 h-8 rounded-sm font-medium text-2xl text-white-normal">$0.00</p>
              ) :
                (
                  <>
                    <p className='text-3xl font-semibold text-white-normal'>
                      {parseFloat(`${props.user?.Balance}`).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </p>
                  </>
                )
            }
            <a
              href={ROUTES.TRANSACTIONS}
              className='text-white-primary'>
              Go to balances
            </a>
          </span>
          <img
            src="assets/arrow.png"
            alt="lineal chart"
            className='w-16 h-16 sm:w-28 sm:h-28 object-contain text-green parrafo hidden sm:inline'
          />
        </div>
      </div>
      {/* CARD DE DISPONIBLE PARA RETIRAR */}
      <div className='container flex items-center justify-center'>
        <div className='bg-white-normal rounded-xl w-full sm:w-11/12 h-32 
        flex flex-row items-center justify-between mx-4 xl:mx-4 lg:mx-4 2xl:mx-4 md:mx-2 sm:mx-2'>
          <span className='p-4 flex flex-col gap-4 items-center'>
            {
              isNaN(props.user?.Applied) ||  props.user?.Applied === undefined  ? (
                <p className="bg-white-normal w-20 h-8 rounded-sm font-medium text-2xl text-black-default">$0.00</p>
              ) :
                (
                  <>
                    <p className='text-3xl font-semibold text-black-balanceCard '>
                      {parseFloat(`${props.user?.Applied}`).toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </p>
                  </>
                )
            }

            <button
              type='button'
              className='text-green-radored'>
              Funds Invested
            </button>
          </span>
          <img
            src="assets/arrow.png"
            alt="lineal chart"
            className='w-16 h-16 sm:w-28 sm:h-28 object-contain text-green parrafo  hidden sm:inline'
          />
        </div>
      </div>
    </section>
  )
}

export default TotalBalances

TotalBalances.propTypes = {
  user: PropTypes.object,
}