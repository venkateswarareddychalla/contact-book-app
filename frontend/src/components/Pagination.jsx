import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ page, setPage, totalPages }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="mx-1 sm:mx-3 px-3 sm:px-5 py-2 sm:py-3 rounded bg-transparent text-neutral-charcoal disabled:cursor-not-allowed flex items-center justify-center hover:text-sky-blue transition-colors text-sm sm:text-base border border-cloud-gray hover:border-sky-blue"
        aria-label="Previous page"
      >
        <FaChevronLeft />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`mx-1 sm:mx-3 px-3 sm:px-5 py-2 sm:py-3 rounded flex items-center justify-center text-sm sm:text-base border transition-colors ${
            p === page
              ? 'bg-indigo-600 text-ivory-white border-indigo-600'
              : 'bg-transparent text-neutral-charcoal border-cloud-gray hover:text-sky-blue hover:border-sky-blue'
          }`}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages || totalPages === 1}
        className="mx-1 sm:mx-3 px-3 sm:px-5 py-2 sm:py-3 rounded bg-transparent text-neutral-charcoal disabled:cursor-not-allowed flex items-center justify-center hover:text-sky-blue transition-colors text-sm sm:text-base border border-cloud-gray hover:border-sky-blue"
        aria-label="Next page"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
