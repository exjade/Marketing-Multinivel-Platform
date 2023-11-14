import React, { useState } from 'react'
import PropTypes from 'prop-types'
//routes
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { v4 as uuidv4 } from 'uuid';
//styles
import '../../styles/sidebar/sidebar.css'
import styles from '../../styles/modules/settings/settings.module.css'
//hooks
import useUser from '../../hooks/use-user'
//firebase
import { firebase } from '../../lib/firebase'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage'
import { useTranslation } from 'react-i18next';
const firestore = getFirestore(firebase)
const storage = getStorage(firebase)

const Settings = ({ theme }) => {

  let history = useHistory()
  const { t } = useTranslation()
  const { user: { docId, username, profile } } = useUser()
  const [img, setImg] = useState('')
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  // USER INFORMATION
  const [infoUser, setInfoUser] = useState({
    fullName: '',
    paymentMethod: '',
    wallet: '',
    bankAccount: '',
    holderName: '',
    holderID: '',
    clabe: '',
    accountNumber: '',
    zelleEmail: '',
    description: '',
    country: '',
    cedula: '',
  })

  const imgExists = img === '' || img === null || img === undefined

  const bankInformation = {
    tether: {
      Currency: 'USDT',
      Wallet: infoUser.wallet,
      HolderNameUSDT: username,
    },
 
  }


  let downloadUrl;
  const fileHandler = async (event) => {
    try {
      const localFile = event.target.files[0];
      const storageRef = ref(storage, `/images/avatars/${username}/${uuidv4() + localFile.name} `)
      await uploadBytes(storageRef, localFile)
      downloadUrl = await getDownloadURL(storageRef)
      setImg(downloadUrl)
    } catch (error) {
      console.log(error)
    }
  }
  const newDoc = async () => {
    try {
      const userRef = doc(firestore, 'users', docId);
      await updateDoc(userRef, {
        photoURL: img
      })

      setTimeout(() => {
        setImg('')
        history.push(ROUTES.PROFILE)
        history.push(ROUTES.SETTINGS)
      }, 2000)

    } catch (error) {
      console.log('Failed: processing your file :(', error.message);
    }
  }

  const updateUserInformation = async () => {
    try {
      const userRef = doc(firestore, 'users', docId)

      if (infoUser.paymentMethod === 'TETHER') {
        await updateDoc(userRef, { bankInformationTether: bankInformation.tether })
      }

      if (infoUser.fullName !== '') { await updateDoc(userRef, { fullName: infoUser.fullName }) }
      if (infoUser.cedula !== '') { await updateDoc(userRef, { cedula: infoUser.cedula }) }
      if (infoUser.country !== '') {
        await updateDoc(userRef, {
          profile: {
            ...profile,
            location: infoUser.country
          }
        })
      }
      if (infoUser.description !== '') {
        await updateDoc(userRef, {
          profile: {
            ...profile,
            description: infoUser.description
          }
        })
      }
      setSuccess(t('User information updated successfully'))
      setTimeout(() => {
        setSuccess(null)
        setImg('')
        history.push(ROUTES.PROFILE)
        history.push(ROUTES.SETTINGS)
      }, 2000)

    } catch (error) {
      console.log(error)
      setError(t('Error updating user information'))
      setTimeout(() => {
        setError(null)
      }, 1000)

    }
  }


  const handleSubmit = (e) => e.preventDefault();
  const handleOnChange = (e) => {
    setInfoUser(
      {
        ...infoUser,
        [e.target.name]: e.target.value
      }
    )
  }

  return (
    <div className={`${styles.container} `}>
      <div className={`${styles.wraper} `}>
        {/* ====================== Settings ============================= */}
        <div className='min-h-screen pt-2 font-mono my-16'>
          <div className='container mx-auto'>
            <div className='inputs w-full max-w-2xl p-6 mx-auto'>
              <h2 className='text-2xl text-gray-primary font-bold text-center'>{t('Account_Setting')}</h2>
              <form className='mt-6 border-t border-gray-400 pt-4' onSubmit={handleSubmit}>
                <div className='flex flex-wrap -mx-3 mb-6'>

                  <div className='personal w-full border-t border-gray-400 pt-4'>
                    <h2 className='text-2xl font-semibold text-gray-900'>{t('Personal_info')}:</h2>
                    <div className='flex items-center justify-between mt-4'>
                      {/* FULLNAME */}
                      <div className='w-full md:w-1/2 px-3 mb-6'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >{t('full_name_in_case_you_want_to_modify')}</label>
                        <input
                          className={`${theme ? `${styles.darkMode}` : `${styles.lightMode}`} appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500`}
                          type='text'
                          placeholder={t('Enter_full_name')}
                          name='fullName'
                          value={infoUser.fullName}
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>
                    <div className='flex items-center justify-between mt-4'>
                      {/* CEDULA */}
                      <div className='w-full md:w-1/2 px-3 mb-6'>
                        <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >{t('ID Documents')}</label>
                        <input
                          className={`${theme ? `${styles.darkMode}` : `${styles.lightMode}`} appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500`}
                          type='number'
                          placeholder={t('ID or Cedula')}
                          name='cedula'
                          value={infoUser.cedula}
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>

                    <div className='w-full md:w-full px-3 mb-6'>
                      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>{t('pick_your_country')}</label>
                      <div className='flex-shrink w-full inline-block relative'>
                        <select
                          className={`${theme ? `${styles.darkMode}` : `${styles.lightMode}`} block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded`}
                          name='country'
                          value={infoUser.country}
                          onChange={handleOnChange}
                        >
                          <option>{t('choose_...')}</option>
                          <option>{t('USA')}</option>
                          <option>{t('Italy')}</option>
                          <option>{t('France')}</option>
                          <option>{t('Germany')}</option>
                          <option>{t('Spain')}</option>
                          <option>{t('Brazil')}</option>
                          <option>{t('Colombia')}</option>
                          <option>{t('Ecuador')}</option>
                          <option>{t('Chile')}</option>
                          <option>{t('Venezuela')}</option>
                          <option>{t('México')}</option>
                          <option>{t('Puerto Rico')}</option>
                          <option>{t('El Salvador')}</option>
                          <option>{t('Guatemala')}</option>
                          <option>{t('Honduras')}</option>
                          <option>{t('Other')}</option>
                        </select>
                        <div className='pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600'>
                          <svg className={`${theme ? `${styles.selectwhite}` : `${styles.selectdark}`} h-4 w-4`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' /></svg>
                        </div>
                      </div>
                    </div>
                    {/* BIO */}
                    <div className='w-full md:w-full px-3 mb-6'>
                      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2' >Bio:</label>
                      <textarea
                        className={`${theme ? `${styles.darkMode}` : `${styles.lightMode}`} rounded-md border leading-normal resize-none w-full h-20 py-2 px-3 shadow-inne font-medium placeholder-gray-border focus:outline-none`}
                        placeholder={t('Write a short description about you')}
                        name='description'
                        value={infoUser.description}
                        onChange={handleOnChange}
                      ></textarea>
                    </div>

                    <div className='w-full md:w-full px-3 mb-5'>
                      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>{t('Profile_Picture')}:</label>
                      <input
                        className={`${theme ? `${styles.darkMode}` : `${styles.lightMode}`} appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500`}
                        type='file'
                        id='img'
                        accept='.jpg, .jpeg, .png'
                        onChange={fileHandler}
                      />
                    </div>

                    {/* SUBMIT IMAGE */}
                    <div className='flex justify-end'>
                      <button
                        className={`${imgExists ? 'cursor-not-allowed bg-red-warning' : 'cursor-pointer bg-green-button'} appearance-none text-white-normal px-5 py-3 shadow-sm border border-badges-platinum rounded-md mr-3`}
                        type='submit'
                        onClick={newDoc}
                        disabled={imgExists}
                      >{t('Update_Picture')}</button>
                    </div>

                    <h2 className='text-2xl font-semibold text-gray-900 my-5'>{t('Withdrawal_info')}</h2>

                    {/* Withdrawal Method */}
                    <div className='w-full md:w-full px-3 mb-6'>
                      <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>{t('Withdrawal_Method')}</label>
                      <div className='flex-shrink w-full inline-block relative'>
                        <select
                          className={`${theme ? `${styles.darkMode}` : `${styles.lightMode}`} block appearance-none text-gray-600 w-full bg-white border border-gray-400 shadow-inner px-4 py-2 pr-8 rounded`}
                          name='paymentMethod'
                          value={infoUser.paymentMethod}
                          onChange={handleOnChange}
                        >
                          <option value="">
                            {t('Select_an_option')}
                          </option>
                          <option value="TETHER">{t('TETHER_(USDT)')}</option>
                        </select>
                        <div className='pointer-events-none absolute top-0 mt-3  right-0 flex items-center px-2 text-gray-600'>
                          <svg className={`${theme ? `${styles.selectwhite}` : `${styles.selectdark}`} h-4 w-4`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' /></svg>
                        </div>
                      </div>
                    </div>
                    {/* Withdrawal information: */}
                    {
                      // =================== TETHER  ===================
                      infoUser.paymentMethod === 'TETHER' ? (
                        <>
                          {/* WALLET */}
                          <div className='w-full md:w-full px-3 mb-6'>
                            <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>{t('Crypto Wallet (USDT - TRON TRC-20):')}</label>
                            <input
                              className={`${theme ? `${styles.darkMode}` : `${styles.lightMode}`} appearance-none block w-full bg-white text-gray-700 border border-gray-400 shadow-inner rounded-md py-3 px-4 leading-tight focus:outline-none  focus:border-gray-500`}
                              type='text'
                              placeholder={t('Your USDT address here (TRON - TRC-20)')}
                              name='wallet'
                              value={infoUser?.wallet}
                              onChange={handleOnChange}
                            />
                          </div>
                        </>
                      ) : null
                    }

                    {/* ERROR OR SUCCESS */}
                    <div className='w-full md:w-full px-3 mb-6'>
                      {
                        success && (
                          <p className='text-green-button text-right mb-2 mt-2 text-lg'>{success}</p>
                        )
                      }
                      {
                        error && (
                          <p className='text-red-warning text-right mb-2 mt-2 text-lg'>{error}</p>
                        )
                      }

                      {/* SUBMIT */}
                      <div className='flex justify-end mt-5'>
                        <button
                          className={` cursor-pointer bg-green-button appearance-none text-white-normal px-5 py-3 shadow-sm border border-badges-platinum rounded-md mr-3`}
                          type='submit'
                          onClick={updateUserInformation}
                        >{t('Update_Information')}</button>
                      </div>

                    </div>

                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* ====================== End Settings ============================= */}
      </div>
    </div>
  )
}

export default Settings

Settings.propTypes = {
  theme: PropTypes.bool,
}