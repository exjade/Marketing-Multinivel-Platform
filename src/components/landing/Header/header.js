import React from 'react'
import PropTypes from 'prop-types';
import * as ROUTES from '../../../constants/routes'
import styles from '../../../styles/landing/landing.module.css'

const Header = (props) => {
    return (
        <div className={`${styles.container}`} >
            <img
                src="/logo.webp"
                alt="logotype"
                className='object-contain w-12 h-12 cursor-pointer'
            />
            <div className={`${styles['css-nav']}`} >
                <a
                    className={styles['css-signin-button']}
                    href={ROUTES.LOGIN}
                >Sign in</a>
                <a
                    className={styles['css-signup-button']}
                    href={ROUTES.SIGN_UP}
                >Sign up</a>
            </div>
        </div>
    )
}

export default Header

Header.propTypes = {
    state: PropTypes.any,
}

