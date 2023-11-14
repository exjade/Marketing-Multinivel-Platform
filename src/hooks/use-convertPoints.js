import { useState, useEffect } from 'react';
//HOOKS
import useAuthListener from './use-auth-listener';
import useUser from './use-user';
import useUsers from './use-users';
//firebase
import { firebase } from '../lib/firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
const firestore = getFirestore(firebase);

export default function useConvertPoints() {
    const { user } = useAuthListener(); // localStorage
    const { user: rootUser } = useUser(); //firebase user object
    const { users } = useUsers();
    //States
    /* eslint-disable-next-line no-unused-vars */
    const [points, setPoints] = useState(0);

    const convertPointsToMoney = async () => {
        try {
            const docsRef = doc(firestore, 'users', user.uid);


            // Sí el usuario ha realizado un Applied
            if (rootUser && rootUser?.Applied > 40) {
                // List of users who signup with my referral code
                const usersReferredByMe = users?.filter(user => user.referral.referrerBy === rootUser?.referral?.referralCode);
                // List of direct referrals who made an investment
                const usersWhoMadeInvestment = usersReferredByMe?.filter(user => user.Applied > 40);
                // direct referrals who have not yet paid their percentage 
                const usersWhoHaveNotPaid = usersWhoMadeInvestment?.filter(user => user.referral.haveAlreadyPaidPercentaje !== true);
                // Array - Moneyt invested from direct referrals
                const appliedOfMyReferrals = usersWhoHaveNotPaid?.map(money => money.Applied);
                // Sum of money invested from direct referrals
                const sumOfApplied = appliedOfMyReferrals?.reduce((a, b) => a + b, 0);
                // Money earned from direct referrals
                const earnedMoney = sumOfApplied;
                // convert sumOfApplied to points - each $1 is equal to 3 points
                const pointsEarned = earnedMoney * 0.05;
                console.log(pointsEarned)

                setTimeout(async () => {
                    if (rootUser?.Applied > 0 && rootUser?.Profit > rootUser?.Applied * 0.20) {


                        if (rootUser?.referral.HaveAlreadyReceivedPercentage === false) {
                            await updateDoc(docsRef, {
                                ReferralBalance: rootUser?.ReferralBalance + pointsEarned,
                            })
                        }
                        if (rootUser?.referral.HaveAlreadyReceivedPercentage === false) {
                            await updateDoc(docsRef, {
                                referral: {
                                    ...rootUser?.referral,
                                    HaveAlreadyReceivedPercentage: true,
                                },
                            })
                        }
                    }
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        convertPointsToMoney();
    }, [users])

    return { points };
}