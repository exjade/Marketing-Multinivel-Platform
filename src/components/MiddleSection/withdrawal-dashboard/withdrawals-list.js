import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../../styles/modules/withdrawal-dashboard/w-dashboard.module.css';

const WithdrawalsList = ({ withdrawal, key }) => {

  return (
    <>
      <tr key={key} className='bg-white-normal' >
        <td className="px-5 py-5 border-1 border-b border-gray-border bg-white text-sm">
          <p className="text-gray-info text-xl whitespace-no-wrap">
            {withdrawal?.WithdrawalInformation?.tether?.AccountName.slice(0, 6)}***
          </p>
        </td>

        <td className="px-5 py-5 border-1 border-b border-gray-border bg-white text-sm flex justify-center items-center">
          <img alt="profil" src='assets/currency/tether.png' className="mx-auto object-cover rounded-full h-10 w-10 " />
        </td>


        <td className={`${styles.hiddenMobile} ${styles.hiddenMobileFold} px-5 py-5 border-1 border-b border-gray-border bg-white text-sm`} >
          <p className={`${styles.hiddenMobile} text-gray-info text-xl whitespace-no-wrap`} >
            {withdrawal?.CustomerWallet?.slice(0, 8)}...
          </p>
        </td>


        <td className={`${styles.hiddenMobileFold} px-5 py-5 border-1 border-b border-gray-border bg-white text-sm`} >
          {
            withdrawal?.WithdrawalStatus === 'Deposited' && (
              <p className="text-green-button text-xl whitespace-no-wrap">
                Paid
              </p>
            )
          }
        </td>

        <td className="px-5 py-5 border-1 border-b border-gray-border bg-white text-sm">
          <p className="text-green-button text-xl whitespace-no-wrap">
            {`${withdrawal?.WithdrawalInformation?.tether?.WithdrawalAmount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}`}
          </p>
        </td>
      </tr>
    </>
  )
}

export default WithdrawalsList

WithdrawalsList.propTypes = {
  withdrawal: PropTypes.object.isRequired,
  key: PropTypes.number,
}; 