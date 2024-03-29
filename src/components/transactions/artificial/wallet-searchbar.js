import React from 'react'
import PropTypes from 'prop-types'

const WalletSearchbar = ({ setSearchWalletWithdrawal }) => {
    return (
        <fieldset className="w-1/3  text-gray-loader">
            <label htmlFor="Search" className="hidden">Search</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                        <svg fill="#ffff" viewBox="0 0 512 512" className="w-4 h-4 text-white-normal">
                            <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                        </svg>
                    </button>
                </span>
                <input
                    type="search"
                    name="Search"
                    placeholder="Search..."
                    className="w-72 sm:w-44 h-12 py-2 pl-10 text-sm rounded-md   focus:outline-none bg-black-normal text-white-normal focus:bg-gray-info focus:border-indigo-600"
                    onChange={e => setSearchWalletWithdrawal(e.target.value)}
                />
            </div>
        </fieldset>
    )
}

export default WalletSearchbar
WalletSearchbar.propTypes = {
    setSearchWalletWithdrawal: PropTypes.func,
}