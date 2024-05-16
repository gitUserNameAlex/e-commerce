import axios from 'axios';
import { makeObservable, observable, action, computed, runInAction } from 'mobx';
import { PRODUCTS_ENDPOINT, CATEGORIES_ENDPOINT } from 'config/endpoints';
import PaginationStore from 'store/PaginationStore';
import { IProduct, RequestStatus } from 'types/interfaces';

class ProductsStore {
  products: IProduct[] = [];
  pagination: PaginationStore;
  requestStatus: RequestStatus = 'loading';

  constructor() {
    this.pagination = new PaginationStore();

    makeObservable(this, {
      products: observable,
      fetchProducts: action,
      fetchProductsByCategory: action,
      totalProducts: computed,
      currentProducts: computed,
    });
  }

  async fetchProducts(query = '') {
    try {
      const resp = await axios.get(`${PRODUCTS_ENDPOINT}${query}`);
      runInAction(() => {
        this.products = resp.data.map((product: IProduct) => ({
          id: product.id,
          images: product.images,
          category: product.category,
          title: product.title,
          description: product.description,
          price: product.price,
        }));
        this.pagination.totalItems = this.products.length;
        this.requestStatus = 'success';
      });
    } catch (err) {
      runInAction(() => {
        this.requestStatus = 'error';
      });
    }
  }

  async fetchProductsByCategory(categoryIds: string[]) {
    try {
      const products: IProduct[] = [];
      for (const categoryId of categoryIds) {
        const resp = await axios.get(`${CATEGORIES_ENDPOINT}/${categoryId}/products`);
        products.push(...resp.data);
      }
      runInAction(() => {
        this.products = products.map((product: IProduct) => ({
          id: product.id,
          images: product.images,
          category: product.category,
          title: product.title,
          description: product.description,
          price: product.price,
        }));
        this.pagination.totalItems = this.products.length;
        this.requestStatus = 'success';
      });
    } catch (err) {
      runInAction(() => {
        this.requestStatus = 'error';
      });
    }
  }

  get totalProducts(): number {
    return this.products.length;
  }

  get currentProducts(): IProduct[] {
    const start = this.pagination.currentPage * this.pagination.itemsPerPage;
    const end = start + this.pagination.itemsPerPage;
    return this.products.slice(start, end);
  }
}

export default ProductsStore;
