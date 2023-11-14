import { useEffect } from 'react';
//Custom Hooks
import useUser from './use-user';
import useUsers from './use-users';
// import useAuthListener from './use-auth-listener';
//firebase
import { firebase } from '../lib/firebase';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
const firestore = getFirestore(firebase);

export default function useRefferal() {

    const { user: currentUser} = useUser();
    // const { user: authUser } = useAuthListener()
    const { users } = useUsers();
    const filteredUsersReferredByMe = users?.filter(user => user?.referral?.referrerBy === currentUser?.referral?.referralCode);
    const doesUserIncludeMyReferralCode = users?.some(user => user?.referral?.referrerBy === currentUser?.referral?.referralCode)
    async function addReferralId() {
        try {
            if (doesUserIncludeMyReferralCode) {
                const userRef = doc(firestore, 'users', currentUser?.docId);
                const filteredUsers = users?.filter(user => user?.referral?.referrerBy === currentUser?.referral?.referralCode);
                const userIds = filteredUsers?.map(user => user.userId);
                const orderdUsers = userIds?.sort((a, b) => { return users?.find(user => user.userId === a).createdAt - users?.find(user => user.userId === b).createdAt });
                if (doesUserIncludeMyReferralCode) {
                    await updateDoc(userRef, {
                        referral: {
                            ...currentUser?.referral,
                            userReferrals: orderdUsers
                        }
                    });
                }

            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        addReferralId();
        // filterReferrals();
    }, [filteredUsersReferredByMe]) //eslint-disable-line

    return { users }
}