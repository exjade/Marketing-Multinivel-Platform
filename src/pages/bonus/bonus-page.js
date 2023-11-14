import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/header/artificial/header';
import BonusTimeline from '../../components/bonus';
import useAuthListener from '../../hooks/use-auth-listener';
import shortid from 'shortid';
import BonusModal from '../../components/bonus/modal';
import useBonus from '../../hooks/use-bonus';
import useUser from '../../hooks/use-user';
import { firebase } from '../../lib/firebase';
import {
    getFirestore,
    collection,
    addDoc,
    doc,
    updateDoc,
    getDoc,
} from 'firebase/firestore';
const firestore = getFirestore(firebase);


const BonusPage = () => {

    const { user: authUser } = useAuthListener()
    const { user } = useUser()
    const { bonusDocs } = useBonus()

    const [selectedBonus, setSelectedBonus] = useState({
        id: '',
        status: '',
        name: '',
        quote: '',
        price: 0,
        Reward: [],
    })

    // =========================================== //
    //  ================== MODAL ================== //
    // ============================================= //
    const [modal, setModal] = useState(false)
    const openModal = () => {
        setModal(true)
    }
    const closeModal = () => {
        setModal(false);
        setSelectedBonus({
            id: '',
            status: '',
            name: '',
            quote: '',
            price: 0,
            Reward: [],
        })
    }

    const rewards = [
        {
            name: 'noviceInvestor',
            Applied: user?.Applied,
            Signed: true,
            ProfileCompleted: false,
            Invested: false,
            id: shortid.generate(),
            FechaInicio: Date.now(),
            FechaFinalización: null,
        },
        {
            name: 'explorerTrader',
            Signed: true,
            ProfileCompleted: false,
            stake100USD: false,
            id: shortid.generate(),
            FechaInicio: Date.now(),
            FechaFinalización: null,
        },
        {
            name: 'refer',
            Signed: true,
            ProfileCompleted: false,
            referFive: false,
            id: shortid.generate(),
            FechaInicio: Date.now(),
            FechaFinalización: null,
        },
    ]



    const correspondingReward = rewards?.find(reward => selectedBonus.name === reward.name);

    // ======================================================================== //
    //  ==================Set the statuses for each reward ================== //
    // ======================================================================== //

    const handleNoviceInvestor = () => {
        setSelectedBonus({
            ...selectedBonus,
            id: `novice_${shortid.generate()}`,
            status: 'active',
            name: 'noviceInvestor',
            quote: 'Make the first investment',
            price: 25,
        })
        setTimeout(() => {
            openModal()
        }, 300);
    }
    //eslint-disable-next-line
    const handleExplorerTrader = () => {
        setSelectedBonus({
            ...selectedBonus,
            id: `novice_${shortid.generate()}`,
            status: 'active',
            name: 'explorerTrader',
            quote: 'Accumulate $100 USD in staking',
            price: 5,
        })
        setTimeout(() => {
            openModal()
        }, 300);
    }
    //eslint-disable-next-line
    const handleRefer = () => {
        setSelectedBonus({
            ...selectedBonus,
            id: `novice_${shortid.generate()}`,
            status: 'active',
            name: 'refer',
            quote: 'Refer 5 friends who invest, and win exclusive rewards',
            price: 5,
        })
        setTimeout(() => {
            openModal()
        }, 300);
    }


    const Bonus = {
        id: selectedBonus.id,
        status: selectedBonus.status,
        name: selectedBonus.name,
        quote: selectedBonus.quote,
        username: authUser?.displayName,
        uid: authUser?.uid,
        price: selectedBonus.price,
        reward: [correspondingReward],
    }




    // ======================================================================== //
    //  ================== Giving rewards to the user ========================= //
    // ======================================================================== //

    // find docs
    const findNoviceInvestor = bonusDocs?.find(reward => reward.name === 'noviceInvestor');
    //eslint-disable-next-line
    const findExplorerTrader = bonusDocs?.find(reward => reward.name === 'explorerTrader');
    //eslint-disable-next-line
    const findRefer = bonusDocs?.find(reward => reward.name === 'refer');



    async function createBonusDoc() {
        try {
            if (findNoviceInvestor?.status !== 'active') {
                if (authUser?.uid !== undefined || authUser?.displayName !== undefined) {
                    // Create doc 
                    const docRef = await addDoc(collection(firestore, 'bonus-user'), Bonus);
                    console.log(docRef)
                }
                setTimeout(() => {
                    closeModal();
                    window.location.reload()
                }, [1000])
            } else {
                closeModal()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const city = useMemo(() => user?.city !== '' && user?.city !== undefined, [user]);
    const fullName = useMemo(() => user?.fullName !== '' && user?.fullName !== undefined, [user]);
    const state = useMemo(() => user?.state !== '' && user?.state !== undefined, [user]);
    const country = useMemo(() => user?.profile?.location !== '' && user?.profile?.location !== undefined, [user]);
    const zip = useMemo(() => user?.zip !== '' && user?.zip !== undefined, [user]);
    const wallet = useMemo(() => user?.wallet !== '' && user?.wallet !== undefined, [user]);

    const profileCompleted = useMemo(() => city && fullName && state && country && zip && wallet, [city, fullName, state, country, zip, wallet]);

    const didUserMakeAnInvestment = useMemo(() => user?.Applied > 0, [user]);

    useEffect(() => {

        async function changeRewardStatus() {

            // const city = user?.city !== '' && user?.city !== undefined;
            // const fullName = user?.fullName !== '' && user?.fullName !== undefined;
            // const state = user?.state !== '' && user?.state !== undefined;
            // const country = user?.profile?.location !== '' && user?.profile?.location !== undefined;
            // const zip = user?.zip !== '' && user?.zip !== undefined;
            // const wallet = user?.wallet !== '' && user?.wallet !== undefined;
            // const profileCompleted = city && fullName && state && country && zip && wallet;
            // const didUserMakeAnInvestment = user?.Applied > 0;

            const didUserUpdateProfileFields = profileCompleted;

            const getFechaInici = [findNoviceInvestor]?.map((date, i) => date.reward[i].FechaInicio)
            const startDate = Number(getFechaInici)


            if (profileCompleted) {
                if (didUserUpdateProfileFields) {
                    const docId = findNoviceInvestor?.id;
                    const noviceInvestorRef = doc(firestore, 'bonus-user', docId);
                    const docSnap = await getDoc(noviceInvestorRef);

                    if (docSnap?.data()?.reward[0].ProfileCompleted !== true) {
                        const profileReward = {
                            id: docSnap?.id,
                            name: 'noviceInvestor',
                            Applied: user?.Applied,
                            Signed: true,
                            ProfileCompleted: true,
                            Invested: user?.Applied > 0 ? true : false,
                            FechaInicio: startDate,
                            FechaFinalización: Date.now(),
                        }

                        await updateDoc(noviceInvestorRef, {
                            reward: [profileReward]
                        });
                    }

                } else {
                    console.log('Update your profile')
                }
            }


            if (didUserMakeAnInvestment) {
                const docId = findNoviceInvestor?.id;
                const noviceInvestorRef = doc(firestore, 'bonus-user', docId);
                const docSnap = await getDoc(noviceInvestorRef);

                if (docSnap.data()?.reward[0].Invested !== true) {
                    console.log('xcq: investment')
                    const investReward = {
                        id: docSnap?.id,
                        name: 'noviceInvestor',
                        Applied: user?.Applied,
                        Signed: true,
                        ProfileCompleted: false,
                        Invested: user?.Applied > 0 ? true : false,
                        FechaInicio: startDate || null,
                        FechaFinalización: Date.now(),
                    }

                    await updateDoc(noviceInvestorRef, {
                        reward: [investReward],
                    });
                }
            } else {
                console.log('Update make investment')

            }
        }

        async function verifyRewardStatus() {
            try {

                if (findNoviceInvestor !== undefined || findNoviceInvestor?.id !== undefined) {

                    if (findNoviceInvestor?.status !== 'claimed') {
                        await changeRewardStatus()
                    } else {
                        return null
                    }
                }
            } catch (error) {
                console.log('status', error)
            }
        }

        async function giveRewardUser() {
            try {
                // ==================================== noviceInvestor ====================================
                if (findNoviceInvestor !== undefined) {
                    await verifyRewardStatus()
                }
            } catch (error) {
                console.log(error)
            }
        }

        return () => {
            giveRewardUser()
        }
    }, [user])


    async function addRewardBalance() {

        const docId = findNoviceInvestor?.id;
        const noviceInvestorRef = doc(firestore, 'bonus-user', docId);
        const docSnap = await getDoc(noviceInvestorRef);

        const ProfileCompleted = docSnap?.data()?.reward[0].ProfileCompleted === true;
        const InvestCompleted = docSnap?.data()?.reward[0].Invested === true;

        const userRef = doc(firestore, 'users', authUser.uid);

        if (user?.Applied > 0) {
            await updateDoc(userRef, {
                Applied: user?.Applied + findNoviceInvestor?.price
            });

            if (InvestCompleted && ProfileCompleted) {
                await updateDoc(noviceInvestorRef, {
                    status: 'claimed'
                });

            }
        }
    }


    return (
        <>
            <Header />
            {
                modal && (
                    <BonusModal
                        closeModal={closeModal}
                        createBonusDoc={createBonusDoc}
                    />
                )
            }
            <BonusTimeline
                handleNoviceInvestor={handleNoviceInvestor}
                selectedBonus={selectedBonus}
                bonusDocs={bonusDocs}
                addRewardBalance={addRewardBalance}
                findNoviceInvestor={findNoviceInvestor}
            />
        </>
    )
}

export default BonusPage