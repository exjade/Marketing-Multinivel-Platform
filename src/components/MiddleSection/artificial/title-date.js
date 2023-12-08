import React from 'react'
import PropTypes from 'prop-types'
import '../../../styles/sidebar/sidebar.css'
// import SearchBar from './searchbar';
import ReferralLink from './referral-link';

const TitleDate = (props) => {

    // ==============  Obtener la fecha del día de hoy ============== //
    function getTodayDate() {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();

        return `${dayNames[dayOfWeek]} ${day} ${months[month]} ${year}`;
    }

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const todayDate = getTodayDate();

    return (
        <section className='w-full flex justify-center items-center  font-roboto my-10'>
            <div className='flex flex-row items-center justify-between w-11/12 px-5'>
                <span className='flex flex-col gap-3'>
                    <h2 className='font-semibold text-3xl leading-1 text-white-normal'>Dashboard</h2>
                    <p className='text-xl leading-5 text-white-normal'>{todayDate}</p>
                </span>
                {/* REFERRAL LINK */}
                <ReferralLink
                    user={props.user}
                    handleActiveActión={props.handleActiveActión}
                />
            </div>
        </section>
    )
}

export default TitleDate

TitleDate.propTypes = {
    user: PropTypes.object,
    handleActiveActión: PropTypes.func,
}