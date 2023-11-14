import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistance } from 'date-fns'
import styles from '../styles/user-profile.module.css'
import ReferralsPagination from './referrals-pagination'
import useUser from '../../../hooks/use-user'
import UseInvestmentPackages from '../../../hooks/use-invesvestmentPackages'
import {
    ArrowLongRightIcon
} from '@heroicons/react/24/outline';
import * as ROUTES from '../../../constants/routes'

const UserPackages = () => {

    const { user } = useUser()
    const { investemntPackages } = UseInvestmentPackages()
    const filterUserPackages = investemntPackages?.filter(p => p.userId === user?.userId)
    const filterPackagesWithInvestment = filterUserPackages?.filter(p => p.amount > 0)

    //Paginación
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostPerPage] = useState(1) //eslint-disable-line


    const lastPostIndex = currentPage + postsPerPage; // 1 * 10 = 10
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filterPackagesWithInvestment?.slice(firstPostIndex, lastPostIndex) // 0, 10

    const nextHandler = () => {
        const totalElements = filterPackagesWithInvestment?.length
        const nextPage = currentPage + 1;
        const firstIndex = nextPage * postsPerPage
        if (firstIndex === totalElements || firstIndex > totalElements) return;
        setCurrentPage(nextPage)
    }


    const prevHandler = () => {
        const prevPage = currentPage - 1;
        if (firstPostIndex < 1) return;
        setCurrentPage(prevPage)

    }

    //Ordenamos por fecha 
    const orderBy = currentPosts?.sort((a, b) => {//eslint-disable-line
        return new Date(a?.date) - new Date(b?.date)
    })


    return (
        <section className={`${styles.contenedor} my-10  font-Biryani`} >
            <div className={`${styles.referralwrapper}`}>
                {/* <div className='flex flex-row w-full items-center justify-around gap-2'>
                    <span className='flex flex-col gap-2 w-full'>
                        <h3 className='font-light text-md text-black-normal'> assets</h3>
                    </span>
                </div> */}

                {
                    currentPosts?.length > 0 ? (
                        <>
                            {orderBy?.map((p, k) => (
                                <Fragment key={k}>
                                    <div className={`${styles.wrap} flex flex-row justify-between items-center w-full rounded-lg px-10 py-10 hover:cursor-pointer  bg-artificial-theme-dark-black `}>
                                        <div className='text-white-normal flex flex-row gap-5'>
                                            <span className='flex flex-col justify-center items-start gap-3'>
                                                <h3 className={`font-medium text-white-normal text-xl capitalize`}>
                                                    Name:
                                                </h3>
                                                <p className='text-sm text-gray-branding uppercase'>{p?.packageInformation.packageName}</p>
                                            </span>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <span className='flex flex-col gap-2 items-center justify-between'>
                                                <>
                                                    <p className={`text-white-normal font-medium  text-lg`} >Investment:</p>
                                                    <p className={`text-gray-branding font-medium  text-lg sm:text-2xl`} >
                                                        {parseFloat(`${p?.amount}`).toLocaleString('en-US', {
                                                            style: 'currency',
                                                            currency: 'USD'
                                                        })}
                                                    </p>
                                                </>
                                            </span>
                                            <span className='flex flex-col gap-2 items-center justify-between'>
                                                <>
                                                    <p className={`text-white-normal font-medium  text-lg`} >Initial Date:</p>
                                                    <p className={`text-gray-branding font-medium  text-md sm:text-lg`} >
                                                        {formatDistance(p?.date, new Date(), { addSuffix: true })}
                                                    </p>
                                                </>
                                            </span>
                                        </div>

                                    </div>
                                </Fragment>
                            ))}
                        </>
                    ) :
                        (
                            <>
                                <div className='table p-4 shadow rounded-lg w-full'>
                                    <div className=' bg-artificial-theme-dark-black '>
                                        <a href={ROUTES.PACKAGES }>
                                            <span className='border p-4 dark:border-gray-info whitespace-nowrap font-semibold text-white-normal uppercase animate-pulse cursor-pointer flex flex-row justify-center items-center gap-1'>
                                                Invest in your tomorrow, today!
                                                <ArrowLongRightIcon 
                                                className='w-8 h-8 text-black-normal'
                                                />
                                            </span>
                                        </a>
                                    </div>

                                </div>
                            </>
                        )
                }
                {/* PAGINATION */}
                <div className='w-full flex justify-center items-center my-4 '>
                    <ReferralsPagination
                        currentPage={currentPage}
                        prevHandler={prevHandler}
                        nextHandler={nextHandler}
                    />
                </div>
            </div >
        </section >
    )
}

export default UserPackages

UserPackages.propTypes = {
    currentUser: PropTypes.object,
    setSearchUser: PropTypes.func,
    filteredTransactions: PropTypes.array,
    usersReferredByMe: PropTypes.array,
    users: PropTypes.array,
    currentPosts: PropTypes.any,
    prevHandler: PropTypes.func,
    nextHandler: PropTypes.func,
    currentPage: PropTypes.number,
}