import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import styles from './styles/bonus.module.css';
import {
    CheckBadgeIcon
} from '@heroicons/react/24/outline';


const BonusCards = (props) => {

    const checkProfile = props?.findNoviceInvestor?.reward[0]?.ProfileCompleted === true;
    const checkInvest = props?.findNoviceInvestor?.reward[0]?.Invested === true;
    const checkClaimed = props?.findNoviceInvestor?.status === 'claimed';

    const claimReward = checkProfile && checkInvest;

    // Estado local para controlar si se muestra el botón "Unlock Reward"
    const [showUnlockReward, setShowUnlockReward] = useState(false);

    // Si claimReward es true, esperar 15 segundos antes de mostrar el botón "Unlock Reward"
    useEffect(() => {

        const timeoutId = setTimeout(() => {
            setShowUnlockReward(true);
        }, 2000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [claimReward]);


    return (
        <>
            {/* ================== USER BONUS #1 - Novice Investor  ==================*/}
            <div className={`${styles.card}`} >
                <span className='flex flex-col justify-center items-center gap-1'>
                    <p className='text-white-normal font-bold text-lg'>
                        Novice Investor
                    </p>
                    <q className='text-gray-primary font-light italic text-xs'>Make the first investment</q>
                    <p className='text-white-primary text-md'> Status:
                        <b>
                            {props?.findNoviceInvestor?.status === 'active' ? 'Active' : props?.findNoviceInvestor?.status === 'claimed' ? 'Successful' : 'Non-active'
                            }
                        </b>
                    </p>
                </span>

                <div className={`${styles.cardSteps}`}>
                    <span className='flex flex-row justify-center items-center gap-1'>
                        <CheckBadgeIcon
                            className={`${styles.path} w-6 h-6`} />
                        <p className='text-xs sm:text-md'>Signed Up</p>
                    </span>
                    <span className='flex flex-row justify-center items-center gap-1'>
                        <CheckBadgeIcon
                            className={`${!checkProfile ? 'text-white-normal' : `${styles.path}`} w-6 h-6`} />
                        <p className='text-xs sm:text-md'>Profile complete</p>
                    </span>
                    <span className='flex flex-row justify-center items-center gap-1'>
                        <CheckBadgeIcon
                            className={`${!checkInvest ? 'text-white-normal' : `${styles.path}`} w-6 h-6`} />
                        <p className='text-xs sm:text-md'>Invested</p>
                    </span>
                </div>

                {/* Show the button when the user has not yet started the reward */}
                {
                    showUnlockReward ? (
                        props?.findNoviceInvestor?.status !== 'active' && props?.findNoviceInvestor?.status !== 'claimed' && !claimReward &&
                        (
                            <button
                                type='button'
                                className={`${styles.cardButton}`}
                                onClick={() => props.handleNoviceInvestor()}
                                disabled={claimReward}
                            >
                                Unlock Reward
                            </button>
                        )
                    ) : (
                        <p className='animate-pulse text-white-normal'>...</p>
                    )
                }
                {
                    props?.findNoviceInvestor?.status === 'active' && !claimReward &&
                    (
                        <button
                            type='button'
                            className={`${styles.cardButton}`}
                            disabled
                        >
                            Go for it, you've got this!
                        </button>
                    )
                }
                {
                    claimReward && !checkClaimed &&
                    (
                        <button
                            type='button'
                            className={`${styles.cardButton}`}
                            onClick={() => props.addRewardBalance()}
                        >
                            Claim reward!
                        </button>
                    )
                }
                {
                    checkClaimed && claimReward &&
                    (
                        <button
                            type='button'
                            className={`${styles.cardButton} cursor-not-allowed`}
                            disabled
                        >
                            Claimed!
                        </button>
                    )
                }



                {/* Show the button when the user has initiated the reward */}


            </div>

            {/* <div className={`${styles.card}`} >
                <span className='flex flex-col justify-center items-center gap-1'>
                    <p className='text-white-normal font-bold text-lg'>
                        Explorer Trader
                    </p>
                    <q className='text-gray-primary font-light italic text-xs'>
                        Accumulate $100 USD in staking
                    </q>
                    <p className='text-white-primary text-md'> Status: <b>Successful</b> </p>
                </span>

                <div className={`${styles.cardSteps}`}>
                    <span className='flex flex-row justify-center items-center gap-1'>
                        <CheckBadgeIcon
                            className='w-6 h-6  text-artificial-main-blue-primary' />
                        <p className='text-xs sm:text-md'> Signed Up</p>
                    </span>
                    <span className='flex flex-row justify-center items-center gap-1'>
                        <CheckBadgeIcon
                            className='w-6 h-6  text-artificial-main-blue-primary' />
                        <p className='text-xs sm:text-md'>Profile complete</p>
                    </span>
                    <span className='flex flex-row justify-center items-center gap-1'>
                        <CheckBadgeIcon
                            className='w-6 h-6  text-artificial-main-blue-primary' />
                        <p className='text-xs sm:text-md'>1rst stake</p>
                    </span>
                </div>

                <button
                    type='button'
                    className={`${styles.cardButton}`}
                    onClick={() => console.log('0')}
                >
                    Unlock Reward
                </button>
            </div>

            <div className={`${styles.card} mb-10`} >
                <span className='flex flex-col justify-center items-center gap-1'>
                    <p className='text-white-normal font-bold text-lg'>
                        First 5 Referrals, Big Rewards!
                    </p>
                    <q className='text-gray-primary font-light italic text-xs'>
                        Refer 5 friends who invest, and win exclusive rewards
                    </q>
                    <p className='text-white-primary text-md'> Status: <b>Successful</b> </p>
                </span>

                <div className={`${styles.cardSteps}`}>
                    <span className='flex flex-row justify-center items-center gap-1'>
                        <CheckBadgeIcon
                            className='w-6 h-6  text-artificial-main-blue-primary' />
                        <p className='text-xs sm:text-md'>Signed Up</p>
                    </span>
                    <span className='flex flex-row justify-center items-center gap-1'>
                        <CheckBadgeIcon
                            className='w-6 h-6  text-artificial-main-blue-primary' />
                        <p className='text-xs sm:text-md'>Profile complete</p>
                    </span>
                    <span className='flex flex-row justify-center items-center gap-1'>
                        <CheckBadgeIcon
                            className='w-6 h-6  text-artificial-main-blue-primary' />
                        <p className='text-xs sm:text-md'>Refer</p>
                    </span>
                </div>

                <button
                    type='button'
                    className={`${styles.cardButton}`}
                    onClick={() => console.log('0')}
                >
                    Unlock Reward
                </button>
            </div> */}
        </>
    )
}

export default BonusCards

BonusCards.propTypes = {
    handleNoviceInvestor: PropTypes.func,
    selectedBonus: PropTypes.object,
    bonusDocs: PropTypes.any,
    addRewardBalance: PropTypes.func,
    findNoviceInvestor: PropTypes.any,
}