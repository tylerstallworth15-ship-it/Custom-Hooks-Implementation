import { useState, useMemo } from 'react';

export function usePagination({totalItems, itemsPerPage = 10, initialPage = 1}) {
    const safeItemsPerPage = itemsPerPage > 0 ? itemsPerPage : 10;
    const safeTotalItems = totalItems >= 0 ? totalItems : 0;
     
    const totalPages = useMemo(() => {
      if (safeTotalItems == 0) return 1;
      return Math.ceil(safeTotalItems / safeItemsPerPage);
    }, [safeTotalItems, safeItemsPerPage]);

    const [currentPage, setCurrentPage] = useState(() => {
      if (initialPage < 1) return 1;
      if (initialPage > totalPages) return totalPages;
      return initialPage;
    });

    const safeCurrentPage = useMemo(() => {
      if (currentPage < 1) return 1;
      if (currentPage > totalPages) return totalPages;
      return currentPage;
    }, [currentPage, totalPages]);

    const startIndex = useMemo(() => {
      if (safeTotalItems === 0) return 0;
      return (safeCurrentPage - 1) * safeItemsPerPage;
    }, [safeCurrentPage, safeItemsPerPage, safeTotalItems]);

    const endIndex = useMemo(() => {
      if (safeTotalItems === 0) return 0;
      const rawEnd = startIndex + safeItemsPerPage - 1;
      const lastIndex = safeTotalItems - 1;
      return rawEnd > lastIndex ? lastIndex : rawEnd;
    }, [startIndex, safeItemsPerPage, safeTotalItems]);

    const itemsOnCurrentPage = useMemo(() => {
      if (safeTotalItems === 0) return 0;
      return endIndex - startIndex + 1;
    }, [startIndex, endIndex, safeTotalItems]);

    const canPrevPage = safeCurrentPage > 1;
    const canNextPage = safeCurrentPage < totalPages;

    function setPage(pageNumber) {
      if (typeof pageNumber !== 'number' || Number.isNaN(pageNumber)) return;
      if (pageNumber < 1) setCurrentPage(1);
      else if (pageNumber > totalPages) setCurrentPage(totalPages);
      else setCurrentPage(pageNumber);
    }

    function nextPage() {
      if (canNextPage) setCurrentPage((p) => p + 1);
    }

    function prevPage() {
      if (canPrevPage) setCurrentPage((p) => p - 1);
    }

    return {
      currentPage: safeCurrentPage,
      totalPages,
      startIndex,
      endIndex,
      itemsOnCurrentPage,
      setPage,
      nextPage,
      prevPage,
      canNextPage,
      canPrevPage
    };
}