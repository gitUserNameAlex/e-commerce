import axios from 'axios';
import { makeObservable, observable, action, computed, runInAction } from 'mobx';
import { PRODUCTS_ENDPOINT, CERTAIN_CATEGORY_PRODUCTS_ENDPOINT } from 'config/endpoints';
import PaginationStore from 'store/PaginationStore';
import { IProduct, RequestStatus } from 'types/interfaces';

class ProductsStore {
  products: IProduct[] = [];
  pagination: PaginationStore;
  productsRequestStatus: RequestStatus = RequestStatus.Loading;
  productsByCategoryRequestStatus: RequestStatus = RequestStatus.Loading;

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
          _id: product._id,
          images: product.images,
          category: product.category,
          title: product.title,
          description: product.description,
          price: product.price,
        }));
        this.pagination.totalItems = this.products.length;
        this.productsRequestStatus = RequestStatus.Success;
      });
    } catch (err) {
      runInAction(() => {
        this.productsRequestStatus = RequestStatus.Error;
      });
    }
  }

  async fetchProductsByCategory(categoryIds: string[]) {
    try {
      const products: IProduct[] = [];
      for (const categoryId of categoryIds) {
        const resp = await axios.get(CERTAIN_CATEGORY_PRODUCTS_ENDPOINT(categoryId));
        products.push(...resp.data);
      }
      runInAction(() => {
        this.products = products.map((product: IProduct) => ({
          _id: product._id,
          images: product.images,
          category: product.category,
          title: product.title,
          description: product.description,
          price: product.price,
        }));
        this.pagination.totalItems = this.products.length;
        this.productsByCategoryRequestStatus = RequestStatus.Success;
      });
    } catch (err) {
      runInAction(() => {
        this.productsByCategoryRequestStatus = RequestStatus.Error;
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
