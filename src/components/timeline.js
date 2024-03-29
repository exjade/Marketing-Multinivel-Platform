import React from 'react'
//components
import SidebarComponent from './Sidebar/sidebar'
import MiddleSection from './MiddleSection/MiddleSection'
import RightSection from './RightSection/RightSection'
import SidebarNav from './Sidebar/artificial/sidebar-nav'
//styles
import '../styles/sidebar/sidebar.css'
//Proptypes
import PropTypes from 'prop-types'
//error
import Error from '../error/error'

const Timeline = ({
    coins,
    search,
    theme,
}) => {

    return (
        <main>

            <Error>
                <SidebarNav />
            </Error>
            <section className='Sidebar_middle_section'>
                <MiddleSection
                    coins={coins}
                    search={search}
                    theme={theme}
                />
            </section>
            <section className='Sidebar_middle_section righsectionbg'>
                {/* <RightSection
                    theme={theme}
                /> */}
            </section>
        </main>
    )
}

export default Timeline

Timeline.propTypes = {
    coins: PropTypes.array,
    search: PropTypes.string,
    isOpen: PropTypes.bool,
    setIsOpen: PropTypes.func,
    theme: PropTypes.bool,
    setTheme: PropTypes.func,
    handleClose: PropTypes.func
}

Timeline.whyDidYouRender = true