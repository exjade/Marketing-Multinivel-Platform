//eslint-disable-next-line react/prop-types
import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const WatchListContext = createContext()

export const WatchListContextProvider = props => {
    //eslint-disable-next-line 
    const [watchList, setWatchList] = useState(['bitcoin', 'ethereum', 'tether', 'tron'])

    return (
        <WatchListContext.Provider value={{ watchList }}>
            {props.children}
        </WatchListContext.Provider>
    )
}
WatchListContextProvider.propTypes = {
    children: PropTypes.any
}


