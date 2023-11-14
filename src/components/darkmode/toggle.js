import React from 'react'
import propTypes from 'prop-types'
import '../../styles/dashboard/header/header.css'

const DarkModeToggle = ({
    theme, setTheme
}) => {
    return (
        <>
            <div className="dashboard_header_profile my-5 flex justify-center items-center">
                {/* Light & Dark Mode */}
                <div className="dashboard_header_profile_theme_btn" >
                    <span
                        className={`material-symbols-sharp border-gray-primary border-2 ${!theme ? 'active' : ''}`}
                        onClick={() => setTheme(false)}
                        id='theme_btn_light'>
                        lightbulb
                    </span>
                    <span
                        className={`material-symbols-sharp ${theme ? 'active' : ''}`}
                        onClick={() => setTheme(true)}
                        id='theme_btn_dark'>
                        mode_night
                    </span>
                </div>
            </div>
        </>
    )
}

export default DarkModeToggle

DarkModeToggle.propTypes = {
    theme: propTypes.bool, 
    setTheme: propTypes.func
}