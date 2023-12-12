import React from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const UserCreated = () => {
    const history = useHistory();
    useEffect(() => {
        document.title = 'Account Created | CapitalTradersBusiness'
    }, [])

    const redirectToLogin = () => {
        history.push(ROUTES.LOGIN);
        setTimeout(() => {
            window.location.reload()
        }, 3000);
    }

    return (
        <>
          
            <div className='flex flex-col gap-5 justify-center items-center w-full h-screen'>
                <div className='bg-white-primary rounded w-10/12 px-10 py-10 text-center font-semibold text-2xl'>
                    Account Created Successfully... ;)
                </div>
                {/* I want a button to login */}
                <button
                    type='button'
                    className=' bg-blue-primary text-white-primary font-semibold text-2xl rounded px-10 py-2'
                    onClick={redirectToLogin}
                >
                    Login
                </button>
            </div>
        </>
    )
}

export default UserCreated