import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import PackageOne from './packages/packageOne'
import PackageTwo from './packages/packageTwo'
import PackageThree from './packages/packageThree'
import PackageFour from './packages/packageFour'
import PackageFive from './packages/packageFive'
import PackageSix from './packages/packageSix'
import PackageSeven from './packages/packageSeven'
import PackageEight from './packages/packageEight'
import PackageNine from './packages/packageNine'
import PackageTeen from './packages/packageTeen'
import PackageEleven from './packages/packageEleven'
import PackageTwelve from './packages/packageTwelve'
import PackageThirteen from './packages/packageThirteen'
import PackageFourteen from './packages/packageFourteen'
import PackageFifteen from './packages/packageFifteen'
import PackageSixteen from './packages/packageSixteen'
import PackageSeventeen from './packages/packageSeventeen'
import PackageEighteen from './packages/packageEighteen'
import PackageNineteen from './packages/packageNIneteen'
import PackageTwenty from './packages/packageTwenty'

// import useUsers from '../../../../hooks/use-users'

const PackagesList = ({ user }) => {

    const arrayOfpackages = []
    arrayOfpackages?.push(user?.packages)

    const orderBy = arrayOfpackages?.sort((a, b) => {
        return b.created - a.created
    })

    const calculatePercentaje = (packageAmount, currentProfit) => {
        const percentaje = (200 / 100) * packageAmount

        return (100 / percentaje) * currentProfit
    }

    return (
        <div className='flex flex-col gap-10 mb-20 my-10'>
            {
                orderBy?.map((pkg, i) => (
                    <Fragment key={i}>
                        {/* PACKAGEONE 1 */}
                        {
                            pkg?.packageOne?.packageAmount > 0 && pkg?.packageOne?.uid === user?.userId && (
                                <PackageOne
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGETWO 2 */}
                        {
                            parseInt(pkg?.packageTwo?.packageAmount) > 0 && pkg?.packageTwo?.uid === user?.userId && (
                                <>
                                    <PackageTwo
                                        pkg={pkg}
                                        calculatePercentaje={calculatePercentaje}
                                        i={i}
                                    />
                                </>
                            )
                        }
                        {/* PACKAGETHREE 3 */}
                        {
                            pkg?.packageThree?.packageAmount > 0 && pkg?.packageThree?.uid === user?.userId && (
                                <PackageThree
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGEFOUR 4 */}
                        {
                            pkg?.packageFour?.packageAmount > 0 && pkg?.packageFour?.uid === user?.userId && (
                                <PackageFour
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGEFIVE 5 */}
                        {
                            pkg?.packageFive?.packageAmount > 0 && pkg?.packageFive?.uid === user?.userId && (
                                <PackageFive
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGESIX 6 */}
                        {
                            pkg?.packageSix?.packageAmount > 0 && pkg?.packageSix?.uid === user?.userId && (
                                <PackageSix
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGESEVEN 7 */}
                        {
                            pkg?.packageSeven?.packageAmount > 0 && pkg?.packageSeven?.uid === user?.userId && (
                                <PackageSeven
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGESEVEN 7 */}
                        {
                            pkg?.packageEigth?.packageAmount > 0 && pkg?.packageEigth?.uid === user?.userId && (
                                <PackageEight
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGESEVEN 7 */}
                        {
                            pkg?.packageNine?.packageAmount > 0 && pkg?.packageNine?.uid === user?.userId && (
                                <PackageNine
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGESEVEN 7 */}
                        {
                            pkg?.packageTeen?.packageAmount > 0 && pkg?.packageTeen?.uid === user?.userId && (
                                <PackageTeen
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGESEVEN 7 */}
                        {
                            pkg?.packageEleven?.packageAmount > 0 && pkg?.packageEleven?.uid === user?.userId && (
                                <PackageEleven
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGESEVEN 7 */}
                        {
                            pkg?.packageTwelve?.packageAmount > 0 && pkg?.packageTwelve?.uid === user?.userId && (
                                <PackageTwelve
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGESEVEN 7 */}
                        {
                            pkg?.packageThirteen?.packageAmount > 0 && pkg?.packageThirteen?.uid === user?.userId && (
                                <PackageThirteen
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGESEVEN 7 */}
                        {
                            pkg?.packageFourteen?.packageAmount > 0 && pkg?.packageFourteen?.uid === user?.userId && (
                                <PackageFourteen
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGESEVEN 7 */}
                        {
                            pkg?.packageFifteen?.packageAmount > 0 && pkg?.packageFifteen?.uid === user?.userId && (
                                <PackageFifteen
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGESEVEN 7 */}
                        {
                            pkg?.packageSixteen?.packageAmount > 0 && pkg?.packageSixteen?.uid === user?.userId && (
                                <PackageSixteen
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGESEVEN 7 */}
                        {
                            pkg?.packageSeventeen?.packageAmount > 0 && pkg?.packageSeventeen?.uid === user?.userId && (
                                <PackageSeventeen
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGESEVEN 7 */}
                        {
                            pkg?.packageEighteen?.packageAmount > 0 && pkg?.packageEighteen?.uid === user?.userId && (
                                <PackageEighteen
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGESEVEN 7 */}
                        {
                            pkg?.packageNineteen?.packageAmount > 0 && pkg?.packageNineteen?.uid === user?.userId && (
                                <PackageNineteen
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }
                        {/* PACKAGESEVEN 7 */}
                        {
                            pkg?.packageTwenty?.packageAmount > 0 && pkg?.packageTwenty?.uid === user?.userId && (
                                <PackageTwenty
                                    pkg={pkg}
                                    calculatePercentaje={calculatePercentaje}
                                    i={i}
                                />
                            )
                        }

                    </Fragment>
                ))
            }
        </div>
    )
}

export default PackagesList
PackagesList.propTypes = {
    users: PropTypes.array,
    user: PropTypes.object
}