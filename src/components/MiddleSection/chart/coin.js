//eslint-disable-next-line  no-unsafe-optional-chaining
import React from 'react'
import PropTypes from 'prop-types'
import styles from './chart.module.css'

const Coin = ({ coin }) => {

    return (
        <>
            <tr >
                <td className="px-5 py-5 border-1 border-b border-gray-border bg-white text-sm cursor-pointer">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <img alt="profil" src={coin?.image} className="mx-auto object-cover rounded-full h-10 w-10 " />
                        </div>
                        <div className="ml-3">
                            <p className="text-gray-info text-xl whitespace-no-wrap">
                                {coin?.name}
                            </p>
                        </div>
                    </div>
                </td>
                <td className="px-5 py-5 border-1 border-b border-gray-border bg-white text-sm">
                    <p className="text-gray-info text-xl whitespace-no-wrap">
                        {`
                        ${coin?.current_price.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })}
                        `}
                    </p>
                </td>
                <td className={`${styles.percentage} px-5 py-5 border-1 border-b border-gray-border bg-white text-sm`}>
                    <p className="text-gray-info text-xl whitespace-no-wrap flex flex-row">
                        {
                            coin?.price_change_percentage_24h < 0 ? (
                                <span className="material-symbols-sharp text-red-warning">
                                    expand_more
                                </span>
                            ) : (
                                <span className="material-symbols-sharp text-green-success">
                                    expand_less
                                </span>
                            )
                        }
                        {coin?.price_change_percentage_24h.toFixed(2)}%
                    </p>
                </td>

                <td className={` px-5 py-5 border-1 border-b border-gray-border bg-white text-sm`}>
                    <p className="text-gray-info text-xl whitespace-no-wrap flex flex-row">
                        {
                            coin?.market_cap_rank === 1 ? (
                                <span className="material-symbols-sharp text-green-success">
                                    star
                                </span>
                            ) : coin?.market_cap_rank < 15 ? (
                                <span className="material-symbols-sharp text-badges-gold">
                                    star_half
                                </span>
                            ) : (
                                <span className="material-symbols-sharp text-red-warning">
                                   grade
                                </span>
                            )
                        }
                        {coin?.market_cap_rank}
                    </p>
                </td>


            </tr>

        </>
    )
}

export default Coin

Coin.propTypes = {
    coin: PropTypes.object,
    deleteCoin: PropTypes.func,
}