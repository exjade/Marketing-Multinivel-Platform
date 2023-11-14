import React from 'react'
import PropTypes from 'prop-types';

const InputDropdown = (props) => {

    //  ============================ USDT TRC20 ============================ //
    const handleTRC20 = () => {
        props.setInvestment({
            ...props.investment,
            currency: 'usdttrc20'
        })
        props.setSelectPage({
            qrpayment: true,
            walletBalance: false,
            paymentOptions: false,
            crypto: false,
        })
    }

    //  ============================ USDT BSC ============================ //
    const handleBSC = () => {
        props.setInvestment({
            ...props.investment,
            currency: 'usdtbsc'
        })
        props.setSelectPage({
            qrpayment: true,
            walletBalance: false,
            paymentOptions: false,
            crypto: false,
        })
    }
    //  ============================ BITCOIN ============================ //
    const handleBTC = () => {
        props.setInvestment({
            ...props.investment,
            currency: 'btc'
        })
        props.setSelectPage({
            qrpayment: true,
            walletBalance: false,
            paymentOptions: false,
            crypto: false,
        })
    }
    //  ============================ ETHEREUM ============================ //
    const handleETH = () => {
        props.setInvestment({
            ...props.investment,
            currency: 'eth'
        })
        props.setSelectPage({
            qrpayment: true,
            walletBalance: false,
            paymentOptions: false,
            crypto: false,
        })
    }
    //  ============================ TRON ============================ //
    const handleTRON = () => {
        props.setInvestment({
            ...props.investment,
            currency: 'trx'
        })
        props.setSelectPage({
            qrpayment: true,
            walletBalance: false,
            paymentOptions: false,
            crypto: false,
        })
    }
    //  ============================ LITECOIN ============================ //
    const handleLITECOIN = () => {
        props.setInvestment({
            ...props.investment,
            currency: 'ltc'
        })
        props.setSelectPage({
            qrpayment: true,
            walletBalance: false,
            paymentOptions: false,
            crypto: false,
        })
    }
    //  ============================ XRP ============================ //
    const handleXRP = () => {
        props.setInvestment({
            ...props.investment,
            currency: 'xrp'
        })
        props.setSelectPage({
            qrpayment: true,
            walletBalance: false,
            paymentOptions: false,
            crypto: false,
        })
    }

    return (

        <div className="w-64">
            <div className="relative mt-1">
                <button
                    type="button"
                    className="relative w-full py-3 pl-3 pr-10 text-left bg-blue-050915 rounded-md shadow-lg cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onClick={() => props.handleTokenList(true)}
                >
                    <span className="flex items-center">
                        <span className="block ml-3 truncate">
                            Available tokens
                        </span>
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd">
                            </path>
                        </svg>
                    </span>
                </button>

                {
                    props?.tokenList &&
                    (
                        <div className="absolute z-10 w-full mt-1 bg-blue-050915 rounded-md shadow-lg">
                            <ul tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-item-3" className="py-1 overflow-auto text-base rounded-md max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {/* USDT  TRC20 */}
                                <li
                                    id="listbox-item-0"
                                    role="option"
                                    className="relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white pr-9"
                                    onClick={() => handleTRC20()}
                                >
                                    <div className="flex items-center">
                                        <img
                                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
                                            alt="tether usdt"
                                            className='w-6 h-6 object-contain'
                                        />
                                        <span className="block ml-3 font-normal truncate">
                                            USDT (TRC20)
                                        </span>
                                    </div>
                                    {
                                        props.investment.currency === 'usdttrc20' && (
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd">
                                                    </path>
                                                </svg>
                                            </span>
                                        )
                                    }

                                </li>
                                {/* USDT  BSC */}
                                <li
                                    id="listbox-item-0"
                                    role="option"
                                    className="relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white pr-9"
                                    onClick={() => handleBSC()}
                                >
                                    <div className="flex items-center">
                                        <img
                                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
                                            alt="tether usdt"
                                            className='w-6 h-6 object-contain'
                                        />
                                        <span className="block ml-3 font-normal truncate">
                                            USDT (BSC)
                                        </span>
                                    </div>
                                    {
                                        props.investment.currency === 'usdtbsc' && (
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd">
                                                    </path>
                                                </svg>
                                            </span>
                                        )
                                    }

                                </li>
                                {/* BTC */}
                                <li
                                    id="listbox-item-1"
                                    role="option"
                                    className="relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white pr-9"
                                    onClick={() => handleBTC()}
                                >
                                    <div className="flex items-center">
                                        <img
                                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                                            alt="btc"
                                            className='w-6 h-6 object-contain'
                                        />
                                        <span className="block ml-3 font-normal truncate">
                                            Bitcoin
                                        </span>
                                    </div>
                                    {
                                        props.investment.currency === 'btc' && (
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd">
                                                    </path>
                                                </svg>
                                            </span>
                                        )
                                    }

                                </li>
                                {/* ETH */}
                                <li
                                    id="listbox-item-2"
                                    role="option"
                                    className="relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white pr-9"
                                    onClick={() => handleETH()}
                                >
                                    <div className="flex items-center">
                                        <img
                                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png"
                                            alt="eth"
                                            className='w-6 h-6 object-contain'
                                        />
                                        <span className="block ml-3 font-normal truncate">
                                            Ethereum
                                        </span>
                                    </div>
                                    {
                                        props.investment.currency === 'eth' && (
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd">
                                                    </path>
                                                </svg>
                                            </span>
                                        )
                                    }
                                </li>
                                {/* TRX */}
                                <li
                                    id="listbox-item-3"
                                    role="option"
                                    className="relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white pr-9"
                                    onClick={() => handleTRON()}
                                >
                                    <div className="flex items-center">
                                        <img
                                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png"
                                            alt="trx"
                                            className='w-6 h-6 object-contain'
                                        />
                                        <span className="block ml-3 font-normal truncate">
                                            Tron
                                        </span>
                                    </div>
                                    {
                                        props.investment.currency === 'trx' && (
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd">
                                                    </path>
                                                </svg>
                                            </span>
                                        )
                                    }
                                </li>
                                {/* LITECOIN */}
                                <li
                                    id="listbox-item-5"
                                    role="option"
                                    className="relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white pr-9"
                                    onClick={() => handleLITECOIN()}
                                >
                                    <div className="flex items-center">
                                        <img
                                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/2.png"
                                            alt="ltc"
                                            className='w-6 h-6 object-contain'
                                        />
                                        <span className="block ml-3 font-normal truncate">
                                            Litecoin
                                        </span>
                                    </div>
                                    {
                                        props.investment.currency === 'ltc' && (
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd">
                                                    </path>
                                                </svg>
                                            </span>
                                        )
                                    }
                                </li>
                                {/* XRP */}
                                <li
                                    id="listbox-item-6"
                                    role="option"
                                    className="relative py-2 pl-3 text-gray-900 cursor-default select-none hover:bg-indigo-500 hover:text-white pr-9"
                                    onClick={() => handleXRP()}
                                >
                                    <div className="flex items-center">
                                        <img
                                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/52.png"
                                            alt="xrp"
                                            className='w-6 h-6 object-contain'
                                        />
                                        <span className="block ml-3 font-normal truncate">
                                            XRP
                                        </span>
                                    </div>
                                    {
                                        props.investment.currency === 'xrp' && (
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd">
                                                    </path>
                                                </svg>
                                            </span>
                                        )
                                    }
                                </li>
                            </ul>
                        </div>
                    )
                }


            </div>
        </div>

    )
}

export default InputDropdown
InputDropdown.propTypes = {
    investment: PropTypes.object,
    setInvestment: PropTypes.func,
    handleTokenList: PropTypes.func,
    tokenList: PropTypes.bool,
    setSelectPage: PropTypes.func,
}