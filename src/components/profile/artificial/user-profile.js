import { useEffect, useState } from 'react'
import styles from '../styles/user-profile.module.css'
import useUser from '../../../hooks/use-user'
import useUsers from '../../../hooks/use-users'
import ProfileSkeleton from '../skeleton'
import useGetUnilevelBalance from '../../../hooks/use-unilevel-balance'
import ProfileCard from './re-design/card'

const UserProfile = () => {
    const { user, user: currentUser } = useUser()

    //Paginación
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostPerPage] = useState(3) //eslint-disable-line


    // REFERIDOS DEL USUARIO
    const [searchUser, setSearchUser] = useState('')
    const { users } = useUsers()
    const usersReferredByMe = users?.filter(user => user?.referral?.referrerBy === currentUser?.referral?.referralCode)
    const filteredTransactions = usersReferredByMe?.filter(search =>
        search.username?.toLowerCase().includes(searchUser.toLowerCase()) ||
        search.fullName?.toLowerCase().includes(searchUser.toLowerCase())
    )

    const [isLoading, setIsLoading] = useState(true);//eslint-disable-line
    const loader = () => { return <ProfileSkeleton /> }//eslint-disable-line



    //Paginación
    const lastPostIndex = currentPage * postsPerPage; // 1 * 10 = 10
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filteredTransactions?.slice(firstPostIndex, lastPostIndex) // 0, 10

    const nextHandler = () => {
        const totalElements = filteredTransactions?.length
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

    // Calculate dropdown referrals 
    const { unilevelDocs } = useGetUnilevelBalance()
    const [referralsLength, setReferralsLength] = useState(0)

    // Recursive function to obtain the total number of referrals
    const getReferredQty = (nodo) => {
        let quantityReferred = 0;

        if (unilevelDocs !== null || unilevelDocs !== undefined) {
            if (nodo && typeof nodo.referidos !== 'undefined' && nodo.referidos !== null) {
                // Check if the node has referrals
                if (Object.prototype.hasOwnProperty.call(nodo, 'referidos')) {
                    quantityReferred += nodo.referidos.length; // Add direct referrals

                    // Traverse the referrals and call the function recursively
                    nodo.referidos.forEach((referido) => {
                        quantityReferred += getReferredQty(referido); // Add referrals from referrers
                    });
                }
            }
        }
        setReferralsLength(quantityReferred)
        return quantityReferred;
    };


    // TITULO DE PAGINA
    useEffect(() => {
        document.title = 'Profile - Artificial'

        setTimeout(() => {

            setIsLoading(false)
        }, 3000);

        const quantityTotalReferrals = getReferredQty(unilevelDocs[0]);
        return quantityTotalReferrals;
    }, [unilevelDocs])


    return (
        <div className={`${styles.container}`}>
            <div className={`${styles.wrapper}`}>
                <ProfileCard
                    user={user}
                    currentUser={user}
                    setSearchUser={setSearchUser}
                    filteredTransactions={filteredTransactions}
                    users={users}
                    usersReferredByMe={usersReferredByMe}
                    currentPosts={currentPosts}
                    currentPage={currentPage}
                    prevHandlerPackages={prevHandler}
                    nextHandlerPackages={nextHandler}
                    referralsLength={referralsLength}
                />
            </div>
        </div>
    )
}

export default UserProfile