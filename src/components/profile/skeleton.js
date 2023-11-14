import styles from '../../styles/modules/profile/profile.module.css'

const ProfileSkeleton = () => {
    return (
        <>

            <div className={`${styles.container} `}>
                <div className={`${styles.container} `}>

                    <div className='sm:flex md:items-start items-center h-72'>
                        <div className='flex flex-row justify-center w-full'>
                            <div className='flex gap-5 w-full' >
                                <div className="rounded-md md:w-80 bg-gray-background h-60 w-10/12 animate-pulse"></div>
                                <div className='flex flex-col gap-3 w-full'>
                                    <div className="w-9/12 h-8 bg-gray-background animate-pulse"></div>
                                    <div className="w-6/12 h-8 bg-gray-background animate-pulse"> </div>
                                    <div className="w-9/12 h-28 bg-gray-background animate-pulse"></div>
                                    <div className="w-1/4 h-6 bg-gray-background animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 sm:grid grid-cols-3 sm:space-x-4 gap-5">
                        <div className='bg-gray-primary animate-pulse h-16 mb-2'></div>
                        <div className='bg-gray-primary animate-pulse h-16 mb-2'></div>
                        <div className='bg-gray-primary animate-pulse h-16 mb-2'></div>
                    </div>

                    <div className='sm:grid lg:grid-cols-4 grid-cols-2 sm:gap-x-4' >
                        <div className='flex justify-between items-center  p-6 rounded-md mb-4 bg-gray-background h-10 animate-pulse' >
                        </div>
                        <div className='flex justify-between items-center  p-6 rounded-md mb-4 bg-gray-background h-10 animate-pulse' >
                        </div>
                        <div className='flex justify-between items-center  p-6 rounded-md mb-4 bg-gray-background h-10 animate-pulse' >
                        </div>
                        <div className='flex justify-between items-center  p-6 rounded-md mb-4 bg-gray-background h-10 animate-pulse' >
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProfileSkeleton