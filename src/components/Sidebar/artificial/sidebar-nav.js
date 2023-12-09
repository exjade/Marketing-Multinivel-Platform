import React from 'react'
// import PropTypes from 'prop-types'
import SidebarShow from './sidebar-show'
import SidebarHide from './sidebar-hide'
import useSidebarHidden from '../../../hooks/use-sidebarHidden'

export default function SidebarNav() {

    const { sidebarHidden, setSidebarHidden } = useSidebarHidden()

 
    const showSidebar = (e) => {
        e.preventDefault()
        setSidebarHidden(false);
    }

    return (
        <>
            {
                sidebarHidden ?
                    (
                        <SidebarHide
                            showSidebar={showSidebar}
                        />

                    ) :
                    (
                        <SidebarShow
                            setSidebarHidden={setSidebarHidden}
                        />
                    )
            }
        </>
    )
}

SidebarNav.propTypes = {

}