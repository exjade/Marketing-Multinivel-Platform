import React from 'react';
import PropTypes from 'prop-types';

export default function WithdrawalPagination({ totalPosts, postsPerPage, setCurrentPage, currentPage }) {

    let pages = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }

    return (
        <>
            {/* i want a pagination here */}

            {pages?.slice(0,4)?.map((page, index) => {
                return (
                    <td key={index} className='flex flex-col items-center justify-center w-full'>
                        <button
                            onClick={() => setCurrentPage(page)}
                            className={`w-14 h-14 rounded-md border-2  border-gray-primary text-gray-500
                             hover:bg-gray-button hover:text-gray-700 focus:outline-none focus:ring-2
                             focus:ring-gray-branding focus:ring-opacity-50 
                             ${currentPage === page ? 'bg-gray-adminParagraph text-white-normal' : ''}`}
                        >
                            {page}
                        </button>
                    </td>
                )
            })
            }





        </>
    );
}

WithdrawalPagination.propTypes = {
    totalPosts: PropTypes.number.isRequired,
    postsPerPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
}
