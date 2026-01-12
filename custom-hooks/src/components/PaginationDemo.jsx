import { usePagination } from '../hooks/usePagination';

export default function PaginationDemo() {
  const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    nextPage,
    prevPage,
    setPage,
    canNextPage,
    canPrevPage,
  } = usePagination({
    totalItems: items.length,
    itemsPerPage: 10,
    initialPage: 1,
});
  
const currentItems = items.slice(startIndex, endIndex + 1);

  return (
    <div style={{ marginBottom: "40px" }}>
      <p>
        <strong>Page:</strong> {currentPage} / {totalPages}
      </p>

        <ul>
          {currentItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        
        <div style={{ marginTop: "10px" }}>
          <button onClick={prevPage} disabled={!canPrevPage}>
            Previous
          </button>
          
          <button onClick={nextPage} disabled={!canNextPage} style={{ marginLeft: "10px" }}>
            Next
          </button>
        </div>

        <p style={{ marginTop: "10px" }}>
            Showing items {startIndex + 1} - {endIndex + 1} (Total on this page: {itemsOnCurrentPage})
        </p>

        <div style={{ marginTop: "10px" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                marginRight: "5px",
                backgroundColor: currentPage === i + 1 ? "#ddd" : "white",
                }}
              >
                 {i + 1}
               </button> 
             ))}
        </div>
    </div>
  );
}