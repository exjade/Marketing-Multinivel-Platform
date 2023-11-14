import React from 'react'

const ReferralLoader = () => {
    return (
        <>
            <div className='flex flex-col gap-10 justify-center items-center'>
                <div className='grid justify-items-center place-content-center bg-gray-loader animate-pulse w-full h-32'>
                    <p className='w-32 h-6 bg-gray-loader'></p>
                </div>
                <div className='grid justify-items-center place-content-center bg-gray-loader animate-pulse w-10/12 h-24'>

                </div>
                <div className='grid justify-items-center place-content-center bg-gray-loader animate-pulse w-10/12 h-24'>

                </div>
                <div className='grid justify-items-center place-content-center bg-gray-loader animate-pulse w-10/12 h-24'>

                </div>
                <div className='grid justify-items-center place-content-center bg-gray-loader animate-pulse w-10/12 h-24'>

                </div>
            </div>
        </>
    )
}
export default ReferralLoader