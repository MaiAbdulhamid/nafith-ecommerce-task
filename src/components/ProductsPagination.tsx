import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ totalPages, currentPage, onPageChange }: any) => {

  const renderPageNumbers = () => {
    const pages = [];
    const ellipsis = <li key="ellipsis">...</li>;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        i === currentPage ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <li key={i}>
            <button
              onClick={() => onPageChange(i)}
              className={`mx-1 inline-flex size-10 items-center justify-center rounded-full ${
                i === currentPage
                  ? "bg-primary-900 text-black"
                  : "bg-white text-slate-400"
              } shadow-sm hover:text-black`}
            >
              {i}
            </button>
          </li>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(ellipsis);
      }
    }

    return pages;
  };

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-12">
      <div className="text-center md:col-span-12">
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className={`rtl:rotate-180 mx-1 inline-flex size-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm ${
                currentPage === 1
                  ? "cursor-not-allowed opacity-50"
                  : "hover:text-black"
              }`}
              disabled={currentPage === 1}
            >
              <FaArrowLeft className="text-[20px]" />
            </button>
          </li>
          {renderPageNumbers()}
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className={`rtl:rotate-180 mx-1 inline-flex size-10 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm ${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : "hover:text-black"
              }`}
              disabled={currentPage === totalPages}
            >
              <FaArrowRight className="text-[20px]" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Pagination;
