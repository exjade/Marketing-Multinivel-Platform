import React from 'react'
import styles from '../../../styles/wallet.module.css'

const StakingLoader = () => {
    return (
        <>
            {/* APR ESTIMADO / DURACION / BOTÓN */}
            <div className={`${styles.CardLoader}  w-9/12 h-72 rounded-lg animate-pulse`}></div>
        </>
    )
}

export default StakingLoader