import React, { useEffect, useState, useContext } from 'react';
//api
import coinGecko from './apis/coinGecko';
//components
import Coin from './coin';
//context
import { WatchListContext } from '../../../context/watchListContext.js';
//styles
import styles from './chart.module.css'
// components
import Loading from './loader/loading';
import { useTranslation } from 'react-i18next';

const CoinList = () => {
    
    const {t} = useTranslation();
    const [coins, setCoins] = useState([])
    const { watchList, deleteCoin } = useContext(WatchListContext)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchCoinList = async () => {
            setIsLoading(true)
            const response = await coinGecko.get('/coins/markets', {
                params: {
                    vs_currency: 'usd',
                    ids: watchList.join(','),
                },
            })
            setCoins(response.data)
            setIsLoading(false)
        }
        if (watchList.length > 0) {
            fetchCoinList()
        } else {
            setCoins([])
        }
    }, [watchList])

    const renderCoins = () => {
        if (isLoading) {
            return <Loading />
        }
        return (
            <ul className='coinlist list-group overflow-hidden mt-10'>
                <div className="container mx-auto sm:w-10/12 w-full md:w-full xl:w-full">
                    <div className='w-full h-full'>
                        <div className="-mx-4 px-4 sm:px-8 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-5 py-5 font-semibold bg-white-normal border-1 border-b border-gray-info text-black-normal  text-left text-sm uppercase ">
                                                {t('Currency')}
                                            </th>
                                            <th scope="col" className="px-5 py-5 font-semibold bg-white-normal border-1 border-b border-gray-info text-black-normal  text-left text-sm uppercase ">
                                                {t('CurrentPrice' )}
                                            </th>
                                            <th scope="col" className={`${styles.percentage} px-5 py-5 font-semibold bg-white-normal border-1 border-b border-gray-info text-black-normal  text-left text-sm uppercase`}  >
                                                {t('Change')}
                                            </th>
                                            <th scope="col" className="px-5 py-5 font-semibold bg-white-normal border-1 border-b border-gray-info text-black-normal  text-left text-sm uppercase ">
                                                {t('Ranking')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coins.map(coin => {
                                            return (
                                                <Coin
                                                    key={coin.id}
                                                    coin={coin}
                                                    deleteCoin={deleteCoin}
                                                />
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        )

    }

    return (
        <div >{renderCoins()} </div>
    )
}

export default CoinList
