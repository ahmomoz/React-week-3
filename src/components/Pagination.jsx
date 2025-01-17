import PropTypes from "prop-types";


export default function Pagination({pagination, getProductsData}) {
  const handleClick = (event, page) => {
    event.preventDefault();
    getProductsData(page);
  };

  return (
    <nav aria-label="Page navigation">
    <ul className="pagination">
      <li className="page-item">
        <a
          className={`page-link ${
            pagination.has_pre ? "" : "disabled"
          }`}
          href="#"
          aria-label="Previous"
          onClick={(event) => handleClick(event, pagination.current_page - 1)}
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      {[...new Array(pagination.total_pages)].map((_, i) => (
        <li
          className={`page-item ${
            i + 1 === pagination.current_page ? "active" : ""
          }`}
          key={i}
        >
          <a
            className="page-link"
            href="#"
            onClick={(event) => handleClick(event, i + 1)}
          >
            {i + 1}
          </a>
        </li>
      ))}
      <li className="page-item">
        <a
          className={`page-link ${
            pagination.has_next ? "" : "disabled"
          }`}
          href="#"
          aria-label="Next"
          onClick={(event) => handleClick(event, pagination.current_page + 1)}
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.shape({
    total_pages: PropTypes.number,
    current_page: PropTypes.number,
    has_pre: PropTypes.bool,
    has_next: PropTypes.bool,
  }).isRequired,
  getProductsData: PropTypes.func.isRequired,
};