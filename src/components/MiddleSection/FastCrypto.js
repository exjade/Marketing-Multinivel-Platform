import React from 'react'
import PropTypes from 'prop-types'
//styles
import '../../styles/sidebar/sidebar.css'
import { useTranslation } from 'react-i18next'

const FastCrypto = ({ coins, search }) => {
    const { t } = useTranslation();

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    )
    return (
        <div className="middlesection_fastcrypto_container">
            {/* <h2 className='font-poppins-600 font-bold'>{t('Crypto_Market')}</h2> */}
            {/* BADGES */}
            <div className="middlesection_fastcrypto_badges">

                {
                    filteredCoins.slice(0, 5).map((coin, i) => {
                        return (
                            <div className="middlesection_fastcrypto_badge" key={i}>
                                <div className='flex flex-col items-center w-full'>
                                    <div className='flex flex-row gap-2 items-center justify-center '>
                                        <img src={coin.image} alt="cryptocurrency" className='w-8 h-8 items-center justify-center flex' />
                                        <span className='flex flex-col mr-4'>
                                            <h5 className='uppercase font-bold text-lg'>{coin.name}</h5>
                                            <h5 className='uppercase text-gray-info font-normal'>{coin.symbol}</h5>
                                        </span>
                                        <span className={`font-lato-500 font-semibold px-2 py-2 rounded-lg  ${coin.price_change_percentage_24h > 0 ? 'bg-colorSecondary-text-additional-blue-secondary' : 'bg-red-warning'}`} >
                                            <h5 className='uppercase text-white-normal font-normal'>

                                                {
                                                    coin.price_change_percentage_24h > 0 ? `+${coin.market_cap_change_percentage_24h?.toFixed(2)}` : `${coin.market_cap_change_percentage_24h?.toFixed(2)}`
                                                }
                                               
                                            </h5>
                                        </span>
                                    </div>
                                    <h4 className={`font-lato-500 font-semibold ${coin.price_change_percentage_24h > 0 ? 'text-colorSecondary-text-additional-blue-secondary' : 'text-red-warning'}`} >
                                        {`${coin.current_price > 0.9999 ? `$ ${coin.current_price?.toFixed(2)}` : `${coin.current_price?.toFixed(2)}`}`}
                                    </h4>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FastCrypto

FastCrypto.propTypes = {
    coins: PropTypes.array,
    search: PropTypes.string,
}