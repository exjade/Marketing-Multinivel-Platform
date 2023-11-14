import React from 'react'
//styles
import '../../styles/sidebar/sidebar.css'
//propTypes
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'


const CreditCard = ({ user }) => {
    const {t} = useTranslation();
    return (
        <>
            {/* TOP */}
            <div className='Sidebar_Middle_Card_Top'>
                <div className='Sidebar_Middle_Card_Top_Left'>
                    <img src='/images/crypto/BTC.webp' alt='cryptocurrency bitcoin' loading='lazy'/>
                    <h2>USD</h2>
                </div>
                <img src='images/crypto/visa.png' alt='visa card' className='Sidebar_Middle_Card_Top_Right' loading='lazy'/>
            </div>

            {/* MIDDLE */}
            <div className='Sidebar_Middle_Card_Middle'>
                <h1> {`${user?.Balance === undefined ? '' : `$${parseInt(user?.Balance).toFixed(2)}`}`} </h1>
                <img src='images/crypto/cardchip.webp' alt='card chip' className='Sidebar_Middle_Card_Middle_Chip' loading='lazy'/>
            </div>

            {/* BOTTOM */}
            <div className='Sidebar_Middle_Card_Bottom'>
                <div className='Sidebar_Middle_Card_Bottom_left'>
                    <small>{t('Card_holder')}</small>
                    <h5 className='uppercase'> {`${user?.fullName === undefined ? '' : `${user?.fullName}`}`} </h5>
                </div>
                <div className='Sidebar_Middle_Card_Bottom_right'>
                    <div className='Sidebar_Middle_Card_Bottom_right_expiry'>
                        <small>{t('Expiry')}</small>
                        <h5>{`${Math.floor((Math.random() * 10) + 2)}`}/24</h5>
                    </div>
                    <div className='Sidebar_Middle_Card_Bottom_right_cvv'>
                        <small>CVV</small>
                        <h5>{parseInt(Math.floor((Math.random() * 899) + 100))}</h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreditCard

CreditCard.propTypes = {
    user: PropTypes.object
}