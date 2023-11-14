import { useState } from 'react'
import PropTypes from 'prop-types'
import AdminSponsored from './admin-sponsored'
//styles
import '../../../styles/sidebar/sidebar.css'

const AdminSponsoredTimeline = () => {

    const [referralSearch, setReferralSearch] = useState('');

    return (
        <>
            <AdminSponsored
                setReferralSearch={setReferralSearch}
                referralSearch={referralSearch}
            />
        </>

    )
}

export default AdminSponsoredTimeline

AdminSponsoredTimeline.propTypes = {
    setSearch: PropTypes.func,
    handleOpen: PropTypes.func,
    toggleOpen: PropTypes.func,
    toggleClose: PropTypes.func,
    openMenu: PropTypes.bool,
    setIsOpen: PropTypes.func,
    user: PropTypes.object,
    username: PropTypes.string,
    photoURL: PropTypes.string,
    isOpen: PropTypes.bool
}