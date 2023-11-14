import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'

export default function useCoin() {
    const [search, setSearch] = useState('')
    const [coins, setCoins] = useState([])
    const getData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_COINGECKO}/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        setCoins(res.data)
    }
    useEffect(() => { getData() }, [])

    const memoizedCoins = useMemo(() => coins, [coins]);

    return {  coins: memoizedCoins, search, setSearch }
}