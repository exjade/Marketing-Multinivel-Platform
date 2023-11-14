import PropTypes from 'prop-types'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


const InvestmentDropDown = ({ user }) => {
    const {t} = useTranslation();
    const [isList, setIsList] = useState(false);
    return (
        <div>
            <div onClick={() => setIsList(!isList)} className="w-32 p-4 shadow rounded bg-white text-sm font-medium leading-none text-gray-800 flex items-center justify-between cursor-pointer">
                {t('Currency')}
                <div>
                    {isList ? (
                        <div>
                            <svg width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.00016 0.666664L9.66683 5.33333L0.333496 5.33333L5.00016 0.666664Z" fill="#1F2937" />
                            </svg>
                        </div>
                    ) : (
                        <div>
                            <svg width={10} height={6} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.00016 5.33333L0.333496 0.666664H9.66683L5.00016 5.33333Z" fill="#1F2937" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
            {isList && (
                // ONE
                <div className="w-40 mt-2 bg-white  rounded">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <div className="bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative">
                                    <input type="checkbox" className="checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                                    <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                        <svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <path d="M5 12l5 5l10 -10" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="text-sm font-semibold leading-normal text-gray-800">USD</p>
                            </div>
                        </div>
                        <p className="w-8 text-md leading-3 text-right text-gree-700 font-bold">

                            {parseFloat(user?.Applied).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD'
                            })}

                        </p>
                    </div>
                    {/* TWO */}
                    <div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <div className="bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative">
                                        <input type="checkbox" className="checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                                        <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                            <svg className="icon icon-tabler icon-tabler-check" xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <path d="M5 12l5 5l10 -10" />
                                            </svg>
                                        </div>
                                    </div>
                                    <p className="text-sm leading-normal font-semibold text-gray-800">MXN</p>
                                </div>
                            </div>
                            <p className="w-8 text-md leading-3 text-right text-gree-700 font-bold">
                                {parseFloat(user?.AppliedMexican).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </p>
                        </div>
                    </div>
                    {/* THREE */}
                    <div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <div className=" flex items-center">
                                    <div className="bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative">
                                        <input type="checkbox" className="checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                                        <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                        </div>
                                    </div>
                                    <p className="text-sm leading-normal font-semibold text-gray-800">COP</p>
                                </div>
                            </div>
                            <p className="w-8 text-md leading-3 text-right text-indigo-700 font-bold">
                                {parseFloat(user?.AppliedColombian).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </p>
                        </div>
                    </div>
                    {/* FOUR */}
                    <div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <div className=" flex items-center">
                                    <div className="bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative">
                                        <input type="checkbox" className="checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                                        <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                        </div>
                                    </div>
                                    <p className="text-sm leading-normal font-semibold text-gray-800">USDT</p>
                                </div>
                            </div>
                            <p className="w-8 text-md leading-3 text-right text-indigo-700 font-bold">
                                {parseFloat(user?.AppliedTether).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </p>
                        </div>
                    </div>
                    {/* FIVE */}
                    <div>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                <div className=" flex items-center">
                                    <div className="bg-gray-100 dark:bg-gray-800 border rounded-sm border-gray-200 dark:border-gray-700 w-3 h-3 flex flex-shrink-0 justify-center items-center relative">
                                        <input type="checkbox" className="checkbox opacity-0 absolute cursor-pointer w-full h-full" />
                                        <div className="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                        </div>
                                    </div>
                                    <p className="text-sm leading-normal font-semibold text-gray-800">REAL</p>
                                </div>
                            </div>
                            <p className="w-8 text-md leading-3 text-right text-indigo-700 font-bold">
                                {parseFloat(user?.AppliedBrasil).toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                                })}
                            </p>
                        </div>
                    </div>

                </div>
            )}
            <style>
                {` .checkbox:checked + .check-icon {
                display: flex;
            }`}
            </style>
        </div>
    );
};
export default InvestmentDropDown;

InvestmentDropDown.propTypes = {
    user: PropTypes.object
}