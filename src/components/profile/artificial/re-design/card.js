import React from 'react';
import PropTypes from 'prop-types'
import UserPackages from '../user-packages';
import CircularProgressBar from '../progress-bar';
import UseInvestmentPackages from '../../../../hooks/use-invesvestmentPackages';
import useGenerateAvatar from '../../../../hooks/use-generateAvatar';
import useAuthListener from '../../../../hooks/use-auth-listener';
import '../styles/illustration.css'

const ProfileCard = (props) => {

    const { user: AuthUser } = useAuthListener()
    const { investemntPackages } = UseInvestmentPackages()

    const filterPackagesOfUsers = investemntPackages?.filter(u => u.userId === AuthUser?.uid)


    const { url } = useGenerateAvatar()

    return (
        <>

            <section className="bg-blue-background w-full" id='illustration'>
                <div className="w-full lg:w-4/12 px-4 mx-auto">
                    <div
                    id='illustration-2' 
                    className="relative flex flex-col min-w-0 break-words bg-badges-primary border-2 border-solid border-badges-primary w-full mb-6 shadow-xl rounded-lg mt-16">
                        {/* <div className="px-6"> */}
                            <div className="flex flex-wrap justify-center bg-blue-background  w-full">
                                <div className="w-full px-4 flex justify-center">
                                    <div className="relative z-50">
                                        <img
                                            alt="profile"
                                            src={url}
                                            className="shadow-xl rounded-full h-48 align-middle border-none w-48 object-contain max-w-150-px z-50" />
                                    </div>
                                </div>
                                <div className="w-full px-4 text-center mt-20">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-white-primary">
                                                {filterPackagesOfUsers?.length}
                                            </span>
                                            <span className="text-sm text-white-primary">Investments</span>
                                        </div>
                                        <div className="lg:mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-white-primary">
                                                {props?.referralsLength}
                                            </span>
                                            <span className="text-sm text-white-primary">Newtork</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="text-center mt-12">
                                <h3 className="text-xl font-semibold leading-normal mb-2 text-white-primary uppercase">
                                    {props?.user?.fullName}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-white-primary font-bold uppercase">
                                    <i className="fas fa-map-marker-alt mr-2 text-lg text-white-primary"></i>
                                    {props?.user?.city === '' || props?.user?.city === undefined ? 'unknown' : props?.user?.city},
                                    {props?.user?.state === '' || props?.user?.state === undefined ? 'unknown' : props?.user?.state}
                                </div>
                                <div className="mb-2 text-white-primary mt-10">
                                    <i className="fas fa-briefcase mr-2 text-lg text-white-primary"></i>
                                    < CircularProgressBar
                                        user={props?.user}
                                    />
                                </div>
                                <div className="mb-2 text-white-primary">
                                    <i className="fas fa-university mr-2 text-lg text-white-primary"></i>
                                   Current Progress
                                </div>
                            </div>


                            <div className="py-10 border-t border-white-primary text-center">
                                <div className="flex flex-wrap justify-center ">
                                    <div className="w-full px-4">
                                        <UserPackages
                                            currentUser={props?.user}
                                            setSearchUser={props?.setSearchUser}
                                            filteredTransactions={props?.filteredTransactions}
                                            users={props?.users}
                                            usersReferredByMe={props?.usersReferredByMe}
                                            currentPosts={props?.currentPosts}
                                            currentPage={props?.currentPage}
                                            prevHandlerPackages={props?.prevHandler}
                                            nextHandlerPackages={props?.nextHandler}
                                        />
                                    </div>
                                </div>
                            </div>


                        {/* </div> */}
                    </div>
                </div>

            </section>
        </>
    )
}

export default ProfileCard

ProfileCard.propTypes = {
    user: PropTypes.object,
    currentUser: PropTypes.object,
    setSearchUser: PropTypes.func,
    filteredTransactions: PropTypes.array,
    usersReferredByMe: PropTypes.array,
    users: PropTypes.array,
    currentPosts: PropTypes.any,
    prevHandler: PropTypes.func,
    nextHandler: PropTypes.func,
    currentPage: PropTypes.number,
    referralsLength: PropTypes.number
}