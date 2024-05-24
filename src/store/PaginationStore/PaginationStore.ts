import { makeObservable, observable, computed, action } from 'mobx';

class PaginationStore {
  currentPage: number = 0;
  itemsPerPage: number = 9;
  totalItems: number = 0;

  constructor() {
    makeObservable(this, {
      currentPage: observable,
      itemsPerPage: observable,
      totalItems: observable,
      setPage: action,
      pageCount: computed,
      visiblePages: computed,
    });
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  get pageCount(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get visiblePages() {
    const pages = [];
    const totalPages = this.pageCount;
    const currentPage = this.currentPage;
    const maxPageNumbersDisplayed = 5;

    if (totalPages <= maxPageNumbersDisplayed) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 2) {
        pages.push('...');
      }

      const startPage = Math.max(2, currentPage);
      const endPage = Math.min(currentPage + 1, totalPages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  }
}

export default PaginationStore;
