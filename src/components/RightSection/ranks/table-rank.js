import React, { useState, useEffect } from 'react'
import useUser from '../../../hooks/use-user'
import * as ROUTES from '../../../constants/routes'
import styles from '../../../styles/modules/rightsections/right.module.css'
import TableLoader from './table_loader'
import { useTranslation } from 'react-i18next'

const TableRank = () => {
    const { t } = useTranslation()
    const { user } = useUser()
    const [isLoading, setIsLoading] = useState(true)

    const rankName = {
        Master: `${t('Package')}: ${parseFloat(user?.packages?.packageOne?.packageAmount)?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        })}`,
        Silver: 'Silver',
        Sapphire: 'Sapphire',
        Gold: 'Gold',
        Esmerald: 'Esmerald',
        Diamond: 'Diamond',
        BlueDiamond: 'Blue Diamond',
        BlackDiamond: 'Black Diamond',
        ImperialDiamond: 'Imperial Diamond',
        TitanDiamond: 'Titan Diamond',
    }

    const rankImages = {
        Master: 'images/package/25.webp',
        Silver: 'images/package/50.webp',
        Sapphire: 'images/package/100.webp',
        Gold: 'images/package/250.webp',
        Esmerald: 'images/package/500.webp',
        Diamond: 'images/package/750.webp',
        BlueDiamond: 'images/package/900.webp',
        BlackDiamond: 'images/package/1000.webp',
        ImperialDiamond: 'images/package/10000.webp',
        TitanDiamond: 'images/package/50000.webp',
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () =>
            setIsLoading(true)
    }, [])

    const handleLoader = () => { return <TableLoader /> }
    if (isLoading) return handleLoader()
    return (
        <>
            <section>
                <div className={`${styles.containerTableRank} ${styles.borderTopRank} flex flex-col py-4 gap-3 justify-center items-center my-5`} >
                    <h2 className={`${styles.borderLine} text-semibold w-full text-center pb-3`} >{t('Your Actual Package')}</h2>
                    {
                        user?.packages?.packageOne?.packageAmount > 0 ?
                            <img src={rankImages.Master} alt="master" className='h-24 w-24' />
                            : null
                    }
                    <h2 className='text-medium font-bold'>
                        {
                            user?.packages?.packageOne?.packageAmount > 0 ?
                                rankName.Master
                                : t('No Rank')
                        }
                    </h2>
                    <a href={ROUTES.USERPACKAGES} className='text-red-card font-bold'>{t('View My Packages')}</a>
                </div>
            </section>
        </>
    )
}

export default TableRank