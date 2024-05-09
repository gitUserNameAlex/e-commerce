import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import React from 'react';
import { PRODUCTS_ENDPOINT } from 'config/endpoints';
import { IProduct } from 'types/interfaces';
class ProductsStore {
  products: IProduct[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 9;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchProducts() {
    try {
      const resp = await axios.get(PRODUCTS_ENDPOINT);
      runInAction(() => {
        this.products = resp.data.map((product: IProduct) => ({
          id: product.id,
          images: product.images,
          category: product.category,
          title: product.title,
          description: product.description,
          price: product.price,
        }));
      });
    } catch (err) {
      console.log('Error while fetching products:', err);
    }
  }

  get totalProducts() {
    return this.products.length;
  }

  get pageCount() {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  get currentProducts() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.products.slice(start, end);
  }

  setPage(page: number) {
    this.currentPage = page;
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

export default new ProductsStore();
