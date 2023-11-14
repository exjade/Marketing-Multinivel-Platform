import React, { useState } from 'react'
//Proptypes
import PropTypes from 'prop-types'
//components
import SidebarComponent from '../Sidebar/sidebar'
import styles from '../../styles/modules/settings/settings.module.css'
import Header from '../header/header-second'
//styles
import '../../styles/sidebar/sidebar.css'
//error
import Error from '../../error/error'
import ArtificialSettings from './artificial'
//routes
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
//hooks
import useUser from '../../hooks/use-user'
import { useTranslation } from 'react-i18next';
import useMobile from '../../hooks/use-mobile'
//firebase
import { firebase } from '../../lib/firebase'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
const firestore = getFirestore(firebase)

const SettingsTimeline = ({
    isOpen,
    setIsOpen, }) => {

    let history = useHistory()
    const { t } = useTranslation()
    const { user } = useUser()
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [secretWordtxt, setSecretWordtxt] = useState('')

    // USER INFORMATION
    const [infoUser, setInfoUser] = useState({
        fullName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        country: '',
        zip: '',
        wallet: '',
        pin: '',
        secretWord: ''
    })

    const bankInformation = {
        tether: {
            Currency: 'USDT',
            Wallet: infoUser.wallet,
            HolderNameUSDT: user?.username,
        },

    }


    const updateUserInformation = async () => {
        try {
            if (infoUser.secretWord === user?.secretWord) {
                const userRef = doc(firestore, 'users', user?.docId)
                await updateDoc(userRef, { bankInformationTether: bankInformation.tether })

                if (infoUser.fullName !== '') { await updateDoc(userRef, { fullName: infoUser.fullName }) }
                if (infoUser.email !== '') { await updateDoc(userRef, { email: infoUser.email }) }
                if (infoUser.street !== '') { await updateDoc(userRef, { street: infoUser.street }) }
                if (infoUser.city !== '') { await updateDoc(userRef, { city: infoUser.city }) }
                if (infoUser.state !== '') { await updateDoc(userRef, { state: infoUser.state }) }
                if (infoUser.country !== '') {
                    await updateDoc(userRef, {
                        profile: {
                            ...user?.profile,
                            location: infoUser.country
                        }
                    })
                }
                if (infoUser.zip !== '') { await updateDoc(userRef, { zip: infoUser.zip }) }
                if (infoUser.wallet !== '') { await updateDoc(userRef, { wallet: infoUser.wallet }) }
                if (infoUser.pin !== '') { await updateDoc(userRef, { pin: infoUser.pin }) }


                setSuccess(t('User information updated successfully'))
                setTimeout(() => {
                    setSuccess(null)
                    history.push(ROUTES.PROFILE)
                    history.push(ROUTES.SETTINGS)
                }, 2000)
            } else {
                setSecretWordtxt('Please try again. You misspelled your secret word')
            }
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


    const { mobile } = useMobile({ isOpen })


    return (
        <>
            <main className={`${styles.main}`}  >


                <Error>
                    <div></div>
                    {/* <SidebarComponent
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                /> */}
                </Error>
                <section className={`${styles.section}`} >
                    {/* <Settings theme={theme} /> */}
                    <ArtificialSettings
                        handleSubmit={handleSubmit}
                        updateUserInformation={updateUserInformation}
                        handleOnChange={handleOnChange}
                        user={user}
                        success={success}
                        error={error}
                        infoUser={infoUser}
                        secretWordtxt={secretWordtxt}
                    />
                </section>
            </main>
        </>
    )
}

export default SettingsTimeline

SettingsTimeline.propTypes = {
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    theme: PropTypes.bool,
}