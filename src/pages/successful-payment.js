import React, {useEffect} from 'react'
//styles
import styles from '../styles/modules/payment/successfulpayment.module.css'
//routes
import * as ROUTES from '../constants/routes'
import useUser from '../hooks/use-user'

const SuccessfulPayment = () => {

    useEffect(() => { document.title = 'Successful Payment - Artificial' }, [])
    const { user } = useUser()
    return (

        <>
            {/* INICIO */}
            <div className={`${styles.outercontainer} outercontainer`} >
                <div className={`${styles.innercontainer}`}>
                    <div className={`${styles.card} ${styles.centeredcontent}`}>
                        <div className={`${styles.top}`}  >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <h3 className={styles.h3} >
                                Successful Payment!
                            </h3>
                            <span  className={`${styles.span} capitalize`} >Company: Artificial</span>
                        </div>
                        <div className={`${styles.bottom}`}  >
                            <div className={`${styles.keyvalue} flex flex-col`}  >
                                <span  className={`${styles.span}`} >Nombre del cliente: <p className='text-2xl font-bold'>{user?.username}</p></span>
                            </div>
                            <a href={ROUTES.DASHBOARD}  className={`${styles.btn}`}  >
                                <p className='uppercase text-white-primary'>go home</p>
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            {/* FINAL */}
        </>
    )
}

export default SuccessfulPayment