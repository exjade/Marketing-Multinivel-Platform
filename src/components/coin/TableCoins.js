import React from 'react'
import styles from '../../styles/modules/middlesection/coins.module.css'
import PropTypes from 'prop-types'
const TableCoins = ({ coins }) => {
    return (
        <div className={`${styles.container} `}>
            <div className={`${styles.table}`}>
                {
                    coins.slice(0, 7).map((coin, i) => {
                        return (
                            <h5 key={i}>{coin.name}</h5>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TableCoins

TableCoins.propTypes = {
    coins: PropTypes.object
}