import React from 'react'
import PropTypes from 'prop-types'
//eslint-disable-next-line
import styles from '../../styles/sidebar/right-sidebar.module.css'
import useGenerateAvatar from '../../hooks/use-generateAvatar'
// import { Link } from 'react-router-dom'
// import * as ROUTES from '../../constants/routes'

const RightProfile = ({ user }) => {

    const { url } = useGenerateAvatar()

    return (
        <a
            href={`/p/${user?.username}`}
            className='flex flex-row items-center justify-between px-8 sm:px-6 gap-2 mt-8'>
            <div className='flex flex-row gap-4 justify-between items-center cursor-pointer'>
                <h3 className='font-semibold text-xl capitalize'>{user?.fullName}</h3>
            </div>
            <button>
                <span className="material-icons-sharp">
                    arrow_circle_right
                </span>
            </button>
        </a>
    )
}

export default RightProfile

RightProfile.propTypes = {
    user: PropTypes.object,
}