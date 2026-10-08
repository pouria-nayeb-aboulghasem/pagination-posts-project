import { PAGE_SIZE } from "@/constants";
import { totalPosts } from "@/constants/pagination";

type PaginationType = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

function Pagination({ page, setPage }: PaginationType) {
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE);

  return (
    <nav aria-label="Page navigation">
      <ul className="flex justify-center -space-x-px text-sm container mx-auto my-4 px-4">
        <li>
          <button
            disabled={page === 1}
            onClick={() => setPage((current) => current - 1)}
            className={`flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-s-base text-sm w-9 h-9 focus:outline-none prev-button ${page === 1 ? "disabled" : ""}`}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-4 h-4 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" d="m15 19-7-7 7-7" />
            </svg>
          </button>
        </li>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <li key={pageNumber}>
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium text-sm w-9 h-9 focus:outline-none cursor-pointer page-number ${page === pageNumber ? "active" : ""}`}
              >
                {pageNumber}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((current) => current + 1)}
            className={`flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading font-medium rounded-e-base text-sm w-9 h-9 focus:outline-none next-button ${page === totalPages ? "disabled" : ""}`}
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-4 h-4 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
