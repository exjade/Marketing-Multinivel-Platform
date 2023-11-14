import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from '../../../../styles/wallet.module.css'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import eoLocale from 'date-fns/locale/eo'
import { firebase } from '../../../../../../lib/firebase'
import { getFirestore, doc, setDoc, updateDoc } from 'firebase/firestore';
const firestore = getFirestore(firebase)

const StakingModalRight = (props) => {
    const notEnoughBalance = parseFloat(props.bitcoin.initialInvestment) > parseFloat(props.activeUser?.topupBalance);

    function CalculateEstimatedInterest(duration, APR, AmountInvested) {
        // Convert APR to a decimal rate
        const rate = APR / 100;

        // Calculate daily interest
        const dailyInterest = AmountInvested * rate / 365;

        // Calculate estimated interest according to staking duration
        let estimatedInterest = 0;
        switch (duration) {
            case 30:
                estimatedInterest = dailyInterest * 30;
                break;
            case 60:
                estimatedInterest = dailyInterest * 60;
                break;
            case 120:
                estimatedInterest = dailyInterest * 120;
                break;
            default:
                return null;
        }

        return estimatedInterest.toFixed(5);
    }

    const stakingDuration = props.bitcoin.duration === 30 ? 30
        : props.bitcoin.duration === 60 ? 60
            : props.bitcoin.duration === 120 ? 120 : 0;
    const APR =
        props.bitcoin.name === 'Cardano' ? (
            props.bitcoin.duration === 30 ?
                props.AnnualPercentageRate.btc.treinta :
                props.bitcoin.duration === 60 ?
                    props.AnnualPercentageRate.btc.sesenta :
                    props.bitcoin.duration === 120 ?
                        props.AnnualPercentageRate.btc.cientoveinte : `0%`
        ) : props.bitcoin.name === 'Ethereum' ? (
            props.bitcoin.duration === 30 ?
                props.AnnualPercentageRate.eth.treinta :
                props.bitcoin.duration === 60 ?
                    props.AnnualPercentageRate.eth.sesenta :
                    props.bitcoin.duration === 120 ?
                        props.AnnualPercentageRate.eth.cientoveinte : `0%`
        ) : props.bitcoin.name === 'Tether' ? (
            props.bitcoin.duration === 30 ?
                props.AnnualPercentageRate.bnb.treinta :
                props.bitcoin.duration === 60 ?
                    props.AnnualPercentageRate.bnb.sesenta :
                    props.bitcoin.duration === 120 ?
                        props.AnnualPercentageRate.bnb.cientoveinte : `0%`
        ) : props.bitcoin.name === 'Polkadot' ? (
            props.bitcoin.duration === 30 ?
                props.AnnualPercentageRate.trx.treinta :
                props.bitcoin.duration === 60 ?
                    props.AnnualPercentageRate.trx.sesenta :
                    props.bitcoin.duration === 120 ?
                        props.AnnualPercentageRate.trx.cientoveinte : `0%`
        ) : props.bitcoin.name === 'Solana' ? (
            props.bitcoin.duration === 30 ?
                props.AnnualPercentageRate.sol.treinta :
                props.bitcoin.duration === 60 ?
                    props.AnnualPercentageRate.sol.sesenta :
                    props.bitcoin.duration === 120 ?
                        props.AnnualPercentageRate.sol.cientoveinte : `0%`
        ) : `0%`;
    const AmountInvested = props.bitcoin.initialInvestment;
    const estimatedInterest = CalculateEstimatedInterest(stakingDuration, APR, AmountInvested);


    const setAPR = () => {
        props.setBitcoin({
            ...props.bitcoin,
            percentage: APR,
        })
    }

    // check if the user has filled in the required fields
    const isInvalid = props.bitcoin.initialInvestment === 0
        || props.bitcoin.duration === 0
        || props.bitcoin.endDate === null
        || props.bitcoin.percentage === 0
        || !props.bitcoin.investorSign ||
        props.bitcoin.initialInvestment < 0 ||
        notEnoughBalance;


    //Submit button
    const createStakingInvestment = async () => {
        const conditionUpdate = parseFloat(props.bitcoin.initialInvestment) <= parseFloat(props.activeUser?.topupBalance)
        const EnoughBalance = parseFloat(props.activeUser?.topupBalance) >= parseFloat(props.bitcoin.initialInvestment)
        const washingtonRef = doc(firestore, 'users', props.activeUser.docId);
        try {
            if (APR !== `0%`) {
                if (EnoughBalance) {
                    if (conditionUpdate) {
                        await updateDoc(washingtonRef, {
                            topupBalance: parseFloat(props.activeUser?.topupBalance) - parseFloat(props.bitcoin.initialInvestment)
                        });
                        await setDoc(doc(firestore, 'staking', props.bitcoin.docId), props.bitcoin);

                    }
                }
            }
            setTimeout(() => {
                props.closeModalResetCurrency()
                window.location.reload()
            }, 500)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setAPR()
        }, 500);
    }, [APR])


    return (
        <>
            <div className={`${styles.StakingModalConclusionRight}`} >
                <div className={`${styles.StakingModalRightWrapper} py-8 px-8`} >

                    {/* TITLE */}
                    <span className='flex justify-between items-start my-10'>
                        <h2 className='text-gray-landing_feature font-medium text-xl'>Conclusion</h2>
                        <button
                            type='button'
                            className='text-white-normal hidden lg:inline '
                            onClick={() => props.closeModalResetCurrency()}
                        >
                            <span className="material-symbols-sharp text-3xl">
                                cancel
                            </span>
                        </button>
                    </span>
                    {/*=================== CONCLUSION ===================*/}
                    {/* START DATE */}
                    <div className={`${styles.smrwWrapper}`}>

                        <div className={`${styles.smrw}`}>
                            <div className={`${styles.smrwprogress}`}>
                                <div className={`${styles.smrwprogress1}`}></div>
                                <div className={`${styles.smrwprogress2}`}>
                                    <div className={`${styles.smrwprogress2child}`}></div>
                                    <div className={`${styles.smrwprogress2secondchild}`}></div>
                                </div>
                            </div>
                            <span className={`${styles.smrwText}`}>
                                <p>Stake date</p>
                                <p>
                                    {format(new Date(props.stakeDate), "do 'de' MMMM yyyy", {
                                        locale: eoLocale
                                    })}
                                </p>
                            </span>
                        </div>
                    </div>
                    {/* INTEREST PERIOD */}
                    <div className={`${styles.smrwWrapper}`}>

                        <div className={`${styles.smrw}`}>
                            <div className={`${styles.smrwprogress}`}>
                                <div className={`${styles.smrwprogress2green}`}></div>
                                <div className={`${styles.smrwprogress2green}`}>
                                    <div className={`${styles.smrwprogress2child}`}></div>
                                    <div className={`${styles.smrwprogress2secondchild}`}></div>
                                </div>
                            </div>
                            <span className={`${styles.smrwTextGreen}`}>
                                <p>Interest period</p>
                                <p>1 day</p>
                            </span>
                        </div>
                    </div>
                    {/* DURATION PERIOD */}
                    <div className={`${styles.smrwWrapper}`}>

                        <div className={`${styles.smrw}`}>
                            <div className={`${styles.smrwprogress}`}>
                                <div className={`${styles.smrwprogress2green}`}></div>
                                <div className={`${styles.smrwprogress2green}`}>
                                    <div className={`${styles.smrwprogress2child}`}></div>
                                    <div className={`${styles.smrwprogress2secondchild}`}></div>
                                </div>
                            </div>
                            <span className={`${styles.smrwTextGreen}`}>
                                <p>Staking period</p>
                                <p>{`${props.bitcoin.duration} days`} </p>
                            </span>
                        </div>
                    </div>
                    {/* START DATE */}
                    <div className={`${styles.smrwWrapper}`}>

                        <div className={`${styles.smrw}`}>
                            <div className={`${styles.smrwprogress}`}>
                                <div className={`${styles.smrwprogress1}`}></div>
                                <div className={`${styles.smrwprogress2}`}>
                                    <div className={`${styles.smrwprogress2child}`}></div>
                                    <div className={`${styles.smrwprogress2secondchild}`}></div>
                                </div>
                            </div>
                            <span className={`${styles.smrwText}`}>
                                <p>End date for interest</p>
                                <p className='w-full'>
                                    {
                                        props.bitcoin.duration === 30 ?
                                            format(new Date(props.timestamp), "do 'de' MMMM yyyy", {
                                                locale: eoLocale
                                            })
                                            : props.bitcoin.duration === 60 ?
                                                format(new Date(props.timestampSixteen), "do 'de' MMMM yyyy", {
                                                    locale: eoLocale
                                                })
                                                : props.bitcoin.duration === 120 ?
                                                    format(new Date(props.timestampHundredTwenty), "do 'de' MMMM yyyy", {
                                                        locale: eoLocale
                                                    })
                                                    :
                                                    format(new Date(props.stakeDate), "do 'de' MMMM yyyy", {
                                                        locale: eoLocale
                                                    })
                                    }
                                </p>
                            </span>
                        </div>
                    </div>

                    {/* APR ESTIMATED & INTEREST*/}
                    <div className={`${styles.aprcontainer}`}>
                        <span className={`${styles.aprwrapper}`}>
                            <p>APR estimated</p>
                            <p>
                                {
                                    props.bitcoin.name === 'Cardano' ? (
                                        props.bitcoin.duration === 30 ?
                                            `${props.AnnualPercentageRate.btc.treinta}%` :
                                            props.bitcoin.duration === 60 ?
                                                `${props.AnnualPercentageRate.btc.sesenta}%` :
                                                props.bitcoin.duration === 120 ?
                                                    `${props.AnnualPercentageRate.btc.cientoveinte}%` : 0
                                    ) : props.bitcoin.name === 'Ethereum' ? (
                                        props.bitcoin.duration === 30 ?
                                            `${props.AnnualPercentageRate.eth.treinta}%` :
                                            props.bitcoin.duration === 60 ?
                                                `${props.AnnualPercentageRate.eth.sesenta}%` :
                                                props.bitcoin.duration === 120 ?
                                                    `${props.AnnualPercentageRate.eth.cientoveinte}%` : 0
                                    ) : props.bitcoin.name === 'Tether' ? (
                                        props.bitcoin.duration === 30 ?
                                            `${props.AnnualPercentageRate.bnb.treinta}%` :
                                            props.bitcoin.duration === 60 ?
                                                `${props.AnnualPercentageRate.bnb.sesenta}%` :
                                                props.bitcoin.duration === 120 ?
                                                    `${props.AnnualPercentageRate.bnb.cientoveinte}%` : 0
                                    ) : props.bitcoin.name === 'Polkadot' ? (
                                        props.bitcoin.duration === 30 ?
                                            `${props.AnnualPercentageRate.trx.treinta}%` :
                                            props.bitcoin.duration === 60 ?
                                                `${props.AnnualPercentageRate.trx.sesenta}%` :
                                                props.bitcoin.duration === 120 ?
                                                    `${props.AnnualPercentageRate.trx.cientoveinte}%` : 0
                                    ) : props.bitcoin.name === 'Solana' ? (
                                        props.bitcoin.duration === 30 ?
                                            `${props.AnnualPercentageRate.sol.treinta}%` :
                                            props.bitcoin.duration === 60 ?
                                                `${props.AnnualPercentageRate.sol.sesenta}%` :
                                                props.bitcoin.duration === 120 ?
                                                    `${props.AnnualPercentageRate.sol.cientoveinte}%` : 0
                                    ) : `0%`
                                }

                            </p>
                        </span>
                        <span className={`${styles.aprwrapper}`}>
                            <p>Estimated interest</p>
                            <p >
                                {
                                    props.bitcoin.initialInvestment === 0 || props.bitcoin.duration === 0 ?
                                        '--'
                                        : `${estimatedInterest} ${props.bitcoin.coin} `
                                }
                            </p>
                        </span>
                    </div>

                    {/* APR Information  */}
                    <div className={`${styles.aprinformationwrapper}`} >
                        <div className={`${styles.aprinformation}`}>
                            <span className="material-symbols-sharp text-[15px]">info</span>
                            <p className='text-xs'>
                                The APR is adjusted daily according to the staking rewards in the chain,
                                and the specific APR is subject to what is displayed on the page during the day.
                            </p>
                        </div>
                        <div className={`${styles.aprinformation}`}>
                            <span className="material-symbols-sharp text-[15px]">info</span>
                            <p className='text-xs'>APR doesnt refer to actual or anticipated gains in fiat currency.</p>
                        </div>
                        <div className={`${styles.aprinformation}`}>
                            <input
                                type="checkbox"
                                className='w-8 h-8'
                                onClick={() => props.setBitcoin({
                                    ...props.bitcoin,
                                    investorSign: true,
                                })}
                            />
                            <p className='text-xs'>
                                I have read and agree to the Artificial Staking DeFi Service Agreement.
                            </p>
                        </div>
                    </div>

                    {
                        !props.bitcoin.investorSign && (
                            <p className='text-red-warning text-xs mt-5'>
                                Please accept the Artificial Staking DeFi Service Agreement.
                            </p>
                        )
                    }

                    {/* BUTTON */}
                    <div className={styles.aprbuttonwrapper}>
                        <motion.button
                            type='button'
                            className={`${styles.aprbutton} ${isInvalid ? 'bg-red-logo cursor-not-allowed' : 'bg-green-landingButton'}`}
                            whileTap={{
                                scale: 0.8,
                            }}
                            onClick={() => createStakingInvestment()}
                            disabled={isInvalid}
                        >
                            Confirm
                        </motion.button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default StakingModalRight

StakingModalRight.propTypes = {
    closeModal: PropTypes.func,
    bitcoin: PropTypes.object,
    setBitcoin: PropTypes.func,
    AnnualPercentageRate: PropTypes.object,
    closeModalResetCurrency: PropTypes.func,
    stakeDate: PropTypes.any,
    timestamp: PropTypes.any,
    timestampSixteen: PropTypes.any,
    timestampHundredTwenty: PropTypes.any,
    activeUser: PropTypes.object,
}