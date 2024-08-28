import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onNavigate: (direction: 'back' | 'forward') => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    onNavigate
}) => (
    <div className="row">
        <div className="mt-4 pt-2 col-lg-12">
            <nav aria-label="Page navigation example">
                <div className="pagination job-pagination mb-0 justify-content-center">
                    <li className="page-item">
                        <button
                            onClick={() => onNavigate('back')}
                            className={`page-link ${currentPage === 0 ? 'disabled' : ''}`}
                        >
                            <i className="bi bi-chevron-double-left"></i>
                        </button>
                    </li>
                    {[...Array(totalPages).keys()].map(page => (
                        <li key={page} className="page-item">
                            <button
                                onClick={() => onPageChange(page)}
                                className={`page-link ${page === currentPage ? 'active' : ''}`}
                            >
                                {page + 1}
                            </button>
                        </li>
                    ))}
                    <li className="page-item">
                        <button
                            onClick={() => onNavigate('forward')}
                            className={`page-link ${
                                totalPages === currentPage + 1 ? 'disabled' : ''
                            }`}
                        >
                            <i className="bi bi-chevron-double-right"></i>
                        </button>
                    </li>
                </div>
            </nav>
        </div>
    </div>
);

export default Pagination;
