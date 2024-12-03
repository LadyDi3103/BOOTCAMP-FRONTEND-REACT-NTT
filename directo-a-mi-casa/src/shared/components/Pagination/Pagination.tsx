import "./Pagination.css";

interface PaginationProps {
  totalPages: number;
  requestPage: (page: number, count: number) => void;
  currentPage: number;
  pageCount: number;
}

const ReusablePagination: React.FC<PaginationProps> = ({
  totalPages,
  requestPage,
  currentPage,
  pageCount,
}) => {
  const sidePages = Math.floor((pageCount - 1) / 2);

  // Calcula start - end de la visibilidad del rango
  const startPage = Math.max(1, currentPage - sidePages);
  const endPage = Math.min(totalPages, currentPage + sidePages);

  return (

    <div className="pagination">

      <button
        className="pagination-button pagination-button--prev"
        disabled={currentPage === 1}
        onClick={() => requestPage(currentPage - 1, pageCount)}
      >
       <img src="/src/assets/images/icons/arrow_back.svg" alt="botón para mirar los siguientes cards"/>
      </button>

      {Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      ).map((page) => (
        <button
          key={page}
          className={`pagination-button ${currentPage === page ? 'active' : ''}`}
          onClick={() => requestPage(page, pageCount)}
        >
          {page}
        </button>
      )
      )}

      <button
        className="pagination-button pagination-button--next"
        disabled={currentPage === totalPages}
        onClick={() => requestPage(currentPage + 1, pageCount)}
      >
        <img src="/src/assets/images/icons/arrow_next.svg" alt="botón para mirar los siguientes cards"/>
      </button>

    </div>
  );
};

export default ReusablePagination;
