import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const handlePageChange = (page) => {
		if (page < 1 || page > totalPages) return;
		onPageChange(page);
	};

	return (
		<nav className="pagination-wrapper">
			<button className="page-btn" onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}>
				&laquo;
			</button>

			<span className="page-number">
				Page <strong>{currentPage}</strong> of {totalPages}
			</span>

			<button className="page-btn" onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}>
				&raquo;
			</button>
		</nav>
	);
};

export default Pagination;
