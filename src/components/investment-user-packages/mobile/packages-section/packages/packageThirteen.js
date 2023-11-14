import React from 'react'
import PropTypes from 'prop-types'
import { formatRelative } from 'date-fns'
import { useTranslation } from 'react-i18next'

const PackageThirteen = ({ pkg, calculatePercentaje, i }) => {


    const { t } = useTranslation() 


    return (
        <div
            className='flex flex-row justify-center items-center my-5 gap-5'
            key={i}
        >
            <div className='h-20 w-11/12 bg-white-normal rounded-lg cursor-pointer'>
                <div className='grid-cols-3 grid justify-around place-items-center w-full h-full pl-8'>
                    {/* PACKAGE NAME */}
                    <div className='flex flex-row gap-1 justify-center items-center'>
                        <h3 className='text-base font-semibold capitalize text-black-background'>
                        {t('Package #13:')} {`${parseFloat(pkg?.packageThirteen?.packageAmount).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}

                        </h3>
                    </div>

                    {/* PACKAGE START DATE */}
                    <div>
                        <p className='text-sm font-poppins-500 font-normal italic'>
                            {formatRelative(pkg?.packageThirteen?.packageDate, new Date(), { addSuffix: true })}
                        </p>
                    </div>

                    {/* PACKAGE PRICE & PERCENTAJE */}
                    <span className='flex flex-col gap-1 justify-center items-center'>
                        <h5 className='font-bold text-base text-black-background'>
                            {`${parseFloat(pkg?.packageThirteen?.packageAmount * 2).toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}`}
                        </h5>
                        <p className='font-bold text-sm text-black-background'>
                            {`(${calculatePercentaje(pkg?.packageThirteen?.packageAmount, pkg?.packageThirteen?.packageProfit)}%)`}
                        </p>
                    </span>
                </div>
                {/* PROGRESS BAR */}
                <div>
                    <div className='bg-white-primary w-full h-12 grid grid-cols-10 gap-2'>
                        <div className={`${pkg.packageThirteen.packageProgress >= 1 ? 'bg-green-radored' : 'bg-gray-info'} flex justify-center items-center`} >
                            <p className='font-bold text-base text-white-normal'>1</p>
                        </div>
                        <div className={`${pkg.packageThirteen.packageProgress >= 2 ? 'bg-green-radored' : 'bg-gray-info'} flex justify-center items-center`} >
                            <p className='font-bold text-base text-white-normal'>2</p>
                        </div>
                        <div className={`${pkg.packageThirteen.packageProgress >= 3 ? 'bg-green-radored' : 'bg-gray-info'} flex justify-center items-center`} >
                            <p className='font-bold text-base text-white-normal'>3</p>
                        </div>
                        <div className={`${pkg.packageThirteen.packageProgress >= 4 ? 'bg-green-radored' : 'bg-gray-info'} flex justify-center items-center`} >
                            <p className='font-bold text-base text-white-normal'>4</p>
                        </div>
                        <div className={`${pkg.packageThirteen.packageProgress >= 5 ? 'bg-green-radored' : 'bg-gray-info'} flex justify-center items-center`} >
                            <p className='font-bold text-base text-white-normal'>5</p>
                        </div>
                        <div className={`${pkg.packageThirteen.packageProgress >= 6 ? 'bg-green-radored' : 'bg-gray-info'} flex justify-center items-center`} >
                            <p className='font-bold text-base text-white-normal'>6</p>
                        </div>
                        <div className={`${pkg.packageThirteen.packageProgress >= 7 ? 'bg-green-radored' : 'bg-gray-info'} flex justify-center items-center`} >
                            <p className='font-bold text-base text-white-normal'>7</p>
                        </div>
                        <div className={`${pkg.packageThirteen.packageProgress >= 8 ? 'bg-green-radored' : 'bg-gray-info'} flex justify-center items-center`} >
                            <p className='font-bold text-base text-white-normal'>8</p>
                        </div>
                        <div className={`${pkg.packageThirteen.packageProgress >= 9 ? 'bg-green-radored' : 'bg-gray-info'} flex justify-center items-center`} >
                            <p className='font-bold text-base text-white-normal'>9</p>
                        </div>
                        <div className={`${pkg.packageThirteen.packageProgress >= 10 ? 'bg-green-radored' : 'bg-gray-info'} flex justify-center items-center`} >
                            <p className='font-bold text-base text-white-normal'>10</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PackageThirteen

PackageThirteen.propTypes = {
    pkg: PropTypes.any,
    calculatePercentaje: PropTypes.func,
    i: PropTypes.any
}