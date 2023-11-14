import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import styles from '../styles/table-referrals.module.css';
// import {
//     ChevronDownIcon,
//     ChevronUpIcon
// } from '@heroicons/react/24/outline';
// import useGetReferrals from '../../../../hooks/unilevel/use-getReferrals';

const TableContacts = ({
    filterSearchbar,
    getReferredQty,
    usersReferredByMe
}) => {

    // const {usuarioaMapeados} = useGetReferrals()
    // console.log(usuarioaMapeados)

    const [isLoading, setIsLoading] = useState(true);
    // const [expandUnilevel, setExpandUnilevel] = useState(false)

    // const displayHideUnilevel = () => {

    //     if (expandUnilevel) {
    //         setExpandUnilevel(false)
    //     }
    //     if (!expandUnilevel) {
    //         setExpandUnilevel(true)
    //     }
    // }

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }


    useEffect(() => {
        document.title = 'My Network - Artificial'
        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }, [])


    const loader = () => { return null };
    if (isLoading) { return loader(); }
    else {
        return (
            <>
                <motion.div
                    className={`${styles.TableContainer} container p-2 mx-auto sm:p-4 text-gray-loader`}
                    variants={container}
                    initial="hidden"
                    animate="visible">
                    <h2 className="mb-4 text-2xl font-semibold leadi text-artificial-theme-white-primary">Team members</h2>
                    <div className="overflow-x-auto">
                        <table className={`${styles.table} w-full p-6 text-xs text-left whitespace-nowrap`} >

                            <motion.thead variants={item}>
                                <tr className="bg-gray-withdrawal overflow-scroll">
                                    <th className="p-3 uppercase">1-100</th>
                                    <th className="p-3 uppercase">Basic info</th>
                                    <th className="p-3 uppercase">Level</th>
                                    <th className="p-3 uppercase">Contribution</th>
                                    <th className="p-3 uppercase">Percentage</th>
                                    <th className="p-3 uppercase">Team Members</th>
                                    {/* <th className="p-3 uppercase">See</th> */}
                                    {/* <th className="p-3 uppercase">
                                    <span className="sr-only">Edit</span>
                                </th> */}
                                </tr>
                            </motion.thead>


                            {
                                filterSearchbar?.length > 0 ?
                                    (
                                        <>
                                            {
                                                filterSearchbar?.map((user, i) => {
                                                    const referralsCount = getReferredQty(user);

                                                    //eslint-disabled-next-line
                                                    function calcularPorcentaje() {
                                                        switch (user?.nivel) {
                                                            case 1:
                                                                return 10;
                                                            case 2:
                                                                return 7;
                                                            case 3:
                                                                return 6;
                                                            case 4:
                                                                return 4;
                                                            case 5:
                                                                return 3;
                                                            default:
                                                                return 0;
                                                        }
                                                    }

                                                    return (
                                                        <Fragment key={i}>
                                                            {/* Map directs from unilevel  */}
                                                            <motion.tbody
                                                                className="border-b bg-gray-50 border-gray-withdrawal overflow-scroll"
                                                                variants={item}
                                                            >
                                                                <tr>
                                                                    <td className="px-3 text-2xl font-medium text-gray-600">{i + 1}</td>
                                                                    <td className="px-3 py-2  text-artificial-theme-white-primary  ">
                                                                        <p>{user.username}</p>
                                                                    </td>
                                                                    <td className="px-3 py-2  text-artificial-theme-white-primary  ">
                                                                        <p className="text-gray-600">
                                                                            {
                                                                                // If you haven't been invited by anyone 
                                                                                // will show the root spillover
                                                                                // If the user is in root level 1 
                                                                                user?.nivel === 1 ?
                                                                                    (<>
                                                                                        {
                                                                                            1
                                                                                        }
                                                                                    </>)
                                                                                    : (
                                                                                        <>
                                                                                            {
                                                                                                user.nivelUnilevelUsuario === 1 ?
                                                                                                    `${user.nivelUnilevelUsuario} `
                                                                                                    : user.nivelUnilevelUsuario === 2 ?
                                                                                                        `${user.nivelUnilevelUsuario - 1} `
                                                                                                        : user.nivelUnilevelUsuario === 3 ?
                                                                                                            `${user.nivelUnilevelUsuario - 2} `
                                                                                                            : user.nivelUnilevelUsuario === 4 ?
                                                                                                                `${user.nivelUnilevelUsuario - 3} `
                                                                                                                : user.nivelUnilevelUsuario === 5 ?
                                                                                                                    `${user.nivelUnilevelUsuario - 4} `
                                                                                                                    : 1
                                                                                            }
                                                                                        </>
                                                                                    )
                                                                            }
                                                                        </p>
                                                                    </td>
                                                                    <td className="px-3 py-2  text-artificial-theme-white-primary  ">
                                                                        <p>{user.inversion}</p>
                                                                    </td>
                                                                    <td className="px-3 py-2  text-artificial-theme-white-primary  ">
                                                                        <p>
                                                                            {
                                                                                user?.nivel === 1 ?
                                                                                    (<>
                                                                                        {
                                                                                            10
                                                                                        }
                                                                                    </>)
                                                                                    : (
                                                                                        <>
                                                                                            {
                                                                                                user.nivelUnilevelUsuario === 1 ?
                                                                                                    10
                                                                                                    : user.nivelUnilevelUsuario === 2 - 1 ?
                                                                                                        7
                                                                                                        : user.nivelUnilevelUsuario === 3 - 2 ?
                                                                                                            6
                                                                                                            : user.nivelUnilevelUsuario === 4 - 3 ?
                                                                                                                4
                                                                                                                : user.nivelUnilevelUsuario === 5 - 4 ?
                                                                                                                    5
                                                                                                                    : 10
                                                                                            }
                                                                                        </>
                                                                                    )
                                                                            }
                                                                        </p>
                                                                    </td>
                                                                    <td className="px-3 py-2  text-artificial-theme-white-primary  ">
                                                                        <p>{referralsCount}</p>
                                                                    </td>
                                                                    {/* {
                                                                        !expandUnilevel ? (
                                                                            <td
                                                                            className="px-3 py-2  text-artificial-theme-white-primary cursor-pointer"
                                                                            onClick={() => displayHideUnilevel()}
                                                                            disabled
                                                                        >
                                                                            <ChevronDownIcon
                                                                                className='h-8 w-8 text-white-normal'
                                                                            />
                                                                        </td>
                                                                        ) : (
                                                                            <td
                                                                            className="px-3 py-2  text-artificial-theme-white-primary cursor-not-allowed"
                                                                            onClick={() => displayHideUnilevel()}
                                                                            disabled
                                                                        >
                                                                            <ChevronUpIcon
                                                                                className='h-8 w-8 text-white-normal'
                                                                            />
                                                                        </td>
                                                                        )
                                                                    } */}

                                                                </tr>
                                                            </motion.tbody>

                                                            {/* Map every users on the unilevel 
                                                            {
                                                                expandUnilevel &&
                                                                (
                                                                    <motion.tbody
                                                                        className="border-b bg-gray-50 border-gray-withdrawal overflow-scroll"
                                                                        variants={item}
                                                                    >
                                                                        <tr>
                                                                            <td className="px-3 text-2xl font-medium text-gray-600">{i + 1}</td>
                                                                            <td className="px-3 py-2  text-artificial-theme-white-primary  ">
                                                                                <p>{user.username}</p>
                                                                            </td>
                                                                            <td className="px-3 py-2  text-artificial-theme-white-primary  ">
                                                                                <p className="text-gray-600">
                                                                                    {
                                                                                        // If you haven't been invited by anyone 
                                                                                        // will show the root spillover
                                                                                        // If the user is in root level 1 
                                                                                        user?.nivel === 1 ?
                                                                                            (<>
                                                                                                {
                                                                                                    1
                                                                                                }
                                                                                            </>)
                                                                                            : (
                                                                                                <>
                                                                                                    {
                                                                                                        user.nivelUnilevelUsuario === 1 ?
                                                                                                            `${user.nivelUnilevelUsuario} hola`
                                                                                                            : user.nivelUnilevelUsuario === 2 ?
                                                                                                                `${user.nivelUnilevelUsuario - 1} menos1`
                                                                                                                : user.nivelUnilevelUsuario === 3 ?
                                                                                                                    `${user.nivelUnilevelUsuario - 2} menos2`
                                                                                                                    : user.nivelUnilevelUsuario === 4 ?
                                                                                                                        `${user.nivelUnilevelUsuario - 3} menos3`
                                                                                                                        : user.nivelUnilevelUsuario === 5 ?
                                                                                                                            `${user.nivelUnilevelUsuario - 4} menos4`
                                                                                                                            : 1 + 'root'
                                                                                                    }
                                                                                                </>
                                                                                            )
                                                                                    }
                                                                                </p>
                                                                            </td>
                                                                            <td className="px-3 py-2  text-artificial-theme-white-primary  ">
                                                                                <p>{user.inversion}</p>
                                                                            </td>
                                                                            <td className="px-3 py-2  text-artificial-theme-white-primary  ">
                                                                                <p>
                                                                                    {
                                                                                        user?.nivel === 1 ?
                                                                                            (<>
                                                                                                {
                                                                                                    10
                                                                                                }
                                                                                            </>)
                                                                                            : (
                                                                                                <>
                                                                                                    {
                                                                                                        user.nivelUnilevelUsuario === 1 ?
                                                                                                            10
                                                                                                            : user.nivelUnilevelUsuario === 2 - 1 ?
                                                                                                                7
                                                                                                                : user.nivelUnilevelUsuario === 3 - 2 ?
                                                                                                                    6
                                                                                                                    : user.nivelUnilevelUsuario === 4 - 3 ?
                                                                                                                        4
                                                                                                                        : user.nivelUnilevelUsuario === 5 - 4 ?
                                                                                                                            5
                                                                                                                            : 10
                                                                                                    }
                                                                                                </>
                                                                                            )
                                                                                    }
                                                                                </p>
                                                                            </td>
                                                                            <td className="px-3 py-2  text-artificial-theme-white-primary  ">
                                                                                <p>{referralsCount}</p>
                                                                            </td>
                                                                        </tr>
                                                                    </motion.tbody>
                                                                )
                                                            } */}

                                                        </Fragment>
                                                    )
                                                })
                                            }
                                        </>
                                    )
                                    : usersReferredByMe?.length > 0 ?
                                        (
                                            <>
                                                {
                                                    usersReferredByMe?.map((user, i) => {

                                                        function calcularPorcentaje() {
                                                            switch (user?.nivel) {
                                                                case 1:
                                                                    return 10;
                                                                case 2:
                                                                    return 7;
                                                                case 3:
                                                                    return 6;
                                                                case 4:
                                                                    return 4;
                                                                case 5:
                                                                    return 3;
                                                                default:
                                                                    return 0;
                                                            }
                                                        }

                                                        return (
                                                            <Fragment key={i}>
                                                                {/* Map every users on the unilevel  */}
                                                                <motion.tbody className="border-b bg-gray-50 border-gray-withdrawal overflow-scroll"
                                                                    variants={item}>
                                                                    <tr>
                                                                        <td className="px-3 text-2xl font-medium text-gray-600">{i + 1}</td>
                                                                        <td className="px-3 py-2  text-artificial-theme-white-primary  ">
                                                                            <p>{user.username}</p>
                                                                        </td>
                                                                        <td className="px-3 py-2  text-artificial-theme-white-primary  ">
                                                                            <p className="text-gray-600">--</p>
                                                                        </td>
                                                                        <td className="px-3 py-2  text-artificial-theme-white-primary  ">
                                                                            <p>--</p>
                                                                        </td>
                                                                        <td className="px-3 py-2  text-artificial-theme-white-primary  ">
                                                                            <p>
                                                                                {calcularPorcentaje()}
                                                                            </p>
                                                                        </td>
                                                                        <td className="px-3 py-2  text-artificial-theme-white-primary  ">
                                                                            <p>0</p>
                                                                        </td>

                                                                    </tr>
                                                                </motion.tbody>
                                                            </Fragment>
                                                        )
                                                    })
                                                }
                                            </>
                                        ) :
                                        (
                                            <Fragment >
                                                <tr>
                                                    <td className="px-3 text-2xl font-medium text-artificial-theme-white-primary  animate-pulse">...</td>
                                                    <td className="px-3 py-2  text-artificial-theme-white-primary   animate-pulse">
                                                        <p>...</p>
                                                    </td>
                                                    <td className="px-3 py-2  text-artificial-theme-white-primary   animate-pulse">
                                                        <p className="text-artificial-theme-white-primary  ">...</p>
                                                    </td>
                                                    <td className="px-3 py-2  text-artificial-theme-white-primary   animate-pulse">
                                                        <p>...</p>
                                                    </td>
                                                    <td className="px-3 py-2  text-artificial-theme-white-primary   animate-pulse">
                                                        <p>
                                                            ...
                                                        </p>
                                                    </td>
                                                    <td className="px-3 py-2  text-artificial-theme-white-primary   animate-pulse">
                                                        <p>...</p>
                                                    </td>

                                                </tr>
                                            </Fragment>
                                        )
                            }




                        </table>
                    </div>
                </motion.div>
            </>
        )
    }
}

export default TableContacts

TableContacts.propTypes = {
    filterSearchbar: PropTypes.array,
    usersReferredByMe: PropTypes.array,
    referralsLength: PropTypes.number,
    getReferredQty: PropTypes.func,
}