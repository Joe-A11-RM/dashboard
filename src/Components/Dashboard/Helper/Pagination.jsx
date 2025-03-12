import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({
  page,
  totalPages,
  onPageChange,
  setLimit,
  unit,
  containerStyle,
}) => {
  const handlePageClick = (selected) => {
    onPageChange(selected.selected + 1);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
  };

  return (
    <div className={`paginationContainer ${containerStyle}`}>
      <ReactPaginate
        breakLabel={"..."}
        previousLabel={"<"}
        nextLabel={">"}
        initialPage={0}
        containerClassName={"pagination"}
        pageRangeDisplayed={totalPages > 20 ? 1 : 3}
        marginPagesDisplayed={totalPages > 20 ? 1 : 2}
        pageClassName={"pageClaseName"}
        previousClassName={"paginationButton"}
        nextClassName={"paginationButton"}
        breakClassName={"pageBreakClassName"}
        activeClassName={"activeClassName"}
        pageLinkClassName={"text-center"}
        onPageChange={handlePageClick}
        pageCount={totalPages}
        forcePage={page - 1}
        renderOnZeroPageCount={null}
      />
      {setLimit && (
        <div className="itemsContainer">
          <div className="mr-3">{unit} per view:</div>
          <select className="itemsSelect" onChange={handleLimitChange}>
            <option value={10}>10 {unit}</option>
            <option value={20}>20 {unit}</option>
            <option value={30}>30 {unit}</option>
            <option value={40}>40 {unit}</option>
            <option value={50}>50 {unit}</option>
            <option value={60}>60 {unit}</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Pagination;
