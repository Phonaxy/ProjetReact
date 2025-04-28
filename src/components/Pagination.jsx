import React from "react";
import "../css/pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const generatePages = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }

        return pages;
    };

    const pages = generatePages();

    return (
        <div className="pagination">
            {pages.map((page, index) => (
                <button
                    key={index}
                    className={`page-button ${currentPage === page ? "active" : ""}`}
                    onClick={() => typeof page === "number" && onPageChange(page)}
                    disabled={page === "..."}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
