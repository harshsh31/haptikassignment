import React from "react";
import { usePagination, DOTS } from "../hooks/usePagination";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import "../styles/pagination.css";
const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className={"pagination-container"}>
      {/* Left navigation arrow */}
      <div
        className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
        onClick={onPrevious}
      >
        <div className="arrow">
          <AiOutlineLeft />
        </div>
      </div>
      <div className="pagination-range">
        {paginationRange.map((pageNumber) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <div key={pageNumber} className="pagination-item dots">
                &#8230;
              </div>
            );
          }

          // Render our Page Pills
          return (
            <div
              className={`pagination-item ${
                pageNumber === currentPage ? "selected" : ""
              }`}
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </div>
          );
        })}
      </div>
      {/*  Right Navigation arrow */}
      <div
        className={`pagination-item ${
          currentPage === lastPage ? "disabled" : ""
        }`}
        onClick={onNext}
      >
        <div className="arrow">
          <AiOutlineRight />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
